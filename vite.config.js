import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

/**
 * Content-Security-Policy for the production build.
 *
 * GitHub Pages serves static files and cannot set HTTP response headers, so the
 * policy is delivered as a <meta http-equiv> tag instead (injected below). Two
 * consequences of the meta delivery worth knowing:
 *   - `frame-ancestors` (clickjacking) and `report-uri` are ignored in meta and
 *     are therefore omitted; they would only work as a real header.
 *   - The policy must sit as early as possible, so it is anchored right after
 *     <meta charset> (see securityMetaPlugin).
 *
 * `'unsafe-inline'` + `'unsafe-eval'` are unavoidable for this stack: Partytown
 * runs the third-party tags (gtag, fbq, GTM) inside a worker via eval, and
 * index.html ships two tiny inline bootstrap scripts (dataLayer + Partytown
 * config). Every allow-listed host below maps to code that actually runs:
 * googletagmanager/ads/analytics + doubleclick (GTM, Google Ads conversions),
 * connect.facebook.net + *.facebook.com (Meta Pixel), *.hcaptcha.com (captcha),
 * www.google.com/maps (the click-to-load Maps facade), *.workers.dev (the form
 * proxy Worker) and api.telegram.org (direct fallback when no proxy is set).
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-src https://www.google.com https://maps.google.com https://hcaptcha.com https://*.hcaptcha.com https://td.doubleclick.net https://bid.g.doubleclick.net",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline' https://*.hcaptcha.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "media-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google-analytics.com https://www.google.com https://connect.facebook.net https://hcaptcha.com https://*.hcaptcha.com",
  "connect-src 'self' https://api.telegram.org https://*.workers.dev https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://connect.facebook.net https://*.facebook.com https://hcaptcha.com https://*.hcaptcha.com",
  'upgrade-insecure-requests',
].join('; ');

const CHARSET_TAG = '<meta charset="UTF-8" />';

/**
 * Injects the CSP + Referrer-Policy meta tags into the built index.html only
 * (`apply: 'build'`). Kept out of `vite dev` on purpose: an enforcing CSP would
 * block the HMR websocket and Vite's eval-based client. Anchored immediately
 * after <meta charset> so the charset declaration stays within the first 1024
 * bytes the HTML parser requires.
 */
function securityMetaPlugin() {
  return {
    name: 'legalline-security-meta',
    apply: 'build',
    transformIndexHtml(html) {
      if (!html.includes(CHARSET_TAG)) return html;
      const meta =
        `${CHARSET_TAG}\n` +
        `    <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n` +
        `    <meta name="referrer" content="strict-origin-when-cross-origin" />`;
      return html.replace(CHARSET_TAG, meta);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
          'removeDimensions',
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      // Inline the tiny SW-registration snippet instead of emitting a separate
      // /registerSW.js — that external script was render-blocking on the
      // critical path. Inline = no extra request, no blocking.
      injectRegister: 'inline',
      includeAssets: ['og-image.jpg', '~partytown/*.js'],
      manifestFilename: 'manifest.webmanifest',
      // We already ship a hand-written public/manifest.webmanifest — re-declare
      // the same fields here so the generated SW knows what app shell to cache.
      manifest: {
        name: 'Legal Line — Legalizacja w Gdańsku',
        short_name: 'Legal Line',
        description: 'Pomoc z kartą pobytu, legalizacją i dokumentami w Gdańsku.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#1a2332',
        background_color: '#ffffff',
        lang: 'pl',
        icons: [
          { src: '/favicon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache built assets aggressively, HTML stays network-first so we can
        // ship updates fast without users hanging onto stale shells.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/privacy\.html$/, /^\/error-404\.html$/, /^\/~partytown\//],
        globPatterns: ['**/*.{js,css,html,svg,jpg,jpeg,png,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          {
            urlPattern: /\/assets\/.*\.(?:js|css|woff2)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Telegram Bot API + form proxy — never cache these (they mutate state).
            urlPattern: /(api\.telegram\.org|workers\.dev)/,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
    securityMetaPlugin(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Strip console.* and debugger from production bundles. Vite uses esbuild for
  // minification by default; this drops the symbols at minify time too.
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }
            // Form libs (react-hook-form, zod, hcaptcha) only load when
            // ContactModal opens — keep them out of the initial bundle.
            if (
              id.includes('react-hook-form') ||
              id.includes('@hookform') ||
              id.includes('/zod/') ||
              id.includes('hcaptcha')
            ) {
              return 'vendor-forms';
            }
            if (id.includes('focus-trap') || id.includes('tabbable')) {
              return 'vendor-focus-trap';
            }
          }
        },
      },
    },
  },
});
