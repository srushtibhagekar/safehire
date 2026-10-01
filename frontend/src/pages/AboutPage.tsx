import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans text-foreground">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          About SafeHire
        </h1>
        <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
          SafeHire is a decision-support platform designed to protect job seekers from recruitment fraud, identity theft, and fake employer impersonation.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Zero Exploitation</h3>
          <p className="text-text-secondary leading-relaxed">
            Legitimate employment never requires job candidates to purchase hardware from designated vendors or pay upfront background fees.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Verifiable Evidence</h3>
          <p className="text-text-secondary leading-relaxed">
            Every flagged listing includes exact quotes, sources, and explanations so you understand why an opportunity was categorized as risky.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Candidate Privacy</h3>
          <p className="text-text-secondary leading-relaxed">
            SafeHire does not harvest candidate personal information. All scans are processed ephemerally with zero tracking.
          </p>
        </div>
      </div>

      {/* Engineering Notice */}
      <div className="p-6 rounded-lg bg-surface border border-border space-y-2 text-xs">
        <h3 className="text-sm font-semibold text-foreground">Engineering Principles</h3>
        <p className="text-text-secondary leading-relaxed">
          SafeHire treats fake recruitment postings as active social engineering vectors. Our detection pipeline synthesizes transformer token representations with deterministic heuristic rules and domain reputation validation.
        </p>
        <div className="pt-2">
          <Link to="/analyze" className="text-foreground hover:underline font-medium inline-block">
            Analyze a job posting →
          </Link>
        </div>
      </div>

    </div>
  );
};
