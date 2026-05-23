/**
 * Compile-time typing for translation keys.
 *
 * Augments i18next's CustomTypeOptions with the shape of the default ('ru')
 * locale so `t('some.key')` is checked against the real key set. A typo or a
 * key missing from the bundle becomes a TypeScript error instead of a silent
 * runtime fallback. The i18n parity guard (scripts/check-i18n.mjs) keeps the
 * other four locales aligned with this one.
 */
import 'i18next';
import type ruLocale from './locales/ru';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof ruLocale;
    };
    // Treat a missing key as a type error rather than widening to `string`.
    returnNull: false;
  }
}
