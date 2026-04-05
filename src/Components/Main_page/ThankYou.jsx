import PropTypes from 'prop-types';
import './ThankYou.css';
import { useTranslation } from 'react-i18next';

/**
 * Thank-you modal shown after successful form submission.
 * @param {{ name: string, onClose: () => void }} props
 */
const ThankYou = ({ name, onClose }) => {
  const { t } = useTranslation();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
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
  );
};

ThankYou.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ThankYou;
