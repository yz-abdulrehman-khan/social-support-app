import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { StepFour } from './steps/StepFour';
import type { ApplicationData } from '@/features/application-form/types';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import { useFormWizard } from '@/features/application-form/hooks/useFormWizard';
import { useApp } from '@/app/providers/AppProvider';
import { useLanguage } from '@/app/providers';

interface FormWizardProps {
  initialData: ApplicationData;
  onSubmit: (data: ApplicationData) => void;
  onBreadcrumbHome?: () => void;
}

export function FormWizard({ initialData, onSubmit, onBreadcrumbHome }: FormWizardProps) {
  const intl = useIntl();
  const { language } = useLanguage();
  const totalSteps = 4;
  const isRTL = language === 'ar';
  const { navigateToLanding } = useApp();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const { form, currentStep, handleNext, handlePrevious, handleEditStep, handleSaveProgress, hasUnsavedChanges, hasAnyData, revertToLastSave } = useFormWizard({
    initialData,
    onSubmit,
    totalSteps,
  });

  const handleCancelClick = () => {
    // If no data at all, just navigate to landing
    if (!hasAnyData()) {
      navigateToLanding();
      return;
    }

    // If has saved data but no unsaved changes, exit directly
    if (!hasUnsavedChanges()) {
      navigateToLanding();
      return;
    }

    // Show dialog only if there are unsaved changes
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);

    // Check if there are unsaved changes
    if (hasUnsavedChanges()) {
      // Revert to last saved state and navigate to landing
      revertToLastSave();
      navigateToLanding();
    } else {
      // No unsaved changes, just navigate to landing
      navigateToLanding();
    }
  };

  const handleSaveAndExit = () => {
    handleSaveProgress();
    setShowCancelDialog(false);
    navigateToLanding();
  };

  const steps = [
    { number: 1, label: intl.formatMessage({ id: 'form.steps.personal.title' }), completed: currentStep > 1 },
    { number: 2, label: intl.formatMessage({ id: 'form.steps.financial.title' }), completed: currentStep > 2 },
    { number: 3, label: intl.formatMessage({ id: 'form.steps.situation.title' }), completed: currentStep > 3 },
    { number: 4, label: intl.formatMessage({ id: 'form.steps.review.title' }), completed: currentStep > 4 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
      <TammHeader />

      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-5">
            <a href="#" className="text-accent hover:underline" onClick={onBreadcrumbHome}>{intl.formatMessage({ id: 'common.home' })}</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{intl.formatMessage({ id: 'form.title' })}</span>
          </nav>

          <h1 className={`text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-dark mb-8 ${isRTL ? 'text-right' : ''}`}>
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
                  />
                )}
                {currentStep === 2 && (
                  <StepTwo
                    control={form.control}
                    stepNumber={2}
                  />
                )}
                {currentStep === 3 && (
                  <StepThree
                    control={form.control}
                    stepNumber={3}
                  />
                )}
                {currentStep === 4 && (
                  <StepFour
                    data={form.getValues()}
                    onEdit={handleEditStep}
                    stepNumber={4}
                  />
                )}
              </Form>

              <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="subtle"
                      onClick={handlePrevious}
                      className="rounded-full px-6 h-10 font-normal flex-1 sm:flex-initial"
                    >
                      {isRTL ? (
                        <>
                          <span className="hidden sm:inline">{intl.formatMessage({ id: 'common.previous' })}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">{intl.formatMessage({ id: 'common.previous' })}</span>
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="rounded-full px-6 h-10 font-normal inline-flex items-center gap-2 bg-theme-accent hover:bg-theme-accent-hover text-white flex-1 sm:flex-initial"
                  >
                    {isRTL ? (
                      <>
                        <span className="text-xs sm:text-sm">
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
                        <span className="text-xs sm:text-sm">
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

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="subtle"
                    onClick={handleSaveProgress}
                    className="rounded-full px-6 h-10 font-normal flex-1 sm:flex-initial gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {intl.formatMessage({ id: 'common.saveProgress' })}
                  </Button>
                  <Button
                    type="button"
                    variant="cancel"
                    onClick={handleCancelClick}
                    className="rounded-full px-6 h-10 font-normal flex-1 sm:flex-initial"
                  >
                    {intl.formatMessage({ id: 'common.cancel' })}
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <TammFooter />

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent dir={isRTL ? 'rtl' : 'ltr'} className="max-w-md">
          <AlertDialogHeader className={isRTL ? 'text-right' : ''}>
            <AlertDialogTitle>
              {intl.formatMessage({ id: 'cancelDialog.title' })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {intl.formatMessage({
                id: hasUnsavedChanges() ? 'cancelDialog.descriptionUnsaved' : 'cancelDialog.descriptionSaved'
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-3">
            <AlertDialogCancel className="bg-theme-accent hover:bg-theme-accent-hover text-white w-full">
              {intl.formatMessage({ id: 'cancelDialog.keep' })}
            </AlertDialogCancel>
            {hasUnsavedChanges() && (
              <AlertDialogAction onClick={handleSaveAndExit} className="bg-theme-accent hover:bg-theme-accent-hover text-white w-full">
                {intl.formatMessage({ id: 'cancelDialog.saveAndExit' })}
              </AlertDialogAction>
            )}
            <AlertDialogAction onClick={handleConfirmCancel} className="w-full">
              {intl.formatMessage({
                id: hasUnsavedChanges() ? 'cancelDialog.discardChanges' : 'cancelDialog.exit'
              })}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
