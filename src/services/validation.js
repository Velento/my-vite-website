/**
 * Shared form validation rules.
 * Single source of truth — used by useLeadForm hook + form components.
 */

export const NAME_REGEX = /^[A-Za-zА-Яа-яЁёЄєІіЇїҐґ\s'-]{2,}$/u;
export const PHONE_REGEX = /^\+?[\d\s\-()]{9,}$/;

export function isValidName(value) {
  return value === '' || NAME_REGEX.test(value.trim());
}

export function isValidPhone(value) {
  return value === '' || PHONE_REGEX.test(value.trim());
}

export function canSubmitForm(name, phone) {
  return NAME_REGEX.test(name.trim()) && PHONE_REGEX.test(phone.trim());
}
