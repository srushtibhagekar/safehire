import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { ClassificationType } from '../../types/analysis';

interface RiskGaugeProps {
  score: number; // 0 to 100
  classification: ClassificationType;
  confidence: number;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  classification,
  confidence,
  size = 240,
}) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  let color = '#10B981'; // Genuine (Green)
  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let label = 'Likely Genuine';
  let Icon = ShieldCheck;

  if (score >= 60 || classification === 'LIKELY_FRAUDULENT') {
    color = '#EF4444'; // Fraudulent (Red)
    badgeBg = 'bg-red-500/10 text-red-400 border-red-500/30';
    label = 'Likely Fraudulent';
    Icon = ShieldAlert;
  } else if (score >= 30 || classification === 'NEEDS_CAUTION') {
    color = '#F59E0B'; // Caution (Amber)
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    label = 'Needs Caution';
    Icon = AlertTriangle;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: color }}
      />

      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Risk Score</span>
          <div className="flex items-baseline gap-1 my-0.5">
            <span className="text-5xl font-black tracking-tight" style={{ color }}>
              {score}
            </span>
            <span className="text-sm font-semibold text-slate-500">/100</span>
          </div>
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border mt-1 ${badgeBg}`}>
            <Icon className="w-3 h-3" />
            <span>{label}</span>
          </div>
        </div>
      </div>

      {/* Confidence Pill */}
      <div className="mt-4 flex items-center justify-between w-full max-w-xs px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          AI Model Confidence
        </span>
        <span className="font-mono font-bold text-cyan-300">{confidence}%</span>
      </div>
    </div>
  );
};
