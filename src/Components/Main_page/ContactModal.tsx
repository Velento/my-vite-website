import { useState } from 'react';
import './ContactModal.css';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import FeedbackForm from './FeedBackForm';
import { TelegramIcon, WhatsAppIcon, ViberIcon } from '../common/SocialIcons';
import { openViberChat } from '../../services/viber';
import { trackContactClick } from '../../services/analytics';
import { PHONE_NUMBER, PHONE_HREF, WHATSAPP_HREF, TELEGRAM_HREF } from '../../constants/contact';

type ContactModalProps = {
  show: boolean;
  onClose: () => void;
};

const ContactModal = ({ show, onClose }: ContactModalProps) => {
  const { t } = useTranslation();
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false);

  const handleCloseFeedbackForm = () => {
    setIsFeedbackFormVisible(false);
    onClose?.();
  };

  if (isFeedbackFormVisible) {
    return <FeedbackForm onClose={handleCloseFeedbackForm} />;
  }

  return (
    <Modal show={show} onClose={onClose} ariaLabel={t('modal.title')}>
      <h2>{t('modal.title')}</h2>
      <p style={{ textAlign: 'center' }}>
        {t('modal.call')}{' '}
        <a href={PHONE_HREF} onClick={() => trackContactClick('phone')}>
          {PHONE_NUMBER}
        </a>
      </p>
      <div className="contact-icons">
        <a
          href={TELEGRAM_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          onClick={() => trackContactClick('telegram')}
        >
          <TelegramIcon className="contact-icon" size={32} />
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          onClick={() => trackContactClick('whatsapp')}
        >
          <WhatsAppIcon className="contact-icon" size={32} />
        </a>
        <a
          href="#!"
          aria-label="Viber"
          onClick={(e) => {
            trackContactClick('viber');
            openViberChat(e);
          }}
          rel="noopener noreferrer"
        >
          <ViberIcon className="contact-icon" size={32} />
        </a>
      </div>
      <button
        type="button"
        className="feedback-button"
        onClick={() => setIsFeedbackFormVisible(true)}
      >
        {t('modal.feedbackButton')}
      </button>
    </Modal>
  );
};

export default ContactModal;
