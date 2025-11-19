import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { ApplicationData } from '@/App';
import { Edit2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ReviewConfirmationProps {
  formData: ApplicationData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewConfirmation({
  formData,
  onEdit,
  onSubmit,
  onBack,
}: ReviewConfirmationProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const canSubmit = agreedToTerms && agreedToPrivacy;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-theme-primary mb-1">Review Your Application</h1>
        <p className="text-sm text-theme-secondary">
          Please review all information carefully before submitting. You can edit any section if needed.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-theme p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-theme-primary">Personal Information</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(1)}
            className="gap-2 text-primary hover:bg-primary/5"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-theme-secondary mb-1">Full Name (English)</p>
            <p className="text-theme-primary">{formData.fullNameEnglish || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Full Name (Arabic)</p>
            <p className="text-theme-primary" dir="rtl">{formData.fullNameArabic || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Emirates ID</p>
            <p className="text-theme-primary">{formData.nationalId || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Date of Birth</p>
            <p className="text-theme-primary">{formData.dateOfBirth || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Gender</p>
            <p className="text-theme-primary capitalize">{formData.gender || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Phone Number</p>
            <p className="text-theme-primary">{formData.phoneNumber || '—'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-theme-secondary mb-1">Address</p>
            <p className="text-theme-primary">
              {formData.street && formData.city && formData.emirate
                ? `${formData.street}, ${formData.city}, ${formData.emirate}`
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Email</p>
            <p className="text-theme-primary">{formData.email || '—'}</p>
          </div>
        </div>
      </div>

      {/* Family & Financial Details */}
      <div className="bg-white rounded-lg border border-theme p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-theme-primary">Family & Financial Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
            className="gap-2 text-primary hover:bg-primary/5"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-theme-secondary mb-1">Marital Status</p>
            <p className="text-theme-primary capitalize">{formData.maritalStatus || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Number of Dependents</p>
            <p className="text-theme-primary">{formData.numberOfDependents || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Employment Status</p>
            <p className="text-theme-primary capitalize">
              {formData.employmentStatus?.replace(/-/g, ' ') || '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Monthly Income</p>
            <p className="text-theme-primary">
              {formData.monthlyIncome ? `AED ${formData.monthlyIncome}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-1">Housing Status</p>
            <p className="text-theme-primary capitalize">
              {formData.housingStatus?.replace(/-/g, ' ') || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Situation Description */}
      <div className="bg-white rounded-lg border border-theme p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-theme-primary">Situation Description</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(3)}
            className="gap-2 text-primary hover:bg-primary/5"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-theme-secondary mb-2">Current Financial Situation</p>
            <div className="bg-theme-light rounded-lg p-4 border border-theme">
              <p className="text-theme-primary whitespace-pre-wrap leading-relaxed">
                {formData.financialSituation || '—'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-2">Employment Circumstances</p>
            <div className="bg-theme-light rounded-lg p-4 border border-theme">
              <p className="text-theme-primary whitespace-pre-wrap leading-relaxed">
                {formData.employmentCircumstances || '—'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-theme-secondary mb-2">Reason for Applying</p>
            <div className="bg-theme-light rounded-lg p-4 border border-theme">
              <p className="text-theme-primary whitespace-pre-wrap leading-relaxed">
                {formData.reasonForApplying || '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-white rounded-lg border border-theme p-8">
        <h2 className="text-xl font-semibold text-theme-primary mb-6">Declaration</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-theme-light rounded-lg border border-theme">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="terms" className="text-sm text-theme-primary cursor-pointer leading-relaxed">
              I confirm that all information provided in this application is true and accurate to the best of my knowledge. I understand that providing false information may result in rejection of my application and potential legal consequences.
            </label>
          </div>

          <div className="flex items-start gap-3 p-4 bg-theme-light rounded-lg border border-theme">
            <Checkbox
              id="privacy"
              checked={agreedToPrivacy}
              onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="privacy" className="text-sm text-theme-primary cursor-pointer leading-relaxed">
              I consent to the processing of my personal data for the purpose of assessing my eligibility for financial assistance. I understand my data will be handled in accordance with UAE data protection laws and will be kept confidential.
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 rounded-full border-theme hover:bg-theme-light h-11 px-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Edit
        </Button>

        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="bg-secondary hover:bg-secondary-active text-white rounded-full px-10 h-12 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
        >
          Submit Application
        </Button>
      </div>

      {!canSubmit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-sm text-amber-800">
            Please agree to both declarations above to submit your application
          </p>
        </div>
      )}
    </div>
  );
}