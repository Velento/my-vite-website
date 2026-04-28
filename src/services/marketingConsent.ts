const META_PIXEL_ID = '1812191629550140';

let pixelLoaded = false;

function loadMetaPixel(): void {
  if (pixelLoaded || typeof window === 'undefined') return;
  pixelLoaded = true;

  (function (f: Window, b: Document, e: 'script', v: string) {
    if (f.fbq) return;
    const n = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod(...args) : n.queue!.push(args);
    } as Window['fbq']) as NonNullable<Window['fbq']>;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    // Run Meta Pixel inside Partytown's Web Worker so it never blocks the main thread.
    t.type = 'text/partytown';
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq?.('init', META_PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

export type MarketingConsent = { marketing?: boolean };

export function applyMarketingConsent(consent: MarketingConsent | undefined | null): void {
  if (consent?.marketing) {
    loadMetaPixel();
  }
}
