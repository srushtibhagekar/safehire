import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { SavedAnalysisItem } from '../types/analysis';
import { Search, Trash2, Bookmark, Plus } from 'lucide-react';

export const SavedPage: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedAnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchSaved = async () => {
    try {
      const res = await analysisService.getSavedAnalyses();
      if (res.success && res.data) {
        setSavedItems(res.data);
      }
    } catch (err) {
      console.error('Failed to load saved items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleUnsave = async (analysisId: string) => {
    try {
      await analysisService.unsaveAnalysis(analysisId);
      setSavedItems((prev) =>
        prev.filter((item) => (item.analysis.id || (item.analysis as any)._id) !== analysisId)
      );
    } catch (err) {
      console.error('Unsave failed:', err);
    }
  };

  const filtered = savedItems.filter((item) => {
    const titleMatch = (item.analysis.jobPost?.title || '').toLowerCase().includes(search.toLowerCase());
    const compMatch = (item.analysis.jobPost?.companyName || '').toLowerCase().includes(search.toLowerCase());
    return titleMatch || compMatch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Saved Analyses
          </h1>
          <p className="text-xs text-text-secondary">
            Bookmarked job verification reports and evidence dossiers.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-3.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Analyze a posting</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter saved analyses by job title or company..."
          className="w-full pl-8 pr-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
        />
      </div>

      {/* List */}
      <div className="rounded-lg bg-surface border border-border divide-y divide-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-xs text-text-muted font-mono">
            Loading saved records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted space-y-1">
            <p>No saved analyses found.</p>
            <p className="text-[11px]">Click the bookmark icon on any result page to save it here.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const a = item.analysis;
            const targetId = a.id || (a as any)._id;
            const isGen = a.classification === 'LIKELY_GENUINE';
            const isCaut = a.classification === 'NEEDS_CAUTION';
            const trustScore = 100 - a.riskScore;

            const pill = isGen ? 'status-pill-safe' : isCaut ? 'status-pill-caution' : 'status-pill-danger';

            return (
              <div
                key={targetId}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-surface-hover/50 transition-colors"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${pill}`}>
                      {a.classification.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      Saved {new Date(item.savedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-semibold text-foreground truncate">
                    {a.jobPost?.title || 'Job Position'}
                  </h4>

                  <p className="text-[11px] font-mono text-text-secondary">
                    {a.jobPost?.companyName || 'Unspecified'} {a.jobPost?.salary ? `• ${a.jobPost.salary}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-text-muted uppercase block">Score</span>
                    <span className="text-sm font-bold text-foreground">{trustScore}/100</span>
                  </div>

                  <Link
                    to={`/results/${targetId}`}
                    className="px-3 py-1.5 rounded-md bg-surface-subtle hover:bg-surface-hover text-foreground font-mono text-[11px] font-medium"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleUnsave(targetId)}
                    className="p-1 text-text-muted hover:text-rose-600 transition"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
