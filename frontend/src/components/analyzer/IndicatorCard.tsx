import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import { FraudIndicator, SeverityType } from '../../types/analysis';

interface IndicatorCardProps {
  indicator: FraudIndicator;
  index?: number;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const getSeverityStyle = (severity: SeverityType) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return {
          label: 'HIGH RISK',
          pill: 'status-pill-danger',
          icon: AlertOctagon,
        };
      case 'MEDIUM':
        return {
          label: 'WARNING',
          pill: 'status-pill-caution',
          icon: AlertTriangle,
        };
      case 'LOW':
      default:
        return {
          label: 'INFO',
          pill: 'status-pill-neutral',
          icon: Info,
        };
    }
  };

  const sev = getSeverityStyle(indicator.severity);
  const Icon = sev.icon;

  return (
    <div className="rounded-lg bg-surface border border-border overflow-hidden transition-colors">
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-3.5 cursor-pointer flex items-start justify-between gap-3 hover:bg-surface-hover/50 transition-colors select-none"
      >
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${sev.pill}`}>
              <Icon className="w-3 h-3" />
              {sev.label}
            </span>
            <span className="text-[11px] font-mono text-text-muted">
              {indicator.type.replace(/_/g, ' ')}
            </span>
          </div>
          <h4 className="text-xs font-semibold text-foreground leading-snug">
            {indicator.title}
          </h4>
        </div>

        <button
          type="button"
          className="text-text-muted hover:text-foreground text-xs flex items-center gap-1 shrink-0 pt-0.5"
        >
          <span className="text-[11px] font-mono">{expanded ? 'Hide evidence' : 'View evidence'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Evidence Drawer */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="px-3.5 pb-3.5 pt-2 border-t border-border-subtle bg-surface-subtle/60 space-y-2.5 text-xs font-sans"
          >
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase font-semibold block">
                Why this was flagged
              </span>
              <p className="text-text-secondary text-xs leading-relaxed mt-0.5">
                {indicator.explanation}
              </p>
            </div>

            {indicator.evidence && (
              <div className="p-2.5 rounded bg-surface border border-border space-y-1">
                <span className="text-[10px] font-mono text-text-muted uppercase font-semibold block">
                  Detected signal in text
                </span>
                <p className="font-mono text-foreground text-[11px] leading-relaxed break-words">
                  "{indicator.evidence}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
