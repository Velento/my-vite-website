/**
 * Lead form draft caching.
 *
 * Persists a form's text fields to sessionStorage so an accidental refresh,
 * an exit-intent popup, or navigating away and back does not wipe what the
 * visitor already typed.
 *
 * Why sessionStorage and not localStorage: a name and phone number are
 * personal data (RODO/GDPR). sessionStorage keeps the draft alive across
 * reloads within the same tab but drops it the moment the tab closes, so
 * nothing personal lingers on a shared or public computer. File attachments
 * are never cached: a FileList cannot be serialized, and re-attaching a
 * document is the safer default anyway.
 */

import { useCallback, useEffect, useRef } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

/** A persisted draft: a flat map of cached field name -> value. */
type Draft = Record<string, string>;

/**
 * Read a saved draft. Returns `{}` when nothing is stored, the payload is
 * malformed, or storage is unavailable (private mode, blocked cookies).
 *
 * Call this inside the form's `defaultValues` so cached values are present
 * from the first paint, with no empty-then-filled flash:
 *
 *   defaultValues: { name: '', phone: '', ...loadDraft(KEY) }
 */
export function loadDraft(storageKey: string): Draft {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const draft: Draft = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === 'string') draft[key] = value;
    }
    return draft;
  } catch {
    return {};
  }
}

function writeDraft(storageKey: string, draft: Draft | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (draft === null) {
      window.sessionStorage.removeItem(storageKey);
    } else {
      window.sessionStorage.setItem(storageKey, JSON.stringify(draft));
    }
  } catch {
    // Storage blocked or quota exceeded - caching is best-effort, never fatal.
  }
}

/**
 * Subscribes to a react-hook-form instance and mirrors the listed string
 * fields into sessionStorage on every change. The draft is dropped
 * automatically once every cached field is empty.
 *
 * @param storageKey  sessionStorage key (share it across form instances that
 *                     capture the same lead so one pre-fills the other).
 * @param watch        the `watch` function from `useForm`.
 * @param fields       field names to cache - pass a module-level constant so
 *                     its identity stays stable across renders.
 * @returns `clearDraft` - call it once the lead has been delivered.
 */
export function useFormDraft<T extends FieldValues>(
  storageKey: string,
  watch: UseFormReturn<T>['watch'],
  fields: readonly Path<T>[]
): { clearDraft: () => void } {
  // `fields` is expected to be a stable module-level constant; the ref keeps
  // the subscription effect from re-running even if a caller passes a fresh
  // array literal.
  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;

  useEffect(() => {
    const subscription = watch((values) => {
      const draft: Draft = {};
      let hasContent = false;
      for (const field of fieldsRef.current) {
        const value = (values as Record<string, unknown>)[field];
        if (typeof value === 'string' && value.trim() !== '') {
          draft[field] = value;
          hasContent = true;
        }
      }
      writeDraft(storageKey, hasContent ? draft : null);
    });
    return () => subscription.unsubscribe();
  }, [watch, storageKey]);

  const clearDraft = useCallback(() => writeDraft(storageKey, null), [storageKey]);

  return { clearDraft };
}
