import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. Falls back to a generic label. */
  ariaLabel?: string;
  children?: ReactNode;
};

const Modal = ({ show, onClose, ariaLabel, children }: ModalProps) => {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="modal"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? t('modal.title')}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="close"
            onClick={onClose}
            aria-label={t('feedbackForm.cancel', 'Close')}
          >
            <svg
              width="16"
              height="16"
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
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};

export default Modal;
