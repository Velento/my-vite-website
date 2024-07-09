import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // Подключаем конфигурацию i18n
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CookieConsent from './Components/Main_page/CookieConsent'; // импортируем новый компонент
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <I18nextProvider i18n={i18n}>
        <App />
        <CookieConsent /> {/* подключаем компонент */}
      </I18nextProvider>
    </CookiesProvider>
  </React.StrictMode>
);


