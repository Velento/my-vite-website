import React from 'react';
import './Header.css';
import Logo from './Logo';
import Contacts from './Contacts';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  return (
    <header className="header">
      <Logo />
      <Contacts />
      <LanguageSwitcher />
    </header>
  );
}

export default Header;

