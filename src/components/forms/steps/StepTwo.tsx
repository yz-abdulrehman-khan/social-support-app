import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ApplicationData } from '@/App';
import { useIntl } from 'react-intl';

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
          {intl.formatNumber(stepNumber)}. {intl.formatMessage({ id: 'step2Title' })}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          {intl.formatMessage({ id: 'step2Subtitle' })}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Family Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maritalStatus" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {intl.formatMessage({ id: 'maritalStatus' })} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.maritalStatus}
              onValueChange={(value) => onChange({ maritalStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={intl.formatMessage({ id: 'selectMaritalStatus' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">{intl.formatMessage({ id: 'single' })}</SelectItem>
                <SelectItem value="married">{intl.formatMessage({ id: 'married' })}</SelectItem>
                <SelectItem value="divorced">{intl.formatMessage({ id: 'divorced' })}</SelectItem>
                <SelectItem value="widowed">{intl.formatMessage({ id: 'widowed' })}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="numberOfDependents" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {intl.formatMessage({ id: 'numberOfDependents' })} <span className="text-red-500">*</span>
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
              {intl.formatMessage({ id: 'employmentStatus' })} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.employmentStatus}
              onValueChange={(value) => onChange({ employmentStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={intl.formatMessage({ id: 'selectEmploymentStatus' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">{intl.formatMessage({ id: 'employed' })}</SelectItem>
                <SelectItem value="self-employed">{intl.formatMessage({ id: 'selfEmployed' })}</SelectItem>
                <SelectItem value="unemployed">{intl.formatMessage({ id: 'unemployed' })}</SelectItem>
                <SelectItem value="retired">{intl.formatMessage({ id: 'retired' })}</SelectItem>
                <SelectItem value="student">{intl.formatMessage({ id: 'student' })}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="monthlyIncome" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {intl.formatMessage({ id: 'monthlyIncome' })} <span className="text-red-500">*</span>
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
            {intl.formatMessage({ id: 'housingStatus' })} <span className="text-red-500">*</span>
          </Label>
          <Select
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            value={data.housingStatus}
            onValueChange={(value) => onChange({ housingStatus: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={intl.formatMessage({ id: 'selectHousingStatus' })} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owned">{intl.formatMessage({ id: 'owned' })}</SelectItem>
              <SelectItem value="rented">{intl.formatMessage({ id: 'rented' })}</SelectItem>
              <SelectItem value="family-owned">{intl.formatMessage({ id: 'familyHousing' })}</SelectItem>
              <SelectItem value="government">{intl.formatMessage({ id: 'governmentHousing' })}</SelectItem>
              <SelectItem value="other">{intl.formatMessage({ id: 'other' })}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}