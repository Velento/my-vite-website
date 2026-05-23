/**
 * Server entry — used only at build time by scripts/prerender.mjs.
 *
 * Renders the app to a static HTML string per supported language so the browser
 * (and crawlers) get above-the-fold content in the right language before the
 * client JS boots. The client adopts the markup via `hydrateRoot` when the
 * detected language matches the page's `data-prerender-lang`, otherwise it does
 * a clean `createRoot` render (see src/main.tsx).
 *
 * All locale bundles are loaded once into the i18next singleton; each call to
 * `render(lng)` switches the active language before serialising.
 */

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import App from './App';
import ru from './i18n/locales/ru';
import pl from './i18n/locales/pl';
import ua from './i18n/locales/ua';
import en from './i18n/locales/en';
import by from './i18n/locales/by';

const locales = { ru, pl, ua, en, by };
export type PrerenderLang = keyof typeof locales;
export const PRERENDER_LANGS = Object.keys(locales) as PrerenderLang[];

export type RenderResult = {
  /** Serialised app markup for the #root container. */
  html: string;
  /** Localised <title>. */
  title: string;
  /** Localised meta description. */
  description: string;
};

let initialized = false;

async function ensureLanguage(lng: PrerenderLang): Promise<void> {
  if (!initialized) {
    await i18n.use(initReactI18next).init({
      resources: Object.fromEntries(
        Object.entries(locales).map(([key, value]) => [
          key,
          { translation: value as Record<string, unknown> },
        ])
      ),
      lng,
      fallbackLng: 'ru',
      interpolation: { escapeValue: false },
    });
    initialized = true;
  } else {
    await i18n.changeLanguage(lng);
  }
}

export async function render(lng: PrerenderLang = 'ru'): Promise<RenderResult> {
  await ensureLanguage(lng);

  const html = renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );

  return {
    html,
    title: i18n.t('seo.title'),
    description: i18n.t('seo.description'),
  };
}
