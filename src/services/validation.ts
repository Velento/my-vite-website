/**
 * Shared form validation rules.
 * Single source of truth — used by LeedForm + FeedBackForm via react-hook-form.
 */

import { z } from 'zod';
import { ALLOWED_LEAD_FILE_TYPES, MAX_LEAD_FILE_BYTES } from './telegram';

/**
 * Matches names in any script (Latin with Polish/PL diacritics, Cyrillic,
 * Ukrainian, Belarusian, etc.). `\p{L}` is the Unicode “letter” class — covers
 * ą ć ę ł ń ó ś ź ż, ä ö ü, ñ, õ and the rest without hand-enumerating ranges.
 * `\p{M}` is included so combining marks (e.g. accents in normalized form) pass.
 * Min 2 chars.
 */
export const NAME_REGEX = /^[\p{L}\p{M}\s'-]{2,}$/u;

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
  /**
   * Honeypot. Hidden from humans via off-screen styling; only bots that fill
   * every field will populate it. Accepts any value so validation never fails
   * (a visible error would teach a bot what tripped it) - the form checks this
   * field at submit time and silently drops bot submissions.
   */
  website: z.string().optional(),
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
