import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useIntl, type IntlShape } from 'react-intl';
import { toArabicNumerals, formatNumericValue } from '@/lib/i18n';
import type { ApplicationData } from '@/features/application-form/types';
import { useLanguage } from '@/app/providers';
import { useRTL } from '@/hooks/useRTL';
import { getCountryConfig } from '@/config/formData';

interface StepFourProps {
  data: ApplicationData;
  onEdit: (step: number) => void;
  stepNumber: number;
}

// Memoized data row component - defined outside to prevent recreation
const DataRow = memo(function DataRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="text-xs text-theme-secondary mb-1">{label}</div>
      <div className="text-sm text-theme-primary">{value || '-'}</div>
    </div>
  );
});

// Memoized review section component
const ReviewSection = memo(function ReviewSection({
  title,
  step,
  onEdit,
  intl,
  children
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  intl: IntlShape;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-200">
        <h3 className="text-base font-semibold text-theme-primary">{title}</h3>
        <Button
          onClick={() => onEdit(step)}
          variant="subtle"
          size="sm"
          className="gap-2 text-theme-accent hover:text-theme-accent-hover press-effect"
        >
          <Edit className="w-4 h-4" />
          {intl.formatMessage({ id: 'common.edit' })}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">{children}</div>
    </div>
  );
});

export function StepFour({ data, onEdit, stepNumber }: StepFourProps) {
  const intl = useIntl();
  const { language } = useLanguage();
  const { isRTL } = useRTL();

  // Get country config for dynamic labels
  const countryConfig = getCountryConfig(data.country);

  // Get region label based on country
  const getRegionLabel = () => {
    if (countryConfig?.regionLabelKey) {
      return intl.formatMessage({ id: countryConfig.regionLabelKey });
    }
    return intl.formatMessage({ id: 'form.steps.personal.fields.region' });
  };

  // Get translated country name
  const getCountryDisplayName = () => {
    if (data.country) {
      try {
        return intl.formatMessage({ id: `form.steps.personal.fields.countries.${data.country.toLowerCase()}` });
      } catch {
        return data.country;
      }
    }
    return '-';
  };

  return (
    <div className="space-y-8 w-full">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-theme-primary">
          {isRTL ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.review.title' })}
        </h2>
        <p className="hidden md:block text-xs lg:text-sm text-theme-secondary">
          {intl.formatMessage({ id: 'form.steps.review.subtitle' })}
        </p>
      </div>

      {/* Review Sections */}
      <div>
        {/* Step 1: Personal Information */}
        <ReviewSection title={intl.formatMessage({ id: 'form.steps.personal.title' })} step={1} onEdit={onEdit} intl={intl}>
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.fullNameEnglish' })}
            value={data.fullNameEnglish}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.fullNameArabic' })}
            value={data.fullNameArabic}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.country' })}
            value={getCountryDisplayName()}
          />
          <DataRow
            label={getRegionLabel()}
            value={data.emirate}
          />
          {data.nationalId && (
            <DataRow
              label={countryConfig?.idLabelKey ? intl.formatMessage({ id: countryConfig.idLabelKey }) : intl.formatMessage({ id: 'form.steps.personal.fields.nationalId' })}
              value={data.nationalId}
            />
          )}
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.personal.fields.dateOfBirth' })}
            value={isRTL && data.dateOfBirth ? toArabicNumerals(data.dateOfBirth) : data.dateOfBirth}
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
            label={intl.formatMessage({ id: 'form.steps.personal.fields.postalCode' })}
            value={isRTL && data.postalCode ? toArabicNumerals(data.postalCode) : data.postalCode}
          />
        </ReviewSection>

        {/* Step 2: Family & Financial Details */}
        <ReviewSection title={intl.formatMessage({ id: 'form.steps.financial.title' })} step={2} onEdit={onEdit} intl={intl}>
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.maritalStatus' })}
            value={data.maritalStatus ? intl.formatMessage({ id: `form.steps.financial.fields.${data.maritalStatus}` }) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.numberOfDependents' })}
            value={data.numberOfDependents ? formatNumericValue(data.numberOfDependents, language) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.employmentStatus' })}
            value={data.employmentStatus ? intl.formatMessage({ id: `form.steps.financial.fields.${data.employmentStatus}` }) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.monthlyIncome' })}
            value={data.monthlyIncome ? `${formatNumericValue(data.monthlyIncome, language)} ${isRTL ? 'درهم' : 'AED'}` : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'form.steps.financial.fields.housingStatus' })}
            value={data.housingStatus ? intl.formatMessage({ id: `form.steps.financial.fields.${data.housingStatus}` }) : '-'}
          />
        </ReviewSection>

        {/* Step 3: Situation Description */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-200">
            <h3 className="text-base font-semibold text-theme-primary">{intl.formatMessage({ id: 'form.steps.situation.title' })}</h3>
            <Button
              onClick={() => onEdit(3)}
              variant="subtle"
              size="sm"
              className="gap-2 text-theme-accent hover:text-theme-accent-hover press-effect"
            >
              <Edit className="w-4 h-4" />
              {intl.formatMessage({ id: 'common.edit' })}
            </Button>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-xs text-theme-secondary mb-2">
                {intl.formatMessage({ id: 'form.steps.situation.fields.describeYourSituation' })}
              </div>
              <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                {data.financialSituation || '-'}
              </div>
            </div>
            {data.employmentCircumstances && (
              <div>
                <div className="text-xs text-theme-secondary mb-2">
                  {intl.formatMessage({ id: 'form.steps.situation.fields.employmentCircumstances' })}
                </div>
                <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                  {data.employmentCircumstances}
                </div>
              </div>
            )}
            {data.reasonForApplying && (
              <div>
                <div className="text-xs text-theme-secondary mb-2">
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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              {intl.formatMessage({ id: 'form.steps.review.confirmSubmit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
