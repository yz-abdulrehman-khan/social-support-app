import { Button } from '@/components/ui/button';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { Shield, Clock, FileCheck, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { useIntl } from 'react-intl';

type Language = 'en' | 'ar';

interface LandingPageProps {
  onStartApplication: () => void;
  language?: Language;
  onLanguageToggle?: () => void;
}

export function LandingPage({ onStartApplication, language = 'en', onLanguageToggle }: LandingPageProps) {
  const intl = useIntl();
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
            <h1 className="text-[22px] md:text-[28px] lg:text-[34px] xl:text-[46px] font-semibold text-white mb-3 md:mb-4">
              {intl.formatMessage({ id: 'heroTitle' })}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 mb-5 md:mb-6 leading-relaxed">
              {intl.formatMessage({ id: 'heroSubtitle' })}
            </p>
            <Button
              onClick={onStartApplication}
              className="bg-accent text-white hover:bg-accent-hover rounded-full px-8 h-11 font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              {isRTL ? (
                <>
                  <span>{intl.formatMessage({ id: 'startApplication' })}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{intl.formatMessage({ id: 'startApplication' })}</span>
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
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 md:mb-3">
              {intl.formatMessage({ id: 'featuresTitle' })}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted max-w-2xl mx-auto">
              {intl.formatMessage({ id: 'featuresSubtitle' })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'feature1Title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'feature1Desc' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'feature2Title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'feature2Desc' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileCheck className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'feature3Title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'feature3Desc' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'feature4Title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'feature4Desc' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2 md:mb-3">
              {intl.formatMessage({ id: 'processTitle' })}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted">
              {intl.formatMessage({ id: 'processSubtitle' })}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {intl.formatNumber(1)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'step1' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'step1Desc' })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {intl.formatNumber(1)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'step1' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'step1Desc' })}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {intl.formatNumber(2)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'step2' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'step2Desc' })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {intl.formatNumber(2)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'step2' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'step2Desc' })}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {intl.formatNumber(3)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'step3' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'step3Desc' })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {intl.formatNumber(3)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'step3' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'step3Desc' })}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={onStartApplication}
              className="bg-accent hover:bg-accent-hover text-white rounded-full px-8 h-11 font-medium shadow-md inline-flex items-center gap-2"
            >
              {isRTL ? (
                <>
                  <span>{intl.formatMessage({ id: 'startApplication' })}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>{intl.formatMessage({ id: 'startApplication' })}</span>
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
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3">
                {intl.formatMessage({ id: 'needHelp' })}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted mb-4 md:mb-5 leading-relaxed max-w-2xl mx-auto">
                {intl.formatMessage({ id: 'needHelpDesc' })}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white rounded-full px-6 h-10"
                >
                  {intl.formatMessage({ id: 'contactSupport' })}
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-background rounded-full px-6 h-10"
                >
                  {intl.formatMessage({ id: 'findServiceCenter' })}
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