import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import CloseIcon from '../common/CloseIcon';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import './Modal.css';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. Falls back to a generic label. */
  ariaLabel?: string;
  children?: ReactNode;
};

const Modal = ({ show, onClose, ariaLabel, children }: ModalProps) => {
  const { t } = useTranslation();
  useBodyScrollLock(show);
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
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};

export default Modal;
