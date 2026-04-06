import { useState, useCallback } from 'react';
import { sendLeadToTelegram } from '../../services/telegram';
import { trackLeadConversion } from '../../services/analytics';
import { NAME_REGEX, PHONE_REGEX } from '../../services/validation';

let lastSubmitTime = 0;
const SUBMIT_COOLDOWN_MS = 60_000;

/**
 * Hook for lead form state and submission logic.
 * UI component renders only — no business logic.
 *
 * @param {{ onSuccess?: () => void }} options
 */
export function useLeadForm({ onSuccess } = {}) {
  const [fields, setFields] = useState({ name: '', phone: '', promo: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isNameValid = fields.name === '' || NAME_REGEX.test(fields.name.trim());
  const isPhoneValid = fields.phone === '' || PHONE_REGEX.test(fields.phone.trim());
  const canSubmit =
    NAME_REGEX.test(fields.name.trim()) &&
    PHONE_REGEX.test(fields.phone.trim()) &&
    status !== 'submitting';

  const setField = useCallback(
    (field) => (e) => setFields((prev) => ({ ...prev, [field]: e.target.value })),
    []
  );

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!canSubmit) return;

      const now = Date.now();
      if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
        setStatus('error');
        setErrorMessage('Подождите минуту перед повторной отправкой');
        return;
      }

      setStatus('submitting');
      setErrorMessage('');

      try {
        await sendLeadToTelegram({
          name: fields.name.trim(),
          phone: fields.phone.trim(),
          promo: fields.promo.trim() || undefined,
        });
        lastSubmitTime = Date.now();
        setStatus('success');
        trackLeadConversion();
        onSuccess?.();
      } catch (err) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Неизвестная ошибка');
      }
    },
    [fields, canSubmit, onSuccess]
  );

  const reset = useCallback(() => {
    setFields({ name: '', phone: '', promo: '' });
    setStatus('idle');
    setErrorMessage('');
  }, []);

  return {
    fields,
    setField,
    submit,
    reset,
    status,
    errorMessage,
    isNameValid,
    isPhoneValid,
    canSubmit,
  };
}
