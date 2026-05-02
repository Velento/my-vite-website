/**
 * Shared form validation rules.
 * Single source of truth — used by useLeadForm hook + form components.
 */

import { z } from 'zod';
import { ALLOWED_LEAD_FILE_TYPES, MAX_LEAD_FILE_BYTES } from './telegram';

/** Matches Latin, Cyrillic, Ukrainian, Belarusian names (min 2 chars). */
export const NAME_REGEX = /^[A-Za-zА-Яа-яЁёЄєІіЇїҐґ\s'-]{2,}$/u;

/** Matches international phone numbers (min 9 digits, allows +, spaces, dashes, parens). */
export const PHONE_REGEX = /^\+?[\d\s\-()]{9,}$/;

/**
 * Zod schema for lead capture form. Use with @hookform/resolvers/zod.
 * Validation messages use i18n keys — translate at the form level.
 *
 * `file` is a FileList (RHF default for <input type="file">). It is optional;
 * when present, we accept the first entry and validate type + size.
 */
export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'feedbackForm.nameError' })
    .regex(NAME_REGEX, { message: 'feedbackForm.nameError' }),
  phone: z.string().trim().regex(PHONE_REGEX, { message: 'feedbackForm.phoneError' }),
  promo: z.string().trim().max(30).optional().or(z.literal('')),
  file: z
    .custom<FileList | undefined>((v) => v === undefined || v instanceof FileList, {
      message: 'feedbackForm.fileError',
    })
    .optional()
    .refine((list) => !list || list.length === 0 || list[0]!.size <= MAX_LEAD_FILE_BYTES, {
      message: 'feedbackForm.fileTooLarge',
    })
    .refine(
      (list) => !list || list.length === 0 || ALLOWED_LEAD_FILE_TYPES.includes(list[0]!.type),
      { message: 'feedbackForm.fileTypeError' }
    ),
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
