import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const SUPPORTED_LANGS = ['ru', 'pl', 'ua', 'en', 'by'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const FALLBACK: Lang = 'ru';

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
  if (segment && (SUPPORTED_LANGS as readonly string[]).includes(segment)) {
    return segment as Lang;
  }
  const saved = window.localStorage?.getItem('legal_line_lang');
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    return saved as Lang;
  }
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
  if ((SUPPORTED_LANGS as readonly string[]).includes(lng)) {
    void loadBundle(lng as Lang);
  }
});

export default i18n;
