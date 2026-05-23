import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGS = ['ru', 'pl', 'ua', 'en', 'by'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

/** localStorage key for the visitor's chosen language. Single source of truth. */
export const LANG_STORAGE_KEY = 'legal_line_lang';

const FALLBACK: Lang = 'ru';

/** Type guard: true when `value` is one of the supported language codes. */
export function isSupportedLang(value: string | null | undefined): value is Lang {
  return typeof value === 'string' && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

// Each locale is its own chunk — only the detected language is loaded for
// the initial paint. Other languages are fetched on first switch.
const loaders: Record<Lang, () => Promise<{ default: Record<string, unknown> }>> = {
  ru: () => import('./i18n/locales/ru'),
  pl: () => import('./i18n/locales/pl'),
  ua: () => import('./i18n/locales/ua'),
  en: () => import('./i18n/locales/en'),
  by: () => import('./i18n/locales/by'),
};

function detectLanguage(): Lang {
  if (typeof window === 'undefined') return FALLBACK;
  const segment = window.location.pathname.split('/')[1]?.toLowerCase();
  if (isSupportedLang(segment)) return segment;
  const saved = window.localStorage?.getItem(LANG_STORAGE_KEY);
  if (isSupportedLang(saved)) return saved;
  return FALLBACK;
}

function htmlLangFor(lng: string): string {
  return lng === 'ua' ? 'uk' : lng === 'by' ? 'be' : lng;
}

export type { Lang };

export async function loadBundle(lng: Lang): Promise<void> {
  if (i18n.hasResourceBundle(lng, 'translation')) return;
  const mod = await loaders[lng]();
  i18n.addResourceBundle(lng, 'translation', mod.default, true, true);
}

let initPromise: Promise<typeof i18n> | null = null;

export function initI18n(): Promise<typeof i18n> {
  if (initPromise) return initPromise;

  const lng = detectLanguage();

  initPromise = (async () => {
    const initial = await loaders[lng]();

    await i18n.use(initReactI18next).init({
      resources: { [lng]: { translation: initial.default } },
      lng,
      fallbackLng: FALLBACK,
      interpolation: { escapeValue: false },
    });

    if (typeof document !== 'undefined') {
      document.documentElement.lang = htmlLangFor(lng);
    }

    // Warm the fallback in the background so missing keys resolve quickly,
    // unless it's already the active language.
    if (lng !== FALLBACK) {
      void loadBundle(FALLBACK);
    }

    return i18n;
  })();

  return initPromise;
}

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = htmlLangFor(lng);
  }
  if (isSupportedLang(lng)) {
    void loadBundle(lng);
  }
});

export default i18n;
