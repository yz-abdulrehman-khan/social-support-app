import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ApplicationData } from '../../App';
import { t, Language } from '../../translations';

interface StepOneProps {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  stepNumber: number;
  language?: Language;
}

export function StepOne({ data, onChange, stepNumber, language = 'en' }: StepOneProps) {
  return (
    <div className="space-y-5">
      {/* Question Number and Title */}
      <div>
        <h2 className="text-xl font-semibold text-theme-primary mb-1.5">
          {stepNumber}. {t('step1Title', language)}
        </h2>
        <p className="text-sm text-gray-600">
          {t('step1Subtitle', language)}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Full Name - English */}
        <div>
          <Label htmlFor="fullNameEnglish" className="text-sm font-medium text-gray-700 mb-1.5">
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

        {/* Full Name - Arabic */}
        <div>
          <Label htmlFor="fullNameArabic" className="text-sm font-medium text-gray-700 mb-1.5">
            {t('fullNameArabic', language)} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullNameArabic"
            value={data.fullNameArabic}
            onChange={(e) => onChange({ fullNameArabic: e.target.value })}
            placeholder={language === 'en' ? "أدخل اسمك الكامل بالعربية" : "أدخل اسمك الكامل بالعربية"}
            className="w-full"
            dir="rtl"
          />
        </div>

        {/* Emirates ID & Date of Birth - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nationalId" className="text-sm font-medium text-gray-700 mb-1.5">
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
          <div>
            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 mb-1.5">
              {t('dateOfBirth', language)} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="w-full"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1.5">
            {t('gender', language)} <span className="text-red-500">*</span>
          </Label>
          <Select value={data.gender} onValueChange={(value) => onChange({ gender: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('selectGender', language)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t('male', language)}</SelectItem>
              <SelectItem value="female">{t('female', language)}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address Section Header */}
        <div className="pt-4">
          <h3 className="text-base font-semibold text-theme-primary mb-4">
            {language === 'en' ? 'Address Information' : 'معلومات العنوان'}
          </h3>
        </div>

        {/* Street Address */}
        <div>
          <Label htmlFor="street" className="text-sm font-medium text-gray-700 mb-1.5">
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
            <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1.5">
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
            <Label htmlFor="emirate" className="text-sm font-medium text-gray-700 mb-1.5">
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
            <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1.5">
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
            <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 mb-1.5">
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

        {/* Contact Section Header */}
        <div className="pt-4">
          <h3 className="text-base font-semibold text-theme-primary mb-4">
            {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
          </h3>
        </div>

        {/* Phone & Email - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-1.5">
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5">
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
