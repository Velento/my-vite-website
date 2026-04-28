import { useState, useCallback } from 'react';
import { trackLeadConversion } from '../../services/analytics';
import { sendLeadToWeb3Forms } from '../../services/web3forms';
import { NAME_REGEX, PHONE_REGEX } from '../../services/validation';

let lastSubmitTime = 0;
const SUBMIT_COOLDOWN_MS = 60_000;

type Fields = { name: string; phone: string; promo: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = keyof Fields;

export type UseLeadFormOptions = {
  onSuccess?: () => void;
};

export type UseLeadFormReturn = {
  fields: Fields;
  setField: (field: FieldName) => (e: { target: { value: string } }) => void;
  submit: (e: { preventDefault: () => void }) => Promise<void>;
  reset: () => void;
  status: Status;
  errorMessage: string;
  isNameValid: boolean;
  isPhoneValid: boolean;
  canSubmit: boolean;
};

export function useLeadForm({ onSuccess }: UseLeadFormOptions = {}): UseLeadFormReturn {
  const [fields, setFields] = useState<Fields>({ name: '', phone: '', promo: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isNameValid = fields.name === '' || NAME_REGEX.test(fields.name.trim());
  const isPhoneValid = fields.phone === '' || PHONE_REGEX.test(fields.phone.trim());
  const canSubmit =
    NAME_REGEX.test(fields.name.trim()) &&
    PHONE_REGEX.test(fields.phone.trim()) &&
    status !== 'submitting';

  const setField = useCallback(
    (field: FieldName) => (e: { target: { value: string } }) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value })),
    []
  );

  const submit = useCallback(
    async (e: { preventDefault: () => void }) => {
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
        const trimmedPromo = fields.promo.trim();
        await sendLeadToWeb3Forms({
          name: fields.name.trim(),
          phone: fields.phone.trim(),
          promo: trimmedPromo || undefined,
        });
        lastSubmitTime = Date.now();
        setStatus('success');
        trackLeadConversion();
        onSuccess?.();
      } catch (err) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Ошибка отправки');
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
