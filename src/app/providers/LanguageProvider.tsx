import { createContext, useContext, useState, type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { flattenMessages } from '@/lib/i18n-utils';
import enMessages from '@/locales/en.json';
import arMessages from '@/locales/ar.json';

type Language = 'en' | 'ar';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const messages = {
  en: flattenMessages(enMessages),
  ar: flattenMessages(arMessages),
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
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
