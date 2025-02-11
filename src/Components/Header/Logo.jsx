
// src/Components/Logo.jsx
import React from 'react';
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
    <div className="header-logo" onClick={scrollToTop}>
      <img src={logo} alt="Legal Logo" className="logo-image" />
    </div>
    <div className="logo-text">
    {/* <h1 className="header-slogan">{t('header.slogan')}</h1> */}
    </div>
    </div>
  );
}

export default Logo;
