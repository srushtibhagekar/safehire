import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  History,
  Bookmark,
  Building2,
  Search,
  ChevronRight,
  ExternalLink,
  Layers,
  Settings,
  Plus,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState<'ALL' | 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT'>('ALL');
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await analysisService.getAnalyses({ limit: 30 });
        if (res.success && res.data) {
          setAnalyses(res.data);
          if (res.data.length > 0) {
            setSelectedAnalysis(res.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = analyses.length;
  const genuine = analyses.filter((a) => a.classification === 'LIKELY_GENUINE').length;
  const caution = analyses.filter((a) => a.classification === 'NEEDS_CAUTION').length;
  const fraud = analyses.filter((a) => a.classification === 'LIKELY_FRAUDULENT').length;

  const filteredAnalyses = analyses.filter((item) => {
    const titleMatch = (item.jobPost?.title || '').toLowerCase().includes(search.toLowerCase());
    const companyMatch = (item.jobPost?.companyName || '').toLowerCase().includes(search.toLowerCase());
    const riskMatch = filterRisk === 'ALL' || item.classification === filterRisk;
    return (titleMatch || companyMatch) && riskMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans text-foreground">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Verification Workspace
          </h1>
          <p className="text-xs text-text-secondary">
            {user?.name ? `${user.name}'s inspection activity` : 'Recent job verifications'} • {total} total scans
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/analyze"
            className="px-3.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Analyze new posting</span>
          </Link>
        </div>
      </div>

      {/* 3-Part Intelligence Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 1. LEFT NAVIGATION / QUICK FILTERS (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-mono text-text-muted uppercase font-semibold px-2 block mb-1">
              Views
            </span>
            <button
              onClick={() => setFilterRisk('ALL')}
              className={`w-full text-left px-2.5 py-1.5 rounded-md font-medium flex items-center justify-between transition ${
                filterRisk === 'ALL'
                  ? 'bg-surface-subtle text-foreground font-semibold'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <span>All analyses</span>
              <span className="font-mono text-[11px] text-text-muted">{total}</span>
            </button>
            <button
              onClick={() => setFilterRisk('LIKELY_GENUINE')}
              className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                filterRisk === 'LIKELY_GENUINE'
                  ? 'bg-surface-subtle text-foreground font-semibold'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">Verified</span>
              <span className="font-mono text-[11px] text-text-muted">{genuine}</span>
            </button>
            <button
              onClick={() => setFilterRisk('NEEDS_CAUTION')}
              className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                filterRisk === 'NEEDS_CAUTION'
                  ? 'bg-surface-subtle text-foreground font-semibold'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <span className="text-amber-700 dark:text-amber-400 font-medium">Caution</span>
              <span className="font-mono text-[11px] text-text-muted">{caution}</span>
            </button>
            <button
              onClick={() => setFilterRisk('LIKELY_FRAUDULENT')}
              className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                filterRisk === 'LIKELY_FRAUDULENT'
                  ? 'bg-surface-subtle text-foreground font-semibold'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <span className="text-rose-700 dark:text-rose-400 font-medium">High Risk</span>
              <span className="font-mono text-[11px] text-text-muted">{fraud}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-border space-y-1 text-xs">
            <span className="text-[10px] font-mono text-text-muted uppercase font-semibold px-2 block mb-1">
              Shortcuts
            </span>
            <Link
              to="/companies"
              className="px-2.5 py-1.5 rounded-md text-text-secondary hover:text-foreground hover:bg-surface-hover flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-text-muted" />
              <span>Company directory</span>
            </Link>
            <Link
              to="/history"
              className="px-2.5 py-1.5 rounded-md text-text-secondary hover:text-foreground hover:bg-surface-hover flex items-center gap-2"
            >
              <History className="w-3.5 h-3.5 text-text-muted" />
              <span>Full history</span>
            </Link>
            <Link
              to="/saved"
              className="px-2.5 py-1.5 rounded-md text-text-secondary hover:text-foreground hover:bg-surface-hover flex items-center gap-2"
            >
              <Bookmark className="w-3.5 h-3.5 text-text-muted" />
              <span>Saved records</span>
            </Link>
            <Link
              to="/profile"
              className="px-2.5 py-1.5 rounded-md text-text-secondary hover:text-foreground hover:bg-surface-hover flex items-center gap-2"
            >
              <Settings className="w-3.5 h-3.5 text-text-muted" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* 2. MAIN AREA: DATA TABLE (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title or company..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
            />
          </div>

          {/* Table Container */}
          <div className="rounded-lg bg-surface border border-border overflow-hidden shadow-sm">
            {loading ? (
              <div className="py-16 text-center text-xs text-text-muted font-mono">
                Loading verification records...
              </div>
            ) : filteredAnalyses.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-2">
                <p className="text-xs text-text-muted">No matching verification records found.</p>
                <Link
                  to="/analyze"
                  className="inline-block px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium"
                >
                  Analyze a posting
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredAnalyses.map((item) => {
                  const targetId = item.id || (item as any)._id;
                  const isSelected = selectedAnalysis && (selectedAnalysis.id || (selectedAnalysis as any)._id) === targetId;
                  const isGen = item.classification === 'LIKELY_GENUINE';
                  const isCaut = item.classification === 'NEEDS_CAUTION';
                  const trustScore = 100 - item.riskScore;

                  const pill = isGen ? 'status-pill-safe' : isCaut ? 'status-pill-caution' : 'status-pill-danger';

                  return (
                    <div
                      key={targetId}
                      onClick={() => setSelectedAnalysis(item)}
                      className={`p-3.5 cursor-pointer transition-colors text-xs flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-surface-subtle'
                          : 'hover:bg-surface-hover/60'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${pill}`}>
                            {isGen ? 'VERIFIED' : isCaut ? 'CAUTION' : 'HIGH RISK'}
                          </span>
                          <span className="text-[11px] font-mono text-text-muted">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground truncate">
                          {item.jobPost?.title || 'Job Post'}
                        </h4>
                        <p className="text-[11px] text-text-secondary truncate font-mono">
                          {item.jobPost?.companyName || 'Unspecified'}
                        </p>
                      </div>

                      <div className="text-right font-mono shrink-0">
                        <span className="text-[10px] text-text-muted block uppercase">Score</span>
                        <span className="text-sm font-bold text-foreground">{trustScore}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 3. RIGHT CONTEXTUAL INSPECTION PANEL (4 cols) */}
        <div className="lg:col-span-4">
          {selectedAnalysis ? (
            <div className="p-5 rounded-lg bg-surface border border-border space-y-5 sticky top-20 shadow-sm text-xs">
              
              {/* Header */}
              <div className="border-b border-border pb-3 flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-text-muted uppercase">Selected Job</span>
                  <h3 className="text-sm font-bold text-foreground">
                    {selectedAnalysis.jobPost?.title || 'Job Analysis'}
                  </h3>
                  <p className="text-xs text-text-secondary font-mono">
                    {selectedAnalysis.jobPost?.companyName}
                  </p>
                </div>

                <Link
                  to={`/results/${selectedAnalysis.id || (selectedAnalysis as any)._id}`}
                  className="px-2.5 py-1 rounded bg-foreground text-background text-xs font-medium hover:opacity-90 transition shrink-0"
                >
                  Full Dossier
                </Link>
              </div>

              {/* Trust Score summary */}
              <div className="flex items-center justify-between p-3 rounded-md bg-surface-subtle border border-border">
                <div>
                  <span className="text-[10px] font-mono uppercase text-text-muted block">Trust Score</span>
                  <span className="text-2xl font-black font-mono text-foreground">
                    {100 - selectedAnalysis.riskScore}
                    <span className="text-xs text-text-muted font-normal"> / 100</span>
                  </span>
                </div>
                <div
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    selectedAnalysis.classification === 'LIKELY_GENUINE'
                      ? 'status-pill-safe'
                      : selectedAnalysis.classification === 'NEEDS_CAUTION'
                      ? 'status-pill-caution'
                      : 'status-pill-danger'
                  }`}
                >
                  {selectedAnalysis.classification.replace(/_/g, ' ')}
                </div>
              </div>

              {/* Job Metadata */}
              <div className="space-y-1.5 font-mono text-[11px]">
                {selectedAnalysis.jobPost?.salary && (
                  <div className="flex justify-between text-text-secondary">
                    <span>Salary:</span>
                    <span className="text-foreground font-semibold">{selectedAnalysis.jobPost.salary}</span>
                  </div>
                )}
                {selectedAnalysis.jobPost?.location && (
                  <div className="flex justify-between text-text-secondary">
                    <span>Location:</span>
                    <span className="text-foreground">{selectedAnalysis.jobPost.location}</span>
                  </div>
                )}
                {selectedAnalysis.jobPost?.contactEmail && (
                  <div className="flex justify-between text-text-secondary">
                    <span>Email:</span>
                    <span className="text-foreground truncate max-w-[150px]">{selectedAnalysis.jobPost.contactEmail}</span>
                  </div>
                )}
              </div>

              {/* Summary Snippet */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-text-muted font-semibold block">
                  Assessment Summary
                </span>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {selectedAnalysis.summary}
                </p>
              </div>

              {/* Signals */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase text-text-muted font-semibold block">
                  Signals Detected ({selectedAnalysis.indicators?.length || 0})
                </span>
                {selectedAnalysis.indicators && selectedAnalysis.indicators.length > 0 ? (
                  <div className="space-y-1">
                    {selectedAnalysis.indicators.map((ind, i) => (
                      <div key={i} className="p-2 rounded bg-surface-subtle border border-border text-[11px] space-y-0.5">
                        <div className="flex justify-between font-mono">
                          <span className="font-semibold text-foreground truncate">{ind.title}</span>
                          <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0 ml-1">[{ind.severity}]</span>
                        </div>
                        {ind.evidence && (
                          <p className="text-text-muted text-[10px] truncate font-mono">
                            "{ind.evidence}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
                    ✓ No threat indicators found.
                  </p>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-lg bg-surface border border-border text-center text-xs text-text-muted">
              Select an analysis to inspect details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
