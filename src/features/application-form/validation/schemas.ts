import { z } from 'zod';
import { VALIDATION_PATTERNS, VALIDATION_CONSTRAINTS, VALIDATION_MESSAGES } from '@/config/validation';
import { DEFAULT_VALUES } from '@/config/constants';

export const stepOneSchema = z.object({
  fullNameEnglish: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  fullNameArabic: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  nationalId: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.EMIRATES_ID, VALIDATION_MESSAGES.INVALID_EMIRATES_ID),
  dateOfBirth: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  gender: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  street: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  city: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  emirate: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  country: z.literal(DEFAULT_VALUES.COUNTRY),
  postalCode: z.string().optional(),
  phoneNumber: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.UAE_PHONE, VALIDATION_MESSAGES.INVALID_PHONE),
  email: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .email(VALIDATION_MESSAGES.INVALID_EMAIL),
});

export const stepTwoSchema = z.object({
  maritalStatus: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  numberOfDependents: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.NUMERIC_ONLY, VALIDATION_MESSAGES.INVALID_NUMBER),
  employmentStatus: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  monthlyIncome: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.NUMERIC_ONLY, VALIDATION_MESSAGES.INVALID_NUMBER),
  housingStatus: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
});

export const stepThreeSchema = z.object({
  financialSituation: z.string()
    .min(VALIDATION_CONSTRAINTS.FINANCIAL_SITUATION_MIN_LENGTH, VALIDATION_MESSAGES.PROVIDE_DETAILED_DESCRIPTION),
  employmentCircumstances: z.string().optional(),
  reasonForApplying: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED),
});

export const completeFormSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
});

export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;
