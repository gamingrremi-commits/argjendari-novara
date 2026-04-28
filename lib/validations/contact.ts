import { z } from 'zod';
import type { Locale } from '@/lib/types';

export const BookingTypeEnum = z.enum([
  'showroom_visit',
  'engagement_consultation',
  'custom_order',
  'repair',
  'appraisal',
  'general',
]);

export const BOOKING_TYPES = BookingTypeEnum.options;

export type BookingType = z.infer<typeof BookingTypeEnum>;

const VALIDATION_MESSAGES = {
  sq: {
    firstNameMin: 'Emri duhet të ketë të paktën 2 karaktere',
    firstNameMax: 'Emri është shumë i gjatë',
    lastNameMin: 'Mbiemri duhet të ketë të paktën 2 karaktere',
    lastNameMax: 'Mbiemri është shumë i gjatë',
    email: 'Email i pavlefshëm',
    phoneMin: 'Telefon i pavlefshëm (min 6 shifra)',
    phoneMax: 'Telefon i pavlefshëm',
    phonePattern: 'Telefoni mund të përmbajë vetëm numra, hapësira, +, -, ( )',
    messageMax: 'Mesazhi është shumë i gjatë',
    bot: 'Bot detected',
  },
  en: {
    firstNameMin: 'First name must be at least 2 characters',
    firstNameMax: 'First name is too long',
    lastNameMin: 'Last name must be at least 2 characters',
    lastNameMax: 'Last name is too long',
    email: 'Invalid email address',
    phoneMin: 'Invalid phone number (minimum 6 digits)',
    phoneMax: 'Invalid phone number',
    phonePattern: 'Phone can contain only numbers, spaces, +, -, ( )',
    messageMax: 'Message is too long',
    bot: 'Bot detected',
  },
} as const;

const optionalString = z
  .string()
  .optional()
  .transform((value) => (value === '' ? undefined : value));

export function isBookingType(value: string): value is BookingType {
  return (BOOKING_TYPES as readonly string[]).includes(value);
}

export function getContactFormSchema(locale: Locale = 'sq') {
  const messages = VALIDATION_MESSAGES[locale];

  return z.object({
    first_name: z
      .string()
      .min(2, messages.firstNameMin)
      .max(50, messages.firstNameMax),
    last_name: z
      .string()
      .min(2, messages.lastNameMin)
      .max(50, messages.lastNameMax),
    email: z.string().email(messages.email).max(200),
    phone: z
      .string()
      .min(6, messages.phoneMin)
      .max(20, messages.phoneMax)
      .regex(/^[\d\s+\-()]+$/, messages.phonePattern),
    type: BookingTypeEnum,
    message: z
      .string()
      .max(2000, messages.messageMax)
      .optional()
      .transform((value) => (value === '' ? undefined : value)),
    preferred_date: optionalString,
    product_slug: optionalString,
    locale: z.enum(['sq', 'en']).optional().default(locale),
    website: z.string().max(0, messages.bot).optional().or(z.literal('')),
  });
}

export const ContactFormSchema = getContactFormSchema('sq');

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const BOOKING_TYPE_LABELS = {
  sq: {
    showroom_visit: 'Rezervo provim në dyqan',
    engagement_consultation: 'Konsultim për unazë fejese',
    custom_order: 'Porosi me dizajn personal',
    repair: 'Riparim ose restaurim',
    appraisal: 'Vlerësim & certifikim',
    general: 'Pyetje e përgjithshme',
  },
  en: {
    showroom_visit: 'Book in-store visit',
    engagement_consultation: 'Engagement ring consultation',
    custom_order: 'Custom design order',
    repair: 'Repair or restoration',
    appraisal: 'Appraisal & certification',
    general: 'General inquiry',
  },
} as const;
