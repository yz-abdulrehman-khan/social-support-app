import { useState, useMemo, useCallback } from 'react';
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
import { Check, Save, Loader2 } from 'lucide-react';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import { useFormWizard } from '@/features/application-form/hooks/useFormWizard';
import { useApp } from '@/app/providers/AppProvider';
import { useRTL } from '@/hooks/useRTL';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

const TOTAL_STEPS = 4;

interface FormWizardProps {
  initialData: ApplicationData;
  onSubmit: (data: ApplicationData) => void;
  onBreadcrumbHome?: () => void;
}

interface StepConfig {
  number: number;
  labelKey: string;
}

const STEP_CONFIG: StepConfig[] = [
  { number: 1, labelKey: 'form.steps.personal.title' },
  { number: 2, labelKey: 'form.steps.financial.title' },
  { number: 3, labelKey: 'form.steps.situation.title' },
  { number: 4, labelKey: 'form.steps.review.title' },
];

export function FormWizard({ initialData, onSubmit, onBreadcrumbHome }: FormWizardProps) {
  const intl = useIntl();
  const { isRTL, dir } = useRTL();
  const { navigateToLanding } = useApp();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const {
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
  } = useFormWizard({
    initialData,
    onSubmit,
    totalSteps: TOTAL_STEPS,
  });

  // Memoized steps with completion status
  const steps = useMemo(() =>
    STEP_CONFIG.map((step) => ({
      ...step,
      label: intl.formatMessage({ id: step.labelKey }),
      completed: currentStep > step.number,
      isActive: currentStep === step.number,
    })),
    [currentStep, intl]
  );

  // Cancel dialog handlers
  const handleCancelClick = useCallback(() => {
    if (!hasAnyData() || !hasUnsavedChanges()) {
      navigateToLanding();
      return;
    }
    setShowCancelDialog(true);
  }, [hasAnyData, hasUnsavedChanges, navigateToLanding]);

  const handleConfirmCancel = useCallback(() => {
    setShowCancelDialog(false);
    if (hasUnsavedChanges()) {
      revertToLastSave();
    }
    navigateToLanding();
  }, [hasUnsavedChanges, revertToLastSave, navigateToLanding]);

  const handleSaveAndExit = useCallback(() => {
    handleSaveProgress();
    setShowCancelDialog(false);
    navigateToLanding();
  }, [handleSaveProgress, navigateToLanding]);

  // Button text based on current step
  const getNextButtonText = useCallback(() => {
    if (currentStep === TOTAL_STEPS) {
      return intl.formatMessage({ id: 'form.navigation.submitApplication' });
    }
    if (currentStep === 3) {
      return intl.formatMessage({ id: 'form.navigation.reviewSubmit' });
    }
    return intl.formatMessage({ id: 'common.next' });
  }, [currentStep, intl]);

  const getLoadingText = useCallback(() => {
    return currentStep === TOTAL_STEPS
      ? intl.formatMessage({ id: 'form.submitting' })
      : intl.formatMessage({ id: 'form.validating' });
  }, [currentStep, intl]);

  // Render current step content
  const renderStepContent = () => {
    const stepComponents: Record<number, React.ReactNode> = {
      1: <StepOne stepNumber={1} />,
      2: <StepTwo stepNumber={2} />,
      3: <StepThree stepNumber={3} />,
      4: <StepFour data={form.getValues()} onEdit={handleEditStep} stepNumber={4} />,
    };

    return (
      <div key={`step-${currentStep}`} className="animate-fade-in-up">
        {stepComponents[currentStep]}
      </div>
    );
  };

  // Step indicator component
  const renderStepIndicator = (step: typeof steps[0]) => (
    <div
      key={step.number}
      className="flex items-start gap-3 relative"
    >
      <div
        className={`
          w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative z-10 text-xs font-semibold
          step-indicator transition-smooth
          ${step.completed
            ? 'bg-success-light text-white'
            : 'border-2 border-accent bg-white text-accent'
          }
        `}
      >
        {step.completed ? (
          <Check className="w-3 h-3" strokeWidth={3} />
        ) : (
          isRTL ? toArabicNumerals(String(step.number)) : step.number
        )}
      </div>
      <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
        <p
          className={`text-xs md:text-sm leading-tight ${
            step.isActive ? 'text-accent font-medium' : 'text-foreground-dark'
          }`}
        >
          {step.label}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <TammHeader />

      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-5">
            <a
              href="#"
              className="text-accent hover:underline"
              onClick={onBreadcrumbHome}
            >
              {intl.formatMessage({ id: 'common.home' })}
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">
              {intl.formatMessage({ id: 'form.title' })}
            </span>
          </nav>

          {/* Page Title */}
          <h1 className={`text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-dark mb-8 ${isRTL ? 'text-right' : ''}`}>
            {intl.formatMessage({ id: 'form.title' })}
          </h1>

          <div className="flex gap-6 items-start relative">
            {/* Sidebar - Step Navigation */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-6">
                <div className="bg-surface-light rounded-lg p-6">
                  <h2 className="text-xs md:text-sm font-semibold text-foreground-dark mb-6">
                    {intl.formatMessage({ id: 'common.questions' })}
                  </h2>
                  <nav className="relative">
                    {/* Progress Line */}
                    <div
                      className="absolute top-3 bottom-3 w-0.5 bg-accent"
                      style={{ [isRTL ? 'right' : 'left']: '9px' }}
                    />
                    <div className="relative space-y-4">
                      {steps.map(renderStepIndicator)}
                    </div>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Form {...form}>
                {renderStepContent()}
              </Form>

              {/* Navigation Buttons */}
              <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Primary Navigation */}
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="subtle"
                      onClick={handlePrevious}
                      className="rounded-full px-6 h-10 font-normal flex-1 sm:flex-initial press-effect hover-lift"
                    >
                      <DirectionalArrow direction="left" />
                      <span className="hidden sm:inline">
                        {intl.formatMessage({ id: 'common.previous' })}
                      </span>
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="rounded-full px-6 h-10 font-normal inline-flex items-center gap-2 bg-theme-accent hover:bg-theme-accent-hover text-white flex-1 sm:flex-initial press-effect hover-lift"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs sm:text-sm">{getLoadingText()}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs sm:text-sm">{getNextButtonText()}</span>
                        <DirectionalArrow direction="right" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="subtle"
                    onClick={handleSaveProgress}
                    className="rounded-full px-6 h-10 font-normal flex-1 sm:flex-initial gap-2 press-effect hover-lift"
                  >
                    <Save className="w-4 h-4" />
                    {intl.formatMessage({ id: 'common.saveProgress' })}
                  </Button>
                  <Button
                    type="button"
                    variant="cancel"
                    onClick={handleCancelClick}
                    className="rounded-full px-6 h-10 font-normal flex-1 sm:flex-initial press-effect"
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

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent dir={dir} className="max-w-md">
          <AlertDialogHeader className={isRTL ? 'text-right' : ''}>
            <AlertDialogTitle>
              {intl.formatMessage({ id: 'cancelDialog.title' })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {intl.formatMessage({
                id: hasUnsavedChanges()
                  ? 'cancelDialog.descriptionUnsaved'
                  : 'cancelDialog.descriptionSaved',
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-3">
            <AlertDialogCancel className="bg-theme-accent hover:bg-theme-accent-hover text-white w-full">
              {intl.formatMessage({ id: 'cancelDialog.keep' })}
            </AlertDialogCancel>
            {hasUnsavedChanges() && (
              <AlertDialogAction
                onClick={handleSaveAndExit}
                className="bg-theme-accent hover:bg-theme-accent-hover text-white w-full"
              >
                {intl.formatMessage({ id: 'cancelDialog.saveAndExit' })}
              </AlertDialogAction>
            )}
            <AlertDialogAction onClick={handleConfirmCancel} className="w-full">
              {intl.formatMessage({
                id: hasUnsavedChanges()
                  ? 'cancelDialog.discardChanges'
                  : 'cancelDialog.exit',
              })}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
