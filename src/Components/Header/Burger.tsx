import { useState, useEffect } from 'react';
import Contacts from './Contacts';
import Menu from '../Main_page/Menu';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import ContactModal from '../Main_page/ContactModal';

function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  // Three-span hamburger that morphs into an X. Lines are positioned
  // absolutely so rotation about each span's own centre lands cleanly on
  // the button centre — no SVG transform-origin gymnastics.
  const lineBase =
    'absolute left-1/2 top-1/2 block h-[2px] w-[20px] -translate-x-1/2 rounded-full bg-current transition-transform duration-200 ease-[cubic-bezier(0.65,0,0.35,1)]';

  return (
    <div>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className={[
          'hidden max-md:flex items-center justify-center',
          'absolute right-[var(--content-padding)] top-1/2 -translate-y-1/2',
          'max-[480px]:top-[var(--space-md)] max-[480px]:translate-y-0',
          'z-[1003] h-11 w-11 rounded-[var(--radius-md)] border bg-[var(--color-bg)] p-0',
          'transition-[border-color,background-color,box-shadow] duration-200',
          isOpen
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[0_2px_12px_rgba(184,148,62,0.35)]'
            : 'border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:shadow-[0_2px_12px_rgba(184,148,62,0.2)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
        ].join(' ')}
      >
        <span className="relative block h-[22px] w-[22px]" aria-hidden="true">
          <span
            className={`${lineBase} ${isOpen ? 'rotate-45 -translate-y-px' : '-translate-y-[6px]'}`}
          />
          <span
            className={`${lineBase} ${isOpen ? 'scale-x-0 opacity-0 transition-opacity' : ''}`}
          />
          <span
            className={`${lineBase} ${isOpen ? '-rotate-45 -translate-y-px' : 'translate-y-[5px]'}`}
          />
        </span>
      </button>

      {isOpen && (
        <>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            onClick={toggleMenu}
            className="fixed inset-0 z-[1000] bg-[var(--color-overlay)] animate-[fadeIn_150ms_ease]"
          />
          <div
            className={[
              'fixed right-0 top-0 z-[1001] flex h-screen w-[85%] max-w-[360px] flex-col items-center overflow-y-auto',
              'bg-[var(--color-bg)] px-[var(--space-xl)] pt-[var(--space-4xl)] pb-[var(--space-xl)]',
              'shadow-[var(--shadow-xl)]',
              'transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'translate-x-0',
            ].join(' ')}
          >
            <LanguageSwitcher />
            <Menu vertical />
            <div className="footer-section services">
              <button onClick={() => setShowContactModal(true)}>{t('footer.question')}</button>
              <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} />
            </div>
            <Contacts />
          </div>
        </>
      )}
    </div>
  );
}

export default Burger;
