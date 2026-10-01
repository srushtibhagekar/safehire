import React from 'react';
import { Sparkles, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export interface SampleJob {
  label: string;
  category: 'Verified Genuine' | 'Needs Caution' | 'Critical Fraud Scam';
  riskLevel: 'LOW' | 'MEDIUM' | 'CRITICAL';
  title: string;
  companyName: string;
  location: string;
  salary: string;
  employmentType?: string;
  companyWebsite: string;
  contactEmail: string;
  jobUrl: string;
  recruiterContact: string;
  description: string;
}

export const SAMPLES: SampleJob[] = [
  {
    label: 'Senior Infrastructure Engineer',
    category: 'Verified Genuine',
    riskLevel: 'LOW',
    title: 'Senior Distributed Systems Engineer',
    companyName: 'Apex Telemetry Systems',
    location: 'San Francisco, CA (Hybrid / Remote)',
    salary: '$165,000 - $195,000 / year + Equity',
    employmentType: 'Full-time',
    companyWebsite: 'https://apextelemetry.io',
    contactEmail: 'talent-engineering@apextelemetry.io',
    jobUrl: 'https://apextelemetry.io/careers/eng-infra-2026',
    recruiterContact: 'Marcus Vance (LinkedIn verified head of talent)',
    description: `Apex Telemetry is hiring a Senior Distributed Systems Engineer to design high-throughput data pipelines processing 2.4M metrics/sec.

Key Responsibilities:
- Architect and operate resilient Kafka and ClickHouse ingestion clusters.
- Collaborate with platform security and SRE teams to ensure SOC-2 and HIPAA compliance.
- Implement automated canary deployments with Kubernetes and ArgoCD.

Requirements:
- 5+ years of production experience in Golang, Rust, or Python.
- Deep understanding of distributed consensus protocols (Raft/Paxos).
- Verifiable track record in high-availability cloud infrastructure (AWS/GCP).

Benefits: Comprehensive health/dental/vision coverage, 401(k) 5% match, $3,000 annual learning stipend, transparent compensation band.`,
  },
  {
    label: 'Freelance Growth Copywriter',
    category: 'Needs Caution',
    riskLevel: 'MEDIUM',
    title: 'Contract B2B SaaS Content Strategist',
    companyName: 'Veloce Digital Media',
    location: 'Remote (Global)',
    salary: '$60 - $80 / hour',
    employmentType: 'Contract',
    companyWebsite: 'https://velocemedia.co',
    contactEmail: 'velocehiring2026@gmail.com',
    jobUrl: 'https://remotejobboard-example.org/veloce-copywriter',
    recruiterContact: 'HR Desk (@veloce_recruiting)',
    description: `Seeking a skilled freelance writer to author technical B2B whitepapers and thought-leadership articles for cybersecurity and enterprise tech clients.

Scope of Work:
- Deliver 3 in-depth research articles per month (1,500 - 2,500 words each).
- Conduct subject matter interviews with industry executives.
- Optimize articles for SEO search volume and high-intent conversion.

Note: The hiring coordinator currently uses a Google Workspace alias (velocehiring2026@gmail.com). A paid test article ($150) will be requested prior to contract execution. Please do not submit confidential client samples.`,
  },
  {
    label: 'Work-From-Home Data Entry Scam',
    category: 'Critical Fraud Scam',
    riskLevel: 'CRITICAL',
    title: 'Executive Virtual Assistant & Data Specialist',
    companyName: 'Starlight Global Logistics LLC',
    location: 'Remote (Immediate Start - No Experience Needed)',
    salary: '$85.00 / hour (Paid Weekly via Direct Wire)',
    employmentType: 'Full-time / Part-time',
    companyWebsite: 'http://starlight-global-quicklogistics.top',
    contactEmail: 'careers-starlight@hotmail.com',
    jobUrl: 'http://telegram.me/starlight_hr_interview',
    recruiterContact: 'Dr. Arthur Campbell (Telegram ID: @starlight_fast_hire)',
    description: `URGENT OPENING: We are immediately hiring 15 Remote Virtual Assistants & Data Entry Clerks to work 15-20 hours weekly from home. No prior experience is required; 100% online training is provided.

Duties:
- Input supplier logistics manifests into proprietary company portal.
- Respond to vendor emails and log tracking spreadsheets.

Requirements:
- Must have an active bank account to receive company check for purchasing official Apple MacBook Pro and encrypted home-office kit.
- You will be sent an advance cashier check ($3,850) to purchase software licenses from our accredited vendor.
- Immediate interview conducted solely via Telegram messenger: @starlight_fast_hire.
- Registration background verification fee ($120) will be fully refunded in first paycheck. Send full name, SSN, and bank routing info to proceed.`,
  },
];

interface SamplePickerProps {
  onSelect: (sample: SampleJob) => void;
}

export const SamplePicker: React.FC<SamplePickerProps> = ({ onSelect }) => {
  return (
    <div className="rounded-xl bg-[#0D121D] border border-slate-800 p-4 space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            Load Pre-Configured Test Cases
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline-block">
          Click any sample to populate the inspection form
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {SAMPLES.map((sample, i) => {
          const isLow = sample.riskLevel === 'LOW';
          const isMed = sample.riskLevel === 'MEDIUM';
          const Icon = isLow ? ShieldCheck : isMed ? AlertTriangle : ShieldAlert;

          const badgeClasses = isLow
            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
            : isMed
            ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
            : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(sample)}
              className="text-left p-3 rounded-lg bg-[#111726] border border-slate-800 hover:border-sky-500/40 hover:bg-[#141C30] transition group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${badgeClasses}`}
                  >
                    <Icon className="w-3 h-3" />
                    {sample.category}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 transition line-clamp-1">
                  {sample.label}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{sample.companyName}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                {sample.salary}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
