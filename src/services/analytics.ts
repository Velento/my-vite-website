/**
 * Analytics Service — fires conversion + engagement events to GTM (dataLayer),
 * Google Ads (gtag), and Meta Pixel (fbq). All calls are safe when the
 * underlying tag manager isn't loaded — they no-op gracefully.
 */

const DEFAULT_LEAD_VALUE_PLN = 750;

type ContactChannel = 'phone' | 'whatsapp' | 'telegram' | 'viber' | 'instagram' | 'email';

type LeadConversionOptions = {
  /**
   * Estimated conversion value (in `currency`). Defaults to 750 PLN — the
   * Basic package list price. Tune to your customer LTV / average ticket if
   * you want Google Ads ROAS to reflect reality.
   */
  value?: number;
  currency?: string;
};

function safeDataLayerPush(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

/**
 * Fires when a lead form is successfully submitted.
 *
 * - GTM: `lead_form_submit` event with `value` and `currency` so Google Ads /
 *   GA4 conversions configured in the GTM UI can pick the value up
 * - Google Ads: `gtag('event', 'conversion')` for the configured conversion
 *   ID. The conversion ID **must** be in the form `AW-XXXX/LABEL` (full label
 *   from the Ads UI). Without the slash + label, Ads silently drops the event.
 * - Meta Pixel: `fbq('track', 'Lead', {value, currency})`
 */
export function trackLeadConversion(options: LeadConversionOptions = {}): void {
  const value = options.value ?? DEFAULT_LEAD_VALUE_PLN;
  const currency = options.currency ?? 'PLN';

  safeDataLayerPush({
    event: 'lead_form_submit',
    event_category: 'lead',
    event_label: 'contact_form',
    value,
    currency,
  });

  const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
  if (googleAdsId && typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: googleAdsId,
      value,
      currency,
      event_category: 'lead',
    });
  }

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { value, currency });
  }
}

/**
 * Fires when a user clicks a direct-contact link (phone, messenger app).
 * These are micro-conversions — the user has shown clear intent to talk to us
 * even before filling the form, and Ads ROAS gets way better when we count
 * them.
 *
 * Wire this via `onClick` on every `<a href="tel:...">`, `<a href="https://wa.me/...">`,
 * Telegram, Viber, and Instagram link in the app.
 */
export function trackContactClick(channel: ContactChannel): void {
  safeDataLayerPush({
    event: 'contact_click',
    event_category: 'engagement',
    event_label: channel,
    contact_channel: channel,
  });

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', { contact_channel: channel });
  }
}
