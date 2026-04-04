import { useState } from 'react';
import './FeedBackForm.css';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import { trackLeadConversion } from '../../services/analytics';

const FeedbackForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [promo, setPromo] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const isNameValid = /^[A-Za-zА-Яа-яЁё\s]+$/.test(name);
  const isPhoneValid = /^[+\d][\d\s\-()]{8,}$/.test(phone);
  const isFormValid = isNameValid && isPhoneValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { sendLeadToTelegram } = await import('../../services/telegram');
      await sendLeadToTelegram({ name, phone, promo: promo || undefined });
      trackLeadConversion();

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setShowThankYou(true);
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert(t('feedbackForm.errorMessage', 'Failed to send message.'));
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    onClose();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="feedback-modal" id="feed-back" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose()} role="dialog" aria-modal="true">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className="feedback-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2>{t('feedbackForm.title')}</h2>
        {!showThankYou ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('feedbackForm.name')}</label>
              <input
                type="text"
                placeholder="Anna"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && name && (
                <span className="error-message">{t('feedbackForm.nameError')}</span>
              )}
            </div>
            <div className="form-group">
              <label>{t('feedbackForm.phone')}</label>
              <input
                type="text"
                placeholder="+48123123123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {!isPhoneValid && phone && (
                <span className="error-message">{t('feedbackForm.phoneError')}</span>
              )}
            </div>
            <div className="form-group">
              <label>{t('feedbackForm.promo')}</label>
              <input type="text" value={promo} onChange={(e) => setPromo(e.target.value)} />
            </div>
            <div className="form-buttons">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`submit-button ${isFormValid ? 'active' : ''}`}
              >
                {t('feedbackForm.submit')}
              </button>
              <button type="button" className="cancel-button" onClick={onClose}>
                {t('feedbackForm.cancel')}
              </button>
            </div>
          </form>
        ) : null}
        {showMessage && <div className="message-alert">{t('messageAlert')}</div>}
        {showThankYou && <ThankYou name={name} onClose={handleThankYouClose} />}
      </div>
    </div>
  );
};

export default FeedbackForm;
