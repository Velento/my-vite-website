import { useEffect, useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import FileUploadField from './FileUploadField';
import { sendLeadToTelegram } from '../../services/telegram';
import { trackLeadConversion } from '../../services/analytics';
import { leadFormSchema, type LeadFormValues } from '../../services/validation';
import './FeedBackForm.css';

const THANK_YOU_DELAY_MS = 5000;

type FeedbackFormProps = {
  onClose?: () => void;
};

const FeedbackForm = ({ onClose }: FeedbackFormProps) => {
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
        file: values.file && values.file.length > 0 ? values.file[0] : null,
      });
      trackLeadConversion();
      setSubmitted(true);
      timerRef.current = setTimeout(() => setShowThankYou(true), THANK_YOU_DELAY_MS);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(t('feedbackForm.errorMessage', 'Failed to send message.'));
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    setSubmitted(false);
    setSubmitError('');
    reset();
    onClose?.();
  };

  const handleClose = () => onClose?.();

  const nameError = touchedFields.name ? errors.name : undefined;
  const phoneError = touchedFields.phone ? errors.phone : undefined;
  const submittedName = getValues('name');

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={`form-group ${nameError ? 'form-group--error' : ''}`}>
                <label htmlFor="feedback-name">{t('feedbackForm.name')}</label>
                <input
                  id="feedback-name"
                  type="text"
                  maxLength={50}
                  placeholder="Anna"
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
                <label htmlFor="feedback-phone">{t('feedbackForm.phone')}</label>
                <input
                  id="feedback-phone"
                  type="tel"
                  maxLength={20}
                  placeholder="+48123123123"
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
                <label htmlFor="feedback-promo">{t('feedbackForm.promo')}</label>
                <input
                  id="feedback-promo"
                  type="text"
                  maxLength={30}
                  disabled={isSubmitting}
                  {...register('promo')}
                />
              </div>
              <FileUploadField
                id="feedback-file"
                registration={register('file')}
                disabled={isSubmitting}
                errorMessage={errors.file?.message}
              />
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
                <button type="button" className="cancel-button" onClick={handleClose}>
                  {t('feedbackForm.cancel')}
                </button>
              </div>
            </form>
          ) : null}
          {showThankYou && <ThankYou name={submittedName} onClose={handleThankYouClose} />}
        </div>
      </div>
    </FocusTrap>
  );
};

export default FeedbackForm;
