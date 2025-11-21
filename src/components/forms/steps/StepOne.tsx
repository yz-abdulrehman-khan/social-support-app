import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import type { ApplicationData } from '@/App';
import { t, formatNumber, type Language } from '@/i18n/translations';

interface StepOneProps {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  stepNumber: number;
  language?: Language;
}

export function StepOne({ data, onChange, stepNumber, language = 'en' }: StepOneProps) {
  return (
    <div className="space-y-8 w-full">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground-dark mb-3">
          {formatNumber(stepNumber, language)}. {t('step1Title', language)}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-gray-600">
          {t('step1Subtitle', language)}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 w-full">
        {/* Full Name - English & Arabic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullNameEnglish" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('fullNameEnglish', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullNameEnglish"
              value={data.fullNameEnglish}
              onChange={(e) => onChange({ fullNameEnglish: e.target.value })}
              placeholder={language === 'en' ? "Enter your full name in English" : "أدخل اسمك الكامل بالإنجليزية"}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="fullNameArabic" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('fullNameArabic', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullNameArabic"
              value={data.fullNameArabic}
              onChange={(e) => onChange({ fullNameArabic: e.target.value })}
              placeholder="أدخل اسمك الكامل بالعربية"
              className="w-full"
              dir="rtl"
            />
          </div>
        </div>

        {/* Emirates ID, Date of Birth & Gender - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-2">
            <Label htmlFor="nationalId" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('emiratesId', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nationalId"
              value={data.nationalId}
              onChange={(e) => onChange({ nationalId: e.target.value })}
              placeholder="784-XXXX-XXXXXXX-X"
              className="w-full"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="dateOfBirth" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('dateOfBirth', language)} <span className="text-red-500">*</span>
            </Label>
            <DatePicker
              id="dateOfBirth"
              value={data.dateOfBirth}
              onChange={(date) => onChange({ dateOfBirth: date })}
              className="w-full"
              language={language}
              placeholder={language === 'ar' ? 'اختر تاريخ الميلاد' : 'Select date of birth'}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="gender" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('gender', language)} <span className="text-red-500">*</span>
            </Label>
            <Select
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              value={data.gender}
              onValueChange={(value) => onChange({ gender: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('selectGender', language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('male', language)}</SelectItem>
                <SelectItem value="female">{t('female', language)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Street Address */}
        <div>
          <Label htmlFor="street" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
            {t('street', language)} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="street"
            value={data.street}
            onChange={(e) => onChange({ street: e.target.value })}
            placeholder={language === 'en' ? "Enter street address" : "أدخل عنوان الشارع"}
            className="w-full"
          />
        </div>

        {/* City & Emirate - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('city', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder={language === 'en' ? "Enter city" : "أدخل المدينة"}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="emirate" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('emirate', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="emirate"
              value={data.emirate}
              onChange={(e) => onChange({ emirate: e.target.value })}
              placeholder={language === 'en' ? "Enter emirate" : "أدخل الإمارة"}
              className="w-full"
            />
          </div>
        </div>

        {/* Country & Postal Code - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('country', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              value={data.country}
              onChange={(e) => onChange({ country: e.target.value })}
              placeholder={language === 'en' ? "United Arab Emirates" : "الإمارات العربية المتحدة"}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="postalCode" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('postalCode', language)}
            </Label>
            <Input
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => onChange({ postalCode: e.target.value })}
              placeholder={language === 'en' ? "Enter postal code" : "أدخل الرمز البريدي"}
              className="w-full"
            />
          </div>
        </div>

        {/* Phone & Email - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('phoneNumber', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={data.phoneNumber}
              onChange={(e) => onChange({ phoneNumber: e.target.value })}
              placeholder="+971 XX XXX XXXX"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">
              {t('email', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="example@email.com"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}