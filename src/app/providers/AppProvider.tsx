import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ApplicationData, AppState } from '@/features/application-form/types';

interface AppContextValue {
  appState: AppState;
  applicationData: ApplicationData;
  referenceNumber: string;
  startApplication: () => void;
  submitApplication: (data: ApplicationData) => void;
  startNewApplication: () => void;
  navigateToLanding: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const initialApplicationData: ApplicationData = {
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
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>('landing');
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialApplicationData);
  const [referenceNumber, setReferenceNumber] = useState('');

  const startApplication = () => {
    setAppState('form');
  };

  const submitApplication = (data: ApplicationData) => {
    setApplicationData(data);
    const refNumber = `SA${Date.now().toString().slice(-8)}`;
    setReferenceNumber(refNumber);
    setAppState('success');
  };

  const startNewApplication = () => {
    setAppState('landing');
    setApplicationData(initialApplicationData);
    setReferenceNumber('');
  };

  const navigateToLanding = () => {
    setAppState('landing');
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        applicationData,
        referenceNumber,
        startApplication,
        submitApplication,
        startNewApplication,
        navigateToLanding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
