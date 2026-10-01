import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { SavedAnalysisItem } from '../types/analysis';
import {
  Bookmark,
  Search,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  FileText,
} from 'lucide-react';

export const SavedPage: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedAnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchSaved = async () => {
    try {
      const res = await analysisService.getSavedAnalyses();
      if (res.success) {
        setSavedItems(res.data || []);
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
      setSavedItems((prev) => prev.filter((item) => (item.analysis.id || (item.analysis as any)._id) !== analysisId));
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D121D] border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            <span>Bookmarked Security Dossiers</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100">
            Saved Job Verifications
          </h1>
          <p className="text-xs text-slate-400">
            Quickly reference saved reports, risk assessments, and employer threat analyses.
          </p>
        </div>

        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans shrink-0"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Audit New Job</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter saved analyses by job title or company..."
          className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#0D121D] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Saved Records List */}
      <div className="rounded-2xl bg-[#0D121D] border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center space-y-2 font-mono">
            <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading saved dossiers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2 font-sans">
            <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-200 font-mono">No Saved Dossiers</h3>
            <p className="text-xs text-slate-400">
              You haven't saved any analysis reports yet. Click the bookmark icon on any result page to save it here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/70">
            {filtered.map((item) => {
              const a = item.analysis;
              const targetId = a.id || (a as any)._id;
              const isGen = a.classification === 'LIKELY_GENUINE';
              const isCaut = a.classification === 'NEEDS_CAUTION';
              const isFr = a.classification === 'LIKELY_FRAUDULENT';
              const trustScore = 100 - a.riskScore;

              return (
                <div
                  key={targetId}
                  className="p-4 hover:bg-[#111726]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
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
                      <span className="text-[11px] font-mono text-slate-500">
                        Saved on {new Date(item.savedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 truncate">
                      {a.jobPost?.title || 'Saved Job Position'}
                    </h4>

                    <p className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <span>{a.jobPost?.companyName || 'Unspecified'}</span>
                      {a.jobPost?.salary && <span>• {a.jobPost.salary}</span>}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right font-mono">
                      <div className="text-[10px] text-slate-500 uppercase">Trust Score</div>
                      <div
                        className={`text-base font-black ${
                          isGen ? 'text-emerald-400' : isCaut ? 'text-amber-400' : 'text-rose-400'
                        }`}
                      >
                        {trustScore}
                        <span className="text-[10px] text-slate-600 font-normal">/100</span>
                      </div>
                    </div>

                    <Link
                      to={`/results/${targetId}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition"
                    >
                      View Dossier
                    </Link>

                    <button
                      onClick={() => handleUnsave(targetId)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
