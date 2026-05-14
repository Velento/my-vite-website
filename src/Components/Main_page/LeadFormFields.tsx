import { useEffect, useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import FileUploadField from './FileUploadField';
import { sendLeadToTelegram } from '../../services/telegram';
import { trackLeadConversion } from '../../services/analytics';
import { leadFormSchema, type LeadFormValues } from '../../services/validation';

type LeadFormFieldsProps = {
  /** id prefix for form inputs — keeps multiple form instances on one page distinct. */
  idPrefix: string;
  /** ms before the success message swaps to the ThankYou panel. */
  thankYouDelayMs?: number;
  /** Called after the user closes the ThankYou panel — typically closes a parent modal. */
  onClose?: () => void;
  /** Optional cancel button (rendered next to submit when set). */
  onCancel?: () => void;
};

const DEFAULT_THANK_YOU_DELAY_MS = 3000;

const LeadFormFields = ({
  idPrefix,
  thankYouDelayMs = DEFAULT_THANK_YOU_DELAY_MS,
  onClose,
  onCancel,
}: LeadFormFieldsProps) => {
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
      trackLeadConversion({ value: 750, currency: 'PLN' });
      setSubmitted(true);
      timerRef.current = setTimeout(() => setShowThankYou(true), thankYouDelayMs);
    } catch (error) {
      console.error('Lead form submit error:', error);
      // Special case: text was delivered but file couldn't (proxy not configured).
      // Treat as success for the lead, but tell the user to send the file separately.
      const code = (error as { code?: string } | null)?.code;
      if (code === 'FILE_PROXY_MISSING') {
        trackLeadConversion({ value: 750, currency: 'PLN' });
        setSubmitError(
          t(
            'feedbackForm.fileProxyMissing',
            'Twoje dane zostały wysłane, ale nie udało się załączyć pliku. Wyślij go bezpośrednio na Telegram lub WhatsApp.'
          )
        );
        setSubmitted(true);
        timerRef.current = setTimeout(() => setShowThankYou(true), thankYouDelayMs);
        return;
      }
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

  if (showThankYou) {
    return <ThankYou name={getValues('name')} onClose={handleThankYouClose} />;
  }

  const nameError = touchedFields.name ? errors.name : undefined;
  const phoneError = touchedFields.phone ? errors.phone : undefined;

  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const promoId = `${idPrefix}-promo`;
  const fileId = `${idPrefix}-file`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={`form-group ${nameError ? 'form-group--error' : ''}`}>
        <label htmlFor={nameId}>{t('feedbackForm.name')}</label>
        <input
          id={nameId}
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
        <label htmlFor={phoneId}>{t('feedbackForm.phone')}</label>
        <input
          id={phoneId}
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
        <label htmlFor={promoId}>{t('feedbackForm.promo')}</label>
        <input
          id={promoId}
          type="text"
          maxLength={30}
          placeholder={t('feedbackForm.promoPlaceholder', 'PROMO2024')}
          disabled={isSubmitting}
          {...register('promo')}
        />
      </div>

      <FileUploadField
        id={fileId}
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
        {onCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            {t('feedbackForm.cancel')}
          </button>
        )}
      </div>
    </form>
  );
};

export default LeadFormFields;
