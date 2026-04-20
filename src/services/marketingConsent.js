const META_PIXEL_ID = '1812191629550140';

let pixelLoaded = false;

function loadMetaPixel() {
  if (pixelLoaded || typeof window === 'undefined') return;
  pixelLoaded = true;

  (function (f, b, e, v) {
    if (f.fbq) return;
    const n = (f.fbq = function (...args) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

export function applyMarketingConsent(consent) {
  if (consent?.marketing) {
    loadMetaPixel();
  }
}
