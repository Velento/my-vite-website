import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import i18n, { initI18n } from './i18n';
import { I18nextProvider } from 'react-i18next';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

initI18n().then(() => {
  const app = (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );

  // The production build ships a prerendered #root rendered in 'ru'
  // (see scripts/prerender.mjs). Hydrate only when the client language
  // matches so React can attach event listeners without re-rendering.
  // Any other language means the text content differs — use createRoot
  // for a clean render and avoid hydration mismatch warnings in console.
  const prerenderedLang = 'ru';
  if (rootEl.hasChildNodes() && i18n.language === prerenderedLang) {
    hydrateRoot(rootEl, app);
  } else {
    createRoot(rootEl).render(app);
  }
});
