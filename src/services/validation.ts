/**
 * Shared form validation rules.
 * Single source of truth — used by useLeadForm hook + form components.
 */

import { z } from 'zod';

/** Matches Latin, Cyrillic, Ukrainian, Belarusian names (min 2 chars). */
export const NAME_REGEX = /^[A-Za-zА-Яа-яЁёЄєІіЇїҐґ\s'-]{2,}$/u;

/** Matches international phone numbers (min 9 digits, allows +, spaces, dashes, parens). */
export const PHONE_REGEX = /^\+?[\d\s\-()]{9,}$/;

/**
 * Zod schema for lead capture form. Use with @hookform/resolvers/zod.
 * Validation messages use i18n keys — translate at the form level.
 */
export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'feedbackForm.nameError' })
    .regex(NAME_REGEX, { message: 'feedbackForm.nameError' }),
  phone: z.string().trim().regex(PHONE_REGEX, { message: 'feedbackForm.phoneError' }),
  promo: z.string().trim().max(30).optional().or(z.literal('')),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

/** Check if name is valid. Empty string = valid (optional field state). */
export function isValidName(value: string): boolean {
  return value === '' || NAME_REGEX.test(value.trim());
}

/** Check if phone is valid. Empty string = valid (optional field state). */
export function isValidPhone(value: string): boolean {
  return value === '' || PHONE_REGEX.test(value.trim());
}

/** Check if both fields are filled and valid — ready to submit. */
export function canSubmitForm(name: string, phone: string): boolean {
  return NAME_REGEX.test(name.trim()) && PHONE_REGEX.test(phone.trim());
}
