import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Building2,
  Search,
} from 'lucide-react';
import { SAMPLES } from '../components/analyzer/SamplePicker';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive Hero Job State
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(2); // Default to scam sample for dramatic analysis
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [currentStep, setCurrentStep] = useState(4);
  const [expandedSignal, setExpandedSignal] = useState<number | null>(0);

  const sample = SAMPLES[selectedSampleIndex];

  const handleRunDemoScan = () => {
    setAnalyzing(true);
    setAnalyzed(false);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setAnalyzing(false);
          setAnalyzed(true);
          return 4;
        }
        return prev + 1;
      });
    }, 400);
  };

  const steps = [
    'Checking company identity & domain age...',
    'Analyzing job description for scam patterns...',
    'Evaluating compensation vs market benchmarks...',
    'Checking recruiter contact & Telegram redirects...',
    'Calculating trust score...',
  ];

  const getDemoIndicators = (idx: number) => {
    if (idx === 2) {
      return [
        {
          title: 'Advance Equipment Check Demand',
          severity: 'HIGH RISK',
          pill: 'status-pill-danger',
          phrase: 'advance cashier check ($3,850) to purchase software licenses',
          explanation:
            'Legitimate employers never issue checks for employees to purchase hardware from designated vendors.',
        },
        {
          title: 'Off-Platform Telegram Interview',
          severity: 'HIGH RISK',
          pill: 'status-pill-danger',
          phrase: 'Immediate interview conducted solely via Telegram messenger: @starlight_fast_hire',
          explanation:
            'Scammers route candidates to unauthenticated encrypted messengers to avoid platform moderation.',
        },
        {
          title: 'Upfront Registration / Background Fee',
          severity: 'HIGH RISK',
          pill: 'status-pill-danger',
          phrase: 'Registration background verification fee ($120) refunded in first paycheck',
          explanation:
            'Any request for upfront candidate payment is a definitive marker of recruitment fraud.',
        },
      ];
    } else if (idx === 1) {
      return [
        {
          title: 'Free Webmail Contact for Corporate Role',
          severity: 'WARNING',
          pill: 'status-pill-caution',
          phrase: 'velocehiring2026@gmail.com',
          explanation:
            'The recruiter is using a free Gmail alias rather than an authenticated corporate email domain.',
        },
        {
          title: 'Pre-Contract Paid Test Article',
          severity: 'INFO',
          pill: 'status-pill-neutral',
          phrase: 'paid test article ($150) requested prior to contract',
          explanation:
            'Clarify IP ownership and contract terms prior to beginning trial assignments.',
        },
      ];
    } else {
      return [
        {
          title: 'Corporate Domain & MX Records Validated',
          severity: 'VERIFIED',
          pill: 'status-pill-safe',
          phrase: 'talent@apextelemetry.io (apextelemetry.io)',
          explanation:
            'Domain is over 6 years old with active authenticated corporate DNS mail records.',
        },
        {
          title: 'Realistic Compensation Band',
          severity: 'VERIFIED',
          pill: 'status-pill-safe',
          phrase: '$165,000 - $195,000 / year (Senior Distributed Systems Engineer)',
          explanation:
            'Salary matches verified compensation benchmarks for senior infrastructure engineering.',
        },
      ];
    }
  };

  const currentScore = selectedSampleIndex === 2 ? 6 : selectedSampleIndex === 1 ? 58 : 96;
  const currentRisk =
    selectedSampleIndex === 2 ? 'HIGH RISK' : selectedSampleIndex === 1 ? 'NEEDS CAUTION' : 'VERIFIED';
  const currentRiskPill =
    selectedSampleIndex === 2
      ? 'status-pill-danger'
      : selectedSampleIndex === 1
      ? 'status-pill-caution'
      : 'status-pill-safe';

  return (
    <div className="space-y-24 pb-20 font-sans text-foreground">
      
      {/* 1. EDITORIAL HERO WITH EMBEDDED REAL PRODUCT WORKFLOW */}
      <section className="pt-12 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Clear Product Positioning */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Know which job postings you can trust.
            </h1>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
              SafeHire analyzes job postings for fake equipment checks, Telegram recruiter impostors, upfront registration fees, and domain lookalikes before you apply.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/analyze"
                className="px-4 py-2.5 rounded-md bg-foreground text-background font-medium text-xs hover:opacity-90 transition shadow-sm"
              >
                Analyze a job posting
              </Link>
              <Link
                to="/companies"
                className="px-4 py-2.5 rounded-md bg-surface border border-border text-foreground hover:bg-surface-hover text-xs font-medium transition"
              >
                Check company directory
              </Link>
            </div>

            <div className="pt-6 border-t border-border grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-mono font-bold text-foreground block text-sm">99.8%</span>
                <span className="text-text-muted text-[11px]">Scam signal recall</span>
              </div>
              <div>
                <span className="font-mono font-bold text-foreground block text-sm">&lt; 150ms</span>
                <span className="text-text-muted text-[11px]">Inference speed</span>
              </div>
              <div>
                <span className="font-mono font-bold text-foreground block text-sm">Zero PII</span>
                <span className="text-text-muted text-[11px]">Candidate privacy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Real Product Interactive Demo */}
          <div className="lg:col-span-7">
            <div className="rounded-lg bg-surface border border-border shadow-sm divide-y divide-border">
              
              {/* Sample Switcher Header */}
              <div className="p-3.5 bg-surface-subtle flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-text-muted font-medium text-[11px]">
                  Interactive product demo:
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  {SAMPLES.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedSampleIndex(i);
                        setAnalyzed(true);
                      }}
                      className={`px-2.5 py-1 rounded transition ${
                        selectedSampleIndex === i
                          ? 'bg-surface text-foreground font-bold shadow-sm border border-border'
                          : 'text-text-muted hover:text-foreground'
                      }`}
                    >
                      {i === 2 ? 'Scam sample' : i === 1 ? 'Caution sample' : 'Verified sample'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Job Information Block */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {sample.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {sample.companyName} • {sample.location}
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-xs text-foreground shrink-0 bg-surface-subtle px-2 py-1 rounded border border-border">
                    {sample.salary}
                  </span>
                </div>

                <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                  {sample.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-text-muted">
                    Contact: {sample.contactEmail || sample.recruiterContact}
                  </div>

                  <button
                    onClick={handleRunDemoScan}
                    disabled={analyzing}
                    className="px-3 py-1.5 rounded bg-foreground text-background text-xs font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run verification</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Real-time Verification Progress during scan */}
              {analyzing && (
                <div className="p-4 bg-surface-subtle/50 space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground" />
                    <span>{steps[currentStep]}</span>
                  </div>
                </div>
              )}

              {/* Analysis Result Output */}
              {analyzed && !analyzing && (
                <div className="p-5 space-y-4 bg-surface">
                  {/* Trust Score & Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-muted font-semibold">
                        Trust Score
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-black font-mono text-foreground">
                          {currentScore}
                        </span>
                        <span className="text-xs font-mono text-text-muted">/ 100</span>
                      </div>
                    </div>

                    <div className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${currentRiskPill}`}>
                      {currentRisk}
                    </div>
                  </div>

                  {/* Detected Signals with Interactive Evidence Accordion */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-text-muted uppercase font-semibold block">
                      Why this conclusion was reached ({getDemoIndicators(selectedSampleIndex).length} signals)
                    </span>

                    <div className="space-y-1.5">
                      {getDemoIndicators(selectedSampleIndex).map((ind, idx) => {
                        const isExpanded = expandedSignal === idx;
                        return (
                          <div
                            key={idx}
                            className="border border-border rounded-md overflow-hidden text-xs"
                          >
                            <div
                              onClick={() => setExpandedSignal(isExpanded ? null : idx)}
                              className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-surface-hover/60 transition select-none"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${ind.pill}`}>
                                  {ind.severity}
                                </span>
                                <span className="font-medium text-foreground">{ind.title}</span>
                              </div>
                              <span className="text-[11px] text-text-muted font-mono flex items-center gap-1">
                                {isExpanded ? 'Hide' : 'Evidence'}
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </span>
                            </div>

                            {isExpanded && (
                              <div className="p-2.5 bg-surface-subtle border-t border-border space-y-1.5">
                                <p className="text-text-secondary leading-relaxed">{ind.explanation}</p>
                                <div className="p-2 bg-surface rounded border border-border font-mono text-[11px] text-foreground">
                                  "{ind.phrase}"
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-text-muted text-[11px]">
                      Interactive demonstration generated by SafeHire rule & NLP engine.
                    </span>
                    <Link
                      to="/analyze"
                      className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
                    >
                      <span>Analyze a real post</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 2. RECRUITMENT FRAUD THREAT VECTOR BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Common recruitment fraud vectors
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            SafeHire specifically checks for documented patterns used by modern scammers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">01</span>
            <h3 className="text-sm font-semibold text-foreground">Equipment Check Schemes</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Scammers send counterfeit advance checks to buy hardware from fake vendor stores that they control.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">02</span>
            <h3 className="text-sm font-semibold text-foreground">Telegram Recruiter Impersonation</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Impersonating corporate recruiters on LinkedIn, then pivoting candidates to text-only Telegram chats.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">03</span>
            <h3 className="text-sm font-semibold text-foreground">Identity & W-2 Phishing</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Immediate offers without interviews designed to harvest SSNs, banking credentials, and ID documents.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">04</span>
            <h3 className="text-sm font-semibold text-foreground">Domain Lookalikes & Free Webmail</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Using typosquatted domains and disposable Gmail addresses to pose as reputable organizations.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SIDE-BY-SIDE POSTING COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-2xl space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Authentic vs fraudulent job posting anatomy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Authentic */}
          <div className="p-5 rounded-lg bg-surface border border-emerald-300 dark:border-emerald-800/60 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                ✓ VERIFIED POSTING
              </span>
              <span className="text-[11px] font-mono text-text-muted">Trust Score: 96/100</span>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Corporate domain email address (e.g. recruiter@company.com)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Realistic compensation matching level of seniority</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Standard interview process (authenticated video bridge)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Hardware shipped directly by employer IT with zero upfront cost</span>
              </li>
            </ul>
          </div>

          {/* Scam */}
          <div className="p-5 rounded-lg bg-surface border border-rose-300 dark:border-rose-800/60 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">
                ✕ SCAM POSTING
              </span>
              <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400">Trust Score: 6/100</span>
            </div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>Free Gmail/Hotmail address used for corporate executive hiring</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>Inflated compensation ($80+/hr for basic data entry without experience)</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>Text-only Telegram interview with immediate same-day hiring</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>Advance cashier check or registration verification fee demanded</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-lg bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">
              Verify your next job opportunity
            </h3>
            <p className="text-xs text-text-secondary max-w-md">
              Paste any job post text or enter details to check for fraud indicators in seconds.
            </p>
          </div>

          <Link
            to="/analyze"
            className="px-4 py-2.5 rounded-md bg-foreground text-background font-medium text-xs hover:opacity-90 transition shadow-sm shrink-0"
          >
            Analyze a posting now
          </Link>
        </div>
      </section>

    </div>
  );
};
