import React, { useState } from 'react';
import './Header.css';
import globeIcon from '../images/globe.png';

function LanguageSwitcher() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('RU');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <div className="header-language-switcher">
      <div className="language-selected" onClick={toggleDropdown}>
        <img src={globeIcon} alt="Globe" className="globe-icon" />
        {selectedLanguage}
      </div>
      {dropdownOpen && (
        <ul className="language-dropdown">
          <li onClick={() => selectLanguage('RU')}>RU</li>
          <li onClick={() => selectLanguage('UA')}>UA</li>
          <li onClick={() => selectLanguage('PL')}>PL</li>
          <li onClick={() => selectLanguage('EN')}>EN</li>
        </ul>
      )}
        <a href="#footer" className="contact-link">Контакты</a>
    </div>
  );
}

export default LanguageSwitcher;
