import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Globe,
  Users,
  Target,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Terminal,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400 text-xs font-mono">
          <Target className="w-3.5 h-3.5" />
          <span>OUR MISSION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Protecting Job Seekers from Predatory Recruitment Fraud
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Every year, millions of job seekers lose money and compromise their personal identities to sophisticated recruitment impostors. SafeHire is engineered to level the playing field.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
            01
          </div>
          <h3 className="text-base font-bold text-slate-100">Zero Candidate Exploitation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Legitimate employment should never require paying for registration kits, background check fees, or hardware vendors. We detect advance fee schemes instantly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
            02
          </div>
          <h3 className="text-base font-bold text-slate-100">Verifiable Transparency</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We provide evidence tokens and explainable reasoning for every flagged posting, enabling users to understand why a listing was categorized as suspicious.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
            03
          </div>
          <h3 className="text-base font-bold text-slate-100">Privacy by Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            SafeHire does not collect or monetize candidate personal identification data (PII). All text analyses are processed ephemerally with enterprise-grade isolation.
          </p>
        </div>
      </div>

      {/* Engineering Philosophy */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F19] border border-slate-800 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-sky-400 font-semibold">
            System Design
          </span>
          <h2 className="text-2xl font-bold text-slate-100">
            Engineered like a cybersecurity telemetry platform.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
            SafeHire treats fake recruitment postings not merely as bad job ads, but as active social engineering and credential harvesting attack vectors. Our threat modeling incorporates methods from cybersecurity red-teaming, domain reputation intelligence, and NLP linguistic forensics.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Model v2.4 (Transformer Core)</span>
            <span>•</span>
            <span>Rule Engine 99.8% Recall</span>
          </div>

          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans"
          >
            <span>Audit a Job Listing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
