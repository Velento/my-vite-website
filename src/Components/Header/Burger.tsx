import { useState, useEffect, useCallback } from 'react';
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

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  // Each line is positioned at the centre of the icon; rotation around its own
  // centre makes the hamburger ↔ X morph land cleanly.
  const lineBase =
    'absolute left-1/2 top-1/2 block h-[2px] w-[20px] -translate-x-1/2 rounded-full transition-transform duration-200 ease-[cubic-bezier(0.65,0,0.35,1)]';

  // Line colour follows button state — darker on the resting (white) button,
  // pure white on the open (gold) button. We set it explicitly per-span instead
  // of relying on bg-current so the colour is robust against any cascade.
  const lineColor = isOpen ? 'bg-white' : 'bg-[var(--color-text)]';

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className={[
          'hidden max-md:flex items-center justify-center',
          'absolute right-[var(--content-padding)] top-1/2 -translate-y-1/2',
          'max-[480px]:top-[var(--space-md)] max-[480px]:translate-y-0',
          'z-[1003] h-11 w-11 rounded-[var(--radius-md)] border bg-[var(--color-bg)] p-0',
          'transition-[border-color,background-color,box-shadow,transform] duration-200',
          'active:scale-95',
          isOpen
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_2px_12px_rgba(184,148,62,0.45)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-[0_2px_12px_rgba(184,148,62,0.2)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
        ].join(' ')}
      >
        <span className="relative block h-[22px] w-[22px]" aria-hidden="true">
          <span
            className={`${lineBase} ${lineColor} ${
              isOpen ? 'rotate-45 -translate-y-px' : '-translate-y-[6px]'
            }`}
          />
          <span
            className={`${lineBase} ${lineColor} ${
              isOpen ? 'scale-x-0 opacity-0 transition-opacity' : ''
            }`}
          />
          <span
            className={`${lineBase} ${lineColor} ${
              isOpen ? '-rotate-45 -translate-y-px' : 'translate-y-[5px]'
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            onClick={close}
            className="fixed inset-0 z-[1000] bg-[var(--color-overlay)] backdrop-blur-sm animate-[fadeIn_150ms_ease]"
          />
          <aside
            className={[
              'fixed right-0 top-0 z-[1001] flex h-screen w-[88%] max-w-[380px] flex-col overflow-y-auto',
              'bg-[var(--color-bg)] shadow-[var(--shadow-xl)]',
              'animate-[slideInRight_300ms_cubic-bezier(0.32,0.72,0,1)]',
            ].join(' ')}
          >
            {/* Header strip with brand mark and close affordance hint */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-light)] px-6 py-5">
              <span className="font-[var(--font-heading)] text-[1.1rem] font-bold tracking-[0.15em] text-[var(--color-primary)]">
                LEGAL LINE
              </span>
              <span className="text-[0.7rem] uppercase tracking-wider text-[var(--color-text-tertiary)]">
                {t('header.menu', 'Menu')}
              </span>
            </div>

            <div className="flex flex-col gap-6 px-4 py-6">
              <div className="flex items-center justify-center">
                <LanguageSwitcher />
              </div>
              <Menu vertical onItemClick={close} />
            </div>

            <div className="mt-auto flex flex-col gap-4 border-t border-[var(--color-border-light)] px-6 py-6">
              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="w-full rounded-md bg-[var(--color-accent)] px-6 py-3 text-[0.9rem] font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(184,148,62,0.3)] transition-all duration-200 hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(184,148,62,0.4)] active:translate-y-0"
              >
                {t('footer.question')}
              </button>
              <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} />
              <div className="flex items-center justify-center">
                <Contacts />
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

export default Burger;
