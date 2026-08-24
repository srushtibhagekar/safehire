import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles, Shield, Cpu, FileText, Search } from 'lucide-react';

interface AnalysisProgressProps {
  onComplete?: () => void;
}

const STAGES = [
  { id: 1, label: 'Preparing & tokenizing job submission', icon: FileText },
  { id: 2, label: 'Linguistic cleaning & HTML normalization', icon: Search },
  { id: 3, label: 'Extracting NLP & payment keyword signals', icon: Sparkles },
  { id: 4, label: 'Checking domain & recruiter authenticity', icon: Shield },
  { id: 5, label: 'Running TF-IDF & ML Classifier inference', icon: Cpu },
  { id: 6, label: 'Calculating calibrated 0-100 risk score', icon: Shield },
  { id: 7, label: 'Synthesizing Explainable AI indicators & advice', icon: CheckCircle2 },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40 animate-pulse">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">SafeHire AI Inspection in Progress</h3>
          <p className="text-xs text-slate-400">Processing text through NLP & ML pipeline</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStage + 1) / STAGES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 text-xs transition-all duration-200 ${
                isCurrent
                  ? 'text-cyan-300 font-semibold translate-x-1'
                  : isDone
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <span className="flex-1">{stage.label}</span>
              {isCurrent && (
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
                  Scanning
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
