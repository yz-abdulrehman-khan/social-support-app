import { z } from 'zod';
import { AI_VALIDATION_CONSTRAINTS, AI_VALIDATION_MESSAGES } from '../config/validation.js';

/**
 * Validation schema for rephrase endpoint
 */
export const rephraseSchema = z.object({
  body: z.object({
    text: z.string()
      .min(1, AI_VALIDATION_MESSAGES.TEXT_REQUIRED)
      .max(AI_VALIDATION_CONSTRAINTS.REPHRASE_MAX_LENGTH, AI_VALIDATION_MESSAGES.REPHRASE_TOO_LONG)
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
      .min(1, AI_VALIDATION_MESSAGES.TEXT_REQUIRED)
      .max(AI_VALIDATION_CONSTRAINTS.TRANSLATE_MAX_LENGTH, AI_VALIDATION_MESSAGES.TRANSLATE_TOO_LONG)
      .trim(),
    direction: z.enum(['toArabic', 'toEnglish']),
  }),
});

export type RephraseRequest = z.infer<typeof rephraseSchema>['body'];
export type TranslateRequest = z.infer<typeof translateSchema>['body'];
