import { useState } from 'react';
import { LandingPage } from '@/pages/LandingPage';
import { FormWizard } from '@/components/forms/FormWizard';
import { SuccessConfirmation } from '@/components/feedback/SuccessConfirmation';
import { Toaster } from '@/components/ui/sonner';

export type ApplicationData = {
  // Step 1: Personal Information
  fullNameEnglish: string;
  fullNameArabic: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  street: string;
  city: string;
  emirate: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  
  // Step 2: Family & Financial Details
  maritalStatus: string;
  numberOfDependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
  
  // Step 3: Situation Descriptions
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

type AppState = 'landing' | 'form' | 'success';

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
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  const handleStartApplication = () => {
    setAppState('form');
  };

  const handleFormSubmit = (data: ApplicationData) => {
    setApplicationData(data);
    // Generate reference number
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
  );
}