/// <reference types="vite/client" />

declare module 'swiper/css';
declare module 'swiper/css/*';

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ADS_CONVERSION_ID?: string;
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  readonly VITE_TELEGRAM_CHAT_ID?: string;
  readonly VITE_FORM_PROXY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    push?: unknown;
    loaded?: boolean;
    version?: string;
    _fbq?: unknown;
  };
  _fbq?: unknown;
}
