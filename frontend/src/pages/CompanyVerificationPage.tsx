import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Globe,
  Mail,
  ExternalLink,
  Search,
  Plus,
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
    activeScamAlerts: 2,
    knownRecruiterDomains: ['@stripe.com'],
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Company Verification Directory
          </h1>
          <p className="text-xs text-text-secondary">
            Audit employer domain age, DNS MX mail records, and known recruiter channels.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-3.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Analyze a specific job</span>
        </Link>
      </div>

      {/* Directory Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Company Search & List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies by name or domain..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="rounded-lg bg-surface border border-border divide-y divide-border overflow-hidden shadow-sm">
            {filteredCompanies.map((comp) => {
              const isSelected = selectedCompany.id === comp.id;
              const isVer = comp.verificationStatus === 'VERIFIED';
              const isHighRisk = comp.verificationStatus === 'HIGH_RISK';

              const pill = isVer
                ? 'status-pill-safe'
                : isHighRisk
                ? 'status-pill-danger'
                : 'status-pill-caution';

              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompany(comp)}
                  className={`p-3.5 cursor-pointer text-xs transition-colors ${
                    isSelected ? 'bg-surface-subtle' : 'hover:bg-surface-hover/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{comp.name}</h4>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${pill}`}>
                          {comp.verificationStatus.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-text-muted">{comp.domain}</p>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <span className="text-[10px] text-text-muted uppercase block">Trust</span>
                      <span className="text-sm font-bold text-foreground">{comp.trustScore}/100</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Company Profile (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-lg bg-surface border border-border space-y-5 shadow-sm sticky top-20 text-xs">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-foreground">{selectedCompany.name}</h2>
                <a
                  href={`https://${selectedCompany.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-text-secondary hover:text-foreground inline-flex items-center gap-1"
                >
                  <span>{selectedCompany.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-text-muted uppercase block">Trust Score</span>
                <span className="text-2xl font-black text-foreground">
                  {selectedCompany.trustScore}
                  <span className="text-xs text-text-muted font-normal"> / 100</span>
                </span>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-md bg-surface-subtle border border-border font-mono text-[11px]">
              <div>
                <span className="text-[10px] text-text-muted uppercase block">Domain Age</span>
                <span className="text-foreground">{selectedCompany.domainAge}</span>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase block">DNS MX Status</span>
                <span className={selectedCompany.mxRecordsValid ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
                  {selectedCompany.mxRecordsValid ? '✓ Valid' : '✕ Invalid'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase block">Scam Alerts</span>
                <span className="text-foreground">{selectedCompany.activeScamAlerts}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-text-muted font-semibold block">
                Verification Summary
              </span>
              <p className="text-text-secondary leading-relaxed">
                {selectedCompany.summary}
              </p>
            </div>

            {/* Recruiter Channels */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-text-muted font-semibold block">
                Legitimate Hiring Channels
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompany.knownRecruiterDomains.map((dom, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-surface-subtle border border-border font-mono text-[11px] text-foreground">
                    {dom}
                  </span>
                ))}
              </div>
            </div>

            {/* Risk Signals */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-text-muted font-semibold block">
                Verification Observations
              </span>
              <ul className="space-y-1 text-text-secondary text-xs">
                {selectedCompany.riskSignals.map((sig, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-text-muted">•</span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-text-muted">
                Industry: {selectedCompany.industry}
              </span>
              <Link
                to="/analyze"
                className="text-foreground hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>Audit a job from this company</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
