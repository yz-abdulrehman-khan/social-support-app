import { LandingPage } from '@/features/landing';
import { FormWizard } from '@/features/application-form/components';
import { SuccessConfirmation } from '@/features/success';
import { useApp } from '../providers/AppProvider';

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
}
