import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, ShieldAlert, AlertTriangle, CheckCircle, Quote } from 'lucide-react';
import { FraudIndicator, SeverityType } from '../../types/analysis';

interface IndicatorCardProps {
  indicator: FraudIndicator;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator }) => {
  const [expanded, setExpanded] = useState(true);

  const getSeverityBadge = (severity: SeverityType) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/15 text-red-400 border-red-500/30',
          icon: ShieldAlert,
          label: 'Critical Warning',
        };
      case 'HIGH':
        return {
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          icon: AlertTriangle,
          label: 'High Severity',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: AlertCircle,
          label: 'Medium Caution',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle,
          label: 'Standard Signal',
        };
    }
  };

  const badge = getSeverityBadge(indicator.severity);
  const Icon = badge.icon;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition overflow-hidden shadow-lg">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/40 transition"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${badge.bg}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">{indicator.title}</h4>
            <span className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.2 rounded-full border ${badge.bg}`}>
              {badge.label}
            </span>
          </div>
        </div>

        <div className="text-slate-400 p-1">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-slate-800/60 text-xs">
          <p className="text-slate-300 leading-relaxed">{indicator.explanation}</p>

          {indicator.evidence && (
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 flex items-start gap-2">
              <Quote className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Evidence Citation:</span>
                <p className="font-mono text-[11px] text-slate-200 mt-0.5 break-words">{indicator.evidence}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
