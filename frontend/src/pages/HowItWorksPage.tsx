import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Filter,
  Cpu,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Job Input Ingestion',
      subtitle: 'Raw Text & Form Metadata',
      icon: FileText,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
      description:
        'The candidate inputs raw job specifications: Job Title, Company Name, Full Description, Salary, Location, Recruiter Email, Website, and Communication Handles.',
    },
    {
      num: '02',
      title: 'Text Cleaning & Normalization',
      subtitle: 'Preprocessing Pipeline',
      icon: Filter,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      description:
        'Strips malicious HTML entities, unescapes characters, computes text statistics (all-caps ratio, punctuation density, word count), and standardizes whitespace.',
    },
    {
      num: '03',
      title: 'NLP Feature Extraction',
      subtitle: 'Heuristic & Semantic Signals',
      icon: Layers,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10',
      description:
        'Scans for predatory recruitment terms: upfront registration fees, wire transfer requests, Telegram/WhatsApp interview redirects, and free email domain mismatches (@gmail, @yahoo).',
    },
    {
      num: '04',
      title: 'TF-IDF & ML Inference',
      subtitle: 'Statistical Classifier',
      icon: Cpu,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      description:
        'Extracts sublinear TF-IDF n-gram vectors and computes the statistical fraud likelihood using the trained Logistic Regression / Random Forest / SVM classifier.',
    },
    {
      num: '05',
      title: 'Hybrid Risk Scoring Engine',
      subtitle: 'Calibrated 0–100 Scale',
      icon: ShieldAlert,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      description:
        'Ensembles statistical ML probability (60%) with deterministic security signals (40%), bounding the final score on a normalized 0 to 100 risk scale.',
    },
    {
      num: '06',
      title: 'Explainable AI & Safe Decision',
      subtitle: 'Verifiable Indicators & Checklist',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      description:
        'Generates human-readable explanations, severity-tagged warning cards with quoted evidence, and candidate verification checklists.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Technical Pipeline
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          How SafeHire Detection Works
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Explore the step-by-step intelligence architecture that transforms raw job advertisements into verifiable, explainable cybersecurity risk assessments.
        </p>
      </div>

      {/* Visual Pipeline Steps */}
      <div className="space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={s.num} className="relative">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start gap-6 shadow-xl">
                {/* Step badge & icon */}
                <div className="flex sm:flex-col items-center gap-3 shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${s.bg} ${s.border} ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 sm:text-center">{s.num}</span>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-slate-100">{s.title}</h3>
                    <span className="text-xs font-mono text-cyan-400">{s.subtitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Connecting arrow if not last */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="w-4 h-4 text-slate-700 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Risk Threshold Matrix */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Risk Classification Bands</h2>
          <p className="text-xs text-slate-400">
            SafeHire categorizes every job posting into three distinct security thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-emerald-400">0 – 29 SCORE</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-emerald-300">LIKELY GENUINE</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard professional job description, clear responsibilities, verified corporate email domain, no predatory financial requests.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">30 – 59 SCORE</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-amber-300">NEEDS CAUTION</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Missing verifiable company website, public free email (@gmail/@yahoo) used for hiring, unusually vague role duties.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400">60 – 100 SCORE</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <h4 className="text-sm font-bold text-red-300">LIKELY FRAUDULENT</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-pressure urgency ("start today"), upfront registration or software fees, bank details demanded, or Telegram recruitment.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition"
        >
          <span>Analyze a Suspicious Job Posting</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
