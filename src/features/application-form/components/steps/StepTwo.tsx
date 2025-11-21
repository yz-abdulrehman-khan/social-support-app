import type { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import type { ApplicationData } from '@/features/application-form/types';

type Language = 'en' | 'ar';

interface StepTwoProps {
  control: Control<ApplicationData>;
  stepNumber: number;
  language?: Language;
}

export function StepTwo({ control, stepNumber, language = 'en' }: StepTwoProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.financial.fields.maritalStatus' })} <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.financial.fields.selectMaritalStatus' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">{intl.formatMessage({ id: 'form.steps.financial.fields.single' })}</SelectItem>
                    <SelectItem value="married">{intl.formatMessage({ id: 'form.steps.financial.fields.married' })}</SelectItem>
                    <SelectItem value="divorced">{intl.formatMessage({ id: 'form.steps.financial.fields.divorced' })}</SelectItem>
                    <SelectItem value="widowed">{intl.formatMessage({ id: 'form.steps.financial.fields.widowed' })}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="numberOfDependents"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.financial.fields.numberOfDependents' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="numberOfDependents"
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Employment & Financial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.financial.fields.employmentStatus' })} <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.financial.fields.selectEmploymentStatus' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="employed">{intl.formatMessage({ id: 'form.steps.financial.fields.employed' })}</SelectItem>
                    <SelectItem value="self-employed">{intl.formatMessage({ id: 'form.steps.financial.fields.selfEmployed' })}</SelectItem>
                    <SelectItem value="unemployed">{intl.formatMessage({ id: 'form.steps.financial.fields.unemployed' })}</SelectItem>
                    <SelectItem value="retired">{intl.formatMessage({ id: 'form.steps.financial.fields.retired' })}</SelectItem>
                    <SelectItem value="student">{intl.formatMessage({ id: 'form.steps.financial.fields.student' })}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.financial.fields.monthlyIncome' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="monthlyIncome"
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Housing */}
        <div>
          <FormField
            control={control}
            name="housingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.financial.fields.housingStatus' })} <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                  onOpenChange={(open) => {
                    if (!open) field.onBlur();
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.financial.fields.selectHousingStatus' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="owned">{intl.formatMessage({ id: 'form.steps.financial.fields.owned' })}</SelectItem>
                    <SelectItem value="rented">{intl.formatMessage({ id: 'form.steps.financial.fields.rented' })}</SelectItem>
                    <SelectItem value="family-owned">{intl.formatMessage({ id: 'form.steps.financial.fields.familyHousing' })}</SelectItem>
                    <SelectItem value="government">{intl.formatMessage({ id: 'form.steps.financial.fields.governmentHousing' })}</SelectItem>
                    <SelectItem value="other">{intl.formatMessage({ id: 'common.other' })}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
