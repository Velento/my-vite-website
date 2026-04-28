import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import { sendLeadToWeb3Forms } from '../../services/web3forms';
import { trackLeadConversion } from '../../services/analytics';
import { leadFormSchema } from '../../services/validation';
import './LeedForm.css';

const THANK_YOU_DELAY_MS = 3000;

const LeedForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const timerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
    defaultValues: { name: '', phone: '', promo: '' },
  });

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

  const onSubmit = async (values) => {
    setSubmitError('');
    try {
      await sendLeadToWeb3Forms({
        name: values.name.trim(),
        phone: values.phone.trim(),
        promo: values.promo?.trim() || undefined,
      });
      trackLeadConversion();
      setSubmitted(true);
      timerRef.current = setTimeout(() => setShowThankYou(true), THANK_YOU_DELAY_MS);
    } catch (error) {
      console.error('Form submit error:', error);
      setSubmitError(t('feedbackForm.errorMessage', 'An error occurred. Please try again.'));
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    setSubmitted(false);
    setSubmitError('');
    reset();
    onClose?.();
  };

  const nameError = touchedFields.name && errors.name;
  const phoneError = touchedFields.phone && errors.phone;
  const submittedName = getValues('name');

  return (
    <section className="leed-form-container" id="leedform">
      <h2>{t('feedbackForm.title')}</h2>
      {!showThankYou ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={`form-group ${nameError ? 'form-group--error' : ''}`}>
            <label htmlFor="leedform-name">{t('feedbackForm.name')}</label>
            <input
              id="leedform-name"
              type="text"
              maxLength={50}
              placeholder={t('feedbackForm.namePlaceholder', 'Anna')}
              aria-invalid={Boolean(nameError)}
              disabled={isSubmitting}
              {...register('name')}
            />
            {nameError && (
              <span className="form-group__error" role="alert">
                {t(errors.name.message)}
              </span>
            )}
          </div>
          <div className={`form-group ${phoneError ? 'form-group--error' : ''}`}>
            <label htmlFor="leedform-phone">{t('feedbackForm.phone')}</label>
            <input
              id="leedform-phone"
              type="tel"
              maxLength={20}
              placeholder={t('feedbackForm.phonePlaceholder', '+48123123123')}
              aria-invalid={Boolean(phoneError)}
              disabled={isSubmitting}
              {...register('phone')}
            />
            {phoneError && (
              <span className="form-group__error" role="alert">
                {t(errors.phone.message)}
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
              disabled={isSubmitting}
              {...register('promo')}
            />
          </div>
          {submitError && (
            <div className="form-group__error form-group__error--block" role="alert">
              {submitError}
            </div>
          )}
          {submitted && (
            <div className="message-alert" role="status">
              {t('messageAlert')}
            </div>
          )}
          <div className="form-buttons">
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`submit-button ${!isSubmitting && !submitted ? 'submit-button--active' : ''}`}
            >
              {isSubmitting ? '...' : t('feedbackForm.submit')}
            </button>
          </div>
        </form>
      ) : null}
      {showThankYou && <ThankYou name={submittedName} onClose={handleThankYouClose} />}
    </section>
  );
};

LeedForm.propTypes = {
  onClose: PropTypes.func,
};

export default LeedForm;
