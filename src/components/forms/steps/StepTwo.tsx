import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ApplicationData } from '@/App';
import { t, formatNumber, type Language } from '@/i18n/translations';

interface StepTwoProps {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  stepNumber: number;
  language?: Language;
}

export function StepTwo({ data, onChange, stepNumber, language = 'en' }: StepTwoProps) {
  return (
    <div className="space-y-8">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-dark mb-3">
          {formatNumber(stepNumber, language)}. {t('step2Title', language)}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          {t('step2Subtitle', language)}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Family Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maritalStatus" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('maritalStatus', language)} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.maritalStatus}
              onValueChange={(value) => onChange({ maritalStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectMaritalStatus', language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">{t('single', language)}</SelectItem>
                <SelectItem value="married">{t('married', language)}</SelectItem>
                <SelectItem value="divorced">{t('divorced', language)}</SelectItem>
                <SelectItem value="widowed">{t('widowed', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="numberOfDependents" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('numberOfDependents', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="numberOfDependents"
              type="number"
              min="0"
              value={data.numberOfDependents}
              onChange={(e) => onChange({ numberOfDependents: e.target.value })}
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Employment & Financial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employmentStatus" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('employmentStatus', language)} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.employmentStatus}
              onValueChange={(value) => onChange({ employmentStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectEmploymentStatus', language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">{t('employed', language)}</SelectItem>
                <SelectItem value="self-employed">{t('selfEmployed', language)}</SelectItem>
                <SelectItem value="unemployed">{t('unemployed', language)}</SelectItem>
                <SelectItem value="retired">{t('retired', language)}</SelectItem>
                <SelectItem value="student">{t('student', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="monthlyIncome" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('monthlyIncome', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="monthlyIncome"
              type="number"
              min="0"
              value={data.monthlyIncome}
              onChange={(e) => onChange({ monthlyIncome: e.target.value })}
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Housing */}
        <div>
          <Label htmlFor="housingStatus" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
            {t('housingStatus', language)} <span className="text-red-500">*</span>
          </Label>
          <Select
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            value={data.housingStatus}
            onValueChange={(value) => onChange({ housingStatus: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('selectHousingStatus', language)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owned">{t('owned', language)}</SelectItem>
              <SelectItem value="rented">{t('rented', language)}</SelectItem>
              <SelectItem value="family-owned">{t('familyHousing', language)}</SelectItem>
              <SelectItem value="government">{t('governmentHousing', language)}</SelectItem>
              <SelectItem value="other">{t('other', language)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}