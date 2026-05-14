import { useState, useEffect, useCallback } from 'react';
import FocusTrap from 'focus-trap-react';
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
  const open = useCallback(() => setIsOpen(true), []);

  return (
    <div>
      {/* Hamburger button — only visible when closed. When the panel is open
          it gets its own X button inside, so we don't have to fight z-index
          with the slide-in panel underneath. */}
      {!isOpen && (
        <button
          type="button"
          onClick={open}
          aria-label={t('header.menu', 'Menu')}
          aria-expanded={false}
          className={[
            'hidden max-md:flex items-center justify-center',
            'absolute right-[var(--content-padding)] top-1/2 -translate-y-1/2',
            'max-[480px]:top-[var(--space-md)] max-[480px]:translate-y-0',
            'z-[1003] h-11 w-11 rounded-[var(--radius-md)] border bg-[var(--color-bg)] p-0',
            'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-[0_2px_12px_rgba(184,148,62,0.2)]',
            'transition-[border-color,box-shadow,transform] duration-200',
            'active:scale-95',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
          ].join(' ')}
        >
          <span className="relative block h-[22px] w-[22px]" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[20px] -translate-x-1/2 -translate-y-[6px] rounded-full bg-[var(--color-text)]" />
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[20px] -translate-x-1/2 rounded-full bg-[var(--color-text)]" />
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[20px] -translate-x-1/2 translate-y-[5px] rounded-full bg-[var(--color-text)]" />
          </span>
        </button>
      )}

      {isOpen && (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div
              onClick={close}
              className="fixed inset-0 z-[1000] bg-[var(--color-overlay)] backdrop-blur-sm animate-[fadeIn_200ms_ease]"
            />
            <aside
              className={[
                'fixed right-0 top-0 z-[1001] flex h-[100dvh] w-full max-w-[400px] flex-col overflow-y-auto',
                'bg-[var(--color-bg)] shadow-[var(--shadow-xl)]',
                'animate-[slideInRight_320ms_cubic-bezier(0.32,0.72,0,1)]',
              ].join(' ')}
              role="dialog"
              aria-modal="true"
              aria-label={t('header.menu', 'Menu')}
            >
              {/* Header strip — brand + close X */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-light)] bg-[var(--color-bg-alt)] px-6 py-4">
                <span className="font-[var(--font-heading)] text-[1.05rem] font-bold tracking-[0.18em] text-[var(--color-primary)]">
                  LEGAL&nbsp;LINE
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t('feedbackForm.cancel', 'Close')}
                  className={[
                    'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-primary)]',
                    'transition-[border-color,background-color,color,transform] duration-200',
                    'hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:shadow-[0_2px_12px_rgba(184,148,62,0.35)]',
                    'active:scale-95',
                  ].join(' ')}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Language switcher row */}
              <div className="flex items-center justify-center border-b border-[var(--color-border-light)] px-6 py-3">
                <LanguageSwitcher />
              </div>

              {/* Menu — main scrollable area */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <Menu vertical onItemClick={close} />
              </div>

              {/* Sticky CTA + contacts at the bottom */}
              <div className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-alt)] px-6 py-5">
                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="burger-cta"
                >
                  {t('footer.question')}
                </button>
                <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} />
                <div className="mt-4 flex items-center justify-center">
                  <Contacts />
                </div>
              </div>
            </aside>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}

export default Burger;
