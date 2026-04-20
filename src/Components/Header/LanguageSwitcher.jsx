import { useState, useEffect } from 'react';
import './Header.css';
import globeIcon from '../images/globe.png';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['RU', 'UA', 'PL', 'EN', 'BY'];
const STORAGE_KEY = 'legal_line_lang';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Берём язык из i18n (он уже инициализирован с учётом localStorage в i18n.js)
  const currentLang = (i18n.language ?? 'ru').toUpperCase();

  // Закрываем дропдаун при клике вне него
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [dropdownOpen]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const selectLanguage = (lang) => {
    const lower = lang.toLowerCase();
    i18n.changeLanguage(lower);
    localStorage.setItem(STORAGE_KEY, lower); // Сохраняем для следующей сессии
    setDropdownOpen(false);
  };

  return (
    <div className="header-language-switcher">
      <div
        className="language-selected"
        onClick={toggleDropdown}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        aria-label={t('header.switchLanguage', 'Switch language')}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown(e);
          }
        }}
      >
        <img src={globeIcon} alt="" className="globe-icon" aria-hidden="true" />
        {currentLang}
      </div>
      {dropdownOpen && (
        <ul className="language-dropdown" role="listbox">
          {SUPPORTED_LANGS.map((lang) => (
            <li
              key={lang}
              onClick={() => selectLanguage(lang)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectLanguage(lang);
                }
              }}
              role="option"
              aria-selected={lang === currentLang}
              tabIndex={0}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
      <a href="#footer" className="contact-link-infooter">
        {t('header.contacts')}
      </a>
    </div>
  );
}

export default LanguageSwitcher;
