import { useMemo, memo } from 'react';
import { Button } from '@/components/ui/button';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { TypingText } from '@/components/ui/TypingText';
import { Shield, Clock, FileCheck, Users } from 'lucide-react';
import { useIntl, type IntlShape } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import { useRTL } from '@/hooks/useRTL';
import { useLanguage } from '@/app/providers';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

interface LandingPageProps {
  onStartApplication: () => void;
  hasSavedApplication?: boolean;
}

interface FeatureItem {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
}

interface ProcessStep {
  number: number;
  titleKey: string;
  descriptionKey: string;
}

const FEATURES: FeatureItem[] = [
  { icon: Shield, titleKey: 'landing.features.security.title', descriptionKey: 'landing.features.security.description' },
  { icon: Clock, titleKey: 'landing.features.processing.title', descriptionKey: 'landing.features.processing.description' },
  { icon: FileCheck, titleKey: 'landing.features.usability.title', descriptionKey: 'landing.features.usability.description' },
  { icon: Users, titleKey: 'landing.features.aiHelp.title', descriptionKey: 'landing.features.aiHelp.description' },
];

const PROCESS_STEPS: ProcessStep[] = [
  { number: 1, titleKey: 'landing.process.steps.apply.title', descriptionKey: 'landing.process.steps.apply.description' },
  { number: 2, titleKey: 'landing.process.steps.review.title', descriptionKey: 'landing.process.steps.review.description' },
  { number: 3, titleKey: 'landing.process.steps.confirm.title', descriptionKey: 'landing.process.steps.confirm.description' },
];

// Memoized feature card component - defined outside to prevent recreation
const FeatureCard = memo(function FeatureCard({
  feature,
  intl
}: {
  feature: FeatureItem;
  intl: IntlShape;
}) {
  const Icon = feature.icon;
  return (
    <div className="text-center p-4 rounded-lg transition-transform duration-200 hover:-translate-y-1">
      <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">
        {intl.formatMessage({ id: feature.titleKey })}
      </h3>
      <p className="text-sm md:text-base text-muted leading-relaxed">
        {intl.formatMessage({ id: feature.descriptionKey })}
      </p>
    </div>
  );
});

// Memoized process step card component
const ProcessStepCard = memo(function ProcessStepCard({
  step,
  isRTL,
  intl
}: {
  step: ProcessStep;
  isRTL: boolean;
  intl: IntlShape;
}) {
  const stepNumber = isRTL ? toArabicNumerals(String(step.number)) : step.number;
  return (
    <div className="flex gap-4 items-start bg-white rounded-lg p-5 border border-border transition-all duration-200 hover:border-accent hover:shadow-sm">
      <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0 font-semibold">
        {stepNumber}
      </div>
      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
          {intl.formatMessage({ id: step.titleKey })}
        </h3>
        <p className="text-sm md:text-base text-muted leading-relaxed">
          {intl.formatMessage({ id: step.descriptionKey })}
        </p>
      </div>
    </div>
  );
});

export function LandingPage({ onStartApplication, hasSavedApplication = false }: LandingPageProps) {
  const intl = useIntl();
  const { isRTL, dir } = useRTL();
  const { language } = useLanguage();

  const buttonText = useMemo(() =>
    intl.formatMessage({ id: hasSavedApplication ? 'landing.hero.resumeButton' : 'landing.hero.startButton' }),
    [hasSavedApplication, intl]
  );

  // CTA Button - simple inline since it's used twice with same props
  const renderCTAButton = (className = '') => (
    <Button
      onClick={onStartApplication}
      className={`bg-accent text-white hover:bg-accent-hover rounded-full px-8 h-11 font-medium shadow-md hover:shadow-lg transition-shadow duration-200 inline-flex items-center gap-2 ${className}`}
    >
      <span>{buttonText}</span>
      <DirectionalArrow direction="right" />
    </Button>
  );

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <TammHeader />

      {/* Hero Section */}
      <section
        className="relative text-white py-16 lg:py-16"
        style={{
          backgroundImage: 'url(https://static.tamm.abudhabi/static-prod/Project/TAMM/TAMM-v2/InnerBannerLightBG.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
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
              <TypingText
                key={language}
                text={intl.formatMessage({ id: 'landing.hero.subtitle' })}
                startDelay={400}
                charDelay={30}
              />
            </p>
            <div>
              {renderCTAButton()}
            </div>
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
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.titleKey} feature={feature} intl={intl} />
            ))}
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
            {PROCESS_STEPS.map((step) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                isRTL={isRTL}
                intl={intl}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            {renderCTAButton()}
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
                  className="border-accent text-accent hover:bg-accent/5 rounded-full px-6 h-10 transition-colors duration-200"
                >
                  {intl.formatMessage({ id: 'landing.help.contactSupport' })}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 h-10 hover:bg-gray-50 transition-colors duration-200"
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
