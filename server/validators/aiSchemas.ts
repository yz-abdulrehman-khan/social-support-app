import { z } from 'zod';

/**
 * Validation schema for rephrase endpoint
 */
export const rephraseSchema = z.object({
  body: z.object({
    text: z.string()
      .min(1, 'Text is required')
      .max(2000, 'Text must be less than 2000 characters')
      .trim(),
    language: z.enum(['en', 'ar']),
  }),
});

/**
 * Validation schema for translate endpoint
 */
export const translateSchema = z.object({
  body: z.object({
    text: z.string()
      .min(1, 'Text is required')
      .max(200, 'Text must be less than 200 characters')
      .trim(),
    direction: z.enum(['toArabic', 'toEnglish']),
  }),
});

export type RephraseRequest = z.infer<typeof rephraseSchema>['body'];
export type TranslateRequest = z.infer<typeof translateSchema>['body'];
