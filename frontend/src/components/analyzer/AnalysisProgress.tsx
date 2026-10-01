import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

const STEPS = [
  'Checking company identity and domain registry',
  'Analyzing job description for scam patterns',
  'Verifying compensation against market standards',
  'Checking contact information and recruiter channels',
  'Calculating trust score and compiling evidence',
];

export const AnalysisProgress: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg bg-surface border border-border space-y-5 font-sans">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">
          Analyzing job posting...
        </h3>
        <p className="text-xs text-text-muted">
          Evaluating recruitment linguistics and verification signals.
        </p>
      </div>

      <div className="space-y-2.5">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-opacity ${
                isCurrent
                  ? 'text-foreground font-medium'
                  : isDone
                  ? 'text-text-secondary'
                  : 'text-text-muted opacity-40'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 animate-spin text-foreground shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-border shrink-0" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
