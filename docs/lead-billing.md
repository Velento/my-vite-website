# Lead billing — commission audit trail

This document describes the **system of record** for counting leads when settling the dev ↔ client commission. The goal: both parties can independently verify the count for any billing period, no hand-counting required.

## What counts as a billable interaction

The Cloudflare Worker logs **every** server-confirmed interaction:

| `type`           | `channel`    | Triggered by                                                |
| ---------------- | ------------ | ----------------------------------------------------------- |
| `form_submit`    | `form`       | Successful lead form submission (validated + Telegram-delivered) |
| `contact_click`  | `phone`      | Click on any `tel:+48883734171` link                        |
| `contact_click`  | `whatsapp`   | Click on `https://wa.me/...`                                |
| `contact_click`  | `telegram`   | Click on `https://t.me/LegalLine_pl`                        |
| `contact_click`  | `viber`      | Click on Viber deeplink                                     |
| `contact_click`  | `instagram`  | Click on Instagram profile link                             |
| `contact_click`  | `email`      | Click on `mailto:legalline.pl@gmail.com`                    |

A `form_submit` is the strongest signal (validated phone + name + Telegram message landed). `contact_click` is a softer signal (intent shown, but the user might not actually have called).

## How it's logged (audit-proof)

Every event becomes one row in the Cloudflare KV namespace `INTERACTION_LOG`:

```json
{
  "id": "e7f...uuid",
  "ts": "2026-05-10T17:42:00.123Z",
  "type": "form_submit",
  "channel": "form",
  "fingerprint": "p_<hashed-phone>_1234",
  "ua": "Mozilla/5.0...",
  "country": "PL",
  "referer": "https://www.google.com/",
  "utm": { "source": "google", "medium": "cpc", "campaign": "spring2026", "term": null, "content": null },
  "lang": "pl"
}
```

Server-side properties of this log:

- **Timestamp is set by Cloudflare**, not the client — can't be forged
- **Phone number is never stored in clear** — only `sha256(digits)` + last 4 digits for matching with the Telegram chat. Last-4 lets you eyeball the audit log against the Telegram message if needed.
- **Bot user-agents are rejected** (`/bot|crawler|spider|preview/i`)
- **2-year TTL** on every entry (KV is dirt-cheap at this volume; long retention helps tax/audit)
- **UTM params** are captured on every event — separates organic vs paid funnel

## Dedup (so the same person doesn't count twice)

The `/report` endpoint dedups by `(type, channel, fingerprint)` within a sliding window (default 24 h):

- Same phone submitting the form twice within 24 h → 1 billable lead
- Same session clicking the phone link three times → 1 billable click
- Same phone submits, then clicks WhatsApp → 2 billable events (different `(type, channel)`)

The dedup window is tunable per request: `?dedup_window_seconds=86400` (24 h default) or `?dedup=false` to see raw count.

## How to query the log (both parties)

You both share `REPORT_TOKEN` (a long random string set as a Worker secret).

### JSON breakdown (use this for invoice numbers)

```bash
TOKEN="<the_REPORT_TOKEN>"
WORKER_URL="<your_worker_url>"

curl -s -H "Authorization: Bearer $TOKEN" \
  "$WORKER_URL/report?from=2026-05-01&to=2026-05-31" | jq .
```

Response:

```json
{
  "ok": true,
  "from": "2026-05-01",
  "to": "2026-05-31",
  "dedup": true,
  "dedup_window_seconds": 86400,
  "report": {
    "total_raw": 187,
    "total_billable": 142,
    "by_type":    { "form_submit": 34, "contact_click": 108 },
    "by_channel": { "form": 34, "phone": 71, "whatsapp": 23, "telegram": 9, "viber": 3, "email": 2 },
    "by_source":  { "google": 96, "direct": 38, "instagram": 8 },
    "by_day":     { "2026-05-01": 4, "2026-05-02": 5, ... }
  }
}
```

`total_billable` is the headline number for the invoice. Both parties hit the same endpoint with the same token, both get the same number.

### CSV export (raw rows, for spreadsheet)

```bash
curl -s -H "Authorization: Bearer $TOKEN" \
  "$WORKER_URL/export?from=2026-05-01&to=2026-05-31&dedup=true" \
  -o leads_2026-05.csv
```

Open in Sheets/Excel; one row per billable event with id, timestamp, type, channel, country, UTM source, etc.

## Setup checklist (one-time, owner does it)

1. **Create the KV namespace**

   ```bash
   wrangler kv:namespace create INTERACTION_LOG
   ```

   Prints `{ id = "abc123..." }`. Paste that into `wrangler.toml` (replace `REPLACE_WITH_KV_NAMESPACE_ID`).

2. **Set the report token** (one long random string, share securely with both parties)

   ```bash
   openssl rand -hex 32                              # generate
   wrangler secret put REPORT_TOKEN                  # paste when prompted
   ```

3. **Verify the existing Telegram secrets are still set**

   ```bash
   wrangler secret list
   # should show: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, REPORT_TOKEN
   ```

4. **Deploy**

   ```bash
   wrangler deploy
   ```

5. **Smoke-test** (from a non-blocked browser)

   - Submit the lead form → check Telegram message arrived AND that the message now ends with an `🆔 <uuid>` line
   - Click any messenger icon → no visible effect (204 No Content), but the KV log got a row
   - Query the report endpoint with `from=today&to=today` → should see `total_billable: 1+`

## How both parties verify a billing period

Settlement happens at end of month:

1. Either party runs `GET /report?from=2026-05-01&to=2026-05-31`
2. Result is signed-off as the source of truth
3. Optional: `GET /export?…` for the CSV evidence pack
4. Disputes: pull the full month CSV, eyeball any flagged rows

## Anti-fraud signals already baked in

- **Bot UA filtering** at log time — crawlers don't bloat the count
- **Origin allowlist** — only requests from `legalline.pl` are accepted
- **Per-event fingerprint** — same session can't multi-count via repeat clicks (after dedup)
- **Server-side timestamp** — client can't backdate events
- **No client-controlled `type`/`channel`** — `/track` only accepts a fixed allowlist of channel values

What's **not** filtered (intentional):

- Real users on legitimate phones clicking many times still count as 1 in `/report?dedup=true`
- Direct curl POSTs to `/track` from someone with valid Origin would count — mitigated by Origin check, but a determined attacker with the public key could spoof. For the threat model here (commission disputes between trusted parties), good enough.

## What lives where (data flow recap)

```
Lead form submit
    ↓
client (React) — gtag/fbq/dataLayer    ← marketing tracking (Ads ROAS)
    ↓
Worker POST /  — KV write + Telegram   ← billing source of truth
    ↓
Telegram chat (operator sees it)       ← operational ack

Contact click
    ↓
client (React) — gtag/fbq/dataLayer    ← marketing tracking
client (React) — sendBeacon /track     ← billing source of truth
    ↓
Worker POST /track — KV write          ← billing source of truth
```

Two separate funnels — marketing tags can be ad-blocked all day, the billing trail keeps working.

## Tuning the model later

If the model shifts (e.g., pay-per-qualified-lead instead of pay-per-interaction), the same KV log supports it — `qualified` / `closed` markers can be added to entries via a future `PATCH /event/:id` endpoint, and `/report` extended with a `status=` filter. The schema field bag is forward-compatible.
