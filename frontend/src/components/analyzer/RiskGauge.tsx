import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import { ClassificationType } from '../../types/analysis';

interface RiskGaugeProps {
  score: number; // 0 (safest) - 100 (highest risk)
  classification: ClassificationType;
  confidence?: number;
  showTrustScore?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  classification,
  confidence = 94,
  showTrustScore = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const trustScore = Math.max(0, Math.min(100, 100 - score));
  const targetScore = showTrustScore ? trustScore : score;

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const increment = targetScore / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetScore]);

  const isGenuine = classification === 'LIKELY_GENUINE';
  const isCaution = classification === 'NEEDS_CAUTION';
  const isFraud = classification === 'LIKELY_FRAUDULENT';

  const statusConfig = isGenuine
    ? {
        label: 'VERIFIED',
        pillClass: 'status-pill-safe',
        textClass: 'text-emerald-700 dark:text-emerald-400',
        barClass: 'bg-emerald-500',
        icon: ShieldCheck,
      }
    : isCaution
    ? {
        label: 'NEEDS CAUTION',
        pillClass: 'status-pill-caution',
        textClass: 'text-amber-700 dark:text-amber-400',
        barClass: 'bg-amber-500',
        icon: AlertTriangle,
      }
    : {
        label: 'HIGH RISK',
        pillClass: 'status-pill-danger',
        textClass: 'text-rose-700 dark:text-rose-400',
        barClass: 'bg-rose-500',
        icon: ShieldAlert,
      };

  const Icon = statusConfig.icon;

  return (
    <div className="p-5 rounded-lg bg-surface border border-border space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase text-text-muted font-medium">
            {showTrustScore ? 'Trust Score' : 'Risk Index'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-4xl font-extrabold font-mono tracking-tight ${statusConfig.textClass}`}>
              {animatedScore}
            </span>
            <span className="text-sm font-mono text-text-muted">/ 100</span>
          </div>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold ${statusConfig.pillClass}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Calibration Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="h-2 w-full bg-surface-subtle border border-border rounded-full overflow-hidden">
          <div
            className={`h-full ${statusConfig.barClass} transition-all duration-700 rounded-full`}
            style={{ width: `${animatedScore}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-text-muted">
          <span>0 (High Risk)</span>
          <span>50</span>
          <span>100 (Verified)</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border flex justify-between text-[11px] text-text-secondary">
        <span>Confidence rating</span>
        <span className="font-mono font-medium">{confidence}%</span>
      </div>
    </div>
  );
};
