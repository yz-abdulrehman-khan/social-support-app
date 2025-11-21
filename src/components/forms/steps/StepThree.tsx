import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { ApplicationData } from '@/App';
import { Sparkles } from 'lucide-react';
import { useIntl } from 'react-intl';
import { toArabicNumerals } from '@/lib/i18n-utils';

type Language = 'en' | 'ar';

interface StepThreeProps {
  data: ApplicationData;
  onChange: (updates: Partial<ApplicationData>) => void;
  stepNumber: number;
  language?: Language;
}

export function StepThree({ data, onChange, stepNumber, language = 'en' }: StepThreeProps) {
  const intl = useIntl();
  const isRTL = language === 'ar';

  const handleAIInsert = (field: keyof ApplicationData) => {
    const sampleText = language === 'en'
      ? "I am currently facing financial difficulties due to unexpected medical expenses and temporary unemployment. My family depends on me for support, and I am actively seeking assistance to help us through this challenging period."
      : "أواجه حاليًا صعوبات مالية بسبب نفقات طبية غير متوقعة والبطالة المؤقتة. تعتمد عليّ عائلتي للحصول على الدعم، وأبحث بنشاط عن المساعدة لمساعدتنا خلال هذه الفترة الصعبة.";
    onChange({ [field]: sampleText });
  };

  return (
    <div className="space-y-8">
      {/* Question Number and Title */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-theme-primary mb-3">
          {language === 'ar' ? toArabicNumerals(String(stepNumber)) : stepNumber}. {intl.formatMessage({ id: 'form.steps.situation.title' })}
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-theme-secondary">
          {intl.formatMessage({ id: 'form.steps.situation.subtitle' })}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Financial Situation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="financialSituation" className="text-xs md:text-sm font-medium text-theme-primary">
              {intl.formatMessage({ id: 'form.steps.situation.fields.describeYourSituation' })} <span className="text-red-500">*</span>
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleAIInsert('financialSituation')}
              className="gap-2 text-theme-accent hover:text-theme-accent-hover hover:bg-theme-accent/5 rounded-full h-8 px-3"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">{intl.formatMessage({ id: 'form.steps.situation.fields.helpMeWrite' })}</span>
            </Button>
          </div>
          <Textarea
            id="financialSituation"
            value={data.financialSituation}
            onChange={(e) => onChange({ financialSituation: e.target.value })}
            placeholder={intl.formatMessage({ id: 'form.steps.situation.fields.situationPlaceholder' })}
            rows={6}
            className="resize-none"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <p className="text-xs text-theme-secondary">
            {data.financialSituation.length} {language === 'en' ? 'characters (minimum 50 required)' : 'حرف (الحد الأدنى ٥٠ حرفًا مطلوبًا)'}
          </p>
        </div>

        {/* Employment Circumstances (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="employmentCircumstances" className="text-xs md:text-sm font-medium text-theme-primary block">
            {language === 'en' ? 'Employment Circumstances (Optional)' : 'ظروف التوظيف (اختياري)'}
          </Label>
          <Textarea
            id="employmentCircumstances"
            value={data.employmentCircumstances}
            onChange={(e) => onChange({ employmentCircumstances: e.target.value })}
            placeholder={language === 'en' ? "Describe your employment situation..." : "صف حالة عملك..."}
            rows={4}
            className="resize-none"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Reason for Applying */}
        <div className="space-y-2">
          <Label htmlFor="reasonForApplying" className="text-xs md:text-sm font-medium text-theme-primary block">
            {language === 'en' ? 'Specific Reason for Applying' : 'السبب المحدد للتقديم'} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reasonForApplying"
            value={data.reasonForApplying}
            onChange={(e) => onChange({ reasonForApplying: e.target.value })}
            placeholder={language === 'en' ? "What specific assistance are you seeking and why?" : "ما هي المساعدة المحددة التي تبحث عنها ولماذا؟"}
            rows={4}
            className="resize-none"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex gap-3">
            <div className="shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-theme-primary mb-1 text-sm">
                {language === 'en' ? 'Privacy & Confidentiality' : 'الخصوصية والسرية'}
              </h4>
              <p className="text-sm text-gray-700">
                {language === 'en' 
                  ? 'Your information is handled with the utmost care and confidentiality. We understand this is a sensitive time, and your privacy is protected under UAE law.'
                  : 'يتم التعامل مع معلوماتك بأقصى قدر من العناية والسرية. نحن ندرك أن هذا وقت حساس، وخصوصيتك محمية بموجب قانون الإمارات العربية المتحدة.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}