/**
 * Analytics Service — fires conversion events to Google Ads / GTM / Facebook Pixel.
 * Safe to call even when tag managers are not loaded (no-ops gracefully).
 */
export function trackLeadConversion(): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'lead_form_submit',
      event_category: 'lead',
      event_label: 'contact_form',
    });
  }

  const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
  if (googleAdsId && typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: googleAdsId,
      event_category: 'lead',
    });
  }

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
}
