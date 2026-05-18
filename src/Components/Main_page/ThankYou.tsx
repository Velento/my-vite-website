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
        aria-labelledby="thank-you-title"
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div className="thank-you-card" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="thank-you-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>

          {/* Animated success badge — gold disc with a checkmark that draws in. */}
          <div className="thank-you-icon" aria-hidden="true">
            <span className="thank-you-icon__ring" />
            <svg viewBox="0 0 24 24" focusable="false">
              <path
                className="thank-you-icon__tick"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4.5 4.5L19 7"
              />
            </svg>
          </div>

          <h3 className="thank-you-title" id="thank-you-title">
            {t('textThankYou')}, {name}
          </h3>
          <p className="thank-you-text">{t('textThank')}</p>

          <button type="button" className="thank-you-action" onClick={onClose}>
            {t('thankYou.done', 'Gotowe')}
          </button>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ThankYou;
