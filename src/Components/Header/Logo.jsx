import React from 'react';
import './Header.css';
import logo from '../images/logo_legal_line.png';

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

function Logo() {
  return (
    <div className="header-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
      <img src={logo} alt="Legal Cat Logo" className="logo-image" />
      <div className="logo-text">
        <p className="header-slogan">Живите в Польше легально</p>
      </div>
    </div>
  );
}

export default Logo;
