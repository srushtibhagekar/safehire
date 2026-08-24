import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Cpu,
  Lock,
  Search,
  FileCheck2,
  AlertTriangle,
  FileText,
  BarChart3,
  CheckCircle2,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { RiskGauge } from '../components/analyzer/RiskGauge';
import { IndicatorCard } from '../components/analyzer/IndicatorCard';
import { SAMPLES } from '../components/analyzer/SamplePicker';

export const LandingPage: React.FC = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(2); // Default to scam sample for dramatic inspection demonstration

  const sampleCard = {
    title: 'Sample Demonstration Analysis',
    score: activeSampleIndex === 0 ? 12 : activeSampleIndex === 1 ? 48 : 94,
    classification:
      activeSampleIndex === 0
        ? ('LIKELY_GENUINE' as const)
        : activeSampleIndex === 1
        ? ('NEEDS_CAUTION' as const)
        : ('LIKELY_FRAUDULENT' as const),
    confidence: activeSampleIndex === 0 ? 94 : activeSampleIndex === 1 ? 82 : 98,
  };

  const sampleIndicators =
    activeSampleIndex === 2
      ? [
          {
            type: 'PAYMENT_REQUEST',
            severity: 'CRITICAL' as const,
            title: 'Upfront Registration Fee & Bank Details Demanded',
            explanation:
              'Scammers demand advance payment for software kits or registration fees. Legitimate employers never charge job candidates.',
            evidence: 'Detected phrases: "pay registration fee of $150", "wire transfer", "send bank details"',
          },
          {
            type: 'UNOFFICIAL_COMMUNICATION',
            severity: 'HIGH' as const,
            title: 'Off-Platform Telegram Channel Interview',
            explanation:
              'Redirecting applicants to encrypted chat applications is a primary marker of recruitment impersonation schemes.',
            evidence: 'Recruiter handle: Telegram @hiring_fast_hr',
          },
        ]
      : activeSampleIndex === 1
      ? [
          {
            type: 'FREE_EMAIL_DOMAIN',
            severity: 'MEDIUM' as const,
            title: 'Free Public Email Used for Corporate Hiring',
            explanation:
              'The recruiter provided a free @gmail.com address rather than an enterprise business domain.',
            evidence: 'Recruiter email: apexjobs2026@gmail.com',
          },
        ]
      : [
          {
            type: 'STANDARD_SPECIFICATION',
            severity: 'LOW' as const,
            title: 'Standard Enterprise Hiring Specification',
            explanation:
              'The posting includes verifiable corporate domain details, realistic skill requirements, and standard benefits.',
            evidence: 'Corporate domain matches verified hiring entity stripe.com',
          },
        ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI-Powered Recruitment Fraud Defense
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]"
          >
            Don't Let a Fake Job <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Steal Your Future.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered recruitment fraud detection that helps you verify suspicious job opportunities, extract predatory red flags, and make safe career decisions before you apply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/analyze"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 group transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze a Job Posting</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/how-it-works"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition"
            >
              How SafeHire Works
            </Link>
          </motion.div>
        </div>

        {/* 2. HERO PIPELINE VISUALIZATION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-14 max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 text-center mb-4">
            Continuous AI Detection Pipeline
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">1. JOB POSTING</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Raw Text & Metadata</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">2. AI ANALYSIS</span>
              <span className="text-[10px] text-slate-400 mt-0.5">TF-IDF & NLP Signals</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">3. RISK DETECTION</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Explainable Red Flags</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">4. SAFE DECISION</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Actionable Checklist</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. INTERACTIVE SAMPLE RISK ANALYSIS DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                <Search className="w-3.5 h-3.5" /> Interactive Risk Simulator
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Experience Explainable AI in Action
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Toggle below to test how SafeHire classifies genuine, suspicious, and fraudulent job advertisements.
              </p>
            </div>

            {/* Sample Selector Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
              {['Genuine Job', 'Needs Caution', 'Fraudulent Scam'].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSampleIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeSampleIndex === idx
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Risk Gauge */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <RiskGauge
                score={sampleCard.score}
                classification={sampleCard.classification}
                confidence={sampleCard.confidence}
                size={220}
              />
              <span className="text-[10px] text-slate-500 mt-3 font-mono">
                Model: TF-IDF + Logistic Regression v1.0
              </span>
            </div>

            {/* Detected Indicators Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Why SafeHire Flagged This Job
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {sampleIndicators.length} Warning Signal(s)
                </span>
              </div>

              <div className="space-y-3">
                {sampleIndicators.map((ind, i) => (
                  <IndicatorCard key={i} indicator={ind} />
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Want to test your own job posting?</span>
                <Link to="/analyze" className="text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                  Launch Full Analyzer <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PROBLEM STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">
            The Recruitment Scam Epidemic
          </h2>
          <p className="text-3xl font-black text-slate-100 tracking-tight">
            Recruitment Fraud is Growing More Sophisticated
          </p>
          <p className="text-sm text-slate-400 mt-3">
            Online job boards have become a high-volume target for predatory actors exploiting eager job seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/30 transition">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Advance-Fee Recruitment Scams</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scammers pose as enterprise recruiters, offering guaranteed positions while demanding upfront "training fees", "software kit deposits", or background check fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Identity & Credential Theft</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fraudulent listings harvest sensitive documents, SSN/national IDs, and banking info during fake "onboarding" processes to commit identity fraud.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Fake Check & Wire Transfers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Applicants receive forged checks to buy supplies, send surplus money via wire or crypto, and are left liable when the counterfeit check bounces.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOW SAFEHHIRE WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
            SafeHire Verification Workflow
          </h2>
          <p className="text-3xl font-black text-slate-100 tracking-tight">
            How SafeHire Protects You in 5 Steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Paste Job Details', desc: 'Input title, company, description, and contact info into the analyzer.' },
            { step: '02', title: 'NLP Extraction', desc: 'Our engine cleans text and extracts linguistic signals, caps, and payment keywords.' },
            { step: '03', title: 'ML Classification', desc: 'TF-IDF vectorizer and trained classifier predict fraud probability.' },
            { step: '04', title: '0–100 Risk Score', desc: 'Calculates an easy-to-understand calibrated risk score (Genuine / Caution / Fraud).' },
            { step: '05', title: 'Explainable Advice', desc: 'View cited red flag evidence and receive an actionable verification checklist.' },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative group hover:border-cyan-500/40 transition">
              <span className="text-3xl font-black font-mono text-slate-800 group-hover:text-cyan-500/20 transition">
                {s.step}
              </span>
              <h4 className="text-sm font-bold text-slate-200 mt-2 mb-1">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
            Platform Capabilities
          </h2>
          <p className="text-3xl font-black text-slate-100 tracking-tight">
            Engineered for Precision & Explainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, color: 'text-cyan-400', title: 'AI Job Analysis', desc: 'Instant scanning of raw postings using TF-IDF and machine learning.' },
            { icon: Search, color: 'text-blue-400', title: 'NLP Pattern Detection', desc: 'Identifies urgency language, payment triggers, and contact anomalies.' },
            { icon: BarChart3, color: 'text-emerald-400', title: 'Calibrated Risk Score', desc: 'Categorizes listings as Likely Genuine (0-29), Needs Caution (30-59), or Likely Fraudulent (60-100).' },
            { icon: ShieldCheck, color: 'text-indigo-400', title: 'Explainable AI (XAI)', desc: 'Highlights precise phrases and evidence citations behind each warning indicator.' },
            { icon: FileCheck2, color: 'text-amber-400', title: 'Verifiable Audit Reports', desc: 'Download official timestamped audit certificates for reference.' },
            { icon: Cpu, color: 'text-purple-400', title: 'Admin Intelligence', desc: 'Real-time analytics, user management, and transparent model evaluation metrics.' },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Verify Before You Apply.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Don't take risks with your personal identity or hard-earned money. Run any job posting through SafeHire in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/analyze"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 transition"
              >
                Start Free Analysis Now
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
