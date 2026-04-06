import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

/**
 * Generic reusable modal with backdrop click/Escape to close.
 * @param {{ show: boolean, onClose: () => void, children: React.ReactNode }} props
 */
const Modal = ({ show, onClose, children }) => {
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

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
