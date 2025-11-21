import { z } from 'zod';

const emiratesIdRegex = /^784-\d{4}-\d{7}-\d$/;
const uaePhoneRegex = /^\+971\s?\d{1,2}\s?\d{3}\s?\d{4}$/;

export const stepOneSchema = z.object({
  fullNameEnglish: z.string().min(1, 'validation.required'),
  fullNameArabic: z.string().min(1, 'validation.required'),
  nationalId: z.string()
    .min(1, 'validation.required')
    .regex(emiratesIdRegex, 'validation.invalidEmiratesId'),
  dateOfBirth: z.string().min(1, 'validation.required'),
  gender: z.string().min(1, 'validation.required'),
  street: z.string().min(1, 'validation.required'),
  city: z.string().min(1, 'validation.required'),
  emirate: z.string().min(1, 'validation.required'),
  country: z.literal('United Arab Emirates'),
  postalCode: z.string().optional(),
  phoneNumber: z.string()
    .min(1, 'validation.required')
    .regex(uaePhoneRegex, 'validation.invalidPhone'),
  email: z.string()
    .min(1, 'validation.required')
    .email('validation.invalidEmail'),
});

export const stepTwoSchema = z.object({
  maritalStatus: z.string().min(1, 'validation.required'),
  numberOfDependents: z.string()
    .min(1, 'validation.required')
    .regex(/^\d+$/, 'validation.invalidNumber'),
  employmentStatus: z.string().min(1, 'validation.required'),
  monthlyIncome: z.string()
    .min(1, 'validation.required')
    .regex(/^\d+$/, 'validation.invalidNumber'),
  housingStatus: z.string().min(1, 'validation.required'),
});

export const stepThreeSchema = z.object({
  financialSituation: z.string()
    .min(50, 'toast.provideDetailedDescription'),
  employmentCircumstances: z.string(),
  reasonForApplying: z.string(),
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
