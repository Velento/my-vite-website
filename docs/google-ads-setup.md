# Google Ads — finishing the conversion setup

The site fires `gtag('event', 'conversion')` on every successful lead form submit. Whether Ads actually counts those events as conversions depends on having a **complete** conversion ID — `AW-XXXXXX/LABEL`, not just `AW-XXXXXX`.

## What's missing right now

- `VITE_GOOGLE_ADS_CONVERSION_ID` is set to `AW-802543735` (the account ID only)
- The conversion event fires, but Ads silently drops it because there's no label telling Ads *which* conversion action this represents

## What you need to do (5 minutes in Ads UI)

1. Open https://ads.google.com → **Tools & Settings → Measurement → Conversions**
2. Click **+ New conversion action** → **Website**
3. Configure:
   - **Goal**: Lead
   - **Conversion name**: `LegalLine — Lead Form Submit`
   - **Value**: Use the same value for each conversion → **750 PLN** (or your own estimate)
   - **Count**: One (one lead per click is the right counting model here)
   - **Click-through window**: 30 days
   - **Attribution model**: Data-driven (default)
4. **Save and continue** → choose **Use Google Tag Manager** (we already have GTM wired up)
5. You'll see a **Conversion ID** (`AW-802543735`) and a **Conversion label** (e.g. `abcDEFghi123`)
6. Combine them: `AW-802543735/abcDEFghi123`

## Update the secret

```bash
gh secret set VITE_GOOGLE_ADS_CONVERSION_ID --repo Velento/my-vite-website --body "AW-802543735/abcDEFghi123"
```

Update `.env.example` too so future devs see the right format:

```
VITE_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX/CONVERSION_LABEL
```

After the next deploy (`my-vite-website` push triggers gh-pages action), every lead form submit will call:

```js
gtag('event', 'conversion', {
  send_to: 'AW-802543735/abcDEFghi123',
  value: 750,
  currency: 'PLN',
})
```

…and Ads will count it.

## Verify it's working

1. Submit a test lead from the live site (use a phone number Ads won't flag as fraud)
2. Open Chrome DevTools → Network → filter `google-analytics|googleadservices|googletagmanager`
3. Look for a request to `googleadservices.com/pagead/conversion/...`
4. In Ads UI: **Conversions → Status** should flip from **No recent conversions** to **Recording conversions** within ~24 h

## What else is now tracked

After the same deploy, these events also flow to GTM and (where applicable) Meta Pixel:

| Event              | Trigger                                                  |
| ------------------ | -------------------------------------------------------- |
| `lead_form_submit` | Lead form successful submit (with `value: 750 PLN`)      |
| `contact_click`    | Click on `tel:`, WhatsApp, Telegram, Viber, Instagram, email; `contact_channel` = which one |

These are micro-conversions you can configure as additional Ads conversion actions if you want to bid on them, or use as Audience signals (re-marketing).

## GTM container — recommended setup

- **Google Ads Conversion Tracking** tag, triggered on dataLayer event `lead_form_submit`, mapping `value` and `currency` from the dataLayer
- **Google Ads Remarketing** tag on All Pages
- (Optional) Conversion tag on `contact_click` if you want to bid on calls/messages
- **GA4 Configuration** + **GA4 Events** for `lead_form_submit` and `contact_click`

This way GTM owns the tags; the app just emits events, no AW IDs hardcoded in HTML.
