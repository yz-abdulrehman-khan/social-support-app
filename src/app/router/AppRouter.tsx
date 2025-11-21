import { LandingPage } from '@/features/landing';
import { FormWizard } from '@/features/application-form/components';
import { SuccessConfirmation } from '@/features/success';
import { useApp } from '../providers/AppProvider';
import { useLanguage } from '../providers/LanguageProvider';

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
  const { language, toggleLanguage } = useLanguage();

  switch (appState) {
    case 'landing':
      return (
        <LandingPage
          onStartApplication={startApplication}
          language={language}
          onLanguageToggle={toggleLanguage}
        />
      );

    case 'form':
      return (
        <FormWizard
          initialData={applicationData}
          onSubmit={submitApplication}
          language={language}
          onLanguageToggle={toggleLanguage}
          onBreadcrumbHome={navigateToLanding}
        />
      );

    case 'success':
      return (
        <SuccessConfirmation
          referenceNumber={referenceNumber}
          onStartNew={startNewApplication}
          language={language}
          onLanguageToggle={toggleLanguage}
        />
      );

    default:
      return null;
  }
}
