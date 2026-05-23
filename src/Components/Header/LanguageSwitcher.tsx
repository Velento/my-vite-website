import { useState, useEffect, useRef } from 'react';
import './Header.css';
import globeIcon from '../images/globe.png';
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
        <img
          src={globeIcon}
          alt=""
          className="globe-icon"
          width={22}
          height={22}
          decoding="async"
          aria-hidden="true"
        />
        {currentLang.toUpperCase()}
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
