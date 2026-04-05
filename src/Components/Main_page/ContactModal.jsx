import { useState } from 'react';
import PropTypes from 'prop-types';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import './ContactModal.css';
import { useTranslation } from 'react-i18next';
import FeedbackForm from './FeedBackForm';
import { openViberChat } from '../../services/viber';

/**
 * Contact modal — shows messenger links and a button to open the feedback form.
 * @param {{ show: boolean, onClose: () => void }} props
 */
const ContactModal = ({ show, onClose }) => {
  const { t } = useTranslation();
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false);

  if (!show && !isFeedbackFormVisible) return null;

  const handleOpenFeedbackForm = () => {
    setIsFeedbackFormVisible(true);
  };

  const handleCloseFeedbackForm = () => {
    setIsFeedbackFormVisible(false);
    onClose?.();
  };

  return (
    <>
      {!isFeedbackFormVisible && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          className="modal"
          onClick={() => onClose?.()}
          onKeyDown={(e) => e.key === 'Escape' && onClose?.()}
          role="dialog"
          aria-modal="true"
          aria-label={t('modal.title')}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              &times;
            </button>
            <h2>{t('modal.title')}</h2>
            <p style={{ textAlign: 'center' }}>
              {t('modal.call')} <a href="tel:+48883734171">+48883734171</a>
            </p>
            <div className="contact-icons">
              <a href="https://t.me/LegalLine_pl" target="_blank" rel="noopener noreferrer">
                <img src={telegramIcon} alt="Telegram" className="contact-icon" />
              </a>
              <a href="https://wa.me/+48883734171" target="_blank" rel="noopener noreferrer">
                <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
              </a>
              <a href="#!" onClick={openViberChat} rel="noopener noreferrer">
                <img src={viberIcon} alt="Viber" className="contact-icon" />
              </a>
            </div>
            <button className="feedback-button" onClick={handleOpenFeedbackForm}>
              {t('modal.feedbackButton')}
            </button>
          </div>
        </div>
      )}
      {isFeedbackFormVisible && <FeedbackForm onClose={handleCloseFeedbackForm} />}
    </>
  );
};

ContactModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactModal;
