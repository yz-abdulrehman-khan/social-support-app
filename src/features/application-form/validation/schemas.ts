import { z } from 'zod';
import { VALIDATION_PATTERNS, VALIDATION_CONSTRAINTS, VALIDATION_MESSAGES, PHONE_PATTERNS } from '@/config/validation';
import { GCC_COUNTRY_CODES, GCC_COUNTRIES } from '@/config/formData';

// Base step one schema without cross-field validation
const stepOneBaseSchema = z.object({
  fullNameEnglish: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  fullNameArabic: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  nationalId: z.string().optional(), // Made optional, required only for UAE
  dateOfBirth: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  gender: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  street: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  city: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  emirate: z.string().min(1, VALIDATION_MESSAGES.REQUIRED), // This is region (emirate/province/governorate/municipality)
  country: z.enum(GCC_COUNTRY_CODES as unknown as [string, ...string[]], VALIDATION_MESSAGES.REQUIRED),
  postalCode: z.string().optional(),
  phoneNumber: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  email: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .email(VALIDATION_MESSAGES.INVALID_EMAIL),
});

// Step one schema with cross-field validation for phone and national ID
export const stepOneSchema = stepOneBaseSchema.superRefine((data, ctx) => {
  const { country, phoneNumber, nationalId } = data;

  // Validate phone number based on country
  if (phoneNumber) {
    const phonePattern = PHONE_PATTERNS[country];
    if (phonePattern && !phonePattern.test(phoneNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_MESSAGES.INVALID_PHONE,
        path: ['phoneNumber'],
      });
    }
  }

  // National ID is required for all countries
  const countryConfig = GCC_COUNTRIES[country];
  if (countryConfig) {
    if (!nationalId || nationalId.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_MESSAGES.REQUIRED,
        path: ['nationalId'],
      });
    } else if (!countryConfig.idPattern.test(nationalId)) {
      // Use country-specific error message
      const errorMessage = country === 'UAE'
        ? VALIDATION_MESSAGES.INVALID_EMIRATES_ID
        : VALIDATION_MESSAGES.INVALID_NATIONAL_ID;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessage,
        path: ['nationalId'],
      });
    }
  }
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

// Complete form schema combining all steps
export const completeFormSchema = z.object({
  // Step 1 fields
  fullNameEnglish: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  fullNameArabic: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  nationalId: z.string().optional(),
  dateOfBirth: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  gender: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  street: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  city: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  emirate: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  country: z.enum(GCC_COUNTRY_CODES as unknown as [string, ...string[]], VALIDATION_MESSAGES.REQUIRED),
  postalCode: z.string().optional(),
  phoneNumber: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  email: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).email(VALIDATION_MESSAGES.INVALID_EMAIL),
  // Step 2 fields
  maritalStatus: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  numberOfDependents: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).regex(VALIDATION_PATTERNS.NUMERIC_ONLY, VALIDATION_MESSAGES.INVALID_NUMBER),
  employmentStatus: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  monthlyIncome: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).regex(VALIDATION_PATTERNS.NUMERIC_ONLY, VALIDATION_MESSAGES.INVALID_NUMBER),
  housingStatus: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  // Step 3 fields
  financialSituation: z.string().min(VALIDATION_CONSTRAINTS.FINANCIAL_SITUATION_MIN_LENGTH, VALIDATION_MESSAGES.PROVIDE_DETAILED_DESCRIPTION),
  employmentCircumstances: z.string().optional(),
  reasonForApplying: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
}).superRefine((data, ctx) => {
  const { country, phoneNumber, nationalId } = data;

  // Validate phone number based on country
  if (phoneNumber) {
    const phonePattern = PHONE_PATTERNS[country];
    if (phonePattern && !phonePattern.test(phoneNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_MESSAGES.INVALID_PHONE,
        path: ['phoneNumber'],
      });
    }
  }

  // National ID is required for all countries
  const countryConfig = GCC_COUNTRIES[country];
  if (countryConfig) {
    if (!nationalId || nationalId.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_MESSAGES.REQUIRED,
        path: ['nationalId'],
      });
    } else if (!countryConfig.idPattern.test(nationalId)) {
      // Use country-specific error message
      const errorMessage = country === 'UAE'
        ? VALIDATION_MESSAGES.INVALID_EMIRATES_ID
        : VALIDATION_MESSAGES.INVALID_NATIONAL_ID;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessage,
        path: ['nationalId'],
      });
    }
  }
});

export type StepOneFormData = z.infer<typeof stepOneBaseSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;
