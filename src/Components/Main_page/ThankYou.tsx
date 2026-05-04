import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';

type ThankYouProps = {
  name: string;
  onClose: () => void;
};

const ThankYou = ({ name, onClose }: ThankYouProps) => {
  const { t } = useTranslation();

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="fixed inset-0 z-[1200] flex items-center justify-center bg-[var(--color-overlay)] backdrop-blur-md animate-[fadeIn_150ms_ease]"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="dialog"
        aria-modal="true"
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          className="relative w-[90%] max-w-[400px] rounded-[var(--radius-lg)] bg-[var(--color-bg)] px-[var(--space-2xl)] py-[var(--space-3xl)] text-center shadow-[var(--shadow-xl)] animate-[thankYouPop_350ms_ease] max-[480px]:w-[92%] max-[480px]:px-[var(--space-lg)] max-[480px]:py-[var(--space-xl)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-[var(--space-md)] right-[var(--space-md)] flex h-9 w-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-[1.3rem] leading-none text-[var(--color-text-tertiary)] transition-colors duration-150 hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text)]"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h3 className="mb-[var(--space-md)] truncate font-[var(--font-heading)] text-[1.35rem] font-semibold text-[var(--color-primary)]">
            {t('textThankYou')}, {name}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {t('textThank')}
          </p>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ThankYou;
