import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import {
  History,
  Search,
  Trash2,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles,
  ArrowUpDown,
  FileText,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT'>('ALL');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      const res = await analysisService.getAnalyses({ limit: 50 });
      if (res.success) {
        setAnalyses(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await analysisService.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => (a.id || (a as any)._id) !== id));
      setDeleteConfirmId(null);
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D121D] border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Verification Audit Log</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100">
            Analysis History
          </h1>
          <p className="text-xs text-slate-400">
            Historical log of all job posts, recruiter messages, and fraud analyses evaluated on your account.
          </p>
        </div>

        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans shrink-0"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>New Forensic Scan</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0D121D] border border-slate-800 text-xs">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title or company name..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px] overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded-md transition ${
              filter === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({analyses.length})
          </button>
          <button
            onClick={() => setFilter('LIKELY_GENUINE')}
            className={`px-2.5 py-1 rounded-md transition ${
              filter === 'LIKELY_GENUINE'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilter('NEEDS_CAUTION')}
            className={`px-2.5 py-1 rounded-md transition ${
              filter === 'NEEDS_CAUTION'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            Caution
          </button>
          <button
            onClick={() => setFilter('LIKELY_FRAUDULENT')}
            className={`px-2.5 py-1 rounded-md transition ${
              filter === 'LIKELY_FRAUDULENT'
                ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                : 'text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            High Risk
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-[#0D121D] border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center space-y-2 font-mono">
            <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading audit history...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2 font-sans">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-200 font-mono">No History Matches</h3>
            <p className="text-xs text-slate-400">
              No historical verification records correspond with your filter settings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080B11] border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3">Audited Job & Entity</th>
                  <th className="px-4 py-3">Classification</th>
                  <th className="px-4 py-3 text-right">Trust Score</th>
                  <th className="px-4 py-3">Scanned Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((item) => {
                  const targetId = item.id || (item as any)._id;
                  const isGen = item.classification === 'LIKELY_GENUINE';
                  const isCaut = item.classification === 'NEEDS_CAUTION';
                  const isFr = item.classification === 'LIKELY_FRAUDULENT';
                  const trustScore = 100 - item.riskScore;

                  return (
                    <tr key={targetId} className="hover:bg-[#111726]/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <Link
                          to={`/results/${targetId}`}
                          className="font-bold text-slate-100 hover:text-sky-400 block transition truncate max-w-xs sm:max-w-md"
                        >
                          {item.jobPost?.title || 'Audited Job Listing'}
                        </Link>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          {item.jobPost?.companyName || 'Unspecified Entity'}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            isGen
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                              : isCaut
                              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                              : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                          }`}
                        >
                          {isGen ? 'VERIFIED' : isCaut ? 'CAUTION' : 'HIGH RISK'}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right font-mono whitespace-nowrap">
                        <span
                          className={`font-black text-sm ${
                            isGen ? 'text-emerald-400' : isCaut ? 'text-amber-400' : 'text-rose-400'
                          }`}
                        >
                          {trustScore}
                        </span>
                        <span className="text-[10px] text-slate-600">/100</span>
                      </td>

                      <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/results/${targetId}`}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition"
                          >
                            Dossier
                          </Link>

                          {deleteConfirmId === targetId ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(targetId)}
                                className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-mono font-bold"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(targetId)}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
