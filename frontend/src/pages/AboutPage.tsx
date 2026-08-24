import React from 'react';
import { ShieldCheck, Cpu, Database, Lock, AlertTriangle, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> Project Overview & Methodology
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          About SafeHire Intelligence
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          SafeHire is a decision-support cybersecurity platform that leverages Natural Language Processing (NLP) and statistical Machine Learning to detect fraudulent, deceptive, and predatory job advertisements before applicants become victims of scams.
        </p>
      </div>

      {/* 1. Problem Statement & Motivation */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          The Recruitment Fraud Problem
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The rapid transition to remote work and digital recruitment platforms has simplified employment searches but has simultaneously exposed job seekers to sophisticated online recruitment scams. Fraudulent postings mimic legitimate corporate opportunities to harvest sensitive personal identification (SSN, national IDs), extract fraudulent registration/equipment fees, execute advance check fraud, or divert candidates into malicious Telegram and WhatsApp networks.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Manual identification of these threats is challenging because scammers copy legitimate corporate branding. Existing job portals offer minimal automated scrutiny. SafeHire bridges this vulnerability through automated NLP text analysis and calibrated risk modeling.
        </p>
      </div>

      {/* 2. System Architecture & Tech Stack */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-cyan-400" />
          Technical Stack & Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase font-mono">Frontend Interface</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Recharts. Designed for responsive accessibility, dark cybersecurity themes, and real-time SVG risk gauge visualization.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase font-mono">Backend Gateway</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Node.js + Express + TypeScript + Mongoose. Implements JWT sessions, bcrypt hashing, Helmet protection, rate limiting, and role-based access control (RBAC).
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono">Database Persistence</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              MongoDB Atlas with structured Mongoose schemas for Users, JobPosts, Analyses, FraudIndicators, SavedAnalyses, and ModelMetrics.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase font-mono">Python ML Engine</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              FastAPI + scikit-learn + pandas + numpy + TF-IDF Vectorizer + Logistic Regression, Random Forest, and SVM models trained on recruitment fraud patterns.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Machine Learning & XAI Methodology */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Natural Language Processing & Explainable AI (XAI)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          SafeHire treats job fraud classification not as a black-box system, but as an explainable decision-support model. Our hybrid inference engine combines:
        </p>
        <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 pl-2">
          <li><strong>TF-IDF N-Gram Vectorization:</strong> Captures statistical word and phrase associations common in scam corpora.</li>
          <li><strong>Linguistic Feature Extraction:</strong> Measures uppercase letter ratios, excessive punctuation, and text length brevity.</li>
          <li><strong>Domain & Channel Analysis:</strong> Flags free email services (@gmail, @yahoo) used for enterprise hiring and off-platform chat redirects (Telegram, WhatsApp).</li>
          <li><strong>Payment & Urgency Rule Attribution:</strong> Identifies predatory phrases like "registration fee", "wire transfer", "guaranteed income", and "instant offer".</li>
        </ul>
      </div>

      {/* 4. Limitations & Academic Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
        <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Decision-Support Disclaimer & Known Limitations
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          SafeHire provides an automated risk assessment and is not a legal or definitive verification service. A high-risk score does not conclusively prove fraud, and a low-risk score does not guarantee that a job is legitimate. Users should independently verify employers through trusted sources and should never make payments or share sensitive personal information solely based on a SafeHire result.
        </p>
      </div>

      {/* 5. Future Scope */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Future Scope & Roadmap</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            • <strong>Transformer Models:</strong> Fine-tuned BERT and RoBERTa embeddings for context-aware scam detection.
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            • <strong>Browser Extension:</strong> Real-time scanning directly on LinkedIn, Indeed, and Glassdoor portals.
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            • <strong>Live Domain Reputation:</strong> Automated WHOIS age checking and SSL verification for employer websites.
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            • <strong>Community Scam Database:</strong> Crowdsourced reporting and blacklisting network for malicious recruiters.
          </div>
        </div>
      </div>

      {/* Back to analyzer CTA */}
      <div className="text-center pt-4">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition"
        >
          <span>Run SafeHire Analyzer</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
