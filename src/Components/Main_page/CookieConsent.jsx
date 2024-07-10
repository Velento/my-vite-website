import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CookieConsent.css';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cookies, setCookies] = useState({
    essential: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Проверяем наличие сохраненного согласия в localStorage
    const cookieConsent = JSON.parse(localStorage.getItem('cookieConsent'));
    if (cookieConsent) {
      setCookies(cookieConsent);
      setIsVisible(false); // Скрываем окно, если согласие уже было сохранено
    }
  }, []);

  const handleAcceptAll = () => {
    // Сохранение согласия на использование всех файлов cookie в localStorage
    localStorage.setItem('cookieConsent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
    }));
    setCookies({
      essential: true,
      analytics: true,
      marketing: true,
    });
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    // Сохранение согласия на использование выбранных файлов cookie в localStorage
    localStorage.setItem('cookieConsent', JSON.stringify(cookies));
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Удаление согласия на использование файлов cookie из localStorage
    localStorage.removeItem('cookieConsent');
    setIsVisible(false);
  };

  const isAcceptButtonDisabled = !cookies.essential && !cookies.analytics && !cookies.marketing;

  return isVisible ? (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent">
        <button className="close-button" onClick={() => setIsVisible(false)}>✕</button>
        {!isSettingsOpen ? (
          <>
            <p className="cookie-settings-p">{t('cookieMessage')}</p>
            <button className="settings-button" onClick={() => setIsSettingsOpen(true)}>{t('allowMeToChoose')}</button>
            <button className="accept-button" onClick={handleAcceptAll}>{t('acceptAll')}</button>
            <button className="decline-button" onClick={handleDecline}>{t('decline')}</button>
          </>
        ) : (
          <div className="cookie-settings">
            <button className="close-button" onClick={() => setIsSettingsOpen(false)}>✕</button>
            <h3>{t('cookieSettings')}</h3>
            <p className="cookie-settings-p">{t('cookieUsageDescription')}</p>
            <div className="cookie-option">
              <label>
                {t('essentialCookies')}
                <input type="checkbox" checked={cookies.essential} onChange={() => setCookies({ ...cookies, essential: !cookies.essential })} />
              </label>
            </div>
            <div className="cookie-option">
              <label>
                {t('analyticsCookies')}
                <input type="checkbox" checked={cookies.analytics} onChange={() => setCookies({ ...cookies, analytics: !cookies.analytics })} />
              </label>
            </div>
            <div className="cookie-option">
              <label>
                {t('marketingCookies')}
                <input type="checkbox" checked={cookies.marketing} onChange={() => setCookies({ ...cookies, marketing: !cookies.marketing })} />
              </label>
            </div>
            <button className="accept-button" onClick={handleAcceptSelected} disabled={isAcceptButtonDisabled}>{t('acceptSelected')}</button>
            <button className="decline-button" onClick={handleDecline}>{t('decline')}</button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CookieConsent;


