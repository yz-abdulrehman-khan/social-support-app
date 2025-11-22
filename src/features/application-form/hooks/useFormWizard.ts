import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { completeFormSchema, stepOneSchema, stepTwoSchema, stepThreeSchema } from '@/features/application-form/validation';
import { makeZodI18nMap } from '@/lib/i18n';
import type { ApplicationData } from '@/features/application-form/types';
import { STORAGE_KEYS, DEFAULT_VALUES } from '@/config/constants';

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

  const handleSaveProgress = () => {
    const formData = form.getValues();
    // Only save if there's actual data (not just empty initial values)
    const hasData = Object.values(formData).some(value =>
      value !== '' && value !== null && value !== undefined
    );

    if (hasData) {
      const serializedData = JSON.stringify(formData);
      localStorage.setItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION, serializedData);
      setLastSavedData(serializedData);
      toast.success(intl.formatMessage({ id: 'toast.progressSaved' }));
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Only restore if there's actual data (not just empty initial values)
        const hasData = Object.values(parsed).some(value =>
          value !== '' && value !== null && value !== undefined
        );

        if (hasData) {
          form.reset(parsed);
          setLastSavedData(savedData);
          toast.success(intl.formatMessage({ id: 'toast.previousDataRestored' }));
        } else {
          // Clean up empty data from localStorage
          localStorage.removeItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
        }
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, [form, intl]);

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
          localStorage.removeItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
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
    const excludedDefaults: string[] = [DEFAULT_VALUES.DEFAULT_EMIRATE, DEFAULT_VALUES.COUNTRY];

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
