import './Header.css';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import Contacts from './Contacts';
import LanguageSwitcher from './LanguageSwitcher';
import Burger from './Burger';
import { trackContactClick } from '../../services/analytics';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="header">
      <Logo />
      <div className="header-center">
        <a
          href="tel:+48883734171"
          className="header-phone-cta"
          aria-label={t('header.callAriaLabel', 'Call us')}
          onClick={() => trackContactClick('phone')}
        >
          <span className="header-phone-cta__label">
            {t('header.callLabel', 'Free consultation')}
          </span>
          <span className="header-phone-cta__number">
            <svg
              className="header-phone-cta__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +48 883 734 171
          </span>
        </a>
      </div>
      <div className="header-right">
        <Contacts />
        <LanguageSwitcher />
        <Burger />
      </div>
    </header>
  );
}

export default Header;
