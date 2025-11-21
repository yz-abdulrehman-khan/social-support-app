import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { LandingPage } from '@/features/landing';
import { FormWizard } from '@/features/application-form/components';
import { SuccessConfirmation } from '@/features/success';
import { Toaster } from '@/components/ui/sonner';
import { flattenMessages } from '@/lib/i18n-utils';
import enMessages from '@/locales/en.json';
import arMessages from '@/locales/ar.json';
import type { ApplicationData, AppState } from '@/features/application-form/types';

const messages = {
  en: flattenMessages(enMessages),
  ar: flattenMessages(arMessages),
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    fullNameEnglish: '',
    fullNameArabic: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    street: '',
    city: '',
    emirate: 'Abu Dhabi',
    country: 'United Arab Emirates',
    postalCode: '',
    phoneNumber: '',
    email: '',
    maritalStatus: '',
    numberOfDependents: '',
    employmentStatus: '',
    monthlyIncome: '',
    housingStatus: '',
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  });
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  const handleStartApplication = () => {
    setAppState('form');
  };

  const handleFormSubmit = (data: ApplicationData) => {
    setApplicationData(data);
    const refNumber = `SA${Date.now().toString().slice(-8)}`;
    setReferenceNumber(refNumber);
    setAppState('success');
  };

  const handleStartNew = () => {
    setAppState('landing');
    setApplicationData({
      fullNameEnglish: '',
      fullNameArabic: '',
      nationalId: '',
      dateOfBirth: '',
      gender: '',
      street: '',
      city: '',
      emirate: '',
      country: 'United Arab Emirates',
      postalCode: '',
      phoneNumber: '',
      email: '',
      maritalStatus: '',
      numberOfDependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',
      financialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: '',
    });
    setReferenceNumber('');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleBreadcrumbHome = () => {
    setAppState('landing');
  };

  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="en">
      <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Toaster
          position="top-center"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          toastOptions={{
            style: {
              background: '#fff',
              color: '#3F3E45',
              border: '1px solid #E0E0E1',
            },
          }}
        />
        {appState === 'landing' && (
          <LandingPage
            onStartApplication={handleStartApplication}
            language={language}
            onLanguageToggle={toggleLanguage}
          />
        )}
        {appState === 'form' && (
          <FormWizard
            initialData={applicationData}
            onSubmit={handleFormSubmit}
            language={language}
            onLanguageToggle={toggleLanguage}
            onBreadcrumbHome={handleBreadcrumbHome}
          />
        )}
        {appState === 'success' && (
          <SuccessConfirmation
            referenceNumber={referenceNumber}
            onStartNew={handleStartNew}
            language={language}
            onLanguageToggle={toggleLanguage}
          />
        )}
      </div>
    </IntlProvider>
  );
}