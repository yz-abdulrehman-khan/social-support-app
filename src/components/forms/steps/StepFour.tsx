import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import type { ApplicationData } from '@/App';
import { useIntl } from 'react-intl';

type Language = 'en' | 'ar';

interface StepFourProps {
  data: ApplicationData;
  onEdit: (step: number) => void;
  stepNumber: number;
  language?: Language;
}

export function StepFour({ data, onEdit, stepNumber, language = 'en' }: StepFourProps) {
  const intl = useIntl();
  // Helper function to get translated values
  const getTranslatedValue = (_key: string, value: string): string => {
    if (!value) return '-';

    // Map of English values to translation keys
    const valueKeyMap: { [key: string]: string } = {
      'male': 'male',
      'female': 'female',
      'single': 'single',
      'married': 'married',
      'divorced': 'divorced',
      'widowed': 'widowed',
      'employed': 'employed',
      'unemployed': 'unemployed',
      'selfEmployed': 'selfEmployed',
      'retired': 'retired',
      'student': 'student',
      'owned': 'owned',
      'rented': 'rented',
      'familyHousing': 'familyHousing',
      'governmentHousing': 'governmentHousing',
      'other': 'other',
    };

    // If value has a translation, use it
    if (valueKeyMap[value]) {
      return t(valueKeyMap[value] as any, language);
    }

    return value;
  };

  const DataRow = ({ label, value }: { label: string; value: string }) => (
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
          {intl.formatMessage({ id: 'editSection' })}
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
          {intl.formatNumber(stepNumber)}. {intl.formatMessage({ id: 'step4Title' })}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-theme-secondary">
          {intl.formatMessage({ id: 'step4Subtitle' })}
        </p>
      </div>

      {/* Review Sections */}
      <div>
        {/* Step 1: Personal Information */}
        <ReviewSection title={intl.formatMessage({ id: 'step1Title' })} step={1}>
          <DataRow
            label={intl.formatMessage({ id: 'fullNameEnglish' })}
            value={data.fullNameEnglish}
          />
          <DataRow
            label={intl.formatMessage({ id: 'fullNameArabic' })}
            value={data.fullNameArabic}
          />
          <DataRow
            label={intl.formatMessage({ id: 'emiratesId' })}
            value={data.nationalId}
          />
          <DataRow
            label={intl.formatMessage({ id: 'dateOfBirth' })}
            value={language === 'ar' && data.dateOfBirth ? intl.formatNumber(data.dateOfBirth) : data.dateOfBirth}
          />
          <DataRow
            label={intl.formatMessage({ id: 'gender' })}
            value={getTranslatedValue('gender', data.gender)}
          />
          <DataRow
            label={intl.formatMessage({ id: 'phoneNumber' })}
            value={data.phoneNumber}
          />
          <DataRow
            label={intl.formatMessage({ id: 'email' })}
            value={data.email}
          />
          <DataRow
            label={intl.formatMessage({ id: 'street' })}
            value={data.street}
          />
          <DataRow
            label={intl.formatMessage({ id: 'city' })}
            value={data.city}
          />
          <DataRow
            label={intl.formatMessage({ id: 'emirate' })}
            value={data.emirate}
          />
          <DataRow
            label={intl.formatMessage({ id: 'country' })}
            value={data.country}
          />
          <DataRow
            label={intl.formatMessage({ id: 'postalCode' })}
            value={language === 'ar' && data.postalCode ? intl.formatNumber(data.postalCode) : data.postalCode}
          />
        </ReviewSection>

        {/* Step 2: Family & Financial Details */}
        <ReviewSection title={intl.formatMessage({ id: 'step2Title' })} step={2}>
          <DataRow
            label={intl.formatMessage({ id: 'maritalStatus' })}
            value={getTranslatedValue('maritalStatus', data.maritalStatus)}
          />
          <DataRow
            label={intl.formatMessage({ id: 'numberOfDependents' })}
            value={language === 'ar' && data.numberOfDependents ? intl.formatNumber(data.numberOfDependents) : data.numberOfDependents}
          />
          <DataRow
            label={intl.formatMessage({ id: 'employmentStatus' })}
            value={getTranslatedValue('employmentStatus', data.employmentStatus)}
          />
          <DataRow
            label={intl.formatMessage({ id: 'monthlyIncome' })}
            value={data.monthlyIncome ? (language === 'ar' ? `${intl.formatNumber(data.monthlyIncome)} درهم` : `${data.monthlyIncome} AED`) : '-'}
          />
          <DataRow
            label={intl.formatMessage({ id: 'housingStatus' })}
            value={getTranslatedValue('housingStatus', data.housingStatus)}
          />
        </ReviewSection>

        {/* Step 3: Situation Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-theme-primary">{intl.formatMessage({ id: 'step3Title' })}</h3>
            <Button
              onClick={() => onEdit(3)}
              variant="ghost"
              size="sm"
              className="gap-1.5 text-theme-accent hover:text-theme-accent-hover hover:bg-transparent h-auto p-0 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              {intl.formatMessage({ id: 'editSection' })}
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-theme-secondary mb-0.5">
                {intl.formatMessage({ id: 'describeYourSituation' })}
              </div>
              <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                {data.financialSituation || '-'}
              </div>
            </div>
            {data.employmentCircumstances && (
              <div>
                <div className="text-xs font-medium text-theme-secondary mb-0.5">
                  {language === 'en' ? 'Employment Circumstances' : 'ظروف التوظيف'}
                </div>
                <div className="text-sm text-theme-primary leading-relaxed whitespace-pre-wrap">
                  {data.employmentCircumstances}
                </div>
              </div>
            )}
            {data.reasonForApplying && (
              <div>
                <div className="text-xs font-medium text-theme-secondary mb-0.5">
                  {language === 'en' ? 'Reason for Applying' : 'سبب التقديم'}
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
              {intl.formatMessage({ id: 'confirmSubmit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
