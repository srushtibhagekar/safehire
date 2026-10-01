import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import { Search, Trash2, ArrowLeft, Plus } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT'>('ALL');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await analysisService.getAnalyses({ limit: 50 });
        if (res.success && res.data) {
          setAnalyses(res.data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await analysisService.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => (a.id || (a as any)._id) !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filtered = analyses.filter((item) => {
    const titleMatch = (item.jobPost?.title || '').toLowerCase().includes(search.toLowerCase());
    const compMatch = (item.jobPost?.companyName || '').toLowerCase().includes(search.toLowerCase());
    const filterMatch = filter === 'ALL' || item.classification === filter;
    return (titleMatch || compMatch) && filterMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Verification History
          </h1>
          <p className="text-xs text-text-secondary">
            All previously analyzed job postings and risk evaluations on your account.
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

      {/* Filter / Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px]">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded transition ${
              filter === 'ALL' ? 'bg-surface-subtle text-foreground font-bold' : 'text-text-muted hover:text-foreground'
            }`}
          >
            All ({analyses.length})
          </button>
          <button
            onClick={() => setFilter('LIKELY_GENUINE')}
            className={`px-2.5 py-1 rounded transition ${
              filter === 'LIKELY_GENUINE' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-text-muted hover:text-foreground'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilter('NEEDS_CAUTION')}
            className={`px-2.5 py-1 rounded transition ${
              filter === 'NEEDS_CAUTION' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold' : 'text-text-muted hover:text-foreground'
            }`}
          >
            Caution
          </button>
          <button
            onClick={() => setFilter('LIKELY_FRAUDULENT')}
            className={`px-2.5 py-1 rounded transition ${
              filter === 'LIKELY_FRAUDULENT' ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold' : 'text-text-muted hover:text-foreground'
            }`}
          >
            High Risk
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-lg bg-surface border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-xs text-text-muted font-mono">
            Loading history records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-muted">
            No verification records found.
          </div>
        ) : (
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-surface-subtle border-b border-border font-mono text-[11px] text-text-muted uppercase">
              <tr>
                <th className="px-4 py-2.5">Job Title & Company</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-right">Trust Score</th>
                <th className="px-3 py-2.5">Analyzed Date</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => {
                const targetId = item.id || (item as any)._id;
                const isGen = item.classification === 'LIKELY_GENUINE';
                const isCaut = item.classification === 'NEEDS_CAUTION';
                const trustScore = 100 - item.riskScore;

                const pill = isGen ? 'status-pill-safe' : isCaut ? 'status-pill-caution' : 'status-pill-danger';

                return (
                  <tr key={targetId} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        to={`/results/${targetId}`}
                        className="font-semibold text-foreground hover:underline block truncate max-w-sm"
                      >
                        {item.jobPost?.title || 'Job Posting'}
                      </Link>
                      <span className="text-[11px] text-text-muted font-mono">
                        {item.jobPost?.companyName || 'Unspecified'}
                      </span>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${pill}`}>
                        {item.classification.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="px-3 py-3 text-right font-mono font-bold text-foreground">
                      {trustScore} / 100
                    </td>

                    <td className="px-3 py-3 font-mono text-[11px] text-text-muted whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/results/${targetId}`}
                          className="px-2.5 py-1 rounded bg-surface-subtle hover:bg-surface-hover text-foreground font-mono text-[11px]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(targetId)}
                          className="p-1 text-text-muted hover:text-rose-600 transition"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};
