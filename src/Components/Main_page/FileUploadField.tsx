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

  // Compose RHF's ref with our local one so we can imperatively reset the
  // input when the user clicks "remove".
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
    if (internalInputRef.current) {
      internalInputRef.current.value = '';
    }
    setSelected(null);
    // Tell RHF the field is now empty.
    rhfOnChange({
      target: { name: registration.name, value: undefined },
    } as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`form-group ${errorMessage ? 'form-group--error' : ''}`}>
      <label htmlFor={id}>{t('feedbackForm.file', 'Załącz dokument (opcjonalnie)')}</label>

      {/* Native input visually hidden but accessible — clicking the styled
          button below proxies through the htmlFor association. */}
      <input
        id={id}
        type="file"
        accept={ACCEPT}
        disabled={disabled}
        className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
        style={{ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)' }}
        {...rhfRest}
        ref={(el) => {
          rhfRef(el);
          internalInputRef.current = el;
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <label
        htmlFor={id}
        className="mt-1 inline-flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-bg-alt)] px-4 py-3 text-[0.9rem] font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-white hover:text-[var(--color-text)]"
      >
        <svg
          width="18"
          height="18"
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
      </label>

      {selected && (
        <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-[var(--color-border-light)] bg-white px-3 py-2 text-[0.85rem]">
          <span className="flex min-w-0 items-center gap-2">
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
            <span className="truncate text-[var(--color-text)]" title={selected.name}>
              {selected.name}
            </span>
            <span className="shrink-0 text-[var(--color-text-tertiary)]">
              {formatBytes(selected.size)}
            </span>
          </span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label={t('feedbackForm.fileRemove', 'Usuń plik')}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-[var(--color-text-tertiary)] transition-colors duration-150 hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-error)]"
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

      <small className="mt-1 block text-[0.75rem] opacity-70">
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
