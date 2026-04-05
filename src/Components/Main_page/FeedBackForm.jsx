import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './FeedBackForm.css';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import { sendLeadToTelegram } from '../../services/telegram';
import { trackLeadConversion } from '../../services/analytics';
import { isValidName, isValidPhone, canSubmitForm } from '../../services/validation';

/** @type {number} Delay in ms before showing ThankYou modal */
const THANK_YOU_DELAY_MS = 5000;

/**
 * Feedback form shown inside a modal overlay.
 * @param {{ onClose?: () => void }} props
 */
const FeedbackForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [promo, setPromo] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const timerRef = useRef(null);

  const nameValid = isValidName(name);
  const phoneValid = isValidPhone(phone);
  const formReady = canSubmitForm(name, phone) && status !== 'submitting';

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formReady) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      await sendLeadToTelegram({
        name: name.trim(),
        phone: phone.trim(),
        promo: promo.trim() || undefined,
      });
      trackLeadConversion();
      setStatus('success');
      timerRef.current = setTimeout(() => {
        setShowThankYou(true);
      }, THANK_YOU_DELAY_MS);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setErrorMsg(t('feedbackForm.errorMessage', 'Failed to send message.'));
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="feedback-modal"
      id="feed-back"
      onClick={handleClose}
      onKeyDown={(e) => e.key === 'Escape' && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-label={t('feedbackForm.title')}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className="feedback-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="feedback-modal__close"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2>{t('feedbackForm.title')}</h2>
        {!showThankYou ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className={`form-group ${!nameValid && name ? 'form-group--error' : ''}`}>
              <label htmlFor="feedback-name">{t('feedbackForm.name')}</label>
              <input
                id="feedback-name"
                type="text"
                placeholder="Anna"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!nameValid && name !== ''}
                disabled={status === 'submitting'}
              />
              {!nameValid && name && (
                <span className="form-group__error" role="alert">
                  {t('feedbackForm.nameError')}
                </span>
              )}
            </div>
            <div className={`form-group ${!phoneValid && phone ? 'form-group--error' : ''}`}>
              <label htmlFor="feedback-phone">{t('feedbackForm.phone')}</label>
              <input
                id="feedback-phone"
                type="tel"
                placeholder="+48123123123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!phoneValid && phone !== ''}
                disabled={status === 'submitting'}
              />
              {!phoneValid && phone && (
                <span className="form-group__error" role="alert">
                  {t('feedbackForm.phoneError')}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="feedback-promo">{t('feedbackForm.promo')}</label>
              <input
                id="feedback-promo"
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                disabled={status === 'submitting'}
              />
            </div>
            {errorMsg && (
              <div className="form-group__error form-group__error--block" role="alert">
                {errorMsg}
              </div>
            )}
            {status === 'success' && (
              <div className="message-alert" role="status">
                {t('messageAlert')}
              </div>
            )}
            <div className="form-buttons">
              <button
                type="submit"
                disabled={!formReady}
                className={`submit-button ${formReady ? 'submit-button--active' : ''}`}
              >
                {status === 'submitting' ? '...' : t('feedbackForm.submit')}
              </button>
              <button type="button" className="cancel-button" onClick={handleClose}>
                {t('feedbackForm.cancel')}
              </button>
            </div>
          </form>
        ) : null}
        {showThankYou && <ThankYou name={name} onClose={handleThankYouClose} />}
      </div>
    </div>
  );
};

FeedbackForm.propTypes = {
  onClose: PropTypes.func,
};

export default FeedbackForm;
