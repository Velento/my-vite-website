/**
 * Analytics Service — fires conversion events to Google Ads / GTM / Facebook Pixel.
 * Safe to call even when tag managers are not loaded (no-ops gracefully).
 */

/**
 * Push a lead_form_submit event to dataLayer (Google Ads / GTM)
 * and fire a Facebook Pixel Lead event if available.
 */
export function trackLeadConversion() {
  // Google Tag Manager / Google Ads dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'lead_form_submit',
      event_category: 'lead',
      event_label: 'contact_form',
    });
  }

  // Google Ads gtag conversion — enabled only when VITE_GOOGLE_ADS_ID is configured.
  const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
  if (googleAdsId && typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: googleAdsId,
      event_category: 'lead',
    });
  }

  // Facebook Pixel — fires only if the user has given marketing consent (see CookieConsent).
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
}
