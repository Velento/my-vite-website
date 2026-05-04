import FocusTrap from 'focus-trap-react';
import type { ReactNode } from 'react';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Modal = ({ show, onClose, children }: ModalProps) => {
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
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            &times;
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
};

export default Modal;
