/**
 * Build-time prerender (static site generation).
 *
 * Builds the server entry, renders the app to a static HTML string, and
 * injects it into the built dist/index.html (and dist/404.html). The browser
 * paints the above-the-fold content before the client JS boots; the client
 * then adopts that markup via hydrateRoot (see src/main.tsx).
 *
 * Fail-safe: any error here falls back to the plain SPA build (empty #root,
 * client-rendered) and still writes 404.html, so the production build never
 * breaks because prerendering hiccuped.
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const DIST_INDEX = resolve(ROOT, 'dist/index.html');
const DIST_404 = resolve(ROOT, 'dist/404.html');
const SSR_DIR = resolve(ROOT, 'dist-ssr');
const ROOT_PLACEHOLDER = '<div id="root"></div>';

async function prerender() {
  // 1. Build the server bundle from src/entry-server.tsx.
  await build({
    build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', copyPublicDir: false },
    logLevel: 'warn',
  });

  // 2. Render the app to a static HTML string.
  const { render } = await import(pathToFileURL(resolve(SSR_DIR, 'entry-server.js')).href);
  const appHtml = await render();
  if (typeof appHtml !== 'string' || appHtml.length === 0) {
    throw new Error('render() returned empty output');
  }

  // 3. Inject the markup into the built shell.
  const template = readFileSync(DIST_INDEX, 'utf-8');
  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`"${ROOT_PLACEHOLDER}" not found in dist/index.html`);
  }
  const html = template.replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`);
  writeFileSync(DIST_INDEX, html);
  writeFileSync(DIST_404, html);
  console.log(`prerender: injected ${appHtml.length} chars into index.html + 404.html`);
}

prerender()
  .catch((err) => {
    // Fail-safe: ship the plain SPA shell so the build still succeeds.
    console.warn('prerender skipped (build stays a client-rendered SPA):', err?.message ?? err);
    try {
      writeFileSync(DIST_404, readFileSync(DIST_INDEX, 'utf-8'));
    } catch (copyErr) {
      console.error('could not write dist/404.html:', copyErr);
      process.exitCode = 1;
    }
  })
  .finally(() => {
    rmSync(SSR_DIR, { recursive: true, force: true });
  });
