import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ApplicationData } from '@/App';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n-utils';

type Language = 'en' | 'ar';

interface StepTwoProps {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  stepNumber: number;
  language?: Language;
}

export function StepTwo({ data, onChange, stepNumber, language = 'en' }: StepTwoProps) {
  const intl = useIntl();
  return (
    <div className="space-y-8">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-dark mb-3">
          {language === 'ar' ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.financial.title' })}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          {intl.formatMessage({ id: 'form.steps.financial.subtitle' })}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Family Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maritalStatus" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {intl.formatMessage({ id: 'form.steps.financial.fields.maritalStatus' })} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.maritalStatus}
              onValueChange={(value) => onChange({ maritalStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.financial.fields.selectMaritalStatus' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">{intl.formatMessage({ id: 'form.steps.financial.fields.single' })}</SelectItem>
                <SelectItem value="married">{intl.formatMessage({ id: 'form.steps.financial.fields.married' })}</SelectItem>
                <SelectItem value="divorced">{intl.formatMessage({ id: 'form.steps.financial.fields.divorced' })}</SelectItem>
                <SelectItem value="widowed">{intl.formatMessage({ id: 'form.steps.financial.fields.widowed' })}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="numberOfDependents" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {intl.formatMessage({ id: 'form.steps.financial.fields.numberOfDependents' })} <span className="text-red-500">*</span>
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
              {intl.formatMessage({ id: 'form.steps.financial.fields.employmentStatus' })} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.employmentStatus}
              onValueChange={(value) => onChange({ employmentStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.financial.fields.selectEmploymentStatus' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">{intl.formatMessage({ id: 'form.steps.financial.fields.employed' })}</SelectItem>
                <SelectItem value="self-employed">{intl.formatMessage({ id: 'form.steps.financial.fields.selfEmployed' })}</SelectItem>
                <SelectItem value="unemployed">{intl.formatMessage({ id: 'form.steps.financial.fields.unemployed' })}</SelectItem>
                <SelectItem value="retired">{intl.formatMessage({ id: 'form.steps.financial.fields.retired' })}</SelectItem>
                <SelectItem value="student">{intl.formatMessage({ id: 'form.steps.financial.fields.student' })}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="monthlyIncome" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {intl.formatMessage({ id: 'form.steps.financial.fields.monthlyIncome' })} <span className="text-red-500">*</span>
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
            {intl.formatMessage({ id: 'form.steps.financial.fields.housingStatus' })} <span className="text-red-500">*</span>
          </Label>
          <Select
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            value={data.housingStatus}
            onValueChange={(value) => onChange({ housingStatus: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.financial.fields.selectHousingStatus' })} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owned">{intl.formatMessage({ id: 'form.steps.financial.fields.owned' })}</SelectItem>
              <SelectItem value="rented">{intl.formatMessage({ id: 'form.steps.financial.fields.rented' })}</SelectItem>
              <SelectItem value="family-owned">{intl.formatMessage({ id: 'form.steps.financial.fields.familyHousing' })}</SelectItem>
              <SelectItem value="government">{intl.formatMessage({ id: 'form.steps.financial.fields.governmentHousing' })}</SelectItem>
              <SelectItem value="other">{intl.formatMessage({ id: 'common.other' })}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}