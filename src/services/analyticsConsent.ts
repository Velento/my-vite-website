/**
 * Analytics consent gate (RODO/GDPR).
 *
 * Google Tag Manager is no longer loaded from index.html on page load; it boots
 * here only after the visitor grants analytics consent in the cookie banner.
 * Until then, dataLayer pushes accumulate harmlessly (no network, no tracking)
 * because the GTM container that would process them is never fetched.
 */

const GTM_ID = 'GTM-KWWX8WJZ';

let gtmLoaded = false;

function loadGtm(): void {
  if (gtmLoaded || typeof document === 'undefined') return;
  gtmLoaded = true;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export type AnalyticsConsent = { analytics?: boolean };

export function applyAnalyticsConsent(consent: AnalyticsConsent | undefined | null): void {
  if (consent?.analytics) loadGtm();
}
