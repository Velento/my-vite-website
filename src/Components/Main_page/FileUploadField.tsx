import { useRef, useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { UseFormRegisterReturn } from 'react-hook-form';

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
    if (internalInputRef.current) internalInputRef.current.value = '';
    setSelected(null);
    rhfOnChange({
      target: { name: registration.name, value: undefined },
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
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
        {...rhfRest}
        ref={(el) => {
          rhfRef(el);
          internalInputRef.current = el;
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {/* Trigger button — uses inline style for layout so .form-group label CSS
          (display: block) can't override the icon-next-to-text arrangement. */}
      <button
        type="button"
        onClick={triggerPick}
        disabled={disabled}
        aria-controls={id}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 4,
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px dashed var(--color-border)',
          background: 'var(--color-bg-alt)',
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all var(--duration-base) var(--ease)',
        }}
        className="file-upload-trigger"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            marginTop: 8,
            padding: '8px 10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border-light)',
            background: 'white',
            fontSize: '0.85rem',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              minWidth: 0,
              flex: 1,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span
              title={selected.name}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'var(--color-text)',
                minWidth: 0,
              }}
            >
              {selected.name}
            </span>
            <span style={{ flexShrink: 0, color: 'var(--color-text-tertiary)' }}>
              {formatBytes(selected.size)}
            </span>
          </span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label={t('feedbackForm.fileRemove', 'Usuń plik')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              padding: 0,
              border: 0,
              borderRadius: '9999px',
              background: 'transparent',
              color: 'var(--color-text-tertiary)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              transition: 'all var(--duration-fast) var(--ease)',
            }}
            className="file-upload-remove"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <small style={{ display: 'block', marginTop: 6, fontSize: '0.75rem', opacity: 0.7 }}>
        {t('feedbackForm.fileHint', 'PDF, JPG, PNG, DOC — do 10 MB')}
      </small>

      {errorMessage && (
        <span className="form-group__error" role="alert">
          {t(errorMessage)}
        </span>
      )}
    </div>
  );
};

export default FileUploadField;
