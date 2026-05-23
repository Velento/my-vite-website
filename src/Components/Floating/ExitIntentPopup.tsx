import { useEffect, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';
import { trackContactClick, trackCTAClick, trackPopupShown } from '../../services/analytics';
import { WHATSAPP_HREF } from '../../constants/contact';
import { scrollToElement } from '../../utils/scroll';
import CloseIcon from '../common/CloseIcon';
import './ExitIntentPopup.css';

const STORAGE_KEY = 'll_exit_intent_seen_v1';
const MIN_TIME_ON_PAGE_MS = 8000;
const DESKTOP_QUERY = '(min-width: 1024px)';

const ExitIntentPopup = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return undefined;
    } catch {
      // sessionStorage blocked — popup will still respect the per-mount once-only flag.
    }
    if (!window.matchMedia(DESKTOP_QUERY).matches) return undefined;

    const startTime = Date.now();
    let fired = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (fired) return;
      if (e.clientY > 0) return;
      if (Date.now() - startTime < MIN_TIME_ON_PAGE_MS) return;
      fired = true;
      setOpen(true);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // Best-effort persistence.
      }
      trackPopupShown('exit_intent');
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTAClick('exit_popup_fill_form');
    close();
    scrollToElement('leedform');
  };

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      <div
        className="exit-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
      >
        <button
          className="exit-popup__backdrop"
          type="button"
          onClick={close}
          aria-label={t('exitPopup.close', 'Zamknij')}
        />
        <div className="exit-popup__card">
          <button
            className="exit-popup__close"
            type="button"
            onClick={close}
            aria-label={t('exitPopup.close', 'Zamknij')}
          >
            <CloseIcon />
          </button>
          <span className="exit-popup__badge">{t('exitPopup.badge', 'Czekaj!')}</span>
          <h2 id="exit-popup-title" className="exit-popup__title">
            {t('exitPopup.title', 'Bezpłatna konsultacja')}
          </h2>
          <p className="exit-popup__text">
            {t(
              'exitPopup.text',
              'Zostaw kontakt — oddzwonimy w ciągu 30 minut i wycenimy Twoją sprawę za darmo.'
            )}
          </p>
          <ul className="exit-popup__perks">
            <li>{t('exitPopup.perk1', 'Pierwsza konsultacja — bezpłatna')}</li>
            <li>{t('exitPopup.perk2', 'Karta pobytu już od 750 PLN')}</li>
            <li>{t('exitPopup.perk3', 'Gwarancja zwrotu pieniędzy')}</li>
          </ul>
          <div className="exit-popup__ctas">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="exit-popup__cta exit-popup__cta--primary"
              onClick={() => {
                trackContactClick('whatsapp');
                close();
              }}
            >
              {t('exitPopup.ctaWhatsApp', 'Napisz na WhatsApp')}
            </a>
            <a
              href="#leedform"
              className="exit-popup__cta exit-popup__cta--ghost"
              onClick={scrollToForm}
            >
              {t('exitPopup.ctaForm', 'Wypełnij formularz')}
            </a>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ExitIntentPopup;
