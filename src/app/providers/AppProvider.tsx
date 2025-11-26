import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ApplicationData, AppState } from '@/features/application-form/types';
import { UI_CONSTANTS, STORAGE_KEYS, DEFAULT_VALUES } from '@/config/constants';
import { removeSecureItem, clearSecureStorage, getSecureItem } from '@/lib/secureStorage';

interface AppContextValue {
  appState: AppState;
  applicationData: ApplicationData;
  referenceNumber: string;
  hasSavedApplication: boolean;
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
  emirate: '',
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
  const [hasSavedApplication, setHasSavedApplication] = useState(false);

  // Check for saved application on mount
  useEffect(() => {
    const checkSavedApplication = async () => {
      try {
        const savedData = await getSecureItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
        setHasSavedApplication(savedData !== null);
      } catch {
        setHasSavedApplication(false);
      }
    };
    checkSavedApplication();
  }, []);

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
    clearSecureStorage();
    setApplicationData(initialApplicationData);
    setReferenceNumber('');
    setHasSavedApplication(false);
    setAppState('landing');
  };

  const navigateToLanding = async () => {
    // Re-check for saved application when navigating to landing
    try {
      const savedData = await getSecureItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
      setHasSavedApplication(savedData !== null);
    } catch {
      setHasSavedApplication(false);
    }
    setAppState('landing');
  };

  const cancelApplication = () => {
    removeSecureItem(STORAGE_KEYS.FINANCIAL_ASSISTANCE_APPLICATION);
    setApplicationData(initialApplicationData);
    setHasSavedApplication(false);
    setAppState('landing');
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        applicationData,
        referenceNumber,
        hasSavedApplication,
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
