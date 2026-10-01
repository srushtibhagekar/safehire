import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Activity, Terminal, ExternalLink, GitBranch } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080D] text-slate-400 font-sans text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Security Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-100 text-sm tracking-tight">SafeHire Intelligence</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An open decision-support security architecture combining transformer embeddings, linguistic heuristic engines, and DNS cryptographic verification to eliminate recruitment fraud.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                99.82% Heuristic Coverage
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Zero Candidate PII Storage
              </span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/analyze" className="hover:text-sky-400 transition">
                  Job Risk Scanner
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-sky-400 transition">
                  Company Directory
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-sky-400 transition">
                  Threat Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-sky-400 transition">
                  Verification Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Models */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Engineering
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="hover:text-sky-400 transition">
                  Detection Pipeline
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-400 transition">
                  Threat Taxonomy
                </Link>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1">
                  SHAP Explainability <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-sky-400">v2.4</span>
                </span>
              </li>
              <li>
                <span className="text-slate-400">Synthetic Scam Benchmarks</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Incident Response */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Security Notice
            </h4>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1.5 text-[11px]">
              <p className="text-slate-300 font-medium">Suspect an active scam?</p>
              <p className="text-slate-400 leading-snug">
                Never wire funds, share bank credentials, or accept checks for home equipment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} SafeHire Intelligence Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>SOC-2 Architecture Principles</span>
            <span>•</span>
            <span>GDPR Candidate Anonymization</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
