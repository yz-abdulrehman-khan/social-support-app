import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import type { ApplicationData } from '@/App';
import { t, formatNumber, type Language } from '@/i18n/translations';

interface StepFourProps {
  data: ApplicationData;
  onEdit: (step: number) => void;
  stepNumber: number;
  language?: Language;
}

export function StepFour({ data, onEdit, stepNumber, language = 'en' }: StepFourProps) {
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
          {t('editSection', language)}
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
          {formatNumber(stepNumber, language)}. {t('step4Title', language)}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-theme-secondary">
          {t('step4Subtitle', language)}
        </p>
      </div>

      {/* Review Sections */}
      <div>
        {/* Step 1: Personal Information */}
        <ReviewSection title={t('step1Title', language)} step={1}>
          <DataRow
            label={t('fullNameEnglish', language)}
            value={data.fullNameEnglish}
          />
          <DataRow
            label={t('fullNameArabic', language)}
            value={data.fullNameArabic}
          />
          <DataRow
            label={t('emiratesId', language)}
            value={data.nationalId}
          />
          <DataRow
            label={t('dateOfBirth', language)}
            value={language === 'ar' && data.dateOfBirth ? formatNumber(data.dateOfBirth, language) : data.dateOfBirth}
          />
          <DataRow
            label={t('gender', language)}
            value={getTranslatedValue('gender', data.gender)}
          />
          <DataRow
            label={t('phoneNumber', language)}
            value={data.phoneNumber}
          />
          <DataRow
            label={t('email', language)}
            value={data.email}
          />
          <DataRow
            label={t('street', language)}
            value={data.street}
          />
          <DataRow
            label={t('city', language)}
            value={data.city}
          />
          <DataRow
            label={t('emirate', language)}
            value={data.emirate}
          />
          <DataRow
            label={t('country', language)}
            value={data.country}
          />
          <DataRow
            label={t('postalCode', language)}
            value={language === 'ar' && data.postalCode ? formatNumber(data.postalCode, language) : data.postalCode}
          />
        </ReviewSection>

        {/* Step 2: Family & Financial Details */}
        <ReviewSection title={t('step2Title', language)} step={2}>
          <DataRow
            label={t('maritalStatus', language)}
            value={getTranslatedValue('maritalStatus', data.maritalStatus)}
          />
          <DataRow
            label={t('numberOfDependents', language)}
            value={language === 'ar' && data.numberOfDependents ? formatNumber(data.numberOfDependents, language) : data.numberOfDependents}
          />
          <DataRow
            label={t('employmentStatus', language)}
            value={getTranslatedValue('employmentStatus', data.employmentStatus)}
          />
          <DataRow
            label={t('monthlyIncome', language)}
            value={data.monthlyIncome ? (language === 'ar' ? `${formatNumber(data.monthlyIncome, language)} درهم` : `${data.monthlyIncome} AED`) : '-'}
          />
          <DataRow
            label={t('housingStatus', language)}
            value={getTranslatedValue('housingStatus', data.housingStatus)}
          />
        </ReviewSection>

        {/* Step 3: Situation Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-theme-primary">{t('step3Title', language)}</h3>
            <Button
              onClick={() => onEdit(3)}
              variant="ghost"
              size="sm"
              className="gap-1.5 text-theme-accent hover:text-theme-accent-hover hover:bg-transparent h-auto p-0 text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              {t('editSection', language)}
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-theme-secondary mb-0.5">
                {t('describeYourSituation', language)}
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
              {t('confirmSubmit', language)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
