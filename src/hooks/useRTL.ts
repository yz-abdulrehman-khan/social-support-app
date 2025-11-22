import { useLanguage } from '@/app/providers/LanguageProvider';

export function useRTL() {
  const { language } = useLanguage();
  return {
    isRTL: language === 'ar',
    dir: language === 'ar' ? 'rtl' : 'ltr',
  } as const;
}
