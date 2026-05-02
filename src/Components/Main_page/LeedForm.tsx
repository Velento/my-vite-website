import { useEffect, useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import { sendLeadToTelegram } from '../../services/telegram';
import { trackLeadConversion } from '../../services/analytics';
import { leadFormSchema, type LeadFormValues } from '../../services/validation';
import './LeedForm.css';

const THANK_YOU_DELAY_MS = 3000;

type LeedFormProps = {
  onClose?: () => void;
};

const LeedForm = ({ onClose }: LeedFormProps) => {
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
    defaultValues: { name: '', phone: '', promo: '' },
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onSubmit: SubmitHandler<LeadFormValues> = async (values) => {
    setSubmitError('');
    try {
      await sendLeadToTelegram({
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

  const nameError = touchedFields.name ? errors.name : undefined;
  const phoneError = touchedFields.phone ? errors.phone : undefined;
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
            {nameError?.message && (
              <span className="form-group__error" role="alert">
                {t(nameError.message)}
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
            {phoneError?.message && (
              <span className="form-group__error" role="alert">
                {t(phoneError.message)}
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

export default LeedForm;
