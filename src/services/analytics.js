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

  // Google Ads gtag conversion (when gtag.js is loaded directly)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXX/YYYYYYYYYY', // Replace with your Google Ads conversion ID
      event_category: 'lead',
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
}
