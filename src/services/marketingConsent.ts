const META_PIXEL_ID = '1812191629550140';

let pixelLoaded = false;

function loadMetaPixel(): void {
  if (pixelLoaded || typeof window === 'undefined') return;
  pixelLoaded = true;
  type FbqShim = {
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    push?: (...args: unknown[]) => void;
    loaded?: boolean;
    version?: string;
  } & ((...args: unknown[]) => void);

  function insertFbqScript(f: unknown, b: Document, e: 'script', v: string) {
    type WExt = Window & { fbq?: unknown; _fbq?: unknown };
    const fExt = f as WExt;
    if (fExt.fbq) return; // runtime check: fbq may exist

    const n = (fExt.fbq = function (...args: unknown[]) {
      const self = arguments.callee as unknown as FbqShim;
      if (self && typeof (self as FbqShim).callMethod === 'function') {
        (self as FbqShim).callMethod!(...args);
      } else {
        (self as FbqShim).queue = (self as FbqShim).queue || [];
        (self as FbqShim).queue!.push(args);
      }
    } as unknown as NonNullable<FbqShim>);

    if (!fExt._fbq) fExt._fbq = n;
    (n as unknown as FbqShim).push = n as unknown as (...args: unknown[]) => void;
    (n as unknown as FbqShim).loaded = true;
    (n as unknown as FbqShim).version = '2.0';
    (n as unknown as FbqShim).queue = (n as unknown as FbqShim).queue || [];

    const t = b.createElement(e);
    t.async = true;
    // Run Meta Pixel inside Partytown's Web Worker so it never blocks the main thread.
    t.type = 'text/partytown';
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  }

  insertFbqScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq?.('init', META_PIXEL_ID);
  window.fbq?.('track', 'PageView');
}

export type MarketingConsent = { marketing?: boolean };

export function applyMarketingConsent(consent: MarketingConsent | undefined | null): void {
  if (consent?.marketing) {
    loadMetaPixel();
  }
}
