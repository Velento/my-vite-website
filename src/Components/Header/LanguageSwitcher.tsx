import { useState, useEffect, useRef } from 'react';
import './Header.css';
import globeIcon from '../images/globe.png';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['RU', 'UA', 'PL', 'EN', 'BY'] as const;
const STORAGE_KEY = 'legal_line_lang';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentLang = (i18n.language ?? 'ru').toUpperCase();

  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const handlePointer = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [dropdownOpen]);

  const selectLanguage = (lang: string) => {
    const lower = lang.toLowerCase();
    i18n.changeLanguage(lower);
    localStorage.setItem(STORAGE_KEY, lower);

    // Sync URL path so the language is shareable / refresh-safe.
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const langs = ['ru', 'pl', 'ua', 'en', 'by'];
    if (pathSegments.length && langs.includes(pathSegments[0]?.toLowerCase() ?? '')) {
      pathSegments[0] = lower;
    } else {
      pathSegments.unshift(lower);
    }
    url.pathname = '/' + pathSegments.join('/') + '/';
    window.history.pushState({}, '', url);

    setDropdownOpen(false);
  };

  return (
    <div className="header-language-switcher" ref={containerRef}>
      <button
        type="button"
        className="language-selected"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        aria-label={t('header.switchLanguage', 'Switch language')}
      >
        <img src={globeIcon} alt="" className="globe-icon" aria-hidden="true" />
        {currentLang}
      </button>
      {dropdownOpen && (
        <ul className="language-dropdown" role="listbox">
          {SUPPORTED_LANGS.map((lang) => (
            <li key={lang} role="option" aria-selected={lang === currentLang}>
              <button type="button" onClick={() => selectLanguage(lang)}>
                {lang}
              </button>
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
