import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Heart, Github, Lock, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 pt-12 pb-8 text-xs text-slate-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">
                Safe<span className="text-cyan-400">Hire</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-powered recruitment fraud detection & risk verification platform.
            </p>
            <div className="text-cyan-400 font-semibold text-xs tracking-wide">
              Verify Before You Apply.
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/analyze" className="hover:text-cyan-400 transition">Analyze Job Posting</Link></li>
              <li><Link to="/how-it-works" className="hover:text-cyan-400 transition">How Detection Works</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition">System Architecture & ML</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Research & Methodology */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">AI & Detection</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-cyan-400" /> TF-IDF + Logistic Regression</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-blue-400" /> Explainable Fraud Indicators</li>
              <li className="flex items-center gap-1.5"><ShieldAlert className="w-3 h-3 text-amber-400" /> EMSCAD Benchmark Aligned</li>
              <li>Deterministic Rule Fallback</li>
            </ul>
          </div>

          {/* Col 4: Academic Context */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Academic Project</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Final-Year Computer Science Engineering Capstone Project. Designed for cybersecurity risk mitigation, automated decision-support, and explainable AI in recruitment intelligence.
            </p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mb-6">
          <span className="font-semibold text-amber-400">Decision-Support Disclaimer: </span>
          SafeHire provides an automated risk assessment and is not a legal or definitive verification service. A high-risk score does not conclusively prove fraud, and a low-risk score does not guarantee that a job is legitimate. Users should independently verify employers through trusted sources.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-[11px]">
          <p>© {new Date().getFullYear()} SafeHire Intelligence Systems. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with React, Express, MongoDB & Python FastAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
