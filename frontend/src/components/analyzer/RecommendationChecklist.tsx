import React from 'react';
import { CheckCircle2, AlertOctagon, Info } from 'lucide-react';
import { ClassificationType } from '../../types/analysis';

interface RecommendationChecklistProps {
  classification: ClassificationType;
  recommendationText?: string;
}

export const RecommendationChecklist: React.FC<RecommendationChecklistProps> = ({
  classification,
  recommendationText,
}) => {
  const isGenuine = classification === 'LIKELY_GENUINE';
  const isCaution = classification === 'NEEDS_CAUTION';
  const isFraud = classification === 'LIKELY_FRAUDULENT';

  const recommendations = isFraud
    ? [
        'Do not send money or deposit checks for equipment purchase.',
        'Do not share personal financial or banking credentials.',
        'Cease communication if the recruiter insists strictly on Telegram or WhatsApp.',
        'Report this posting to the platform or relevant regulatory authority.',
      ]
    : isCaution
    ? [
        'Verify recruiter email address matches the official company domain.',
        'Check if this position is listed on the official company careers page.',
        'Request an authenticated video interview before signing agreements.',
      ]
    : [
        'Standard hiring parameters verified with zero high-risk indicators.',
        'Corporate domain and email channels match official company records.',
        'Safe to proceed with standard application process.',
      ];

  return (
    <div className="p-5 rounded-lg bg-surface border border-border space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
          Recommended Actions
        </h3>
        <span
          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
            isFraud ? 'status-pill-danger' : isCaution ? 'status-pill-caution' : 'status-pill-safe'
          }`}
        >
          {isFraud ? 'Critical Warnings' : isCaution ? 'Advisory' : 'Verified'}
        </span>
      </div>

      {recommendationText && (
        <p className="text-xs text-text-secondary leading-relaxed bg-surface-subtle p-3 rounded-md border border-border">
          {recommendationText}
        </p>
      )}

      <ul className="space-y-2 pt-1 text-xs text-foreground">
        {recommendations.map((rec, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-normal">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
