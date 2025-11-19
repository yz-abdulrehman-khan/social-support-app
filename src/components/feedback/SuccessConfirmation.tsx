import { CheckCircle2, Download, Mail, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { t, formatNumber, type Language } from '@/i18n/translations';

interface SuccessConfirmationProps {
  referenceNumber: string;
  onStartNew: () => void;
  language?: Language;
  onLanguageToggle?: () => void;
}

export function SuccessConfirmation({
  referenceNumber,
  onStartNew,
  language = 'en',
  onLanguageToggle,
}: SuccessConfirmationProps) {
  const isRTL = language === 'ar';

  const handleDownload = () => {
    alert('Download confirmation - Feature would generate PDF in production');
  };

  const handleEmail = () => {
    alert('Email confirmation - Feature would send email in production');
  };

  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
      <TammHeader language={language} onLanguageToggle={onLanguageToggle} />

      <div className="flex-1 py-16 bg-theme-light">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {/* Success Icon and Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-theme-success">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-theme-primary mb-2">{t('successTitle', language)}</h1>
            <p className="text-sm md:text-base lg:text-lg text-theme-secondary leading-relaxed">
              {t('successMessage', language)}
            </p>
          </div>

          {/* Reference Number */}
          <div className="bg-white rounded-lg p-5 mb-6 border border-theme">
            <div className="text-center mb-4">
              <p className="text-xs md:text-sm font-medium mb-2 text-theme-secondary">{t('yourReferenceNumber', language)}</p>
              <div className="rounded-lg p-4 mb-3 bg-theme-light">
                <p className="text-xl md:text-2xl lg:text-3xl tracking-widest font-mono text-theme-primary">
                  {referenceNumber}
                </p>
              </div>
              <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                {t('saveReferenceNumber', language)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2 rounded-full border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-white"
              >
                <Download className="w-4 h-4" />
                {t('downloadConfirmation', language)}
              </Button>
              <Button
                variant="outline"
                onClick={handleEmail}
                className="gap-2 rounded-full border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-white"
              >
                <Mail className="w-4 h-4" />
                {t('emailConfirmation', language)}
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-theme">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4 text-theme-primary">{t('whatHappensNext', language)}</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {formatNumber(1, language)}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{t('applicationReview', language)}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {t('applicationReviewDesc', language)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {formatNumber(2, language)}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{t('eligibilityAssessment', language)}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {t('eligibilityAssessmentDesc', language)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {formatNumber(3, language)}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{t('decisionNotification', language)}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {t('decisionNotificationDesc', language)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {formatNumber(4, language)}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{t('supportDisbursement', language)}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {t('supportDisbursementDesc', language)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="rounded-lg p-5 mb-6 bg-theme-info border border-theme">
            <h3 className="font-semibold mb-2 text-theme-primary">{t('importantInformation', language)}</h3>
            <ul className="space-y-2 text-sm text-theme-secondary">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{t('checkEmail', language)}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{t('trackApplication', language)}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{t('additionalDocuments', language)}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{t('urgentInquiries', language)}</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onStartNew}
              className="gap-2 text-white rounded-full px-8 bg-theme-accent hover:bg-theme-accent-hover"
            >
              <Home className="w-4 h-4" />
              {t('returnToHome', language)}
            </Button>
          </div>
        </div>
      </div>

      <TammFooter language={language} />
    </div>
  );
}