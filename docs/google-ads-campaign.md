# Google Ads — campaign playbook + economics

Companion to `google-ads-setup.md` (which covers conversion-tracking wiring). This one covers the actual paid campaign: how to launch it, what keywords/ads to run, how to optimize CPL down to the level that makes the boss deal profitable.

## The deal

Client pays **$3.5 ≈ 14 PLN per lead**. Every lead delivered below that costs is margin. Above it is loss. The funnel infrastructure (forms, exit-intent, sticky bars, WhatsApp fallback, audit log) exists to push CPL down.

Target the campaign at **CPL ≤ 11 PLN** to keep ~3 PLN ($0.75) margin per lead after the inevitable accounting noise (lost conversions due to ad-blockers, attribution lag, etc.).

## Status — what's missing before launch

### Hard blockers (campaign won't track without these)

1. **Worker Telegram secrets** — owner runs locally, one time:
   ```bash
   echo "<bot_token>" | npx wrangler secret put TELEGRAM_BOT_TOKEN
   echo "<chat_id>"   | npx wrangler secret put TELEGRAM_CHAT_ID
   ```
   Values are the same as GitHub Secrets `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`. They cannot be read back from GitHub — pull them from wherever they were originally generated (BotFather DM for the token, `getUpdates` for the chat id).

2. **Google Ads conversion *label*** — the GitHub secret `VITE_GOOGLE_ADS_CONVERSION_ID` currently holds just `AW-802543735` (account id only). Without `/LABEL`, Ads silently drops conversions. See `google-ads-setup.md` for the 5-step fix; then:
   ```bash
   gh secret set VITE_GOOGLE_ADS_CONVERSION_ID --body "AW-802543735/<LABEL>"
   ```
   Push any commit to trigger CI rebuild.

### Soft blocker (campaign launches, just less data)

3. **Meta Pixel ID** — optional, only needed if running parallel Facebook/Instagram Ads. Skip for the Google-Ads-only launch.

## Campaign structure (recommended)

One **Search campaign**, three ad groups by user intent.

| Ad group           | Intent       | Keyword theme                             | Bid priority |
| ------------------ | ------------ | ----------------------------------------- | ------------ |
| `karta-pobytu`     | High intent  | Direct service searches                    | Highest      |
| `legalizacja`      | Medium       | Stay/work legalization, work permits       | Medium       |
| `pomoc-prawna`     | Lower intent | General legal help for foreigners          | Lowest       |

Don't bundle them — different intents need different ad copy and different max-CPC.

## Keywords (Polish — the only market language that matters here)

### Ad group: karta-pobytu

```
[karta pobytu warszawa]          (exact)
"karta pobytu czasowego"         (phrase)
"karta pobytu stałego"           (phrase)
"karta pobytu cena"              (phrase)
"karta pobytu dla cudzoziemca"   (phrase)
"karta pobytu jak złożyć"        (phrase)
+karta +pobytu +pomoc            (modified broad)
```

### Ad group: legalizacja

```
"legalizacja pobytu"             (phrase)
"legalizacja pracy cudzoziemca"  (phrase)
"zezwolenie na pobyt czasowy"    (phrase)
"zezwolenie na pracę"            (phrase)
"pobyt rezydenta długoterminowego" (phrase)
"oświadczenie o powierzeniu pracy" (phrase)
```

### Ad group: pomoc-prawna

```
"prawnik dla cudzoziemca"        (phrase)
"pomoc prawna karta pobytu"      (phrase)
"adwokat cudzoziemcy warszawa"   (phrase)
"radca prawny imigracja"         (phrase)
```

### Negative keywords (apply at campaign level)

```
darmowy darmowa darmowe free
forum
wzór
sample template
wikipedia
praca jak praca w urząd
ambasada
konsulat
mfa
work.ua
pracuj.pl
```

These kill irrelevant traffic that destroys CPL: people looking for templates, free advice, government info, jobs.

## Ad copy templates (Polish)

Each ad: 3 headlines pinned to position 1 (must include keyword), 3 unpinned headlines for variety, 2 descriptions.

### Template — karta-pobytu ad group

**Headline 1 (pin 1):** Karta pobytu — pomoc prawna
**Headline 2 (pin 1):** Karta pobytu już od 750 zł
**Headline 3 (pin 1):** Karta pobytu w Warszawie

**Headline 4–7 (unpinned):**
- Bezpłatna konsultacja prawna
- Złóż wniosek bez błędów
- Doświadczeni prawnicy 24/7
- Gwarancja zwrotu pieniędzy

**Description 1:** Załatwimy kartę pobytu szybko i bez stresu. Sprawdzimy dokumenty, wypełnimy wniosek, reprezentujemy w urzędzie.

**Description 2:** Pierwsza konsultacja gratis. Zostaw numer — oddzwonimy w 30 minut. Tysiące zadowolonych klientów.

### Sitelink extensions

- *Bezpłatna konsultacja* → `https://legalline.pl/#leedform`
- *Cennik usług* → `https://legalline.pl/#stages-section`
- *Opinie klientów* → `https://legalline.pl/#reviews-section`
- *FAQ* → `https://legalline.pl/#faq-section`

### Call extension

`+48 883 734 171` — already in the site header, same number, no surprises.

## Bidding strategy

**Week 1–3 (learning phase):** *Maximize Conversions*, no target CPA cap.
Daily budget: **50–80 PLN** (gives ~4–8 clicks/day at ~10 PLN avg CPC). Need ~30 conversions before Smart Bidding stabilizes.

**Week 4+ (steady state):** Switch to *Target CPA* with target = **11 PLN**.
If volume drops too hard, step it up to 12 PLN, never above 13 PLN (margin gone).

## Daily / weekly optimization routine

### Daily (2 minutes)

- Open Ads → glance at conversions/CPL. If CPL > 15 PLN three days running, pause campaign and check the search-terms report.
- Open the lead dashboard:
  `https://legalline-form-proxy.legalline.workers.dev/dashboard?token=<REPORT_TOKEN>`
  Verify the live count matches what Ads shows.

### Weekly (15 minutes)

- **Search terms report** (Keywords → Search Terms): add anything irrelevant as a negative keyword. This is the single highest-ROI optimization activity. Expect to add 5–15 negatives/week for the first month.
- **Device split**: if mobile CPL is 2× desktop, raise desktop bid modifier or lower mobile.
- **Day-of-week / hour-of-day**: pause ad serving Sat 22:00 – Sun 08:00 if those hours convert poorly.
- **Ad rotation**: pause the worst-performing ad in each group; clone the best, change one element (the headline most likely).

## Reading the dashboard (lead count for invoicing)

Both you and the client share the `REPORT_TOKEN`. Either party can independently verify the count for any period:

```bash
TOKEN=5d70d232df3a06dd74578195fccf84517fcb4cdf3aa93f19f451be663cbda4d0
WORKER=https://legalline-form-proxy.legalline.workers.dev

# JSON breakdown
curl -sH "Authorization: Bearer $TOKEN" \
  "$WORKER/report?from=2026-05-01&to=2026-05-31" | jq

# CSV export
curl -sH "Authorization: Bearer $TOKEN" \
  "$WORKER/export?from=2026-05-01&to=2026-05-31&dedup=true" \
  -o leads_2026-05.csv

# Browser dashboard (visual)
open "$WORKER/dashboard?token=$TOKEN"
```

`total_unique` in the JSON response is the headline figure. Same query, same token, same answer for both parties — no manual counting, no disputes.

## Settlement workflow with the boss

Agree on these points **in writing** (chat is enough, but written) before launching anything:

1. **What counts** — recommend: every `form_submit` row in the audit log counts as a lead. Contact clicks (phone tap, WhatsApp click) do **not** count toward the $3.5 unless explicitly agreed.
2. **Dedup window** — 24 h default. Same phone twice in 24 h = 1 lead.
3. **Verification** — both parties use the same `/report` endpoint or `/dashboard` link. No spreadsheets, no he-said-she-said.
4. **Cadence** — recommend weekly settlement first month, monthly after that.
5. **Cap** — boss probably has a budget ceiling. Ask: "what's the max number of leads/month you want?" If you exceed it, pause campaign.
6. **Quality cutoff** — if a real share of leads turn out unreachable / fake, expect renegotiation. Pre-empt: agree on a refund rule for clearly-fake submissions (e.g. obvious bot-pattern phone, no answer after 5 call attempts over 3 days). Keep that share low or boss will push the per-lead price down.

## Realistic CPL expectations for this niche

Polish-language paid search for legal/immigration services in 2025–2026:

- **Best case:** 7–10 PLN/lead with good geo-targeting (Warsaw, Kraków, Wrocław only), tight negatives, and the funnel that's already shipped. Profitable.
- **Typical:** 11–15 PLN/lead in month 1, optimization brings it down to 9–12 by month 3.
- **Bad:** > 18 PLN/lead — means keywords are too broad, negatives are sparse, or ad copy/landing-page mismatch. **Stop and fix**, don't burn budget chasing volume.

The funnel boosters already shipped (exit-intent, sticky mobile bar, WhatsApp fallback, form-start tracking) should lift conversion rate by 15–30% over a bare lead form — that's the difference between 14 PLN CPL (break-even) and 10 PLN CPL (profitable).

## When NOT to run the campaign

- Boss hasn't confirmed in writing they'll pay per lead — verbal-only is a payment dispute waiting to happen
- Conversion label is still missing — you'd be flying blind, no Smart Bidding can work without conversion data
- Telegram secrets aren't set — every lead falls back to WhatsApp, conversion rate drops, CPL goes up
- Less than 50–100 PLN/day budget available — Smart Bidding needs volume to learn; under-funded campaigns optimize to nothing

## TL;DR action sequence

1. Set worker Telegram secrets (2 commands above)
2. Create the conversion action in Ads UI → grab the label → update `VITE_GOOGLE_ADS_CONVERSION_ID` GitHub secret → push a commit
3. Agree the deal terms (in writing) with the boss using the points above
4. Launch one Search campaign, three ad groups, the keywords/ads in this doc
5. Maximize Conversions for 3 weeks, then Target CPA = 11 PLN
6. Weekly: search-terms report → add negatives
7. Monthly: pull `/report` for billing
