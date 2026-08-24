import React from 'react';
import { Sparkles, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export interface SampleJob {
  title: string;
  companyName: string;
  description: string;
  location: string;
  salary: string;
  employmentType: string;
  companyWebsite: string;
  contactEmail: string;
  jobUrl: string;
  recruiterContact: string;
}

interface SamplePickerProps {
  onSelect: (sample: SampleJob) => void;
}

export const SAMPLES: { label: string; risk: string; badgeColor: string; icon: any; data: SampleJob }[] = [
  {
    label: 'Genuine Job Example',
    risk: 'Likely Genuine (~10%)',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: ShieldCheck,
    data: {
      title: 'Senior Frontend Engineer (React/TypeScript)',
      companyName: 'Stripe',
      description: 'We are seeking an experienced Frontend Engineer to design and build mission-critical checkout flows used by millions worldwide. You will partner with our product and design teams to deliver high-performance, accessible, and delightful web interfaces. Required: 4+ years of professional React experience, strong TypeScript skills, and experience with modern CSS and state management systems. Competitive compensation, comprehensive health benefits, and 401(k) matching.',
      location: 'San Francisco, CA / Remote',
      salary: '$150,000 - $185,000 / year',
      employmentType: 'Full-time',
      companyWebsite: 'https://stripe.com',
      contactEmail: 'careers@stripe.com',
      jobUrl: 'https://stripe.com/jobs/sr-frontend',
      recruiterContact: 'LinkedIn / Greenhouse',
    },
  },
  {
    label: 'Suspicious Job Example',
    risk: 'Needs Caution (~45%)',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: AlertTriangle,
    data: {
      title: 'Remote Project Coordinator (Entry Level)',
      companyName: 'Apex Digital Solutions',
      description: 'We are hiring a remote coordinator to handle scheduling and document preparation. Flexible hours, part-time or full-time available. No prior corporate experience strictly required, full training provided. Please email your resume to apexjobs2026@gmail.com to proceed to the next stage.',
      location: 'Remote',
      salary: '$45 - $55 / hour',
      employmentType: 'Part-time',
      companyWebsite: '',
      contactEmail: 'apexjobs2026@gmail.com',
      jobUrl: '',
      recruiterContact: '',
    },
  },
  {
    label: 'Fraudulent Job Example',
    risk: 'Likely Fraudulent (~95%)',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
    icon: ShieldAlert,
    data: {
      title: 'URGENT DATA ENTRY CLERK - START TODAY $$$',
      companyName: 'Global Home Careers LLC',
      description: 'URGENT HIRING!! WORK FROM HOME AND EARN $5,000 WEEKLY! NO EXPERIENCE REQUIRED!! Instant joining! You will receive daily checks. To secure your position, applicant must pay registration fee of $150 for equipment setup and software licensing via wire transfer or gift card. Send your bank details immediately to recruiter via Telegram @hiring_fast_hr to begin your orientation!',
      location: 'Anywhere / Remote',
      salary: '$5000 / week',
      employmentType: 'Remote',
      companyWebsite: 'http://fast-cash-careers.xyz',
      contactEmail: 'hr_quick_pay@yahoo.com',
      jobUrl: 'http://bit.ly/instant-job-offer-2026',
      recruiterContact: 'Telegram: @hiring_fast_hr',
    },
  },
];

export const SamplePicker: React.FC<SamplePickerProps> = ({ onSelect }) => {
  return (
    <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-semibold text-slate-200">
          Try Pre-built Demonstration Job Postings:
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {SAMPLES.map((s, idx) => {
          const Icon = s.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(s.data)}
              className="flex flex-col items-start p-3 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-slate-700 transition text-left group"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                  {s.label}
                </span>
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:scale-110 transition" />
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${s.badgeColor}`}>
                {s.risk}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
