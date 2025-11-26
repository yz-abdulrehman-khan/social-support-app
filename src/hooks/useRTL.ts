import { useLanguage } from '@/app/providers/LanguageProvider';
import { LANGUAGES } from '@/features/application-form/types';

export function useRTL() {
  const { language } = useLanguage();
  return {
    isRTL: language === LANGUAGES.AR,
    dir: language === LANGUAGES.AR ? 'rtl' : 'ltr',
  } as const;
}
