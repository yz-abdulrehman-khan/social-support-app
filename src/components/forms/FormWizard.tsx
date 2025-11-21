import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { StepOne } from '@/components/forms/steps/StepOne';
import { StepTwo } from '@/components/forms/steps/StepTwo';
import { StepThree } from '@/components/forms/steps/StepThree';
import { StepFour } from '@/components/forms/steps/StepFour';
import type { ApplicationData } from '@/features/application-form/types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n-utils';
import { completeFormSchema, stepOneSchema, stepTwoSchema, stepThreeSchema } from '@/lib/form-validation';
import { z } from 'zod';
import { makeZodI18nMap } from '@/lib/zod-i18n';

type Language = 'en' | 'ar';

interface FormWizardProps {
  initialData: ApplicationData;
  onSubmit: (data: ApplicationData) => void;
  language?: Language;
  onLanguageToggle?: () => void;
  onBreadcrumbHome?: () => void;
}

export function FormWizard({ initialData, onSubmit, language = 'en', onLanguageToggle, onBreadcrumbHome }: FormWizardProps) {
  const intl = useIntl();
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 4;
  const isRTL = language === 'ar';

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

  const steps = [
    { number: 1, label: intl.formatMessage({ id: 'form.steps.personal.title' }), completed: currentStep > 1 },
    { number: 2, label: intl.formatMessage({ id: 'form.steps.financial.title' }), completed: currentStep > 2 },
    { number: 3, label: intl.formatMessage({ id: 'form.steps.situation.title' }), completed: currentStep > 3 },
    { number: 4, label: intl.formatMessage({ id: 'form.steps.review.title' }), completed: currentStep > 4 },
  ];

  useEffect(() => {
    const subscription = form.watch((formData) => {
      const autoSave = setInterval(() => {
        localStorage.setItem('financialAssistanceApplication', JSON.stringify(formData));
      }, 30000);

      return () => clearInterval(autoSave);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    const savedData = localStorage.getItem('financialAssistanceApplication');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
        toast.success(intl.formatMessage({ id: 'toast.previousDataRestored' }));
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
    const isValid = await validateStep(currentStep);

    if (isValid) {
      if (currentStep === totalSteps) {
        const formData = form.getValues();
        onSubmit(formData);
        localStorage.removeItem('financialAssistanceApplication');
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
      <TammHeader language={language} onLanguageToggle={onLanguageToggle} />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-5">
            <a href="#" className="text-accent hover:underline" onClick={onBreadcrumbHome}>{intl.formatMessage({ id: 'common.home' })}</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{intl.formatMessage({ id: 'form.title' })}</span>
          </nav>

          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground-dark mb-8 ${isRTL ? 'text-right' : ''}`}>
            {intl.formatMessage({ id: 'form.title' })}
          </h1>

          <div className="flex gap-6 items-start relative">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-6">
                <div className="bg-surface-light rounded-lg p-6">
                  <h2 className="text-xs md:text-sm font-semibold text-foreground-dark mb-6">
                    {intl.formatMessage({ id: 'common.questions' })}
                  </h2>
                  <nav className="relative">
                    <div
                      className="absolute top-3 bottom-3 w-0.5 bg-accent"
                      style={{
                        [isRTL ? 'right' : 'left']: '9px'
                      }}
                    />

                    <div className="relative space-y-4">
                      {steps.map((step) => {
                        const isActive = step.number === currentStep;
                        const isCompleted = step.completed;

                        return (
                          <div
                            key={step.number}
                            className="flex items-start gap-3 relative"
                          >
                            <div
                              className={`
                                w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative z-10 text-xs font-semibold
                                ${isCompleted
                                  ? 'bg-success-light text-white'
                                  : 'border-2 border-accent bg-white text-accent'
                                }
                              `}
                            >
                              {isCompleted ? (
                                <Check className="w-3 h-3" strokeWidth={3} />
                              ) : (
                                language === 'ar' ? toArabicNumerals(String(step.number)) : step.number
                              )}
                            </div>
                            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                              <p
                                className={`text-xs md:text-sm leading-tight ${
                                  isActive ? 'text-accent font-medium' : 'text-foreground-dark'
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </nav>
                </div>
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              <Form {...form}>
                {currentStep === 1 && (
                  <StepOne
                    control={form.control}
                    stepNumber={1}
                    language={language}
                  />
                )}
                {currentStep === 2 && (
                  <StepTwo
                    control={form.control}
                    stepNumber={2}
                    language={language}
                  />
                )}
                {currentStep === 3 && (
                  <StepThree
                    control={form.control}
                    stepNumber={3}
                    language={language}
                  />
                )}
                {currentStep === 4 && (
                  <StepFour
                    data={form.getValues()}
                    onEdit={handleEditStep}
                    stepNumber={4}
                    language={language}
                  />
                )}
              </Form>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="subtle"
                      onClick={handlePrevious}
                      className="rounded-full px-6 h-10 font-normal"
                    >
                      {isRTL ? (
                        <>
                          <span>{intl.formatMessage({ id: 'common.previous' })}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-4 h-4" />
                          <span>{intl.formatMessage({ id: 'common.previous' })}</span>
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="rounded-full px-6 h-10 font-normal inline-flex items-center gap-2 bg-theme-accent hover:bg-theme-accent-hover text-white"
                  >
                    {isRTL ? (
                      <>
                        <span>
                          {currentStep === totalSteps
                            ? intl.formatMessage({ id: 'form.navigation.submitApplication' })
                            : currentStep === 3
                            ? intl.formatMessage({ id: 'form.navigation.reviewSubmit' })
                            : intl.formatMessage({ id: 'common.next' })}
                        </span>
                        <ArrowLeft className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>
                          {currentStep === totalSteps
                            ? intl.formatMessage({ id: 'form.navigation.submitApplication' })
                            : currentStep === 3
                            ? intl.formatMessage({ id: 'form.navigation.reviewSubmit' })
                            : intl.formatMessage({ id: 'common.next' })}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="cancel"
                  onClick={() => currentStep === 1 && onBreadcrumbHome ? onBreadcrumbHome() : window.history.back()}
                  className="rounded-full px-6 h-10 font-normal"
                >
                  {intl.formatMessage({ id: 'common.cancel' })}
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>

      <TammFooter language={language} />
    </div>
  );
}