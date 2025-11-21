import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useIntl } from 'react-intl';
import { toArabicNumerals, formatNumericValue } from '@/lib/i18n-utils';
import type { CompleteFormData } from '@/lib/form-validation';

type Language = 'en' | 'ar';

interface StepFourProps {
  data: CompleteFormData;
  onEdit: (step: number) => void;
  stepNumber: number;
  language?: Language;
}

export function StepFour({ data, onEdit, stepNumber, language = 'en' }: StepFourProps) {
  const intl = useIntl();

  const DataRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="mb-4">
      <div className="text-xs md:text-sm font-medium text-theme-secondary mb-0.5">
        {label}
      </div>
      <div className="text-sm md:text-base text-theme-primary">
        {value || '-'}
      </div>
    </div>
  );

  const ReviewSection = ({
    title,
    step,
    children
  }: {
    title: string;
    step: number;
    children: React.ReactNode;
  }) => (
    <div className="pb-6 mb-6 border-b border-theme">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-theme-primary">{title}</h3>
        <Button
          onClick={() => onEdit(step)}
          variant="ghost"
          size="sm"
          className="gap-1.5 text-theme-accent hover:text-theme-accent-hover hover:bg-transparent h-auto p-0 text-xs md:text-sm font-medium"
        >
          <Edit className="w-4 h-4" />
          {intl.formatMessage({ id: 'common.edit' })}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 w-full">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-theme-primary mb-3">
          {language === 'ar' ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.review.title' })}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-theme-secondary">
          {intl.formatMessage({ id: 'form.steps.review.subtitle' })}
        </p>
      </div>

      {/* Review Sections */}
      <div>
        {/* Step 1: Personal Information */}
        <ReviewSection title={intl.formatMessage({ id: 'form.steps.personal.title' })} step={1}>
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.fullNameEnglish' })}
            value={data.fullNameEnglish}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.fullNameArabic' })}
            value={data.fullNameArabic}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.emiratesId' })}
            value={data.nationalId}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.dateOfBirth' })}
            value={language === 'ar' && data.dateOfBirth ? toArabicNumerals(data.dateOfBirth) : data.dateOfBirth}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.gender' })}
            value={data.gender ? intl.formatMessage({ id: `form.steps.personal.fields.${data.gender}` }) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.phoneNumber' })}
            value={data.phoneNumber}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.email' })}
            value={data.email}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.street' })}
            value={data.street}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.city' })}
            value={data.city}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.emirate' })}
            value={data.emirate}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.country' })}
            value={data.country}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.postalCode' })}
            value={language === 'ar' && data.postalCode ? toArabicNumerals(data.postalCode) : data.postalCode}
          />
        </ReviewSection>

        {/* Step 2: Family & Financial Details */}
        <ReviewSection title={intl.formatMessage({ id: 'form.steps.financial.title' })} step={2}>
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.maritalStatus' })}
            value={data.maritalStatus ? intl.formatMessage({ id: `form.steps.financial.fields.${data.maritalStatus}` }) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.numberOfDependents' })}
            value={data.numberOfDependents ? formatNumericValue(data.numberOfDependents, language, intl) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.employmentStatus' })}
            value={data.employmentStatus ? intl.formatMessage({ id: `form.steps.financial.fields.${data.employmentStatus}` }) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.monthlyIncome' })}
            value={data.monthlyIncome ? `${formatNumericValue(data.monthlyIncome, language, intl)} ${language === 'ar' ? 'درهم' : 'AED'}` : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.housingStatus' })}
            value={data.housingStatus ? intl.formatMessage({ id: `form.steps.financial.fields.${data.housingStatus}` }) : '-'}
          />
        </ReviewSection>

        {/* Step 3: Situation Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-theme-primary">{intl.formatMessage({ id: 'form.steps.situation.title' })}</h3>
            <Button
              onClick={() => onEdit(3)}
              variant="ghost"
              size="sm"
              className="gap-1.5 text-theme-accent hover:text-theme-accent-hover hover:bg-transparent h-auto p-0 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              {intl.formatMessage({ id: 'common.edit' })}
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-theme-secondary mb-0.5">
                {intl.formatMessage({ id: 'form.steps.situation.fields.describeYourSituation' })}
              </div>
              <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                {data.financialSituation || '-'}
              </div>
            </div>
            {data.employmentCircumstances && (
              <div>
                <div className="text-xs font-medium text-theme-secondary mb-0.5">
                  {intl.formatMessage({ id: 'form.steps.situation.fields.employmentCircumstances' })}
                </div>
                <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                  {data.employmentCircumstances}
                </div>
              </div>
            )}
            {data.reasonForApplying && (
              <div>
                <div className="text-xs font-medium text-theme-secondary mb-0.5">
                  {intl.formatMessage({ id: 'form.steps.situation.fields.reasonForApplying' })}
                </div>
                <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                  {data.reasonForApplying}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-theme-info border border-theme rounded-lg p-4 mt-4">
        <div className="flex gap-3">
          <div className="shrink-0">
            <svg className="w-5 h-5 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-theme-primary">
              {intl.formatMessage({ id: 'form.steps.review.confirmSubmit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
