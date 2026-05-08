const META_PIXEL_ID = '1812191629550140';

let pixelLoaded = false;

function loadMetaPixel(): void {
  if (pixelLoaded || typeof window === 'undefined') return;
  pixelLoaded = true;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  function insertFbqScript(f: Window & any, b: Document, e: 'script', v: string) {
    if (f.fbq) return;
    const n = (f.fbq = function (...args: unknown[]) {
      if ((n as any).callMethod) {
        (n as any).callMethod(...args);
      } else {
        (n as any).queue.push(args);
      }
    } as any) as NonNullable<Window['fbq']>;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    (n as any).queue = [];
    const t = b.createElement(e);
    t.async = true;
    // Run Meta Pixel inside Partytown's Web Worker so it never blocks the main thread.
    t.type = 'text/partytown';
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  }

  insertFbqScript(window as unknown as Window & any, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable @typescript-eslint/no-explicit-any */

  window.fbq?.('init', META_PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

export type MarketingConsent = { marketing?: boolean };

export function applyMarketingConsent(consent: MarketingConsent | undefined | null): void {
  if (consent?.marketing) {
    loadMetaPixel();
  }
}
