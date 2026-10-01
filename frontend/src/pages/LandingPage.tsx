import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Search,
  CheckCircle2,
  XCircle,
  Cpu,
  Globe,
  DollarSign,
  FileText,
  Building2,
  Terminal,
  Activity,
  Layers,
  Check,
  Zap,
} from 'lucide-react';
import { SAMPLES, SampleJob } from '../components/analyzer/SamplePicker';
import { RiskGauge } from '../components/analyzer/RiskGauge';
import { IndicatorCard } from '../components/analyzer/IndicatorCard';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Hero interactive scanner simulation state
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(2); // Start with scam case for strong verification contrast
  const [isHeroScanning, setIsHeroScanning] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<'scan' | 'evidence'>('scan');

  const currentSample = SAMPLES[selectedSampleIndex];

  const handleHeroSampleChange = (index: number) => {
    setSelectedSampleIndex(index);
    setIsHeroScanning(true);
    setTimeout(() => {
      setIsHeroScanning(false);
    }, 600);
  };

  const getSampleIndicators = (index: number) => {
    if (index === 2) {
      return [
        {
          type: 'ADVANCE_FEE_DEMAND',
          severity: 'CRITICAL' as const,
          title: 'Advance Equipment Check & Registration Fee Scam',
          explanation:
            'The posting requests the applicant to deposit a cashier check or pay an upfront verification fee for software kits. Real employers supply equipment directly.',
          evidence:
            'Extracted tokens: "advance cashier check ($3,850)", "Registration background verification fee ($120)", "refunded in first paycheck"',
        },
        {
          type: 'OFF_PLATFORM_REDIRECT',
          severity: 'HIGH' as const,
          title: 'Unauthenticated Encrypted Chat Interview',
          explanation:
            'The employer redirects candidates strictly to Telegram handles rather than enterprise scheduling bridges.',
          evidence: 'Recruiter handle: Telegram @starlight_fast_hire',
        },
        {
          type: 'DOMAIN_INTEGRITY_MISMATCH',
          severity: 'HIGH' as const,
          title: 'Disposable Webmail Domain & Suspicious TLD',
          explanation:
            'Contact email uses hotmail.com and domain registered under .top TLD less than 14 days ago.',
          evidence: 'Domain: starlight-global-quicklogistics.top | Email: careers-starlight@hotmail.com',
        },
      ];
    } else if (index === 1) {
      return [
        {
          type: 'FREE_EMAIL_ALIAS',
          severity: 'MEDIUM' as const,
          title: 'Public Webmail Alias for Enterprise Hiring',
          explanation:
            'The hiring contact provided a @gmail.com address rather than an authenticated corporate domain mailbox.',
          evidence: 'Contact mailbox: velocehiring2026@gmail.com',
        },
        {
          type: 'UNVERIFIED_PAYMENT_TERMS',
          severity: 'LOW' as const,
          title: 'Pre-Contract Test Assignment Requirements',
          explanation:
            'Paid trial article specified without clear intellectual property or contract documentation.',
          evidence: 'Trial fee mention: "$150 test article"',
        },
      ];
    } else {
      return [
        {
          type: 'AUTHENTICATED_CORPORATE_DOMAIN',
          severity: 'LOW' as const,
          title: 'Corporate Domain & DNS MX Records Validated',
          explanation:
            'Domain apextelemetry.io has valid SSL, active corporate DNS MX records, and public entity registration.',
          evidence: 'Corporate URL: apextelemetry.io | Recruiter: talent-engineering@apextelemetry.io',
        },
        {
          type: 'BENCHMARK_COMPENSATION_MATCH',
          severity: 'LOW' as const,
          title: 'Standard Compensation & Industry Band Alignment',
          explanation:
            'Salary range ($165k-$195k) matches verified SF Bay Area market standards for senior infrastructure engineering roles.',
          evidence: 'Benchmark match: Level 5 Distributed Systems Engineer (98% alignment)',
        },
      ];
    }
  };

  const sampleRiskScore = selectedSampleIndex === 0 ? 8 : selectedSampleIndex === 1 ? 42 : 94;
  const sampleClassification =
    selectedSampleIndex === 0
      ? ('LIKELY_GENUINE' as const)
      : selectedSampleIndex === 1
      ? ('NEEDS_CAUTION' as const)
      : ('LIKELY_FRAUDULENT' as const);

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden font-sans">
      
      {/* ===================================================
          1. HERO SECTION & LIVE INTERACTIVE SCANNER
         =================================================== */}
      <section className="pt-10 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Copy (No generic marketing fluff) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>DECISION-SUPPORT INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-[1.1]">
              Know which job posts you can <span className="text-sky-400">trust</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
              Recruitment fraud is surging with fake equipment checks, Telegram impostors, and credential phishing. SafeHire scans job postings, validates employer domains, and pinpoints hidden predatory signals before you submit personal information.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Audit a Job Posting Now</span>
              </Link>

              <Link
                to="/companies"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition"
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Verify Company Directory</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-900 flex items-center gap-6 text-[11px] font-mono text-slate-400">
              <div>
                <strong className="text-slate-200 block text-xs">99.8%</strong>
                <span>Scam Token Recall</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <strong className="text-slate-200 block text-xs">&lt; 150ms</strong>
                <span>Inference Latency</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <strong className="text-slate-200 block text-xs">Zero PII</strong>
                <span>Candidate Privacy</span>
              </div>
            </div>
          </div>

          {/* Hero Interactive Scanner Instrument */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0D121D] border border-slate-800/90 shadow-2xl overflow-hidden relative">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-[#080B11] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span className="font-semibold text-slate-300">SafeHire Terminal Inspector</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Interactive Demonstration</span>
                </div>
              </div>

              {/* Sample Selector Bar */}
              <div className="p-3 bg-[#111726] border-b border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold mr-1">
                  Sample Case:
                </span>
                {SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHeroSampleChange(idx)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition ${
                      selectedSampleIndex === idx
                        ? 'bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {idx === 0 ? '✓ Apex Systems (Safe)' : idx === 1 ? '⚠ Veloce (Caution)' : '✕ Starlight (Scam)'}
                  </button>
                ))}
              </div>

              {/* Scanner Screen Body */}
              <div className="p-5 space-y-5 relative">
                {isHeroScanning && <div className="scanner-laser" />}

                {/* Job Header & Metadata */}
                <div className="p-3.5 rounded-xl bg-[#080B11] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{currentSample.title}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{currentSample.companyName}</span>
                      <span>•</span>
                      <span>{currentSample.location}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs text-sky-400 font-semibold shrink-0">
                    {currentSample.salary}
                  </div>
                </div>

                {/* Verification Process Breakdown & Trust Score Gauge */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Gauge */}
                  <div className="md:col-span-5">
                    <RiskGauge
                      score={sampleRiskScore}
                      classification={sampleClassification}
                      confidence={selectedSampleIndex === 2 ? 98 : selectedSampleIndex === 1 ? 84 : 96}
                      showTrustScore={true}
                    />
                  </div>

                  {/* Detected Signals Live Stream */}
                  <div className="md:col-span-7 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>AUDIT SIGNALS DETECTED ({getSampleIndicators(selectedSampleIndex).length})</span>
                      <span className="text-slate-400">Click to expand</span>
                    </div>

                    <div className="space-y-2">
                      {getSampleIndicators(selectedSampleIndex).map((ind, i) => (
                        <IndicatorCard key={i} indicator={ind as any} index={i} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Analysis generated by BERT Attention Matrix + Heuristic Rule Engine
                  </span>
                  <button
                    onClick={() => {
                      navigate('/analyze');
                    }}
                    className="text-sky-400 hover:text-sky-300 font-mono text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Inspect Custom Job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. FRAUD TAXONOMY / CORE THREAT VECTORS
         =================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-left max-w-2xl space-y-2 mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            Threat Taxonomy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            The four primary recruitment scam vectors.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Modern scammers exploit urgency, remote work confusion, and impersonation. SafeHire’s engine classifies postings against documented cybercrime patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Vector 1 */}
          <div className="p-5 rounded-xl bg-[#0D121D] border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-100">Advance Equipment Check Scam</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scammers send fake cashier checks to deposit for buying home-office gear from designated vendor sites, which are controlled by fraudsters.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-rose-400">
              Trigger: "Cashier check for equipment"
            </div>
          </div>

          {/* Vector 2 */}
          <div className="p-5 rounded-xl bg-[#0D121D] border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-100">Telegram / WhatsApp Impersonation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Impersonating legitimate corporate recruiters on LinkedIn, then pivoting candidates exclusively to encrypted chat apps for text-only fake interviews.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-rose-400">
              Trigger: Off-platform messaging handles
            </div>
          </div>

          {/* Vector 3 */}
          <div className="p-5 rounded-xl bg-[#0D121D] border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-100">W-2 & Identity Phishing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Issuing instant job offers without interviews to trick candidates into submitting SSN, bank routing info, and passport scans for "onboarding".
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-amber-400">
              Trigger: Immediate hire & SSN demand
            </div>
          </div>

          {/* Vector 4 */}
          <div className="p-5 rounded-xl bg-[#0D121D] border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-100">Domain Spoofing & Lookalikes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Registering typo-squatted domains (e.g. `company-careers.top` vs `company.com`) and free Gmail accounts to impersonate established organizations.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-amber-400">
              Trigger: WHOIS age & webmail aliases
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. HOW THE VERIFICATION ENGINE WORKS
         =================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F19] border border-slate-800 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-sky-400 font-semibold">
              Pipeline Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Multi-layer verification, explained simply.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              SafeHire does not rely on a single black-box prediction. It synthesizes heuristic threat detection with calibrated NLP embeddings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stage 1 */}
            <div className="p-5 rounded-2xl bg-[#080B11] border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-mono text-xs font-bold">
                  1
                </span>
                <span className="text-[10px] font-mono text-slate-400">STAGE 01</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">Linguistic Pattern Extraction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tokenizes requirements, responsibilities, and tone to detect predatory linguistic templates, urgent onboarding language, and compensation outliers.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-5 rounded-2xl bg-[#080B11] border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-mono text-xs font-bold">
                  2
                </span>
                <span className="text-[10px] font-mono text-slate-400">STAGE 02</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">Domain & DNS Integrity Check</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cross-references corporate domain age, SSL status, and public DNS records against known impersonation registries and suspicious top-level domains.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-5 rounded-2xl bg-[#080B11] border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-mono text-xs font-bold">
                  3
                </span>
                <span className="text-[10px] font-mono text-slate-400">STAGE 03</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">Explainable Security Dossier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates a granular 0–100 Trust Score with cited signal evidence, severity ratings, and an actionable protocol to protect your personal identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. SIDE-BY-SIDE POSTING ANATOMY
         =================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-mono uppercase text-sky-400 font-semibold">
            Visual Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Anatomy of a legitimate vs fraudulent job post.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Authentic Post */}
          <div className="p-6 rounded-2xl bg-[#0D121D] border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase">
                  Verified Job Anatomy
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Trust Score: 96/100</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Corporate Domain Email:</strong> hiring@company.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Realistic Pay Band:</strong> Transparent range matching seniority level.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Enterprise Process:</strong> Multi-step technical & behavioral interviews.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Upfront Demands:</strong> Hardware shipped directly by employer IT.</span>
              </li>
            </ul>
          </div>

          {/* Scam Post */}
          <div className="p-6 rounded-2xl bg-[#0D121D] border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-bold font-mono text-rose-400 uppercase">
                  Fraudulent Job Red Flags
                </span>
              </div>
              <span className="text-[10px] font-mono text-rose-400">Trust Score: 12/100</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Free Webmail Alias:</strong> hr-desk2026@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Inflated Entry Compensation:</strong> $80+/hr for basic data entry.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Off-Platform Interview:</strong> Immediate hiring via Telegram/WhatsApp chat.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Check/Fee Demands:</strong> Advance checks for buying supplies from fake vendors.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. CALL TO ACTION SECTION
         =================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="p-10 rounded-3xl bg-[#0B0F19] border border-slate-800 shadow-xl space-y-6">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Verify your next job opportunity now.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Paste any job posting or enter company details to inspect for fraud signals in seconds. No account required for initial scans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/analyze"
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition"
            >
              Analyze Job Posting
            </Link>
            <Link
              to="/how-it-works"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs transition"
            >
              Read Full Methodology
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
