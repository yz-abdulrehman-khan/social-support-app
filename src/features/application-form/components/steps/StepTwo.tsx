import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import type { ApplicationData } from '@/features/application-form/types';
import { useRTL } from '@/hooks/useRTL';
import { MARITAL_STATUS_OPTIONS, EMPLOYMENT_STATUS_OPTIONS, HOUSING_STATUS_OPTIONS } from '@/config/formData';
import { VALIDATION_CONSTRAINTS } from '@/config/validation';

interface StepTwoProps {
  stepNumber: number;
}

export function StepTwo({ stepNumber }: StepTwoProps) {
  const intl = useIntl();
  const { isRTL, dir } = useRTL();
  const { control } = useFormContext<ApplicationData>();
  return (
    <div className="space-y-8">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground-dark">
          {isRTL ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.financial.title' })}
        </h2>
        <p className="text-[11px] md:text-xs lg:text-sm text-gray-600">
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
                  dir={dir}
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
                    {MARITAL_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {intl.formatMessage({ id: `form.steps.financial.fields.${status}` })}
                      </SelectItem>
                    ))}
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
                    min={VALIDATION_CONSTRAINTS.MIN_DEPENDENTS}
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
                  dir={dir}
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
                    {EMPLOYMENT_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {intl.formatMessage({ id: `form.steps.financial.fields.${status}` })}
                      </SelectItem>
                    ))}
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
                    min={VALIDATION_CONSTRAINTS.MIN_INCOME}
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
                  dir={dir}
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
                    {HOUSING_STATUS_OPTIONS.map((status) => {
                      const i18nKey = status === 'family-owned' ? 'familyHousing' : status === 'government' ? 'governmentHousing' : status === 'other' ? 'other' : status;
                      const messageId = status === 'other' ? 'common.other' : `form.steps.financial.fields.${i18nKey}`;
                      return (
                        <SelectItem key={status} value={status}>
                          {intl.formatMessage({ id: messageId })}
                        </SelectItem>
                      );
                    })}
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
