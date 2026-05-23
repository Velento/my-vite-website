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

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Replace the content="" of a <meta> (works across the multi-line tags in index.html). */
function setMetaContent(html, attr, name, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, 's');
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

/** Build a FAQPage JSON-LD <script> from the localised Q&A pairs. */
function faqJsonLd(faq) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  // Escape `<` so the payload can never break out of the <script> element.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

function buildPage(template, { appHtml, lang, path, title, description, faq }) {
  const canonical = `${SITE}${path}`;
  let html = template
    .replace(ROOT_PLACEHOLDER, `<div id="root">${appHtml}</div>`)
    .replace(/(<html\b[^>]*?\blang=")[^"]*"/, `$1${HTML_LANG[lang]}"`)
    .replace(/<html\b/, `<html data-prerender-lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`)
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

  // Localise the description + social titles/descriptions per language.
  html = setMetaContent(html, 'name', 'description', description);
  html = setMetaContent(html, 'property', 'og:title', title);
  html = setMetaContent(html, 'property', 'og:description', description);
  html = setMetaContent(html, 'name', 'twitter:title', title);
  html = setMetaContent(html, 'name', 'twitter:description', description);

  // Inject a per-language FAQPage schema just before </head>.
  if (faq?.length) {
    html = html.replace('</head>', `${faqJsonLd(faq)}\n  </head>`);
  }
  return html;
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
  const root = await render('ru');
  if (!root.html) {
    throw new Error('render() returned empty output');
  }
  const rootPage = buildPage(template, {
    appHtml: root.html,
    lang: 'ru',
    path: '/',
    title: root.title,
    description: root.description,
    faq: root.faq,
  });
  writeFileSync(DIST_INDEX, rootPage);
  writeFileSync(DIST_404, rootPage);

  // 5. One translated page per language at /<lang>/index.html.
  for (const lang of PRERENDER_LANGS) {
    const { html, title, description, faq } = await render(lang);
    if (!html) {
      throw new Error(`render(${lang}) returned empty output`);
    }
    const dir = resolve(DIST, lang);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      resolve(dir, 'index.html'),
      buildPage(template, { appHtml: html, lang, path: `/${lang}/`, title, description, faq })
    );
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
