/**
 * Server entry — used only at build time by scripts/prerender.mjs.
 *
 * Renders the app to a static HTML string so the browser can paint the
 * above-the-fold content before the client JS boots. The snapshot is rendered
 * in the fallback language ('ru'); on boot the client hydrates it with
 * `hydrateRoot` when the detected language matches, otherwise it does a clean
 * `createRoot` render (see src/main.tsx) — either way no hydration mismatch.
 *
 * i18n is initialised synchronously with the fallback-language bundle.
 */

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import App from './App';
import ruLocale from './i18n/locales/ru';

let initialized = false;

export async function render(): Promise<string> {
  if (!initialized) {
    await i18n.use(initReactI18next).init({
      resources: { ru: { translation: ruLocale as Record<string, unknown> } },
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: { escapeValue: false },
    });
    initialized = true;
  }

  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );
}
