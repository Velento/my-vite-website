import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const CookieConsent = lazy(() => import('./Components/Main_page/CookieConsent'));

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);
