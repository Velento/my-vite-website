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

  // The production build ships a prerendered #root (scripts/prerender.mjs):
  // adopt that markup with hydrateRoot so the painted content is not thrown
  // away. In dev, or if prerender was skipped, #root is empty and we fall
  // back to a clean createRoot render.
  if (rootEl.hasChildNodes()) {
    hydrateRoot(rootEl, app);
  } else {
    createRoot(rootEl).render(app);
  }
});
