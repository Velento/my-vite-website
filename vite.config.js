import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

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
          { src: '/og-image.jpg', sizes: '192x192', type: 'image/jpeg', purpose: 'any' },
          { src: '/og-image.jpg', sizes: '512x512', type: 'image/jpeg', purpose: 'any' },
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
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
          }
        },
      },
    },
  },
});
