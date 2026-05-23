import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackContactClick } from '../../services/analytics';
import { PHONE_HREF, WHATSAPP_HREF } from '../../constants/contact';
import { scrollToTop, scrollToElement } from '../../utils/scroll';
import './StickyMobileBar.css';

const SCROLL_THRESHOLD_PX = 380;

const StickyMobileBar = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToElement('leedform');
  };

  return (
    <nav
      className={`sticky-mobile-bar ${visible ? 'sticky-mobile-bar--visible' : ''}`}
      aria-label={t('stickyBar.label', 'Szybki kontakt')}
      aria-hidden={!visible}
    >
      <a
        href={PHONE_HREF}
        className="sticky-mobile-bar__btn"
        onClick={() => trackContactClick('phone')}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
          />
        </svg>
        <span>{t('stickyBar.call', 'Zadzwoń')}</span>
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-mobile-bar__btn"
        onClick={() => trackContactClick('whatsapp')}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.13 1.6 5.93L.05 24l6.36-1.66a11.88 11.88 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88a11.82 11.82 0 0 0-3.42-8.41M12.06 21.79h-.01a9.87 9.87 0 0 1-5.02-1.38l-.36-.21-3.75.99 1-3.65-.23-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.43 9.87-9.89 9.87m5.4-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17 0-.37 0-.57 0-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35"
          />
        </svg>
        <span>WhatsApp</span>
      </a>
      <a
        href="#leedform"
        className="sticky-mobile-bar__btn sticky-mobile-bar__btn--primary"
        onClick={scrollToForm}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm4 3h10v2H7V8Zm0 4h10v2H7v-2Zm0 4h7v2H7v-2Z"
          />
        </svg>
        <span>{t('stickyBar.form', 'Formularz')}</span>
      </a>
      <button
        type="button"
        className="sticky-mobile-bar__btn sticky-mobile-bar__btn--up"
        onClick={scrollToTop}
        aria-label={t('stickyBar.up', 'Do góry')}
        tabIndex={visible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 14l6-6 6 6"
          />
        </svg>
        <span>{t('stickyBar.up', 'Do góry')}</span>
      </button>
    </nav>
  );
};

export default StickyMobileBar;
