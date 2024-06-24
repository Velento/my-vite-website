
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
    <div className="header-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
      <img src={logo} alt="Legal Cat Logo" className="logo-image" />
      <div className="logo-text">
        <p className="header-slogan">{t('header.slogan')}</p>
      </div>
    </div>
  );
}

export default Logo;
