import { Button } from '@/components/ui/button';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { Shield, Clock, FileCheck, Users } from 'lucide-react';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import { useRTL } from '@/hooks/useRTL';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

interface LandingPageProps {
  onStartApplication: () => void;
}

export function LandingPage({ onStartApplication }: LandingPageProps) {
  const intl = useIntl();
  const { isRTL, dir } = useRTL();

  const formatStepNumber = (num: number) =>
    isRTL ? toArabicNumerals(String(num)) : num;

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <TammHeader />

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
            <h1 className="text-[20px] md:text-[26px] lg:text-[32px] xl:text-[44px] font-semibold text-white mb-3 md:mb-4">
              {intl.formatMessage({ id: 'landing.hero.title' })}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 mb-5 md:mb-6 leading-relaxed">
              {intl.formatMessage({ id: 'landing.hero.subtitle' })}
            </p>
            <Button
              onClick={onStartApplication}
              className="bg-accent text-white hover:bg-accent-hover rounded-full px-8 h-11 font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              <span>{intl.formatMessage({ id: 'landing.hero.startButton' })}</span>
              <DirectionalArrow direction="right" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3">
              {intl.formatMessage({ id: 'landing.features.title' })}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted max-w-2xl mx-auto">
              {intl.formatMessage({ id: 'landing.features.subtitle' })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'landing.features.security.title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'landing.features.security.description' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'landing.features.processing.title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'landing.features.processing.description' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileCheck className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'landing.features.usability.title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'landing.features.usability.description' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">{intl.formatMessage({ id: 'landing.features.aiHelp.title' })}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {intl.formatMessage({ id: 'landing.features.aiHelp.description' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3">
              {intl.formatMessage({ id: 'landing.process.title' })}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted">
              {intl.formatMessage({ id: 'landing.process.subtitle' })}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatStepNumber(1)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'landing.process.steps.apply.title' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'landing.process.steps.apply.description' })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatStepNumber(1)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'landing.process.steps.apply.title' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'landing.process.steps.apply.description' })}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatStepNumber(2)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'landing.process.steps.review.title' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'landing.process.steps.review.description' })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatStepNumber(2)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'landing.process.steps.review.title' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'landing.process.steps.review.description' })}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border">
              {isRTL ? (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatStepNumber(3)}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'landing.process.steps.confirm.title' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'landing.process.steps.confirm.description' })}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
                    {formatStepNumber(3)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {intl.formatMessage({ id: 'landing.process.steps.confirm.title' })}
                    </h3>
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {intl.formatMessage({ id: 'landing.process.steps.confirm.description' })}
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
              <span>{intl.formatMessage({ id: 'landing.hero.startButton' })}</span>
              <DirectionalArrow direction="right" />
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
            <div className="text-center">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-2 md:mb-3">
                {intl.formatMessage({ id: 'landing.help.title' })}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted mb-4 md:mb-5 leading-relaxed max-w-2xl mx-auto">
                {intl.formatMessage({ id: 'landing.help.description' })}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <Button
                  variant="outline"
                  className="border-accent text-accent rounded-full px-6 h-10"
                >
                  {intl.formatMessage({ id: 'landing.help.contactSupport' })}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 h-10"
                >
                  {intl.formatMessage({ id: 'landing.help.findServiceCenter' })}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TammFooter />
    </div>
  );
}