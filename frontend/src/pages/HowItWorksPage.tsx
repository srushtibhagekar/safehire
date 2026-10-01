import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans text-foreground">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Detection Methodology
        </h1>
        <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
          How SafeHire evaluates recruitment opportunities, linguistic anomalies, and employer domain authenticity.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="space-y-8 text-xs">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground text-sm">01</span>
            <h3 className="text-sm font-semibold text-foreground">Linguistic & Semantic Pattern Extraction</h3>
          </div>
          <p className="text-text-secondary leading-relaxed pl-6">
            The job description is processed by transformer NLP models trained to detect urgency phrasing, vague responsibilities, and high-risk compensation formulas typical of recruitment scams.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground text-sm">02</span>
            <h3 className="text-sm font-semibold text-foreground">Scam Vector Rule Matching</h3>
          </div>
          <p className="text-text-secondary leading-relaxed pl-6">
            Deterministic rules search for confirmed fraud markers: advance cashier check requests for home-office equipment, upfront registration fees, and off-platform Telegram/WhatsApp interview redirects.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground text-sm">03</span>
            <h3 className="text-sm font-semibold text-foreground">Corporate Domain & MX Validation</h3>
          </div>
          <p className="text-text-secondary leading-relaxed pl-6">
            The system cross-references the employer domain age, DNS MX mail server records, and disposable email aliases (such as free Gmail accounts used for corporate executive hiring).
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-foreground text-sm">04</span>
            <h3 className="text-sm font-semibold text-foreground">Explainable Evidence Synthesis</h3>
          </div>
          <p className="text-text-secondary leading-relaxed pl-6">
            Rather than producing an unhelpful black-box answer, SafeHire provides an actionable Trust Score, cited quotes from the posting, and explicit candidate guidance.
          </p>
        </div>

      </div>

      {/* Action Banner */}
      <div className="p-6 rounded-lg bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="text-sm font-semibold text-foreground">Ready to test a posting?</h4>
          <p className="text-xs text-text-muted">Paste any job text or load a sample test case.</p>
        </div>
        <Link
          to="/analyze"
          className="px-3.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition shadow-sm"
        >
          Analyze a posting
        </Link>
      </div>

    </div>
  );
};
