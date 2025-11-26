import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { completeFormSchema, stepOneSchema, stepTwoSchema, stepThreeSchema } from '@/features/application-form/validation';
import { makeZodI18nMap } from '@/lib/i18n';
import type { ApplicationData } from '@/features/application-form/types';
import { STORAGE_KEYS, DEFAULT_VALUES } from '@/config/constants';
import { setSecureItem, getSecureItem, removeSecureItem } from '@/lib/secureStorage';

/**
 * Interface for saved form session - includes both form data and progress state
 */
interface SavedFormSession {
  formData: ApplicationData;
  currentStep: number;
  lastModified: number;
}

interface UseFormWizardProps {
  initialData: ApplicationData;
  onSubmit: (data: ApplicationData) => void;
  totalSteps: number;
}

export function useFormWizard({ initialData, onSubmit, totalSteps }: UseFormWizardProps) {
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSavedData, setLastSavedData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const errorMap = makeZodI18nMap(intl);
    z.setErrorMap(errorMap);
  }, [intl]);

  const form = useForm<ApplicationData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: initialData,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  /**
   * Check if a specific step has required data filled
   * Used to determine valid resume point
   */
  const isStepDataComplete = useCallback((step: number, data: ApplicationData): boolean => {
    switch (step) {
      case 1: {
        // Step 1: Personal Information - check required fields
        // Note: 'emirate' field stores region for all GCC countries (emirate/province/municipality/governorate)
        const step1Fields = ['fullNameEnglish', 'fullNameArabic', 'nationalId', 'dateOfBirth', 'gender', 'street', 'city', 'emirate', 'country', 'phoneNumber', 'email'] as const;
        return step1Fields.every(field => data[field] && data[field].trim() !== '');
      }
      case 2: {
        // Step 2: Family & Financial - check required fields
        const step2Fields = ['maritalStatus', 'numberOfDependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'] as const;
        return step2Fields.every(field => data[field] && data[field].trim() !== '');
      }
      case 3: {
        // Step 3: Situation Description - check required fields
        const step3Fields = ['financialSituation', 'reasonForApplying'] as const;
        return step3Fields.every(field => data[field] && data[field].trim() !== '');
      }
      default:
        return false;
    }
  }, []);

  /**
   * Determine the last valid step user can resume to
   * Returns the highest step where all previous steps are complete
   */
  const getValidResumeStep = useCallback((savedStep: number, data: ApplicationData): number => {
    // Clamp to valid range
    const clampedStep = Math.min(Math.max(savedStep, 1), totalSteps);

    // Step 1 is always valid to resume
    if (clampedStep === 1) return 1;

    // For steps 2-4, check if previous steps have data
    // We check if user has STARTED the step, not necessarily completed it
    for (let step = 1; step < clampedStep; step++) {
      if (!isStepDataComplete(step, data)) {
        // Previous step incomplete, resume to that step
        return step;
      }
    }

    // All previous steps complete, can resume to saved step
    return clampedStep;
  }, [totalSteps, isStepDataComplete]);

  /**
   * Type guard to check if saved data is new format (SavedFormSession) or legacy format (ApplicationData)
   */
  const isSavedFormSession = (data: unknown): data is SavedFormSession => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'formData' in data &&
      'currentStep' in data &&
      typeof (data as SavedFormSession).currentStep === 'number'
    );
  };

  const handleSaveProgress = async () => {
    const formData = form.getValues();
    const hasData = Object.values(formData).some(value =>
      value !== '' && value !== null && value !== undefined
    );

    if (hasData) {
      try {
        // Save both form data and current step for resume journey
        const sessionData: SavedFormSession = {
          formData,
          currentStep,
          lastModified: Date.now(),
        };
        await setSecureItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION, sessionData);
        const serializedData = JSON.stringify(formData);
        setLastSavedData(serializedData);
        toast.success(intl.formatMessage({ id: 'toast.progressSaved' }));
      } catch (error) {
        console.error('Failed to save progress:', error);
        toast.error(intl.formatMessage({ id: 'toast.saveFailed' }));
      }
    }
  };

  useEffect(() => {
    const loadSecureData = async () => {
      try {
        // Try to load saved data - could be new format (SavedFormSession) or legacy format (ApplicationData)
        const savedData = await getSecureItem<SavedFormSession | ApplicationData>(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);

        if (!savedData) return;

        let formData: ApplicationData;
        let savedStep = 1;

        // Handle both new and legacy data formats for backwards compatibility
        if (isSavedFormSession(savedData)) {
          // New format: extract form data and step
          formData = savedData.formData;
          savedStep = savedData.currentStep;
        } else {
          // Legacy format: data is the form data itself, default to step 1
          formData = savedData as ApplicationData;
        }

        // Check if form data has any meaningful content
        const hasData = Object.values(formData).some(value =>
          value !== '' && value !== null && value !== undefined
        );

        if (!hasData) {
          removeSecureItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
          return;
        }

        // Restore form data
        form.reset(formData);
        setLastSavedData(JSON.stringify(formData));

        // Determine valid resume step (validate previous steps are complete)
        const validResumeStep = getValidResumeStep(savedStep, formData);

        // Only change step if we have a valid step > 1
        if (validResumeStep > 1) {
          setCurrentStep(validResumeStep);
          // Show resume toast with step info
          toast.success(
            intl.formatMessage(
              { id: 'toast.resumingFromStep' },
              { step: validResumeStep }
            )
          );
        } else {
          // Just restored data, starting from step 1
          toast.success(intl.formatMessage({ id: 'toast.previousDataRestored' }));
        }
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    };

    loadSecureData();
  }, [form, intl, getValidResumeStep]);

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof ApplicationData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = Object.keys(stepOneSchema.shape) as (keyof ApplicationData)[];
        break;
      case 2:
        fieldsToValidate = Object.keys(stepTwoSchema.shape) as (keyof ApplicationData)[];
        break;
      case 3:
        fieldsToValidate = Object.keys(stepThreeSchema.shape) as (keyof ApplicationData)[];
        break;
      default:
        return true;
    }

    const result = await form.trigger(fieldsToValidate);

    if (!result) {
      const errors = form.formState.errors;
      const firstError = fieldsToValidate.find((field) => errors[field]);

      if (firstError && errors[firstError]) {
        const errorMessage = errors[firstError]?.message;
        if (errorMessage) {
          toast.error(intl.formatMessage({ id: errorMessage }));
        }
      }
    }

    return result;
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    try {
      const isValid = await validateStep(currentStep);

      if (isValid) {
        if (currentStep === totalSteps) {
          const formData = form.getValues();
          onSubmit(formData);
          removeSecureItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
        } else {
          setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasUnsavedChanges = () => {
    const currentFormData = form.getValues();

    // Check if form has any data at all
    const hasData = Object.values(currentFormData).some(value =>
      value !== '' && value !== null && value !== undefined
    );

    // If no data, no unsaved changes
    if (!hasData) {
      return false;
    }

    // If no last saved data, then we have unsaved changes
    if (!lastSavedData) {
      return true;
    }

    // Compare current data with last saved data
    const currentSerialized = JSON.stringify(currentFormData);
    return currentSerialized !== lastSavedData;
  };

  const hasAnyData = () => {
    const currentFormData = form.getValues();

    // Exclude default values that are set on initialization
    const excludedDefaults: string[] = [DEFAULT_VALUES.DEFAULT_REGION, DEFAULT_VALUES.COUNTRY];

    return Object.entries(currentFormData).some(([, value]) => {
      // Skip if value is empty
      if (value === '' || value === null || value === undefined) {
        return false;
      }

      // Skip default values
      if (excludedDefaults.includes(value as string)) {
        return false;
      }

      return true;
    });
  };

  const revertToLastSave = () => {
    if (lastSavedData) {
      try {
        const parsed = JSON.parse(lastSavedData);
        form.reset(parsed);
      } catch (e) {
        console.error('Failed to revert to last save', e);
      }
    }
  };

  return {
    form,
    currentStep,
    handleNext,
    handlePrevious,
    handleEditStep,
    handleSaveProgress,
    hasUnsavedChanges,
    hasAnyData,
    revertToLastSave,
    isSubmitting,
  };
}
