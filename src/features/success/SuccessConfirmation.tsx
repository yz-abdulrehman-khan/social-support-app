import { CheckCircle2, Download, Mail, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TammHeader } from '@/components/layout/TammHeader';
import { TammFooter } from '@/components/layout/TammFooter';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import { useRTL } from '@/hooks/useRTL';

interface SuccessConfirmationProps {
  referenceNumber: string;
  onStartNew: () => void;
}

export function SuccessConfirmation({
  referenceNumber,
  onStartNew,
}: SuccessConfirmationProps) {
  const intl = useIntl();
  const { isRTL, dir } = useRTL();

  const handleDownload = () => {
    alert('Download confirmation - Feature would generate PDF in production');
  };

  const handleEmail = () => {
    alert('Email confirmation - Feature would send email in production');
  };

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <TammHeader />

      <div className="flex-1 py-16 bg-theme-light">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          {/* Success Icon and Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-theme-success animate-success-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-theme-primary mb-2 animate-fade-in-up animation-delay-200">{intl.formatMessage({ id: 'success.title' })}</h1>
            <p className="text-[11px] md:text-xs lg:text-sm text-theme-secondary leading-relaxed animate-fade-in-up animation-delay-300">
              {intl.formatMessage({ id: 'success.message' })}
            </p>
          </div>

          {/* Reference Number */}
          <div className="bg-white rounded-lg p-5 mb-6 border border-theme animate-fade-in-up animation-delay-300 card-animated">
            <div className="text-center mb-4">
              <p className="text-xs md:text-sm font-medium mb-2 text-theme-secondary">{intl.formatMessage({ id: 'success.reference.title' })}</p>
              <div className="rounded-lg p-4 mb-3 bg-theme-light">
                <p className="text-xl md:text-2xl lg:text-3xl tracking-widest font-mono text-theme-primary">
                  {referenceNumber}
                </p>
              </div>
              <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                {intl.formatMessage({ id: 'success.reference.saveNote' })}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="gap-2 rounded-full border-accent text-accent press-effect hover-lift"
              >
                <Download className="w-4 h-4" />
                {intl.formatMessage({ id: 'success.reference.downloadConfirmation' })}
              </Button>
              <Button
                variant="outline"
                onClick={handleEmail}
                className="gap-2 rounded-full border-accent text-accent press-effect hover-lift"
              >
                <Mail className="w-4 h-4" />
                {intl.formatMessage({ id: 'success.reference.emailConfirmation' })}
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-theme animate-fade-in-up animation-delay-400 card-animated">
            <h2 className="text-sm md:text-base lg:text-lg font-semibold mb-4 text-theme-primary">{intl.formatMessage({ id: 'success.nextSteps.title' })}</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {isRTL ? toArabicNumerals(String(1)) : 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{intl.formatMessage({ id: 'success.nextSteps.steps.review.title' })}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {intl.formatMessage({ id: 'success.nextSteps.steps.review.description' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {isRTL ? toArabicNumerals(String(2)) : 2}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{intl.formatMessage({ id: 'success.nextSteps.steps.assessment.title' })}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {intl.formatMessage({ id: 'success.nextSteps.steps.assessment.description' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {isRTL ? toArabicNumerals(String(3)) : 3}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{intl.formatMessage({ id: 'success.nextSteps.steps.notification.title' })}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {intl.formatMessage({ id: 'success.nextSteps.steps.notification.description' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-theme-accent font-semibold">
                  {isRTL ? toArabicNumerals(String(4)) : 4}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold mb-1 text-theme-primary">{intl.formatMessage({ id: 'success.nextSteps.steps.disbursement.title' })}</h3>
                  <p className="text-xs md:text-sm text-theme-secondary leading-relaxed">
                    {intl.formatMessage({ id: 'success.nextSteps.steps.disbursement.description' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="rounded-lg p-5 mb-6 bg-white border border-theme animate-fade-in-up animation-delay-500 card-animated">
            <h3 className="font-semibold mb-2 text-theme-primary">{intl.formatMessage({ id: 'success.importantInfo.title' })}</h3>
            <ul className="space-y-2 text-sm text-theme-secondary">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{intl.formatMessage({ id: 'success.importantInfo.checkEmail' })}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{intl.formatMessage({ id: 'success.importantInfo.trackApplication' })}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{intl.formatMessage({ id: 'success.importantInfo.additionalDocuments' })}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-theme-accent">•</span>
                <span>{intl.formatMessage({ id: 'success.importantInfo.urgentInquiries' })}</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up animation-delay-500">
            <Button
              onClick={onStartNew}
              className="gap-2 text-white rounded-full px-8 bg-theme-accent hover:bg-theme-accent-hover press-effect hover-lift"
            >
              <Home className="w-4 h-4" />
              {intl.formatMessage({ id: 'success.nextSteps.returnHome' })}
            </Button>
          </div>
        </div>
      </div>

      <TammFooter />
    </div>
  );
}