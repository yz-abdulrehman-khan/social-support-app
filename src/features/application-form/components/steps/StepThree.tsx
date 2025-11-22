import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sparkles } from 'lucide-react';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import type { ApplicationData } from '@/features/application-form/types';
import { AIWritingAssistant } from '@/components/modals/AIWritingAssistant';
import { useRTL } from '@/hooks/useRTL';
import { useLanguage } from '@/app/providers';

interface StepThreeProps {
  stepNumber: number;
}

export function StepThree({ stepNumber }: StepThreeProps) {
  const intl = useIntl();
  const { language } = useLanguage();
  const { isRTL } = useRTL();
  const { control, setValue, watch } = useFormContext<ApplicationData>();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [currentField, setCurrentField] = useState<keyof ApplicationData | null>(null);

  const handleAIClick = (field: keyof ApplicationData) => {
    setCurrentField(field);
    setShowAIAssistant(true);
  };

  const handleAIAccept = (text: string) => {
    if (currentField) {
      setValue(currentField, text, { shouldValidate: true });
    }
  };

  const financialSituationValue = watch('financialSituation');

  return (
    <div className="space-y-8">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-theme-primary">
          {isRTL ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.situation.title' })}
        </h2>
        <p className="text-[11px] md:text-xs lg:text-sm text-theme-secondary">
          {intl.formatMessage({ id: 'form.steps.situation.subtitle' })}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Financial Situation */}
        <FormField
          control={control}
          name="financialSituation"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.situation.fields.describeYourSituation' })} <span className="text-red-500">*</span>
                </FormLabel>
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() => handleAIClick('financialSituation')}
                  className="gap-2 text-theme-accent hover:text-theme-accent-hover rounded-full h-8 px-3"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">{intl.formatMessage({ id: 'form.steps.situation.fields.helpMeWrite' })}</span>
                </Button>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  id="financialSituation"
                  placeholder={intl.formatMessage({ id: 'form.steps.situation.fields.situationPlaceholder' })}
                  rows={6}
                  className="resize-none"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormMessage />
                <p className="text-xs text-theme-secondary">
                  {financialSituationValue?.length || 0} {intl.formatMessage({ id: 'form.steps.situation.fields.charactersMinimum' })}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Employment Circumstances (Optional) */}
        <FormField
          control={control}
          name="employmentCircumstances"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm font-medium">
                {intl.formatMessage({ id: 'form.steps.situation.fields.employmentCircumstances' })}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="employmentCircumstances"
                  placeholder={intl.formatMessage({ id: 'form.steps.situation.fields.employmentCircumstancesPlaceholder' })}
                  rows={4}
                  className="resize-none"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reason for Applying */}
        <FormField
          control={control}
          name="reasonForApplying"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm font-medium">
                {intl.formatMessage({ id: 'form.steps.situation.fields.reasonForApplying' })} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="reasonForApplying"
                  placeholder={intl.formatMessage({ id: 'form.steps.situation.fields.reasonForApplyingPlaceholder' })}
                  rows={4}
                  className="resize-none"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex gap-3">
            <div className="shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-theme-primary mb-1 text-sm">
                {intl.formatMessage({ id: 'form.steps.situation.fields.privacyTitle' })}
              </h4>
              <p className="text-sm text-gray-700">
                {intl.formatMessage({ id: 'form.steps.situation.fields.privacyMessage' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIWritingAssistant
        open={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        onAccept={handleAIAccept}
        language={language}
      />
    </div>
  );
}
