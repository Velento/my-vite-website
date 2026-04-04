import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import { trackLeadConversion } from '../../services/analytics';
import './LeedForm.css';

const SUBMIT_TIMEOUT_MS = 15_000;

const LeedForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [promo, setPromo] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const isNameValid = /^[A-Za-zА-Яа-яЁё\s]+$/.test(name);
  const isPhoneValid = /^[+\d][\d\s\-()]{8,}$/.test(phone);
  const isFormValid = isNameValid && isPhoneValid && status !== 'submitting';

  const sendToTelegram = async (data) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      throw new Error('Telegram credentials not configured');
    }

    const message = `\u{1F4CB} Новая заявка\n\u{1F464} Имя: ${data.name}\n\u{1F4DE} Телефон: ${data.phone}${data.promo ? `\n\u{1F381} Промо: ${data.promo}` : ''}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      await sendToTelegram({ name, phone, promo });
      trackLeadConversion();
      setStatus('success');
      setTimeout(() => {
        setShowThankYou(true);
      }, 3000);
    } catch (error) {
      console.error('Form submit error:', error);
      setStatus('error');
      setErrorMsg(
        error.name === 'AbortError'
          ? t('feedbackForm.errorMessage', 'Request timed out. Please try again.')
          : t('feedbackForm.errorMessage', 'An error occurred. Please try again.')
      );
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <section className="leed-form-container" id="leedform">
      <h2>{t('feedbackForm.title')}</h2>
      {!showThankYou ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${!isNameValid && name ? 'error' : ''}`}>
            <label htmlFor="name">{t('feedbackForm.name')}</label>
            <input
              id="name"
              type="text"
              placeholder={t('feedbackForm.namePlaceholder', 'Anna')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!isNameValid && name !== ''}
              disabled={status === 'submitting'}
            />
            {!isNameValid && name && (
              <span className="error-message" role="alert">{t('feedbackForm.nameError')}</span>
            )}
          </div>
          <div className={`form-group ${!isPhoneValid && phone ? 'error' : ''}`}>
            <label htmlFor="phone">{t('feedbackForm.phone')}</label>
            <input
              id="phone"
              type="tel"
              placeholder={t('feedbackForm.phonePlaceholder', '+48123123123')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!isPhoneValid && phone !== ''}
              disabled={status === 'submitting'}
            />
            {!isPhoneValid && phone && (
              <span className="error-message" role="alert">{t('feedbackForm.phoneError')}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="promo">{t('feedbackForm.promo')}</label>
            <input
              id="promo"
              type="text"
              placeholder={t('feedbackForm.promoPlaceholder', 'PROMO2024')}
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>
          {errorMsg && (
            <div className="error-message" role="alert" style={{ marginBottom: '1rem' }}>
              {errorMsg}
            </div>
          )}
          {status === 'success' && (
            <div className="message-alert" role="status">{t('messageAlert')}</div>
          )}
          <div className="form-buttons">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`submit-button ${isFormValid ? 'active' : ''}`}
            >
              {status === 'submitting' ? '...' : t('feedbackForm.submit')}
            </button>
          </div>
        </form>
      ) : null}
      {showThankYou && <ThankYou name={name} onClose={handleThankYouClose} />}
    </section>
  );
};

export default LeedForm;
