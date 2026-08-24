import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Bookmark,
  Calendar,
  Building,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classification, setClassification] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await analysisService.getAnalyses({
        page,
        limit: 10,
        classification: classification !== 'ALL' ? classification : undefined,
        search: search.trim() || undefined,
      });
      if (res.success) {
        setAnalyses(res.data || []);
        setTotalPages(res.meta.totalPages || 1);
      }
    } catch (err) {
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, classification]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchHistory();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this analysis record?')) return;
    try {
      await analysisService.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => (a._id || a.id) !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSave = async (id: string) => {
    try {
      await analysisService.saveAnalysis(id);
      alert('Analysis result saved to bookmarks.');
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <History className="w-6 h-6 text-cyan-400" />
            Analysis History
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review and manage all previous job advertisements inspected by SafeHire.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 self-start sm:self-auto transition"
        >
          + Analyze New Job
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={classification}
            onChange={(e) => {
              setClassification(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
          >
            <option value="ALL">All Classifications</option>
            <option value="LIKELY_GENUINE">Likely Genuine (0-29)</option>
            <option value="NEEDS_CAUTION">Needs Caution (30-59)</option>
            <option value="LIKELY_FRAUDULENT">Likely Fraudulent (60-100)</option>
          </select>
        </div>
      </div>

      {/* Analyses Table / Card List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading scan history...</div>
      ) : analyses.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <History className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No Job Scans Found</p>
          <p className="text-xs text-slate-500">
            No matching job scans were found for your current search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((item) => {
            const job: any = item.jobPostId || item.jobPost;
            const targetId = item._id || item.id!;
            const isScam = item.classification === 'LIKELY_FRAUDULENT';
            const isCaution = item.classification === 'NEEDS_CAUTION';

            return (
              <div
                key={targetId}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        isScam
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : isCaution
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      Risk: {item.riskScore}/100
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 truncate">
                      {job?.title || 'Evaluated Job Submission'}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      {job?.companyName || 'Unknown Employer'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Confidence: {item.confidence}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleSave(targetId)}
                    title="Bookmark Analysis"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(targetId)}
                    title="Delete Record"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    to={`/results/${targetId}`}
                    className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span>View Result</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-slate-400">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};
