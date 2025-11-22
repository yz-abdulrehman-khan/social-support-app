import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ApplicationData, AppState } from '@/features/application-form/types';
import { UI_CONSTANTS, STORAGE_KEYS, DEFAULT_VALUES } from '@/config/constants';

interface AppContextValue {
  appState: AppState;
  applicationData: ApplicationData;
  referenceNumber: string;
  startApplication: () => void;
  submitApplication: (data: ApplicationData) => void;
  startNewApplication: () => void;
  navigateToLanding: () => void;
  cancelApplication: () => void;
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
  emirate: DEFAULT_VALUES.DEFAULT_EMIRATE,
  country: DEFAULT_VALUES.COUNTRY,
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
    const refNumber = `${UI_CONSTANTS.REFERENCE_NUMBER_PREFIX}${Date.now().toString().slice(UI_CONSTANTS.REFERENCE_NUMBER_TIMESTAMP_SLICE)}`;
    setReferenceNumber(refNumber);
    setAppState('success');
  };

  const startNewApplication = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
    // Reset application data to initial state
    setApplicationData(initialApplicationData);
    // Clear reference number
    setReferenceNumber('');
    // Navigate back to landing page
    setAppState('landing');
  };

  const navigateToLanding = () => {
    // Just navigate to landing page without clearing data
    // This allows users to resume their application later
    setAppState('landing');
  };

  const cancelApplication = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
    // Reset application data to initial state
    setApplicationData(initialApplicationData);
    // Navigate back to landing page
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
        cancelApplication,
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
