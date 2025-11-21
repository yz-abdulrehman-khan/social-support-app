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

export const formatEmiratesId = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';
  if (digits.length > 0) {
    formatted = digits.substring(0, 3);
  }
  if (digits.length >= 4) {
    formatted += '-' + digits.substring(3, 7);
  }
  if (digits.length >= 8) {
    formatted += '-' + digits.substring(7, 14);
  }
  if (digits.length >= 15) {
    formatted += '-' + digits.substring(14, 15);
  }

  return formatted;
};

export const formatUAEPhone = (value: string): string => {
  let cleaned = value.replace(/[^\d+]/g, '');

  if (!cleaned.startsWith('+971')) {
    if (cleaned.startsWith('971')) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      cleaned = '+971' + cleaned.substring(1);
    } else if (cleaned.length > 0 && cleaned[0] !== '+') {
      cleaned = '+971' + cleaned;
    }
  }

  if (cleaned.startsWith('+971')) {
    const digits = cleaned.substring(4);
    let formatted = '+971';

    if (digits.length > 0) {
      formatted += ' ' + digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formatted += ' ' + digits.substring(2, 5);
    }
    if (digits.length > 5) {
      formatted += ' ' + digits.substring(5, 9);
    }

    return formatted;
  }

  return cleaned;
};
