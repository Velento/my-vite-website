import './Header.css';
import logo from '../images/logo_legal_line.png';
import { useTranslation } from 'react-i18next';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Logo() {
  const { t } = useTranslation();

  return (
    <div className="header-logo-text">
      <button type="button" className="header-logo" onClick={scrollToTop} aria-label={t('seo.h1')}>
        <img src={logo} alt="Legal Line" className="logo-image" />
      </button>
      <div className="logo-text" />
    </div>
  );
}

export default Logo;
