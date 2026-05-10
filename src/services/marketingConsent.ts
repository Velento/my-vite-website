const META_PIXEL_ID = '1812191629550140';
const META_PIXEL_SRC = 'https://connect.facebook.net/en_US/fbevents.js';

let pixelLoaded = false;

type FbqFn = NonNullable<Window['fbq']>;

/**
 * Install the Meta Pixel global (`window.fbq`) and load fbevents.js via
 * Partytown so it never blocks the main thread. Modeled on Facebook's
 * official snippet but rewritten without `arguments.callee`.
 */
function installFbqShim(): void {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]): void {
    if (typeof fbq.callMethod === 'function') {
      fbq.callMethod(...args);
    } else {
      fbq.queue ??= [];
      fbq.queue.push(args);
    }
  } as FbqFn;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/partytown';
  script.src = META_PIXEL_SRC;
  document.head.appendChild(script);
}

function loadMetaPixel(): void {
  if (pixelLoaded || typeof window === 'undefined') return;
  pixelLoaded = true;
  installFbqShim();
  window.fbq?.('init', META_PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

export type MarketingConsent = { marketing?: boolean };

export function applyMarketingConsent(consent: MarketingConsent | undefined | null): void {
  if (consent?.marketing) {
    loadMetaPixel();
  }
}
