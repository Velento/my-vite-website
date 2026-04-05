/**
 * Viber deep-link helper — shared between Contacts and ContactModal.
 */

/** @type {string} Viber deep link to open chat with Legal Line */
const VIBER_URL = 'viber://chat?number=%2B48883734171';

/** @type {string} Fallback URL if Viber is not installed */
const FALLBACK_URL = 'https://www.viber.com/download/';

/** @type {number} Time in ms to wait before redirecting to fallback */
const VIBER_REDIRECT_DELAY_MS = 500;

/**
 * Open Viber chat, with fallback to download page if app is not installed.
 * @param {MouseEvent} e - Click event from the Viber link
 * @returns {void}
 */
export function openViberChat(e) {
  e.preventDefault();
  window.location.href = VIBER_URL;

  setTimeout(() => {
    if (!document.hasFocus()) return;
    window.location.href = FALLBACK_URL;
  }, VIBER_REDIRECT_DELAY_MS);
}
