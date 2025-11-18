import { Facebook, Twitter, Instagram, Youtube, Phone } from 'lucide-react';
import { t, formatNumber, Language } from '../translations';

interface TammFooterProps {
  language?: Language;
}

export function TammFooter({ language = 'en' }: TammFooterProps) {
  const isRTL = language === 'ar';
  
  return (
    <footer className="bg-[#3A3D4A] text-white mt-auto">
      {/* Emergency Numbers */}
      <div className="border-b border-gray-700 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className={`flex flex-col ${isRTL ? 'items-end' : ''}`}>
                <h3 className="text-xs md:text-sm font-medium text-white mb-1">{t('emergencyNumbers', language)}</h3>
                <a
                  href="#"
                  className="text-xs md:text-sm text-[#169F9F] hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  {t('viewAllNumbers', language)} {isRTL ? '←' : '→'}
                </a>
              </div>
            </div>
            <div className={`flex gap-8 md:gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400 mb-1">{t('police', language)}</div>
                <a href="tel:999" className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#62C458] hover:text-[#51B53F] transition-colors block">
                  {formatNumber(999, language)}
                </a>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400 mb-1">{t('ambulance', language)}</div>
                <a href="tel:998" className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#62C458] hover:text-[#51B53F] transition-colors block">
                  {formatNumber(998, language)}
                </a>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400 mb-1">{t('civilDefence', language)}</div>
                <a href="tel:997" className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#62C458] hover:text-[#51B53F] transition-colors block">
                  {formatNumber(997, language)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-6">
            <img
              src="https://www.tamm.abudhabi/questionnaire/assets/tamm-white-cf1d3a86.svg"
              alt="TAMM Abu Dhabi"
              className="h-12 w-auto"
            />
          </div>

          {/* Social Media & Copyright */}
          <div className={`border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </a>
            </div>
            <p className="text-xs md:text-sm text-white/60">
              {language === 'en' 
                ? '© 2025 Abu Dhabi Government. All rights reserved.' 
                : '© ٢٠٢٥ حكومة أبوظبي. جميع الحقوق محفوظة.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}