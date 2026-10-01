import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface text-text-secondary text-xs transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-foreground text-background flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-foreground text-xs">SafeHire</span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-sm">
              Recruitment fraud detection and job post authenticity verification. Open heuristic engine and candidate protection system.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-1.5 text-text-secondary">
              <li>
                <Link to="/analyze" className="hover:text-foreground transition">
                  Analyze Posting
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-foreground transition">
                  Company Directory
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-foreground transition">
                  Detection Methodology
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition">
                  Threat Taxonomy
                </Link>
              </li>
            </ul>
          </div>

          {/* Account / Support */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-wider">
              Investigation
            </h4>
            <ul className="space-y-1.5 text-text-secondary">
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition">
                  Workspace
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-foreground transition">
                  Verification History
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-foreground transition">
                  Saved Records
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-muted">
          <p>© {new Date().getFullYear()} SafeHire. All verification logs processed ephemerally.</p>
          <div className="flex items-center gap-4">
            <span>Candidate Privacy First</span>
            <span>•</span>
            <span>Zero PII Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
