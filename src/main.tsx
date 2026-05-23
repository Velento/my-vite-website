import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import i18n, { initI18n } from './i18n';
import { I18nextProvider } from 'react-i18next';
import ErrorBoundary from './Components/common/ErrorBoundary';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

initI18n().then(() => {
  const app = (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </I18nextProvider>
    </StrictMode>
  );

  // The production build ships a prerendered #root per language; each page
  // tags <html data-prerender-lang="…"> with the language it was rendered in
  // (see scripts/prerender.mjs). Hydrate only when the detected language
  // matches that snapshot so React attaches listeners without re-rendering;
  // any mismatch means the text differs, so do a clean createRoot render to
  // avoid hydration-mismatch warnings.
  const prerenderedLang = document.documentElement.dataset.prerenderLang;
  if (rootEl.hasChildNodes() && prerenderedLang && i18n.language === prerenderedLang) {
    hydrateRoot(rootEl, app);
  } else {
    createRoot(rootEl).render(app);
  }
});
