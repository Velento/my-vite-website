/**
 * Analytics Service — fires conversion + engagement events to GTM (dataLayer),
 * Google Ads (gtag), Meta Pixel (fbq) AND the Cloudflare Worker's audit log
 * (server-side record, immune to ad-blockers).
 *
 * All calls are safe when the underlying tag manager isn't loaded — they
 * no-op gracefully. The Worker beacon also no-ops if VITE_FORM_PROXY_URL
 * isn't set.
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

function readUtm(): Record<'source' | 'medium' | 'campaign' | 'term' | 'content', string | null> {
  if (typeof window === 'undefined') {
    return { source: null, medium: null, campaign: null, term: null, content: null };
  }
  const sp = new URLSearchParams(window.location.search);
  return {
    source: sp.get('utm_source'),
    medium: sp.get('utm_medium'),
    campaign: sp.get('utm_campaign'),
    term: sp.get('utm_term'),
    content: sp.get('utm_content'),
  };
}

/**
 * Server-side beacon to the Cloudflare Worker. Records contact clicks in the
 * KV audit log even when client-side tags are blocked by ad-blockers.
 *
 * Uses `navigator.sendBeacon` when available so the request survives the
 * page-unload that immediately follows a tel: or messenger deeplink click.
 * Falls back to keepalive fetch.
 */
function trackOnWorker(channel: ContactChannel): void {
  if (typeof window === 'undefined') return;
  const proxyUrl = import.meta.env.VITE_FORM_PROXY_URL;
  if (!proxyUrl) return;

  const trackUrl = `${proxyUrl.replace(/\/+$/, '')}/track`;
  const payload = JSON.stringify({
    channel,
    referer: document.referrer || null,
    lang: document.documentElement.lang || null,
    utm: readUtm(),
  });

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      const queued = navigator.sendBeacon(trackUrl, blob);
      if (queued) return;
    }
    void fetch(trackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Tracking must never break navigation.
  }
}

/**
 * Fires when a lead form is successfully submitted.
 *
 * - GTM: `lead_form_submit` event with `value` and `currency`
 * - Google Ads: `gtag('event', 'conversion')` for the configured conversion
 *   ID. The conversion ID **must** be in the form `AW-XXXX/LABEL` (full label
 *   from the Ads UI). Without the slash + label, Ads silently drops the event.
 * - Meta Pixel: `fbq('track', 'Lead', {value, currency})`
 *
 * The server-side form_submit event is logged by the Cloudflare Worker
 * itself (POST / handler) — no client beacon needed here.
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
 *
 * Three sinks:
 *  - dataLayer push (GTM)
 *  - Meta Pixel `Contact` event
 *  - Cloudflare Worker `/track` beacon — survives ad-blockers
 *
 * Wire this via `onClick` on every tel:, wa.me, t.me, viber, instagram,
 * mailto link in the app.
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

  trackOnWorker(channel);
}

/**
 * Fires once when a user starts interacting with the lead form (first focus
 * on any field). Client-side only — used to measure form abandonment
 * (form_start vs form_submit funnel).
 */
export function trackFormStart(): void {
  safeDataLayerPush({
    event: 'lead_form_start',
    event_category: 'lead',
    event_label: 'contact_form',
  });

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout');
  }
}

/**
 * Fires when a marketing popup is shown (e.g. exit-intent). Helps measure
 * popup conversion vs annoyance.
 */
export function trackPopupShown(name: string): void {
  safeDataLayerPush({
    event: 'popup_shown',
    event_category: 'engagement',
    event_label: name,
  });
}

/**
 * Fires when the user clicks a pricing package "Order" button.
 *
 * Passing the real package value lets Google Ads Smart Bidding distinguish a
 * 2 400 PLN Ultra lead from a 750 PLN Basic one and optimize bids accordingly.
 * Meta Pixel maps this to AddToCart with content_name + value.
 */
export function trackPackageSelected(packageName: string, value: number): void {
  safeDataLayerPush({
    event: 'package_selected',
    event_category: 'lead',
    event_label: packageName,
    package_name: packageName,
    value,
    currency: 'PLN',
  });

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', { content_name: packageName, value, currency: 'PLN' });
  }
}

/**
 * Fires when a generic CTA button (section card, exit popup form link, etc.)
 * is clicked. Useful as a micro-conversion signal in Google Ads.
 */
export function trackCTAClick(label: string): void {
  safeDataLayerPush({
    event: 'cta_click',
    event_category: 'engagement',
    event_label: label,
  });
}
