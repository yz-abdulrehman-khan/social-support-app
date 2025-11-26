import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Languages } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { FormField, FormControl, FormItem, FormMessage, FormLabel } from '@/components/ui/form';

import { toArabicNumerals } from '@/lib/i18n';
import { formatNationalId, formatGCCPhone } from '@/features/application-form/validation';
import type { ApplicationData } from '@/features/application-form/types';
import { AIService } from '@/services/aiService';
import { useLanguage } from '@/app/providers';
import { useRTL } from '@/hooks/useRTL';
import { GCC_COUNTRY_CODES, GENDER_OPTIONS, getCountryConfig, getCitiesForRegion } from '@/config/formData';
import { VALIDATION_CONSTRAINTS } from '@/config/validation';

interface StepOneProps {
  stepNumber: number;
}

export function StepOne({ stepNumber }: StepOneProps) {
  const intl = useIntl();
  const { language } = useLanguage();
  const { isRTL, dir } = useRTL();
  const { control, setValue, watch } = useFormContext<ApplicationData>();

  // Translation state
  const [isTranslatingEnglish, setIsTranslatingEnglish] = useState(false);
  const [isTranslatingArabic, setIsTranslatingArabic] = useState(false);

  // Watch form values
  const fullNameEnglish = watch('fullNameEnglish');
  const fullNameArabic = watch('fullNameArabic');
  const selectedCountry = watch('country');
  const selectedRegion = watch('emirate');

  // Get country configuration and derived data
  const countryConfig = getCountryConfig(selectedCountry);
  const regions = countryConfig?.regions || [];
  const cities = selectedCountry && selectedRegion
    ? getCitiesForRegion(selectedCountry, selectedRegion)
    : [];

  // Get dynamic labels based on country
  const regionLabel = countryConfig?.regionLabelKey
    ? intl.formatMessage({ id: countryConfig.regionLabelKey })
    : intl.formatMessage({ id: 'form.steps.personal.fields.region' });

  const idLabel = countryConfig?.idLabelKey
    ? intl.formatMessage({ id: countryConfig.idLabelKey })
    : intl.formatMessage({ id: 'form.steps.personal.fields.nationalId' });

  // Convert region name to i18n key (e.g., "Abu Dhabi" → "abuDhabi")
  const toI18nKey = (text: string): string => {
    return text
      .split(' ')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  };

  const getRegionI18nKey = (region: string): string => {
    if (selectedCountry === 'UAE') {
      return `form.steps.personal.fields.emirates.${toI18nKey(region)}`;
    }
    return `form.steps.personal.fields.regions.${selectedCountry.toLowerCase()}.${toI18nKey(region)}`;
  };

  const getTranslatedRegionName = (region: string): string => {
    try {
      return intl.formatMessage({ id: getRegionI18nKey(region) });
    } catch {
      return region;
    }
  };

  // Handler for country change - clears dependent fields ONLY on user interaction
  const handleCountryChange = (newCountry: string) => {
    setValue('country', newCountry);
    // Clear dependent fields when user changes country
    setValue('emirate', '');
    setValue('city', '');
    setValue('phoneNumber', '');
    setValue('nationalId', '');
  };

  // Handler for region change - clears city ONLY on user interaction
  const handleRegionChange = (newRegion: string) => {
    setValue('emirate', newRegion);
    // Clear city when user changes region
    setValue('city', '');
  };

  // Name translation handlers
  const handleEnglishBlur = async () => {
    if (isTranslatingEnglish || isTranslatingArabic) return;

    if (!fullNameEnglish?.trim()) {
      setValue('fullNameArabic', '', { shouldValidate: false });
      return;
    }

    try {
      setIsTranslatingArabic(true);
      const arabicTranslation = await AIService.translateToArabic(fullNameEnglish);
      if (arabicTranslation) {
        setValue('fullNameArabic', arabicTranslation, { shouldValidate: false });
      }
    } catch (error) {
      console.error('Failed to translate to Arabic:', error);
    } finally {
      setIsTranslatingArabic(false);
    }
  };

  const handleArabicBlur = async () => {
    if (isTranslatingEnglish || isTranslatingArabic) return;

    if (!fullNameArabic?.trim()) {
      setValue('fullNameEnglish', '', { shouldValidate: false });
      return;
    }

    try {
      setIsTranslatingEnglish(true);
      const englishTranslation = await AIService.translateToEnglish(fullNameArabic);
      if (englishTranslation) {
        setValue('fullNameEnglish', englishTranslation, { shouldValidate: false });
      }
    } catch (error) {
      console.error('Failed to translate to English:', error);
    } finally {
      setIsTranslatingEnglish(false);
    }
  };

  // Input formatters
  const handleNationalIdChange = (value: string) => {
    setValue('nationalId', formatNationalId(value, selectedCountry));
  };

  const handlePhoneChange = (value: string) => {
    setValue('phoneNumber', formatGCCPhone(value, selectedCountry));
  };

  const isTranslating = isTranslatingEnglish || isTranslatingArabic;

  return (
    <div className="space-y-8 w-full">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground-dark">
          {isRTL ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.personal.title' })}
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
                    disabled={isTranslating || language === 'ar'}
                  />
                </FormControl>
                {isTranslatingEnglish && (
                  <div className="flex items-center gap-2 text-xs text-theme-accent mt-1">
                    <Languages className="w-3 h-3 animate-pulse" />
                    <span>{intl.formatMessage({ id: 'form.steps.personal.translating' })}</span>
                  </div>
                )}
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
                    disabled={isTranslating || language === 'en'}
                  />
                </FormControl>
                {isTranslatingArabic && (
                  <div className="flex items-center gap-2 text-xs text-theme-accent mt-1" dir={dir}>
                    <Languages className="w-3 h-3 animate-pulse" />
                    <span>{intl.formatMessage({ id: 'form.steps.personal.translating' })}</span>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Country & Region Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.country' })} <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  dir={dir}
                  value={field.value}
                  onValueChange={handleCountryChange}
                  onOpenChange={(open) => { if (!open) field.onBlur(); }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.selectCountry' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GCC_COUNTRY_CODES.map((code) => (
                      <SelectItem key={code} value={code}>
                        {intl.formatMessage({ id: `form.steps.personal.fields.countries.${code.toLowerCase()}` })}
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
            name="emirate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {regionLabel} <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  dir={dir}
                  value={field.value}
                  onValueChange={handleRegionChange}
                  onOpenChange={(open) => { if (!open) field.onBlur(); }}
                  disabled={!selectedCountry}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.selectRegion' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {getTranslatedRegionName(region)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* National ID, Date of Birth & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          {selectedCountry && (
            <div className="col-span-2">
              <FormField
                control={control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm font-medium">
                      {idLabel} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="nationalId"
                        placeholder={countryConfig?.idFormat || 'Enter ID number'}
                        className="w-full"
                        onChange={(e) => handleNationalIdChange(e.target.value)}
                        maxLength={countryConfig?.idMaxLength || 18}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className={selectedCountry ? 'col-span-2' : 'col-span-3'}>
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
          <div className={selectedCountry ? 'md:col-span-1' : 'col-span-2'}>
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium">
                    {intl.formatMessage({ id: 'form.steps.personal.fields.gender' })} <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    dir={dir}
                    value={field.value}
                    onValueChange={field.onChange}
                    onOpenChange={(open) => { if (!open) field.onBlur(); }}
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

        {/* City & Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-medium">
                  {intl.formatMessage({ id: 'form.steps.personal.fields.city' })} <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  dir={dir}
                  value={field.value}
                  onValueChange={field.onChange}
                  onOpenChange={(open) => { if (!open) field.onBlur(); }}
                  disabled={!selectedRegion || cities.length === 0}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={intl.formatMessage({ id: 'form.steps.personal.fields.selectCity' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
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

        {/* Phone & Email */}
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
                    placeholder={countryConfig?.phoneFormat || '+XXX XX XXX XXXX'}
                    className="w-full"
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={countryConfig?.phoneMaxLength || VALIDATION_CONSTRAINTS.GCC_PHONE_MAX_LENGTH}
                    disabled={!selectedCountry}
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
