import { lazy, Suspense } from 'react';
import { useApp } from '../providers/AppProvider';

const LandingPage = lazy(() => import('@/features/landing').then(m => ({ default: m.LandingPage })));
const FormWizard = lazy(() => import('@/features/application-form/components').then(m => ({ default: m.FormWizard })));
const SuccessConfirmation = lazy(() => import('@/features/success').then(m => ({ default: m.SuccessConfirmation })));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent"></div>
    </div>
  );
}

export function AppRouter() {
  const {
    appState,
    applicationData,
    referenceNumber,
    startApplication,
    submitApplication,
    startNewApplication,
    navigateToLanding,
  } = useApp();

  const renderRoute = () => {
    switch (appState) {
      case 'landing':
        return (
          <LandingPage
            onStartApplication={startApplication}
          />
        );

      case 'form':
        return (
          <FormWizard
            initialData={applicationData}
            onSubmit={submitApplication}
            onBreadcrumbHome={navigateToLanding}
          />
        );

      case 'success':
        return (
          <SuccessConfirmation
            referenceNumber={referenceNumber}
            onStartNew={startNewApplication}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderRoute()}
    </Suspense>
  );
}
