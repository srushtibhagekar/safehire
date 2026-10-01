import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Search,
  Globe,
  Mail,
  Calendar,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Lock,
  History,
} from 'lucide-react';

interface CompanyRecord {
  id: string;
  name: string;
  domain: string;
  verificationStatus: 'VERIFIED' | 'SUSPICIOUS' | 'UNDER_REVIEW' | 'HIGH_RISK';
  trustScore: number;
  industry: string;
  headquarters: string;
  domainAge: string;
  mxRecordsValid: boolean;
  activeScamAlerts: number;
  knownRecruiterDomains: string[];
  recentPostsCount: number;
  riskSignals: string[];
  summary: string;
}

const SAMPLE_COMPANIES: CompanyRecord[] = [
  {
    id: 'comp-1',
    name: 'Apex Telemetry Systems',
    domain: 'apextelemetry.io',
    verificationStatus: 'VERIFIED',
    trustScore: 96,
    industry: 'Cloud Infrastructure & Distributed Systems',
    headquarters: 'San Francisco, CA',
    domainAge: '6 Years, 4 Months (Active DNS)',
    mxRecordsValid: true,
    activeScamAlerts: 0,
    knownRecruiterDomains: ['@apextelemetry.io'],
    recentPostsCount: 8,
    riskSignals: [
      'DNS MX records authenticated with Google Workspace Enterprise',
      'Entity verified in SEC EDGAR and California Secretary of State registry',
      'Zero reported impersonation reports on SafeHire telemetry network',
    ],
    summary:
      'Apex Telemetry is a verified infrastructure technology provider with authenticated DNS records and verified recruitment contacts.',
  },
  {
    id: 'comp-2',
    name: 'Stripe, Inc.',
    domain: 'stripe.com',
    verificationStatus: 'VERIFIED',
    trustScore: 99,
    industry: 'Financial Infrastructure & Payments',
    headquarters: 'South San Francisco, CA & Dublin',
    domainAge: '15+ Years (Global Tier 1 DNS)',
    mxRecordsValid: true,
    activeScamAlerts: 2, // 2 reported third-party phishing impersonations blocked
    knownRecruiterDomains: ['@stripe.com'],
    recentPostsCount: 42,
    riskSignals: [
      'Official enterprise hiring conducted strictly through stripe.com/jobs and Greenhouse ATS',
      'Active phishing alert: Third-party scammers frequently spoof Stripe HR names on Telegram. Verify email ends in @stripe.com',
    ],
    summary:
      'Tier 1 verified enterprise. High target for external phishing impersonation; always verify inbound emails end strictly in @stripe.com.',
  },
  {
    id: 'comp-3',
    name: 'Veloce Digital Media',
    domain: 'velocemedia.co',
    verificationStatus: 'UNDER_REVIEW',
    trustScore: 68,
    industry: 'Digital Marketing & Content Strategy',
    headquarters: 'Remote / London, UK',
    domainAge: '1 Year, 2 Months',
    mxRecordsValid: true,
    activeScamAlerts: 1,
    knownRecruiterDomains: ['@velocemedia.co', '@gmail.com (Contractors)'],
    recentPostsCount: 3,
    riskSignals: [
      'Recruiters occasionally use free @gmail.com aliases for freelance contractor intake',
      'Short domain registration duration (< 2 years)',
    ],
    summary:
      'Legitimate boutique marketing agency, but lacks standardized corporate email protocols for contractor onboarding. Exercise caution with contract terms.',
  },
  {
    id: 'comp-4',
    name: 'Starlight Global Logistics LLC (Spoofed)',
    domain: 'starlight-global-quicklogistics.top',
    verificationStatus: 'HIGH_RISK',
    trustScore: 12,
    industry: 'Phony Logistics / Advance Fee Scam',
    headquarters: 'Unverified Virtual Address',
    domainAge: '14 Days (Registered anonymously via NameCheap)',
    mxRecordsValid: false,
    activeScamAlerts: 19,
    knownRecruiterDomains: ['@hotmail.com', '@telegram: @starlight_fast_hire'],
    recentPostsCount: 14,
    riskSignals: [
      'Domain registered under suspicious .top TLD within last 30 days',
      'Zero corporate business registration in designated jurisdiction',
      'Active scam vector: Sends fake cashier checks for Apple MacBook home kits',
      'Conducts text-only fake interviews via Telegram and WhatsApp',
    ],
    summary:
      'Confirmed recruitment fraud front. Impersonates generic logistics companies to execute equipment check and W-2 identity theft schemes.',
  },
];

export const CompanyVerificationPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyRecord>(SAMPLE_COMPANIES[0]);

  const filteredCompanies = SAMPLE_COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.domain.toLowerCase().includes(query.toLowerCase()) ||
      c.industry.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0D121D] border border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Corporate Authenticity Directory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">
            Company Domain & Identity Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Audit employer domain age, authenticated MX records, known recruiter aliases, and active impersonation threat intelligence before responding to recruiters.
          </p>
        </div>

        <Link
          to="/analyze"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm shrink-0 font-sans"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Audit Specific Job Post</span>
        </Link>
      </div>

      {/* Main Investigation Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Search & Company List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by company name, domain, or industry..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0D121D] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Company Cards List */}
          <div className="space-y-2.5">
            {filteredCompanies.map((comp) => {
              const isSelected = selectedCompany.id === comp.id;
              const isVer = comp.verificationStatus === 'VERIFIED';
              const isHighRisk = comp.verificationStatus === 'HIGH_RISK';

              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompany(comp)}
                  className={`p-4 rounded-xl cursor-pointer transition border ${
                    isSelected
                      ? 'bg-[#121927] border-sky-500/50 shadow-md'
                      : 'bg-[#0D121D] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-100">{comp.name}</h4>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold uppercase ${
                            isVer
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                              : isHighRisk
                              ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                              : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                          }`}
                        >
                          {comp.verificationStatus.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-slate-500" />
                        <span>{comp.domain}</span>
                      </p>
                      <p className="text-[11px] text-slate-500">{comp.industry}</p>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <span className="text-[10px] text-slate-500 block uppercase">Trust</span>
                      <span
                        className={`text-sm font-black ${
                          isVer ? 'text-emerald-400' : isHighRisk ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {comp.trustScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Company Dossier View (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-6 space-y-6 shadow-xl sticky top-24">
            
            {/* Dossier Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
                    {selectedCompany.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-100">{selectedCompany.name}</h2>
                    <a
                      href={`https://${selectedCompany.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedCompany.domain}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono">
                <span className="text-[10px] text-slate-500 uppercase block">Authenticity Index</span>
                <span
                  className={`text-2xl font-black ${
                    selectedCompany.trustScore >= 80
                      ? 'text-emerald-400'
                      : selectedCompany.trustScore >= 50
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {selectedCompany.trustScore}
                  <span className="text-xs text-slate-600 font-normal"> / 100</span>
                </span>
              </div>
            </div>

            {/* Forensic Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#080B11] border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Domain Age</span>
                <span className="text-slate-200">{selectedCompany.domainAge}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">DNS MX Status</span>
                <span className={selectedCompany.mxRecordsValid ? 'text-emerald-400' : 'text-rose-400'}>
                  {selectedCompany.mxRecordsValid ? '✓ Authenticated' : '✕ Invalid / Null'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Active Scam Alerts</span>
                <span className={selectedCompany.activeScamAlerts > 0 ? 'text-rose-400' : 'text-slate-400'}>
                  {selectedCompany.activeScamAlerts} Reported
                </span>
              </div>
            </div>

            {/* Executive Security Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Corporate Intelligence Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedCompany.summary}
              </p>
            </div>

            {/* Verified Recruiter Domains */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Legitimate Hiring Communication Channels
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.knownRecruiterDomains.map((dom, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#080B11] border border-slate-800 font-mono text-xs text-sky-300"
                  >
                    {dom}
                  </span>
                ))}
              </div>
            </div>

            {/* Risk & Telemetry Signals */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Forensic Verification Signals
              </h3>
              <div className="space-y-2">
                {selectedCompany.riskSignals.map((signal, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Directives */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Last WHOIS & DNS refresh: Today, 08:30 UTC
              </span>
              <Link
                to="/analyze"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold"
              >
                <span>Audit a job from {selectedCompany.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
