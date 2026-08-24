import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck, ExternalLink, AlertOctagon } from 'lucide-react';
import { ClassificationType } from '../../types/analysis';

interface RecommendationChecklistProps {
  classification: ClassificationType;
  recommendation: string;
}

export const RecommendationChecklist: React.FC<RecommendationChecklistProps> = ({
  classification,
  recommendation,
}) => {
  const isHighRisk = classification === 'LIKELY_FRAUDULENT';

  const defaultItems = isHighRisk
    ? [
        { id: 1, text: 'Do NOT transfer money, wire fees, or purchase gift cards under any circumstances.', checked: false },
        { id: 2, text: 'Do NOT share government identification numbers (SSN, Aadhaar, Passport) or bank details.', checked: false },
        { id: 3, text: 'Search the company name and career page independently to confirm if the requisition exists.', checked: false },
        { id: 4, text: 'Report this scam posting to the platform administrators and relevant consumer protection agencies.', checked: false },
      ]
    : [
        { id: 1, text: 'Verify that recruiter correspondence comes from an official corporate domain name.', checked: false },
        { id: 2, text: 'Confirm the hiring manager profile and company page on professional networks like LinkedIn.', checked: false },
        { id: 3, text: 'Ensure the interview takes place on verified enterprise conferencing software (Zoom, Teams, Meet).', checked: false },
        { id: 4, text: 'Review employee feedback and salary expectations on Glassdoor or Levels.fyi.', checked: false },
      ];

  const [items, setItems] = useState(defaultItems);

  const toggle = (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl border ${isHighRisk ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'}`}>
          {isHighRisk ? <AlertOctagon className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">Recommended Action Plan</h3>
          <p className="text-xs text-slate-400">Decision-support verification checklist</p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
        {recommendation}
      </div>

      <div className="space-y-2.5 pt-2">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Candidate Verification Steps</p>
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => toggle(it.id)}
            className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left text-xs transition ${
              it.checked
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {it.checked ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            )}
            <span className={it.checked ? 'line-through opacity-80' : ''}>{it.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
