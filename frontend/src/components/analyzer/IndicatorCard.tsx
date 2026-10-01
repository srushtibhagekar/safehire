import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  FileCode,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { FraudIndicator, SeverityType } from '../../types/analysis';

interface IndicatorCardProps {
  indicator: FraudIndicator;
  index?: number;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const getSeverityBadge = (severity: SeverityType) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          label: 'CRITICAL SEVERITY',
          icon: AlertOctagon,
          classes: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          borderLeft: 'border-l-rose-500',
        };
      case 'HIGH':
        return {
          label: 'HIGH SEVERITY',
          icon: AlertOctagon,
          classes: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          borderLeft: 'border-l-rose-500',
        };
      case 'MEDIUM':
        return {
          label: 'MEDIUM SEVERITY',
          icon: AlertTriangle,
          classes: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          borderLeft: 'border-l-amber-500',
        };
      case 'LOW':
      default:
        return {
          label: 'INFORMATIONAL / LOW',
          icon: Info,
          classes: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          borderLeft: 'border-l-sky-500',
        };
    }
  };

  const sev = getSeverityBadge(indicator.severity);
  const Icon = sev.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      className={`rounded-xl bg-[#0D121D] border border-slate-800/90 border-l-4 ${sev.borderLeft} overflow-hidden shadow-sm hover:border-slate-700 transition`}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-4 cursor-pointer flex items-start justify-between gap-4 select-none"
      >
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${sev.classes}`}
            >
              <Icon className="w-3 h-3" />
              {sev.label}
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {indicator.type.replace(/_/g, ' ')}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-slate-100 leading-snug">
            {indicator.title}
          </h4>

          <p className="text-xs text-slate-400 leading-relaxed">
            {indicator.explanation}
          </p>
        </div>

        <div className="shrink-0 pt-1 text-slate-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Collapsible Evidence Section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="px-4 pb-4 pt-1 bg-[#101725] border-t border-slate-800/80 space-y-2 text-xs"
          >
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span>Extracted Signal Evidence & Forensic Tokens</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#080B11] border border-slate-800 font-mono text-slate-300 text-[11px] leading-relaxed break-words">
              {indicator.evidence || 'Pattern recognized via BERT semantic classification vector analysis.'}
            </div>

            <p className="text-[11px] text-slate-400 font-sans">
              <strong className="text-slate-300">Security Recommendation:</strong> Compare this signal with the official domain records and avoid sending sensitive documents or executing off-platform wire transfers.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
