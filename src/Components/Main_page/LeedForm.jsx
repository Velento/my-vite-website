import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import { sendLeadToWeb3Forms } from '../../services/web3forms';
import { trackLeadConversion } from '../../services/analytics';
import { isValidName, isValidPhone, canSubmitForm } from '../../services/validation';
import './LeedForm.css';

/** @type {number} Delay in ms before showing ThankYou modal after success */
const THANK_YOU_DELAY_MS = 3000;

/**
 * Inline lead-capture form (displayed in the page, not in a modal).
 * @param {{ onClose?: () => void }} props
 */
const LeedForm = ({ onClose }) => {
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
      await sendLeadToWeb3Forms({
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
      console.error('Form submit error:', error);
      setStatus('error');
      setErrorMsg(t('feedbackForm.errorMessage', 'An error occurred. Please try again.'));
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    setName('');
    setPhone('');
    setPromo('');
    setStatus('idle');
    setErrorMsg('');
    onClose?.();
  };

  return (
    <section className="leed-form-container" id="leedform">
      <h2>{t('feedbackForm.title')}</h2>
      {!showThankYou ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${!nameValid && name ? 'form-group--error' : ''}`}>
            <label htmlFor="leedform-name">{t('feedbackForm.name')}</label>
            <input
              id="leedform-name"
              type="text"
              maxLength={50}
              placeholder={t('feedbackForm.namePlaceholder', 'Anna')}
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
            <label htmlFor="leedform-phone">{t('feedbackForm.phone')}</label>
            <input
              id="leedform-phone"
              type="tel"
              maxLength={20}
              placeholder={t('feedbackForm.phonePlaceholder', '+48123123123')}
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
            <label htmlFor="leedform-promo">{t('feedbackForm.promo')}</label>
            <input
              id="leedform-promo"
              type="text"
              maxLength={30}
              placeholder={t('feedbackForm.promoPlaceholder', 'PROMO2024')}
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
          </div>
        </form>
      ) : null}
      {showThankYou && <ThankYou name={name} onClose={handleThankYouClose} />}
    </section>
  );
};

LeedForm.propTypes = {
  onClose: PropTypes.func,
};

export default LeedForm;
