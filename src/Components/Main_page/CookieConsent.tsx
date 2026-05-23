import { useState, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';
import { applyMarketingConsent } from '../../services/marketingConsent';
import { applyAnalyticsConsent } from '../../services/analyticsConsent';
import './CookieConsent.css';

const STORAGE_KEY = 'cookieConsent';

type Consent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DECLINED_CONSENT: Consent = { essential: false, analytics: false, marketing: false };

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cookies, setCookies] = useState<Consent>({
    essential: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    let stored: Consent | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as Consent;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    if (stored) {
      setCookies(stored);
      setIsVisible(false);
      applyAnalyticsConsent(stored);
      applyMarketingConsent(stored);
    }
  }, []);

  const persist = (consent: Consent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setCookies(consent);
    setIsVisible(false);
    applyAnalyticsConsent(consent);
    applyMarketingConsent(consent);
  };

  const handleAcceptAll = () => persist({ essential: true, analytics: true, marketing: true });
  const handleAcceptSelected = () => persist(cookies);
  const handleDecline = () => persist(DECLINED_CONSENT);

  const isAcceptButtonDisabled = !cookies.essential && !cookies.analytics && !cookies.marketing;

  if (!isVisible) return null;

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}>
      <aside className="cookie-consent-overlay" aria-label={t('cookieSettings', 'Cookie consent')}>
        <div
          className="cookie-consent"
          role="dialog"
          aria-modal="true"
          aria-label={t('cookieSettings', 'Cookie consent')}
        >
          <button
            type="button"
            className="close-button"
            aria-label={t('feedbackForm.cancel', 'Close')}
            onClick={handleDecline}
          >
            ✕
          </button>
          {!isSettingsOpen ? (
            <>
              <p className="cookie-settings-p">{t('cookieMessage')}</p>
              <button
                type="button"
                className="settings-button"
                onClick={() => setIsSettingsOpen(true)}
              >
                {t('allowMeToChoose')}
              </button>
              <button type="button" className="accept-button" onClick={handleAcceptAll}>
                {t('acceptAll')}
              </button>
              <button type="button" className="decline-button" onClick={handleDecline}>
                {t('decline')}
              </button>
            </>
          ) : (
            <div className="cookie-settings">
              <button
                type="button"
                className="close-button"
                aria-label={t('feedbackForm.cancel', 'Close')}
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
                type="button"
                className="accept-button"
                onClick={handleAcceptSelected}
                disabled={isAcceptButtonDisabled}
              >
                {t('acceptSelected')}
              </button>
              <button type="button" className="decline-button" onClick={handleDecline}>
                {t('decline')}
              </button>
            </div>
          )}
        </div>
      </aside>
    </FocusTrap>
  );
};

export default CookieConsent;
