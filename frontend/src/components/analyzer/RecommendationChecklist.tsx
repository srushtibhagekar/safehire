import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
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

  const actionProtocols = isFraud
    ? [
        {
          label: 'DO NOT wire or transfer funds for registration, software kits, or background checks.',
          safe: false,
        },
        {
          label: 'DO NOT deposit advance cashier checks to purchase equipment from designated vendors.',
          safe: false,
        },
        {
          label: 'DO NOT share SSN, banking credentials, or tax identification on unverified channels.',
          safe: false,
        },
        {
          label: 'Cease communication with any recruiter insisting exclusively on Telegram/WhatsApp.',
          safe: true,
        },
        {
          label: 'Report this domain and recruiter handle to the official Federal Trade Commission (FTC) or IC3.',
          safe: true,
        },
      ]
    : isCaution
    ? [
        {
          label: 'Verify that the recruiter email matches the official corporate domain, not a public webmail alias.',
          safe: true,
        },
        {
          label: 'Cross-reference this open position directly on the official company careers portal.',
          safe: true,
        },
        {
          label: 'Confirm the interview is scheduled through an authenticated video bridge (Google Meet / Teams / Zoom).',
          safe: true,
        },
        {
          label: 'Clarify unverified compensation claims or unusual hourly rates before executing NDA contracts.',
          safe: true,
        },
      ]
    : [
        {
          label: 'Standard enterprise hiring parameters verified with zero high-risk linguistic indicators.',
          safe: true,
        },
        {
          label: 'Corporate domain matches authenticated hiring entity and official DNS records.',
          safe: true,
        },
        {
          label: 'Compensation range aligns with certified industry market compensation benchmarks.',
          safe: true,
        },
        {
          label: 'Safe to proceed through standard application and interview pipelines.',
          safe: true,
        },
      ];

  return (
    <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-6 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          {isFraud ? (
            <AlertOctagon className="w-5 h-5 text-rose-400" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          )}
          <h3 className="text-sm font-bold text-slate-100 font-mono tracking-tight uppercase">
            Candidate Security Protocol
          </h3>
        </div>
        <span
          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
            isFraud
              ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
              : isCaution
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
          }`}
        >
          {isFraud ? 'MANDATORY DEFENSE' : isCaution ? 'ADVISORY' : 'VERIFIED SAFE'}
        </span>
      </div>

      {recommendationText && (
        <div className="p-3.5 rounded-xl bg-[#121927] border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-slate-100 font-semibold font-mono block mb-1">
            EXECUTIVE ADVISORY:
          </strong>
          {recommendationText}
        </div>
      )}

      <div className="space-y-2.5 pt-1">
        {actionProtocols.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs">
            {item.safe ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <span className={item.safe ? 'text-slate-300' : 'text-rose-300 font-medium'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
