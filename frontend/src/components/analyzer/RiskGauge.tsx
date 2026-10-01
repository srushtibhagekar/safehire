import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { ClassificationType } from '../../types/analysis';

interface RiskGaugeProps {
  score: number; // 0 (safest) - 100 (highest risk)
  classification: ClassificationType;
  confidence?: number;
  size?: 'sm' | 'md' | 'lg';
  showTrustScore?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  classification,
  confidence = 94,
  size = 'md',
  showTrustScore = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Trust Score is the inverse of risk score (100 - riskScore)
  const trustScore = Math.max(0, Math.min(100, 100 - score));
  const targetDisplayScore = showTrustScore ? trustScore : score;

  // Counter upward animation
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = targetDisplayScore / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetDisplayScore) {
        setAnimatedScore(targetDisplayScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetDisplayScore]);

  // Risk styling configuration
  const isGenuine = classification === 'LIKELY_GENUINE';
  const isCaution = classification === 'NEEDS_CAUTION';
  const isFraud = classification === 'LIKELY_FRAUDULENT';

  const config = isGenuine
    ? {
        label: 'VERIFIED GENUINE',
        sublabel: 'Low Security Risk',
        color: '#10B981', // emerald
        textColor: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        icon: ShieldCheck,
        barClass: 'from-emerald-500 to-teal-400',
      }
    : isCaution
    ? {
        label: 'NEEDS CAUTION',
        sublabel: 'Moderate Anomalies Detected',
        color: '#F59E0B', // amber
        textColor: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        icon: AlertTriangle,
        barClass: 'from-amber-500 to-orange-400',
      }
    : {
        label: 'HIGH RISK / FRAUD',
        sublabel: 'Predatory Indicators Confirmed',
        color: '#F43F5E', // rose
        textColor: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        icon: ShieldAlert,
        barClass: 'from-rose-500 to-red-600',
      };

  const Icon = config.icon;
  const strokeDasharray = 283; // 2 * PI * 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * (showTrustScore ? trustScore : score)) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0D121D] border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-security-grid opacity-30 pointer-events-none" />

      <div className="relative flex flex-col items-center z-10">
        {/* SVG Radial Meter */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="7"
              className="text-slate-800/80"
              fill="transparent"
            />
            {/* Progress Arc */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke={config.color}
              strokeWidth="7"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: strokeDasharray }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Numerical Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {showTrustScore ? 'Trust Score' : 'Risk Score'}
            </span>
            <span className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              {animatedScore}
              <span className="text-sm text-slate-500 font-normal">/100</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {confidence}% conf.
            </span>
          </div>
        </div>

        {/* Classification Badge */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold font-mono tracking-wider ${config.badgeBg}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{config.label}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{config.sublabel}</p>
        </div>

        {/* Linear breakdown scale */}
        <div className="w-full max-w-xs mt-5 pt-4 border-t border-slate-800/80 space-y-1.5 font-mono text-[10px] text-slate-400">
          <div className="flex justify-between">
            <span>0 (Safe)</span>
            <span>50 (Caution)</span>
            <span>100 (Critical)</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div className="w-1/3 bg-emerald-500/40 border-r border-slate-900" />
            <div className="w-1/3 bg-amber-500/40 border-r border-slate-900" />
            <div className="w-1/3 bg-rose-500/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
