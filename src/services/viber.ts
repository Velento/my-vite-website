/**
 * Viber deep-link helper — shared between Contacts and ContactModal.
 */

const VIBER_URL = 'viber://chat?number=%2B48883734171';
const FALLBACK_URL = 'https://www.viber.com/download/';
const VIBER_REDIRECT_DELAY_MS = 500;

/**
 * Open Viber chat, with fallback to download page if app is not installed.
 */
export function openViberChat(e: { preventDefault: () => void }): void {
  e.preventDefault();
  window.location.href = VIBER_URL;

  setTimeout(() => {
    if (!document.hasFocus()) return;
    window.location.href = FALLBACK_URL;
  }, VIBER_REDIRECT_DELAY_MS);
}
