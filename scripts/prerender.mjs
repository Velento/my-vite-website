/**
 * Build-time prerender (static site generation), per language.
 *
 * Builds the server entry, renders the app to a static HTML string for each
 * supported language, and writes:
 *   - dist/index.html        → root (/), default language (ru), x-default
 *   - dist/404.html          → SPA fallback (same as root)
 *   - dist/<lang>/index.html → translated page with per-language <html lang>,
 *                              canonical, og:url and og:locale
 *
 * Each page carries `data-prerender-lang` on <html> so the client can hydrate
 * in place when the detected language matches (see src/main.tsx).
 *
 * Fail-safe: any error here falls back to the plain SPA build (empty #root,
 * client-rendered) and still writes 404.html, so the production build never
 * breaks because prerendering hiccuped.
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const DIST = resolve(ROOT, 'dist');
const DIST_INDEX = resolve(DIST, 'index.html');
const DIST_404 = resolve(DIST, '404.html');
const SSR_DIR = resolve(ROOT, 'dist-ssr');
const ROOT_PLACEHOLDER = '<div id="root"></div>';
const SITE = 'https://legalline.pl';

// Mirror src/i18n.ts htmlLangFor() — ua→uk, by→be, others unchanged.
const HTML_LANG = { ru: 'ru', pl: 'pl', ua: 'uk', en: 'en', by: 'be' };
const OG_LOCALE = { ru: 'ru_RU', pl: 'pl_PL', ua: 'uk_UA', en: 'en_US', by: 'be_BY' };

function buildPage(template, { appHtml, lang, path }) {
  const canonical = `${SITE}${path}`;
  return template
    .replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`)
    .replace(/(<html\b[^>]*?\blang=")[^"]*"/, `$1${HTML_LANG[lang]}"`)
    .replace(/<html\b/, `<html data-prerender-lang="${lang}"`)
    .replace(
      '<link rel="canonical" href="https://legalline.pl/" />',
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      '<meta property="og:url" content="https://legalline.pl/" />',
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      '<meta property="og:locale" content="pl_PL" />',
      `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`
    );
}

async function prerender() {
  // 1. Build the server bundle from src/entry-server.tsx.
  await build({
    build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', copyPublicDir: false },
    logLevel: 'warn',
  });

  // 2. Load the rendered + the language list.
  const { render, PRERENDER_LANGS } = await import(
    pathToFileURL(resolve(SSR_DIR, 'entry-server.js')).href
  );

  // 3. Read the built shell once; buildPage() never mutates it.
  const template = readFileSync(DIST_INDEX, 'utf-8');
  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`"${ROOT_PLACEHOLDER}" not found in dist/index.html`);
  }

  // 4. Root (/) + SPA fallback — default language.
  const rootHtml = await render('ru');
  if (typeof rootHtml !== 'string' || rootHtml.length === 0) {
    throw new Error('render() returned empty output');
  }
  const rootPage = buildPage(template, { appHtml: rootHtml, lang: 'ru', path: '/' });
  writeFileSync(DIST_INDEX, rootPage);
  writeFileSync(DIST_404, rootPage);

  // 5. One translated page per language at /<lang>/index.html.
  for (const lang of PRERENDER_LANGS) {
    const appHtml = await render(lang);
    if (typeof appHtml !== 'string' || appHtml.length === 0) {
      throw new Error(`render(${lang}) returned empty output`);
    }
    const dir = resolve(DIST, lang);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), buildPage(template, { appHtml, lang, path: `/${lang}/` }));
  }

  console.log(
    `prerender: wrote / + 404 + ${PRERENDER_LANGS.length} language pages (${PRERENDER_LANGS.join(', ')})`
  );
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
