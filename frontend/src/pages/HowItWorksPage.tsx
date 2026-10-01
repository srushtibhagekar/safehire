import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Cpu,
  FileCode,
  Globe,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Binary,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400 text-xs font-mono">
          <Binary className="w-3.5 h-3.5" />
          <span>TECHNICAL METHODOLOGY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          How SafeHire Detects Recruitment Scams
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
          A hybrid decision-support architecture uniting bidirectional transformer representations (BERT), heuristic rule pattern matching, and real-time DNS telemetry to safeguard job seekers.
        </p>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="space-y-6">
        
        {/* Stage 1 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-mono text-sm font-bold text-sky-400">
              01
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Linguistic & Token Embeddings
              </h3>
              <p className="text-xs text-slate-400">NLP Semantic Matrix Analysis</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The job description text is tokenized and passed through a transformer model fine-tuned on verified recruitment corpuses (including genuine enterprise postings and confirmed fraud records). The attention layers calculate anomaly weights on phrasing that creates artificial urgency, vague responsibilities, and advance fee extraction patterns.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-mono text-sm font-bold text-sky-400">
              02
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Heuristic Scam Vector Rule Engine
              </h3>
              <p className="text-xs text-slate-400">Deterministic Threat Pattern Matching</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Parallel to machine learning inference, deterministic heuristic filters inspect specific high-confidence threat triggers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#080B11] border border-slate-800 text-slate-300">
              <span className="text-rose-400 block font-bold">Advance Payment Triggers</span>
              Wire transfers, equipment kit fees, cashier checks
            </div>
            <div className="p-3 rounded-lg bg-[#080B11] border border-slate-800 text-slate-300">
              <span className="text-amber-400 block font-bold">Off-Platform Redirection</span>
              Telegram handles, WhatsApp-only interviews
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-mono text-sm font-bold text-sky-400">
              03
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Domain, WHOIS & MX Validation
              </h3>
              <p className="text-xs text-slate-400">Cryptographic Entity Verification</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            SafeHire evaluates domain age, SSL validity, and email exchange records. Scammers often register new domains (e.g. `company-careers.top`) within 30 days of posting. SafeHire flags recently minted domains and public webmail aliases used for corporate executive roles.
          </p>
        </div>

        {/* Stage 4 */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-mono text-sm font-bold text-sky-400">
              04
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Explainable AI & Trust Scoring
              </h3>
              <p className="text-xs text-slate-400">Granular Decision Support</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Rather than a binary black-box output, SafeHire delivers an explainable audit dossier: a 0-100 Trust Score calibrated against confidence intervals, tagged evidence tokens, and actionable mitigation protocols for the applicant.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-[#0B0F19] border border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-100">Ready to audit an opportunity?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Test the pipeline with any active job posting or paste suspicious recruiter correspondence.
        </p>
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Launch Scanner</span>
        </Link>
      </div>

    </div>
  );
};
