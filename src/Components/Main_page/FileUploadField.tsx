import { useRef, useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { UseFormRegisterReturn } from 'react-hook-form';
import CloseIcon from '../common/CloseIcon';
import type { TranslationKey } from '../../i18n/keys';
import './FileUploadField.css';

type FileUploadFieldProps = {
  id: string;
  /** Result of register('file') from react-hook-form. */
  registration: UseFormRegisterReturn;
  disabled?: boolean;
  errorMessage?: string | undefined;
};

const ACCEPT =
  '.pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,application/pdf,image/jpeg,image/png,image/webp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const FileUploadField = ({ id, registration, disabled, errorMessage }: FileUploadFieldProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<File | null>(null);
  const internalInputRef = useRef<HTMLInputElement | null>(null);

  const { ref: rhfRef, onChange: rhfOnChange, ...rhfRest } = registration;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    rhfOnChange(e);
    const file = e.target.files?.[0] ?? null;
    setSelected(file);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    registration.onBlur(e);
  };

  const handleRemove = () => {
    // Clear the native input first so the browser drops its FileList…
    if (internalInputRef.current) internalInputRef.current.value = '';
    setSelected(null);
    // …then notify RHF. For file inputs, RHF reads `event.target.files` —
    // sending `value: undefined` alone leaves the previous FileList in the
    // form state and the next submit would re-send the “removed” file.
    rhfOnChange({
      target: {
        name: registration.name,
        type: 'file',
        value: '',
        files: null,
      },
    } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const triggerPick = () => internalInputRef.current?.click();

  return (
    <div className={`form-group ${errorMessage ? 'form-group--error' : ''}`}>
      <label htmlFor={id}>{t('feedbackForm.file', 'Załącz dokument (opcjonalnie)')}</label>

      {/* Visually hidden but accessible — focus from <button> trigger lands here. */}
      <input
        id={id}
        type="file"
        accept={ACCEPT}
        disabled={disabled}
        className="file-upload-input"
        {...rhfRest}
        ref={(el) => {
          rhfRef(el);
          internalInputRef.current = el;
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <button
        type="button"
        onClick={triggerPick}
        disabled={disabled}
        aria-controls={id}
        className="file-upload-trigger"
      >
        <svg
          className="file-upload-trigger__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>
          {selected
            ? t('feedbackForm.fileChange', 'Zmień plik')
            : t('feedbackForm.fileChoose', 'Wybierz plik')}
        </span>
      </button>

      {selected && (
        <div className="file-upload-pill">
          <span className="file-upload-pill__info">
            <svg
              className="file-upload-pill__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span title={selected.name} className="file-upload-pill__name">
              {selected.name}
            </span>
            <span className="file-upload-pill__size">{formatBytes(selected.size)}</span>
          </span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label={t('feedbackForm.fileRemove', 'Usuń plik')}
            className="file-upload-remove"
          >
            <CloseIcon size={14} />
          </button>
        </div>
      )}

      <small className="file-upload-hint">
        {t('feedbackForm.fileHint', 'PDF, JPG, PNG, DOC — do 10 MB')}
      </small>

      {errorMessage && (
        <span className="form-group__error" role="alert">
          {t(errorMessage as TranslationKey)}
        </span>
      )}
    </div>
  );
};

export default FileUploadField;
