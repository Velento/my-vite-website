import { VIBER_HREF } from '../constants/contact';

const FALLBACK_URL = 'https://www.viber.com/download/';
const VIBER_REDIRECT_DELAY_MS = 500;

/**
 * Open Viber chat, with fallback to download page if app is not installed.
 */
export function openViberChat(e: { preventDefault: () => void }): void {
  e.preventDefault();
  window.location.href = VIBER_HREF;

  setTimeout(() => {
    if (!document.hasFocus()) return;
    window.location.href = FALLBACK_URL;
  }, VIBER_REDIRECT_DELAY_MS);
}
