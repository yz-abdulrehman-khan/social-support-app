import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/providers';
import { useRTL } from '@/hooks/useRTL';

export function TammHeader() {
  const { language, toggleLanguage } = useLanguage();
  const { dir } = useRTL();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" dir={dir}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center" onClick={(e) => e.preventDefault()}>
              <img
                src="https://www.tamm.abudhabi/assets/logo-new-mobile-401c2ebe.svg"
                alt="TAMM Abu Dhabi"
                className="h-7 w-auto lg:hidden brightness-0 saturate-100"
                style={{ filter: 'brightness(0) saturate(100%) invert(63%) sepia(57%) saturate(420%) hue-rotate(131deg) brightness(91%) contrast(87%)' }}
              />
              <img
                src="https://www.tamm.abudhabi/assets/tamm-white-cf1d3a86.svg"
                alt="TAMM Abu Dhabi"
                className="h-7 w-auto hidden lg:block"
                style={{ filter: 'brightness(0) saturate(100%) invert(63%) sepia(57%) saturate(420%) hue-rotate(131deg) brightness(91%) contrast(87%)' }}
              />
            </a>
          </div>

          <div className="flex items-center">
            <Button
              variant="subtle"
              size="sm"
              onClick={toggleLanguage}
              className="language-switcher text-gray-700 font-medium hover:text-accent transition-colors"
            >
              {language === 'en' ? (
                <span className="text-lg">العربية</span>
              ) : (
                <span className="text-sm">English</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
