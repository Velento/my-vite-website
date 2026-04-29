import FocusTrap from 'focus-trap-react';
import './ThankYou.css';
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
        className="thank-you-modal"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="dialog"
        aria-modal="true"
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div className="thank-you-modal-content" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            &times;
          </button>
          <h3>
            {t('textThankYou')}, {name}
          </h3>
          <p>{t('textThank')}</p>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ThankYou;
