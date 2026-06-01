/**
 * Shared lead-capture rules — the single source of truth for field formats,
 * upload limits and HTML escaping used on BOTH sides of the lead pipeline:
 * the browser (react-hook-form + zod) and the Cloudflare Worker proxy.
 *
 * Kept deliberately framework- and DOM-free (plain regex, arrays and a string
 * helper) so the Worker bundle can import it without pulling in any browser-only
 * types. The Worker imports it via a relative path (../src/shared/leadRules);
 * esbuild inlines it into the Worker bundle at deploy time, so the two formerly
 * duplicated copies of these rules can never drift apart again.
 */

/**
 * Names in any script: Latin (incl. Polish ą ć ę ł ń ó ś ź ż), Cyrillic,
 * Ukrainian, Belarusian, etc. `\p{L}` is any Unicode letter, `\p{M}` covers
 * combining marks. Length 2–50 — matches the input `maxLength` and lets the
 * client reject the same over-long values the Worker would.
 */
export const NAME_REGEX = /^[\p{L}\p{M}\s'-]{2,50}$/u;

/** International phone numbers: optional +, then 9–20 digits/spaces/dashes/parens. */
export const PHONE_REGEX = /^\+?[\d\s\-()]{9,20}$/;

/** Max upload size for a lead attachment (10 MB). */
export const MAX_LEAD_FILE_BYTES = 10 * 1024 * 1024;

/**
 * MIME types accepted for a lead attachment. Typed as `readonly string[]` (not
 * a literal tuple) so `.includes(file.type)` accepts an arbitrary string on the
 * client without a type error.
 */
export const ALLOWED_LEAD_FILE_TYPES: readonly string[] = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/**
 * Escapes the HTML-significant characters before interpolating visitor-supplied
 * text into a Telegram HTML message (parse_mode: 'HTML').
 */
export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
