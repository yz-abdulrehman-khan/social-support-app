import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { StepOne } from '@/components/forms/steps/StepOne';
import { StepTwo } from '@/components/forms/steps/StepTwo';
import { StepThree } from '@/components/forms/steps/StepThree';
import { StepFour } from '@/components/forms/steps/StepFour';
import type { ApplicationData } from '@/App';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useIntl } from 'react-intl';

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
  const [formData, setFormData] = useState<ApplicationData>(initialData);

  const totalSteps = 4;
  const isRTL = language === 'ar';

  const steps = [
    { number: 1, label: intl.formatMessage({ id: 'step1Title' }), completed: currentStep > 1 },
    { number: 2, label: intl.formatMessage({ id: 'step2Title' }), completed: currentStep > 2 },
    { number: 3, label: intl.formatMessage({ id: 'step3Title' }), completed: currentStep > 3 },
    { number: 4, label: intl.formatMessage({ id: 'step4Title' }), completed: currentStep > 4 },
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      localStorage.setItem('financialAssistanceApplication', JSON.stringify(formData));
    }, 30000);

    return () => clearInterval(autoSave);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('financialAssistanceApplication');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        toast.success(intl.formatMessage({ id: 'previousDataRestored' }));
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullNameEnglish || !formData.fullNameArabic || !formData.nationalId ||
            !formData.dateOfBirth || !formData.gender || !formData.street || !formData.city ||
            !formData.emirate || !formData.phoneNumber || !formData.email) {
          toast.error(intl.formatMessage({ id: 'fillRequiredFields' }));
          return false;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error(intl.formatMessage({ id: 'enterValidEmail' }));
          return false;
        }
        // Phone validation (basic)
        if (formData.phoneNumber.length < 9) {
          toast.error(intl.formatMessage({ id: 'enterValidPhone' }));
          return false;
        }
        return true;

      case 2:
        if (!formData.maritalStatus || !formData.employmentStatus || !formData.housingStatus) {
          toast.error(intl.formatMessage({ id: 'fillRequiredFields' }));
          return false;
        }
        return true;

      case 3:
        if (!formData.financialSituation || formData.financialSituation.length < 50) {
          toast.error(intl.formatMessage({ id: 'provideDetailedDescription' }));
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleFormDataChange = (updates: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === totalSteps) {
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
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 text-xs md:text-sm mb-5 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <a href="#" className="text-accent hover:underline" onClick={onBreadcrumbHome}>{intl.formatMessage({ id: 'home' })}</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{intl.formatMessage({ id: 'financialAssistance' })}</span>
          </nav>

          {/* Page Title */}
          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground-dark mb-8 ${isRTL ? 'text-right' : ''}`}>
            {intl.formatMessage({ id: 'financialAssistance' })}
          </h1>

          {/* Two Column Layout - Sidebar and Content */}
          <div className="flex gap-6 items-start relative">
            {/* Sidebar - Questions Navigator */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-6">
                <div className="bg-surface-light rounded-lg p-6">
                  <h2 className="text-xs md:text-sm font-semibold text-foreground-dark mb-6">
                    {intl.formatMessage({ id: 'questions' })}
                  </h2>
                  <nav className="relative">
                    {/* Connecting Line */}
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
                            {/* Step Circle - Show number when not completed, checkmark when completed */}
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
                                intl.formatNumber(step.number)
                              )}
                            </div>
                            {/* Step Label */}
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

            {/* Main Content Area - NO CARD, directly on background */}
            <main className="flex-1 min-w-0">
              {currentStep === 1 && (
                <StepOne 
                  data={formData} 
                  onChange={handleFormDataChange}
                  stepNumber={1}
                  language={language}
                />
              )}
              {currentStep === 2 && (
                <StepTwo 
                  data={formData} 
                  onChange={handleFormDataChange}
                  stepNumber={2}
                  language={language}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  data={formData}
                  onChange={handleFormDataChange}
                  stepNumber={3}
                  language={language}
                />
              )}
              {currentStep === 4 && (
                <StepFour
                  data={formData}
                  onEdit={handleEditStep}
                  stepNumber={4}
                  language={language}
                />
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentStep > 1 && (
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      className="rounded-full px-6 h-10 border-accent text-accent hover:bg-accent/5 inline-flex items-center gap-2 font-normal bg-white"
                    >
                      {isRTL ? (
                        <>
                          <span>{intl.formatMessage({ id: 'previous' })}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-4 h-4" />
                          <span>{intl.formatMessage({ id: 'previous' })}</span>
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
                            ? intl.formatMessage({ id: 'submitApplication' })
                            : currentStep === 3
                            ? intl.formatMessage({ id: 'reviewSubmit' })
                            : intl.formatMessage({ id: 'next' })}
                        </span>
                        <ArrowLeft className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>
                          {currentStep === totalSteps
                            ? intl.formatMessage({ id: 'submitApplication' })
                            : currentStep === 3
                            ? intl.formatMessage({ id: 'reviewSubmit' })
                            : intl.formatMessage({ id: 'next' })}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => currentStep === 1 && onBreadcrumbHome ? onBreadcrumbHome() : window.history.back()}
                  className="rounded-full px-6 h-10 bg-gray-light hover:bg-gray-light-hover text-foreground border-0 font-normal"
                >
                  {intl.formatMessage({ id: 'cancel' })}
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