import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { applyMarketingConsent } from '../../services/marketingConsent';
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
    let cookieConsent = null;
    try {
      const stored = localStorage.getItem('cookieConsent');
      if (stored) cookieConsent = JSON.parse(stored);
    } catch {
      localStorage.removeItem('cookieConsent');
    }
    if (cookieConsent) {
      setCookies(cookieConsent);
      setIsVisible(false);
      applyMarketingConsent(cookieConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCookies(consent);
    setIsVisible(false);
    applyMarketingConsent(consent);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookies));
    setIsVisible(false);
    applyMarketingConsent(cookies);
  };

  const handleDecline = () => {
    localStorage.removeItem('cookieConsent');
    setIsVisible(false);
  };

  const isAcceptButtonDisabled = !cookies.essential && !cookies.analytics && !cookies.marketing;

  return isVisible ? (
    <aside className="cookie-consent-overlay" aria-label="Cookie consent">
      <div className="cookie-consent">
        <button className="close-button" aria-label="Close" onClick={() => setIsVisible(false)}>
          ✕
        </button>
        {!isSettingsOpen ? (
          <>
            <p className="cookie-settings-p">{t('cookieMessage')}</p>
            <button className="settings-button" onClick={() => setIsSettingsOpen(true)}>
              {t('allowMeToChoose')}
            </button>
            <button className="accept-button" onClick={handleAcceptAll}>
              {t('acceptAll')}
            </button>
            <button className="decline-button" onClick={handleDecline}>
              {t('decline')}
            </button>
          </>
        ) : (
          <div className="cookie-settings">
            <button
              className="close-button"
              aria-label="Close"
              onClick={() => setIsSettingsOpen(false)}
            >
              ✕
            </button>
            <h3>{t('cookieSettings')}</h3>
            <p className="cookie-settings-p">{t('cookieUsageDescription')}</p>
            <div className="cookie-option">
              <label>
                {t('essentialCookies')}
                <input
                  type="checkbox"
                  checked={cookies.essential}
                  onChange={() => setCookies({ ...cookies, essential: !cookies.essential })}
                />
              </label>
            </div>
            <div className="cookie-option">
              <label>
                {t('analyticsCookies')}
                <input
                  type="checkbox"
                  checked={cookies.analytics}
                  onChange={() => setCookies({ ...cookies, analytics: !cookies.analytics })}
                />
              </label>
            </div>
            <div className="cookie-option">
              <label>
                {t('marketingCookies')}
                <input
                  type="checkbox"
                  checked={cookies.marketing}
                  onChange={() => setCookies({ ...cookies, marketing: !cookies.marketing })}
                />
              </label>
            </div>
            <button
              className="accept-button"
              onClick={handleAcceptSelected}
              disabled={isAcceptButtonDisabled}
            >
              {t('acceptSelected')}
            </button>
            <button className="decline-button" onClick={handleDecline}>
              {t('decline')}
            </button>
          </div>
        )}
      </div>
    </aside>
  ) : null;
};

export default CookieConsent;
