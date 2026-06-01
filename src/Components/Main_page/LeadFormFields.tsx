import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import FileUploadField from './FileUploadField';
import { sendLeadToTelegram } from '../../services/telegram';
import { trackContactClick, trackFormStart, trackLeadConversion } from '../../services/analytics';
import { leadFormSchema, type LeadFormValues } from '../../services/validation';
import { loadDraft, useFormDraft } from '../../hooks/useFormDraft';
import type { TranslationKey } from '../../i18n/keys';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { WHATSAPP_HREF } from '../../constants/contact';

/** hCaptcha site key (public). When unset, the captcha widget is omitted and
 *  the form submits without it, so the lead form never breaks on a misconfig. */
const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY as string | undefined;

/** sessionStorage key for the cached form draft. Shared by every form
 *  instance so typing in the inline form pre-fills the modal one and back. */
const DRAFT_STORAGE_KEY = 'll_lead_draft';

/** Text fields mirrored into the draft cache (no file - a FileList can't be
 *  serialized, and no honeypot - it must never round-trip). */
const DRAFT_FIELDS = ['name', 'phone', 'promo'] as const;

/** Off-screen styling for the honeypot input - kept out of the layout and the
 *  accessibility tree, but still present in the DOM for bots to fill. */
const HONEYPOT_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  border: 0,
};

/** Builds a pre-filled WhatsApp deeplink so a failed form submission can still
 *  reach the team. The agent gets all the data the user already typed. */
function buildWhatsAppFallbackUrl(values: {
  name: string;
  phone: string;
  promo?: string | undefined;
}): string {
  const lines = [
    'Zapytanie ze strony Legal Line:',
    `Imię: ${values.name}`,
    `Telefon: ${values.phone}`,
  ];
  if (values.promo) lines.push(`Kod promocyjny: ${values.promo}`);
  const text = encodeURIComponent(lines.join('\n'));
  return `${WHATSAPP_HREF}?text=${text}`;
}

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
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formStartedRef = useRef(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitErrorRef = useRef<HTMLDivElement>(null);
  // The hCaptcha widget pulls in ~800 kB of third-party JS the moment it
  // mounts. Mounting it on first paint tanked the Lighthouse score, so it is
  // deferred until the form scrolls into view (or the visitor focuses a
  // field) — the widget is on screen by the time anyone reaches the form,
  // but never loads during the initial above-the-fold paint.
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleFormStart = useCallback(() => {
    setShowCaptcha(true);
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackFormStart();
  }, []);

  // Mount the captcha once the form nears the viewport. The inline form sits
  // far below the fold, so this keeps hCaptcha out of the initial page load
  // (Lighthouse never scrolls) while making it visible for real visitors.
  useEffect(() => {
    if (showCaptcha) return undefined;
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShowCaptcha(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowCaptcha(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showCaptcha]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
    // Seed from the cached draft so a refresh mid-typing keeps the visitor's
    // data. `loadDraft` only ever returns name/phone/promo strings.
    defaultValues: { name: '', phone: '', promo: '', website: '', ...loadDraft(DRAFT_STORAGE_KEY) },
  });

  const { clearDraft } = useFormDraft(DRAFT_STORAGE_KEY, watch, DRAFT_FIELDS);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // A submit-time failure (network/proxy down) renders below the button, where
  // a keyboard or screen-reader user who just pressed Submit may not notice it.
  // Move focus to the alert and scroll it into view so the WhatsApp fallback is
  // never missed. Field-level validation errors already focus their input
  // (react-hook-form shouldFocusError), so this only handles the submit alert.
  useEffect(() => {
    if (submitError && submitErrorRef.current) {
      submitErrorRef.current.focus();
      submitErrorRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [submitError]);

  const onSubmit: SubmitHandler<LeadFormValues> = async (values) => {
    // Honeypot: humans can't see or fill `website`. Any value means a bot -
    // show the same success UI so it moves on, but never hit the network.
    if (values.website) {
      setSubmitted(true);
      timerRef.current = setTimeout(() => setShowThankYou(true), thankYouDelayMs);
      return;
    }

    // Captcha gate: when hCaptcha is configured, a solved token is required.
    if (HCAPTCHA_SITE_KEY && !captchaToken) {
      setSubmitError(t('feedbackForm.captchaRequired', 'Potwierdź, że nie jesteś robotem.'));
      return;
    }

    setSubmitError('');
    setFallbackUrl(null);
    const trimmed = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      promo: values.promo?.trim() || undefined,
    };
    try {
      await sendLeadToTelegram({
        ...trimmed,
        file: values.file && values.file.length > 0 ? values.file[0] : null,
        captchaToken: captchaToken ?? undefined,
      });
      trackLeadConversion({ value: 750, currency: 'PLN' });
      clearDraft();
      setSubmitted(true);
      timerRef.current = setTimeout(() => setShowThankYou(true), thankYouDelayMs);
    } catch (error) {
      console.error('Lead form submit error:', error);
      // Special case: text was delivered but file couldn't (proxy not configured).
      // Treat as success for the lead, but tell the user to send the file separately.
      const code = (error as { code?: string } | null)?.code;
      if (code === 'FILE_PROXY_MISSING') {
        trackLeadConversion({ value: 750, currency: 'PLN' });
        clearDraft();
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
      // Generic submission failure (proxy down, network, CORS, worker secrets
      // missing — anything). Don't lose the lead: show a WhatsApp deeplink
      // pre-filled with whatever the user already typed so they can reach
      // the team with one tap.
      // hCaptcha tokens are single-use; clear it so a retry re-solves.
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
      setFallbackUrl(buildWhatsAppFallbackUrl(trimmed));
      setSubmitError(
        t(
          'feedbackForm.errorWithFallback',
          'Nie udało się wysłać formularza. Skontaktuj się z nami bezpośrednio:'
        )
      );
    }
  };

  const handleFallbackClick = () => {
    trackContactClick('whatsapp');
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    setSubmitted(false);
    setSubmitError('');
    setFallbackUrl(null);
    captchaRef.current?.resetCaptcha();
    setCaptchaToken(null);
    reset();
    onClose?.();
  };

  if (showThankYou) {
    return <ThankYou name={getValues('name')} onClose={handleThankYouClose} />;
  }

  const nameError = touchedFields.name ? errors.name : undefined;
  const phoneError = touchedFields.phone ? errors.phone : undefined;
  // With hCaptcha configured, the submit stays disabled until it is solved.
  const captchaSatisfied = !HCAPTCHA_SITE_KEY || Boolean(captchaToken);

  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;
  const promoId = `${idPrefix}-promo`;
  const fileId = `${idPrefix}-file`;

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} onFocus={handleFormStart} noValidate>
      <div className={`form-group ${nameError ? 'form-group--error' : ''}`}>
        <label htmlFor={nameId}>{t('feedbackForm.name')}</label>
        <input
          id={nameId}
          type="text"
          maxLength={50}
          autoComplete="name"
          placeholder={t('feedbackForm.namePlaceholder', 'Anna')}
          aria-invalid={Boolean(nameError)}
          disabled={isSubmitting}
          {...register('name')}
        />
        {nameError?.message && (
          <span className="form-group__error" role="alert">
            {t(nameError.message as TranslationKey)}
          </span>
        )}
      </div>

      <div className={`form-group ${phoneError ? 'form-group--error' : ''}`}>
        <label htmlFor={phoneId}>{t('feedbackForm.phone')}</label>
        <input
          id={phoneId}
          type="tel"
          inputMode="tel"
          maxLength={20}
          autoComplete="tel"
          placeholder={t('feedbackForm.phonePlaceholder', '+48123123123')}
          aria-invalid={Boolean(phoneError)}
          disabled={isSubmitting}
          {...register('phone')}
        />
        {phoneError?.message && (
          <span className="form-group__error" role="alert">
            {t(phoneError.message as TranslationKey)}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor={promoId}>{t('feedbackForm.promo')}</label>
        <input
          id={promoId}
          type="text"
          maxLength={30}
          autoComplete="off"
          placeholder={t('feedbackForm.promoPlaceholder', 'PROMO2024')}
          disabled={isSubmitting}
          {...register('promo')}
        />
      </div>

      {/* Honeypot - off-screen and hidden from assistive tech. A real visitor
          never sees it; a form-filling bot does. Checked in onSubmit. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={HONEYPOT_STYLE}
        {...register('website')}
      />

      <FileUploadField
        id={fileId}
        registration={register('file')}
        disabled={isSubmitting}
        errorMessage={errors.file?.message}
      />

      {HCAPTCHA_SITE_KEY && showCaptcha && (
        <div className="form-group">
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITE_KEY}
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
          />
        </div>
      )}

      {submitError && (
        <div
          ref={submitErrorRef}
          tabIndex={-1}
          className="form-group__error form-group__error--block"
          role="alert"
        >
          {submitError}
          {fallbackUrl && (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="form-fallback-whatsapp"
              onClick={handleFallbackClick}
            >
              {t('feedbackForm.fallbackWhatsApp', 'Wyślij przez WhatsApp')}
            </a>
          )}
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
          disabled={isSubmitting || submitted || !captchaSatisfied}
          className={`submit-button ${
            !isSubmitting && !submitted && captchaSatisfied ? 'submit-button--active' : ''
          }`}
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
