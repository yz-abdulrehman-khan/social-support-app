import { Facebook, Twitter, Instagram, Youtube, Phone } from 'lucide-react';
import { useIntl } from 'react-intl';
import { useLanguage } from '@/app/providers';

export function TammFooter() {
  const intl = useIntl();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-footer text-white mt-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="border-b border-gray-700 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xs md:text-sm font-medium text-white mb-1">{intl.formatMessage({ id: 'footer.emergency.title' })}</h3>
                <a
                  href="#"
                  className="text-xs md:text-sm text-accent hover:underline inline-flex items-center gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  {intl.formatMessage({ id: 'footer.emergency.viewAll' })} {isRTL ? '←' : '→'}
                </a>
              </div>
            </div>
            <div className="flex gap-8 md:gap-10">
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400 mb-1">{intl.formatMessage({ id: 'footer.emergency.police' })}</div>
                <a href="tel:999" className="text-lg md:text-xl lg:text-2xl font-semibold text-primary hover:text-primary-hover transition-colors block">
                  {intl.formatNumber(999)}
                </a>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400 mb-1">{intl.formatMessage({ id: 'footer.emergency.ambulance' })}</div>
                <a href="tel:998" className="text-lg md:text-xl lg:text-2xl font-semibold text-primary hover:text-primary-hover transition-colors block">
                  {intl.formatNumber(998)}
                </a>
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400 mb-1">{intl.formatMessage({ id: 'footer.emergency.civilDefence' })}</div>
                <a href="tel:997" className="text-lg md:text-xl lg:text-2xl font-semibold text-primary hover:text-primary-hover transition-colors block">
                  {intl.formatNumber(997)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-6">
            <img
              src="https://www.tamm.abudhabi/questionnaire/assets/tamm-white-cf1d3a86.svg"
              alt="TAMM Abu Dhabi"
              className="h-12 w-auto"
            />
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-3 justify-center">
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
              {intl.formatMessage({ id: 'footer.copyright' })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}