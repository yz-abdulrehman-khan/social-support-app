import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Language } from '@/i18n/translations';

interface TammHeaderProps {
  language?: Language;
  onLanguageToggle?: () => void;
}

export function TammHeader({ language = 'en', onLanguageToggle }: TammHeaderProps) {
  const isRTL = language === 'ar';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between h-14 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Left Side: Logo + Navigation */}
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* TAMM Logo */}
            <a href="#" className="flex items-center" onClick={(e) => e.preventDefault()}>
              {/* Mobile Logo */}
              <img
                src="https://www.tamm.abudhabi/assets/logo-new-mobile-401c2ebe.svg"
                alt="TAMM Abu Dhabi"
                className="h-7 w-auto lg:hidden brightness-0 saturate-100"
                style={{ filter: 'brightness(0) saturate(100%) invert(63%) sepia(57%) saturate(420%) hue-rotate(131deg) brightness(91%) contrast(87%)' }}
              />
              {/* Desktop Logo */}
              <img
                src="https://www.tamm.abudhabi/assets/tamm-white-cf1d3a86.svg"
                alt="TAMM Abu Dhabi"
                className="h-7 w-auto hidden lg:block"
                style={{ filter: 'brightness(0) saturate(100%) invert(63%) sepia(57%) saturate(420%) hue-rotate(131deg) brightness(91%) contrast(87%)' }}
              />
            </a>
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs md:text-sm text-gray-700 hover:text-theme-accent hover:bg-gray-50"
              onClick={onLanguageToggle}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
