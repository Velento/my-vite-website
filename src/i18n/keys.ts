import type { ParseKeys } from 'i18next';

/**
 * Union of every valid translation key, derived from the augmented i18next
 * types (see i18next.d.ts). Use it to assert that a runtime-built or
 * library-sourced string (e.g. a react-hook-form error message that holds an
 * i18n key, or a numeric `features.${i}` index) is a real key, while keeping
 * all static `t('...')` calls fully checked.
 */
export type TranslationKey = ParseKeys;
