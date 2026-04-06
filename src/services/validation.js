/**
 * Shared form validation rules.
 * Single source of truth — used by useLeadForm hook + form components.
 */

/** Matches Latin, Cyrillic, Ukrainian, Belarusian names (min 2 chars). */
export const NAME_REGEX = /^[A-Za-zА-Яа-яЁёЄєІіЇїҐґ\s'-]{2,}$/u;

/** Matches international phone numbers (min 9 digits, allows +, spaces, dashes, parens). */
export const PHONE_REGEX = /^\+?[\d\s\-()]{9,}$/;

/**
 * Check if name is valid. Empty string = valid (optional field state).
 * @param {string} value
 * @returns {boolean}
 */
export function isValidName(value) {
  return value === '' || NAME_REGEX.test(value.trim());
}

/**
 * Check if phone is valid. Empty string = valid (optional field state).
 * @param {string} value
 * @returns {boolean}
 */
export function isValidPhone(value) {
  return value === '' || PHONE_REGEX.test(value.trim());
}

/**
 * Check if both fields are filled and valid — ready to submit.
 * @param {string} name
 * @param {string} phone
 * @returns {boolean}
 */
export function canSubmitForm(name, phone) {
  return NAME_REGEX.test(name.trim()) && PHONE_REGEX.test(phone.trim());
}
