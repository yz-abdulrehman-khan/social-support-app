import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  completed: boolean;
}

interface VerticalStepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function VerticalStepIndicator({ steps, currentStep }: VerticalStepIndicatorProps) {
  return (
    <div className="bg-theme-light rounded p-4">
      <h3 className="text-xs font-semibold text-theme-secondary mb-4 tracking-wide uppercase">
        Questions
      </h3>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.completed;

          return (
            <div key={step.number} className="relative flex items-start gap-3 py-3">
              {/* Number Badge */}
              <div className="relative z-10">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold transition-all
                    ${isActive
                      ? 'bg-theme-accent text-white'
                      : isCompleted
                      ? 'bg-theme-success text-white'
                      : 'bg-white border border-theme text-theme-secondary'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
              </div>

              {/* Label */}
              <div className="flex-1 pt-1">
                <p
                  className={`
                    text-sm leading-snug
                    ${isActive
                      ? 'text-theme-accent font-semibold'
                      : 'text-theme-primary'
                    }
                  `}
                >
                  {step.label}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    absolute left-4 top-11 w-px h-6 transition-colors
                    ${isCompleted ? 'bg-theme-success' : 'bg-theme'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}