import React from 'react';

export interface SampleJob {
  label: string;
  category: 'Verified' | 'Caution' | 'High Risk';
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
    label: 'Distributed Systems Engineer',
    category: 'Verified',
    riskLevel: 'LOW',
    title: 'Senior Distributed Systems Engineer',
    companyName: 'Apex Telemetry Systems',
    location: 'San Francisco, CA (Hybrid / Remote)',
    salary: '$165,000 - $195,000 / year',
    employmentType: 'Full-time',
    companyWebsite: 'https://apextelemetry.io',
    contactEmail: 'talent@apextelemetry.io',
    jobUrl: 'https://apextelemetry.io/careers/systems',
    recruiterContact: 'Marcus Vance',
    description: `Apex Telemetry is hiring a Senior Distributed Systems Engineer to design high-throughput data pipelines processing 2M metrics/sec.

Responsibilities:
- Architect and operate resilient Kafka and ClickHouse ingestion clusters.
- Collaborate with platform security and SRE teams to maintain SOC-2 compliance.
- Implement automated canary deployments with Kubernetes.

Requirements:
- 5+ years of production experience in Golang, Rust, or Python.
- Deep understanding of distributed systems and cloud infrastructure (AWS/GCP).
- Transparent compensation and comprehensive benefits.`,
  },
  {
    label: 'Contract Content Writer',
    category: 'Caution',
    riskLevel: 'MEDIUM',
    title: 'Contract B2B SaaS Content Writer',
    companyName: 'Veloce Digital Media',
    location: 'Remote (Global)',
    salary: '$60 - $80 / hour',
    employmentType: 'Contract',
    companyWebsite: 'https://velocemedia.co',
    contactEmail: 'velocehiring2026@gmail.com',
    jobUrl: 'https://remotejobboard.org/veloce-writer',
    recruiterContact: 'HR Desk (@veloce_recruiting)',
    description: `Seeking a skilled freelance writer to author technical B2B articles and whitepapers.

Scope of Work:
- Deliver 3 research articles per month.
- Conduct executive interviews and optimize for search.

Note: The hiring coordinator currently uses a Google Workspace alias (velocehiring2026@gmail.com). A paid test article ($150) will be requested prior to contract execution.`,
  },
  {
    label: 'Virtual Assistant (Scam Case)',
    category: 'High Risk',
    riskLevel: 'CRITICAL',
    title: 'Executive Virtual Assistant & Data Specialist',
    companyName: 'Starlight Global Logistics LLC',
    location: 'Remote (Immediate Start - No Experience)',
    salary: '$85.00 / hour',
    employmentType: 'Full-time / Part-time',
    companyWebsite: 'http://starlight-global-logistics.top',
    contactEmail: 'careers-starlight@hotmail.com',
    jobUrl: 'http://telegram.me/starlight_hr',
    recruiterContact: 'Dr. Arthur Campbell (Telegram: @starlight_fast_hire)',
    description: `URGENT OPENING: We are immediately hiring Remote Virtual Assistants. No prior experience is required; 100% online training is provided.

Duties:
- Input supplier logistics manifests into proprietary portal.
- Respond to vendor emails and log tracking spreadsheets.

Requirements:
- You will be sent an advance cashier check ($3,850) to purchase Apple hardware from our accredited vendor.
- Immediate interview conducted solely via Telegram messenger: @starlight_fast_hire.
- Registration background verification fee ($120) will be refunded in first paycheck. Send SSN and bank details to proceed.`,
  },
];

interface SamplePickerProps {
  onSelect: (sample: SampleJob) => void;
}

export const SamplePicker: React.FC<SamplePickerProps> = ({ onSelect }) => {
  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>Load sample job posting:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((sample, i) => {
          const pill =
            sample.riskLevel === 'LOW'
              ? 'status-pill-safe'
              : sample.riskLevel === 'MEDIUM'
              ? 'status-pill-caution'
              : 'status-pill-danger';

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(sample)}
              className="px-3 py-1.5 rounded-md bg-surface border border-border hover:border-zinc-400 dark:hover:border-zinc-600 text-xs text-foreground transition text-left flex items-center gap-2"
            >
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${pill}`}>
                {sample.category}
              </span>
              <span className="font-medium">{sample.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
