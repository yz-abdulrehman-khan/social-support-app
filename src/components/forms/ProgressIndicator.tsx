import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'Personal Information',
  'Family & Financial Details',
  'Situation Description'
];

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${step < currentStep 
                    ? 'bg-green-600 text-white' 
                    : step === currentStep 
                    ? 'bg-theme-accent text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm ${
                    step === currentStep
                      ? 'text-gray-900'
                      : step < currentStep
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {stepLabels[index]}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < totalSteps - 1 && (
              <div
                className={`
                  h-0.5 flex-1 transition-all duration-300 -mt-10
                  ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-theme-accent h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
