import { useState } from 'react';
import FocusTrap from 'focus-trap-react';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import './ContactModal.css';
import { useTranslation } from 'react-i18next';
import FeedbackForm from './FeedBackForm';
import { openViberChat } from '../../services/viber';
import { trackContactClick } from '../../services/analytics';

type ContactModalProps = {
  show: boolean;
  onClose: () => void;
};

const ContactModal = ({ show, onClose }: ContactModalProps) => {
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
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
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
              <h2>{t('modal.title')}</h2>
              <p style={{ textAlign: 'center' }}>
                {t('modal.call')}{' '}
                <a href="tel:+48883734171" onClick={() => trackContactClick('phone')}>
                  +48883734171
                </a>
              </p>
              <div className="contact-icons">
                <a
                  href="https://t.me/LegalLine_pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('telegram')}
                >
                  <img src={telegramIcon} alt="Telegram" className="contact-icon" />
                </a>
                <a
                  href="https://wa.me/+48883734171"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('whatsapp')}
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
                </a>
                <a
                  href="#!"
                  onClick={(e) => {
                    trackContactClick('viber');
                    openViberChat(e);
                  }}
                  rel="noopener noreferrer"
                >
                  <img src={viberIcon} alt="Viber" className="contact-icon" />
                </a>
              </div>
              <button className="feedback-button" onClick={handleOpenFeedbackForm}>
                {t('modal.feedbackButton')}
              </button>
            </div>
          </div>
        </FocusTrap>
      )}
      {isFeedbackFormVisible && <FeedbackForm onClose={handleCloseFeedbackForm} />}
    </>
  );
};

export default ContactModal;
