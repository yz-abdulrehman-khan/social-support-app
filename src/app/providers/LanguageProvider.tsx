import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { flattenMessages } from '@/lib/i18n';
import { LANGUAGES, SUPPORTED_LANGUAGES, type Language } from '@/features/application-form/types';
import enMessages from '@/locales/en.json';
import arMessages from '@/locales/ar.json';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = 'app-language';
const DEFAULT_LANGUAGE: Language = LANGUAGES.EN;

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const messages = {
  en: flattenMessages(enMessages),
  ar: flattenMessages(arMessages),
};

/**
 * Get initial language from localStorage or browser preference
 */
function getInitialLanguage(): Language {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }

  // Fall back to browser language preference
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
    return browserLang as Language;
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Persist language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === LANGUAGES.AR ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      <IntlProvider locale={language} messages={messages[language]} defaultLocale="en">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
