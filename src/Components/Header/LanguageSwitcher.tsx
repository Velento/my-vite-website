import { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useTranslation } from 'react-i18next';
import { loadBundle, isSupportedLang, LANG_STORAGE_KEY, type Lang } from '../../i18n';

/** Display order in the dropdown (intentionally differs from the i18n init order). */
const DISPLAY_LANGS: readonly Lang[] = ['ru', 'ua', 'pl', 'en', 'by'];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentLang = (i18n.language ?? 'ru').toLowerCase();

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

  const selectLanguage = async (lang: Lang) => {
    await loadBundle(lang);
    void i18n.changeLanguage(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);

    // Sync URL path so the language is shareable / refresh-safe.
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    if (pathSegments.length && isSupportedLang(pathSegments[0]?.toLowerCase())) {
      pathSegments[0] = lang;
    } else {
      pathSegments.unshift(lang);
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
        <svg
          className="globe-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
        </svg>
        <span className="language-selected__code">{currentLang.toUpperCase()}</span>
        <svg
          className="language-selected__chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {dropdownOpen && (
        <ul className="language-dropdown" role="listbox">
          {DISPLAY_LANGS.map((lang) => (
            <li key={lang} role="option" aria-selected={lang === currentLang}>
              <button type="button" onClick={() => selectLanguage(lang)}>
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
