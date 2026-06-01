/**
 * Shared form validation rules.
 * Single source of truth — used by LeedForm + FeedBackForm via react-hook-form.
 */

import { z } from 'zod';
import {
  ALLOWED_LEAD_FILE_TYPES,
  MAX_LEAD_FILE_BYTES,
  NAME_REGEX,
  PHONE_REGEX,
} from '../shared/leadRules';

// Re-exported so existing importers (and tests) keep resolving them from here;
// the definitions now live in the shared module used by the Worker too.
export { NAME_REGEX, PHONE_REGEX };

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
