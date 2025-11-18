import { Button } from './ui/button';
import { TammHeader } from './TammHeader';
import { TammFooter } from './TammFooter';
import { Shield, Clock, FileCheck, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { t, formatNumber, Language } from '../translations';

interface LandingPageProps {
  onStartApplication: () => void;
  language?: Language;
  onLanguageToggle?: () => void;
}

export function LandingPage({ onStartApplication, language = 'en', onLanguageToggle }: LandingPageProps) {
  const isRTL = language === 'ar';
  
  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
      <TammHeader language={language} onLanguageToggle={onLanguageToggle} />

      {/* Hero Section */}
      <section className="relative text-white py-16 lg:py-16" style={{
        backgroundImage: 'url(https://static.tamm.abudhabi/static-prod/Project/TAMM/TAMM-v2/InnerBannerLightBG.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://www.tamm.abudhabi/assets/ibAvatar-8f660b90.png"
              alt="TAMM Avatar"
              className="mx-auto mb-4 w-12 h-12 lg:w-16 lg:h-16"
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-3 md:mb-4">
              {t('heroTitle', language)}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 mb-5 md:mb-6 leading-relaxed">
              {t('heroSubtitle', language)}
            </p>
            <Button
              onClick={onStartApplication}
              className="bg-[#169F9F] text-white hover:bg-[#138888] rounded-full px-8 h-11 font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              {isRTL ? (
                <>
                  <span>{t('startApplication', language)}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{t('startApplication', language)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#3F3E45] mb-2 md:mb-3">
              {t('featuresTitle', language)}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#89888C] max-w-2xl mx-auto">
              {language === 'en'
                ? 'Our platform makes it easy to apply for financial assistance with complete privacy and dignity.'
                : 'تسهل منصتنا التقدم بطلب للحصول على المساعدة المالية بخصوصية وكرامة كاملة.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#169F9F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-[#169F9F]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1.5 md:mb-2">{t('feature1Title', language)}</h3>
              <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                {t('feature1Desc', language)}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#169F9F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-[#169F9F]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1.5 md:mb-2">{t('feature2Title', language)}</h3>
              <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                {t('feature2Desc', language)}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#169F9F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileCheck className="w-7 h-7 text-[#169F9F]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1.5 md:mb-2">{t('feature3Title', language)}</h3>
              <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                {t('feature3Desc', language)}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#169F9F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-[#169F9F]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1.5 md:mb-2">{t('feature4Title', language)}</h3>
              <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                {t('feature4Desc', language)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-[#F6F6F6]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#3F3E45] mb-2 md:mb-3">
              {t('processTitle', language)}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#89888C]">
              {language === 'en'
                ? 'Three simple steps to submit your application'
                : 'ثلاث خطوات بسيطة لتقديم طلبك'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-[#E0E0E1]">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-[#169F9F] text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatNumber(1, language)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1 md:mb-2">
                      {t('step1', language)}
                    </h3>
                    <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                      {t('step1Desc', language)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-[#169F9F] text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatNumber(1, language)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1 md:mb-2">
                      {t('step1', language)}
                    </h3>
                    <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                      {t('step1Desc', language)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-[#E0E0E1]">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-[#169F9F] text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatNumber(2, language)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1 md:mb-2">
                      {t('step2', language)}
                    </h3>
                    <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                      {t('step2Desc', language)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-[#169F9F] text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatNumber(2, language)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1 md:mb-2">
                      {t('step2', language)}
                    </h3>
                    <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                      {t('step2Desc', language)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-[#E0E0E1]">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-[#62C458] text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatNumber(3, language)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1 md:mb-2">
                      {t('step3', language)}
                    </h3>
                    <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                      {t('step3Desc', language)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-[#62C458] text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatNumber(3, language)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-[#3F3E45] mb-1 md:mb-2">
                      {t('step3', language)}
                    </h3>
                    <p className="text-sm md:text-base text-[#89888C] leading-relaxed">
                      {t('step3Desc', language)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={onStartApplication}
              className="bg-[#169F9F] hover:bg-[#138888] text-white rounded-full px-8 h-11 font-medium shadow-md inline-flex items-center gap-2"
            >
              {isRTL ? (
                <>
                  <span>{t('startApplication', language)}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{t('startApplication', language)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
            <div className="text-center">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#3F3E45] mb-2 md:mb-3">
                {language === 'en' ? 'Need Help?' : 'هل تحتاج مساعدة؟'}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[#89888C] mb-4 md:mb-5 leading-relaxed max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Our support team is available 24/7 to assist you. Contact us through chat, phone, or visit a service center.'
                  : 'فريق الدعم لدينا متاح ٢٤/٧ لمساعدتك. اتصل بنا عبر الدردشة أو الهاتف أو قم بزيارة مركز خدمة.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <Button
                  variant="outline"
                  className="border-[#169F9F] text-[#169F9F] hover:bg-[#169F9F] hover:text-white rounded-full px-6 h-10"
                >
                  {language === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
                </Button>
                <Button
                  variant="outline"
                  className="border-[#E0E0E1] text-[#3F3E45] hover:bg-[#F6F6F6] rounded-full px-6 h-10"
                >
                  {language === 'en' ? 'Find Service Center' : 'ابحث عن مركز خدمة'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TammFooter language={language} />
    </div>
  );
}