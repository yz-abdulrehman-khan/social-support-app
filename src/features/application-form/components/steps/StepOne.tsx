import { useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { FormField, FormControl, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n';
import { formatEmiratesId, formatUAEPhone } from '@/features/application-form/validation';
import type { ApplicationData } from '@/features/application-form/types';
import { AIService } from '@/services/aiService';
import { useLanguage } from '@/app/providers';
import { UAE_EMIRATES, GENDER_OPTIONS } from '@/config/formData';
import { VALIDATION_CONSTRAINTS } from '@/config/validation';

interface StepOneProps {
  stepNumber: number;
}

export function StepOne({ stepNumber }: StepOneProps) {
  const intl = useIntl();
  const { language } = useLanguage();
  const { control, setValue, watch } = useFormContext<ApplicationData>();
  const isTranslatingRef = useRef(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const fullNameEnglish = watch('fullNameEnglish');
  const fullNameArabic = watch('fullNameArabic');

  const handleEnglishBlur = async () => {
    if (isTranslatingRef.current) return;

    // If English field is empty, clear Arabic field
    if (!fullNameEnglish?.trim()) {
      setValue('fullNameArabic', '', { shouldValidate: false });
      return;
    }

    try {
      isTranslatingRef.current = true;
      setIsTranslating(true);
      const arabicTranslation = await AIService.translateToArabic(fullNameEnglish);
      if (arabicTranslation) {
        setValue('fullNameArabic', arabicTranslation, { shouldValidate: false });
      }
    } catch (error) {
      console.error('Failed to translate to Arabic:', error);
    } finally {
      isTranslatingRef.current = false;
      setIsTranslating(false);
    }
  };

  const handleArabicBlur = async () => {
    if (isTranslatingRef.current) return;

    // If Arabic field is empty, clear English field
    if (!fullNameArabic?.trim()) {
      setValue('fullNameEnglish', '', { shouldValidate: false });
      return;
    }

    try {
      isTranslatingRef.current = true;
      setIsTranslating(true);
      const englishTranslation = await AIService.translateToEnglish(fullNameArabic);
      if (englishTranslation) {
        setValue('fullNameEnglish', englishTranslation, { shouldValidate: false });
      }
    } catch (error) {
      console.error('Failed to translate to English:', error);
    } finally {
      isTranslatingRef.current = false;
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground-dark">
          {language === 'ar' ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.personal.title' })}
        </h2>
        <p className="text-[11px] md:text-xs lg:text-sm text-gray-600">
          {intl.formatMessage({ id: 'form.steps.personal.subtitle' })}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 w-full">
        {/* Full Name - English & Arabic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="fullNameEnglish"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.fullNameEnglish' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="fullNameEnglish"
                    placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.placeholders.fullNameEnglish' })}
                    className="w-full"
                    onBlur={() => {
                      field.onBlur();
                      handleEnglishBlur();
                    }}
                    disabled={isTranslating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="fullNameArabic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.fullNameArabic' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="fullNameArabic"
                    placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.placeholders.fullNameArabic' })}
                    className="w-full"
                    dir="rtl"
                    onBlur={() => {
                      field.onBlur();
                      handleArabicBlur();
                    }}
                    disabled={isTranslating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Emirates ID, Date of Birth & Gender - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          <div className="col-span-2">
            <FormField
              control={control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium">
                    {intl.formatMessage({ id: 'form.steps.personal.fields.emiratesId' })} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="nationalId"
                      placeholder="784-XXXX-XXXXXXX-X"
                      className="w-full"
                      onChange={(e) => {
                        const formatted = formatEmiratesId(e.target.value);
                        setValue('nationalId', formatted);
                      }}
                      maxLength={VALIDATION_CONSTRAINTS.EMIRATES_ID_MAX_LENGTH}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={control}
              name="dateOfBirth"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium">
                    {intl.formatMessage({ id: 'form.steps.personal.fields.dateOfBirth' })} <span className="text-red-500">*</span>
                  </FormLabel>
                  <DatePicker
                    id="dateOfBirth"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="w-full"
                    language={language}
                    placeholder={language === 'ar' ? 'اختر تاريخ الميلاد' : 'Select date of birth'}
                    hasError={!!fieldState.error}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-1">
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium">
                    {intl.formatMessage({ id: 'form.steps.personal.fields.gender' })} <span className="text-red-500">*</span>
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.selectGender' })} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDER_OPTIONS.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {intl.formatMessage({ id: `form.steps.personal.fields.${gender}` })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Street Address */}
        <div>
          <FormField
            control={control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.street' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="street"
                    placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.placeholders.street' })}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* City & Emirate - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.city' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="city"
                    placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.placeholders.city' })}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="emirate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.emirate' })} <span className="text-red-500">*</span>
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
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UAE_EMIRATES.map((emirate) => {
                      // Convert "Abu Dhabi" → "abuDhabi", "Ras Al Khaimah" → "rasAlKhaimah"
                      const i18nKey = emirate
                        .split(' ')
                        .map((word, index) =>
                          index === 0
                            ? word.toLowerCase()
                            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                        )
                        .join('');
                      return (
                        <SelectItem key={emirate} value={emirate}>
                          {intl.formatMessage({ id: `form.steps.personal.fields.emirates.${i18nKey}` })}
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

        {/* Country & Postal Code - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.country' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="country"
                    className="w-full bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.postalCode' })}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="postalCode"
                    placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.placeholders.postalCode' })}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone & Email - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.phoneNumber' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phoneNumber"
                    type="tel"
                    placeholder="+971 XX XXX XXXX"
                    className="w-full"
                    onChange={(e) => {
                      const formatted = formatUAEPhone(e.target.value);
                      setValue('phoneNumber', formatted);
                    }}
                    maxLength={VALIDATION_CONSTRAINTS.UAE_PHONE_MAX_LENGTH}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.email' })} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
