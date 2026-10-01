import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Cpu,
  CheckCircle2,
  Lock,
  Globe,
  DollarSign,
  FileSearch,
  Activity,
} from 'lucide-react';

const SCAN_STAGES = [
  {
    id: 'entity',
    title: 'Entity & Domain Validation',
    detail: 'Checking corporate domain age, DNS MX records, and public registration.',
    icon: Globe,
  },
  {
    id: 'linguistics',
    title: 'Linguistic Vector Embeddings',
    detail: 'Evaluating NLP token distributions for urgency, coercion, and scam templates.',
    icon: FileSearch,
  },
  {
    id: 'financial',
    title: 'Compensation & Payment Analysis',
    detail: 'Scanning for advance fee demands, fake equipment checks, and salary anomalies.',
    icon: DollarSign,
  },
  {
    id: 'comms',
    title: 'Communication Channel Verification',
    detail: 'Detecting encrypted chat redirections (Telegram/WhatsApp) and spoofed emails.',
    icon: Lock,
  },
  {
    id: 'synthesis',
    title: 'Threat Score & Dossier Synthesis',
    detail: 'Calibrating multi-model confidence intervals and generating audit report.',
    icon: Cpu,
  },
];

export const AnalysisProgress: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev < SCAN_STAGES.length - 1) return prev + 1;
        return prev;
      });
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl bg-[#0D121D] border border-slate-800 p-6 shadow-2xl space-y-6 overflow-hidden max-w-2xl mx-auto font-sans">
      {/* Laser Sweep Effect */}
      <div className="scanner-laser" />

      {/* Header Telemetry */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-mono tracking-tight">
              SCANNING IN PROGRESS
            </h3>
            <p className="text-xs text-slate-400">SafeHire Multi-Stage Heuristic Engine v2.4</p>
          </div>
        </div>

        <span className="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded">
          {Math.min(100, Math.round(((activeStage + 1) / SCAN_STAGES.length) * 100))}% COMPLETED
        </span>
      </div>

      {/* Stage Progression Checklist */}
      <div className="space-y-3">
        {SCAN_STAGES.map((stage, idx) => {
          const isDone = idx < activeStage;
          const isCurrent = idx === activeStage;
          const isPending = idx > activeStage;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 border ${
                isCurrent
                  ? 'bg-sky-500/10 border-sky-500/30 text-white'
                  : isDone
                  ? 'bg-slate-900/40 border-slate-800/60 text-slate-300'
                  : 'bg-transparent border-transparent opacity-40 text-slate-500'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">{stage.title}</span>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-sky-400 animate-pulse uppercase">
                      Auditing...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{stage.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Processing Console Bar */}
      <div className="p-3 rounded-lg bg-[#070A10] border border-slate-800/90 font-mono text-[11px] text-slate-400 flex items-center justify-between">
        <span className="truncate">
          &gt; evaluating token matrices: [weight_dim: 768, attention_heads: 12]
        </span>
        <span className="text-emerald-400 text-[10px] uppercase font-bold shrink-0 ml-2">
          active
        </span>
      </div>
    </div>
  );
};
