import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { SavedAnalysisItem } from '../types/analysis';
import {
  Bookmark,
  Building,
  Calendar,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

export const SavedPage: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedAnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await analysisService.getSavedAnalyses();
      if (res.success) {
        setSavedItems(res.data || []);
      }
    } catch (err) {
      console.error('Saved items fetch error:', err);
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
      setSavedItems((prev) => prev.filter((it) => (it.analysis?._id || it.analysis?.id) !== analysisId));
    } catch (err) {
      console.error('Unsave error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
          <Bookmark className="w-6 h-6 text-amber-400" />
          Saved Job Analyses
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Quickly access bookmarked reports and risk evaluations for your job applications.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading saved items...</div>
      ) : savedItems.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No Saved Analyses</p>
          <p className="text-xs text-slate-500">
            Bookmark analysis results from the Results page to view them here later.
          </p>
          <Link
            to="/analyze"
            className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs mt-2"
          >
            Analyze a Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedItems.map((item) => {
            const analysis = item.analysis;
            if (!analysis) return null;
            const job: any = analysis.jobPostId || analysis.jobPost || {};
            const targetId = analysis._id || analysis.id!;
            const isScam = analysis.riskScore >= 60;
            const isCaution = analysis.riskScore >= 30 && analysis.riskScore < 60;

            return (
              <div
                key={item.savedId}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        isScam
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : isCaution
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      Risk Score: {analysis.riskScore}/100
                    </span>

                    <button
                      onClick={() => handleUnsave(targetId)}
                      title="Remove Bookmark"
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 line-clamp-1">
                    {job.title || 'Evaluated Job Submission'}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      {job.companyName || 'Unknown Employer'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Confidence: {analysis.confidence}%
                  </span>
                  <Link
                    to={`/results/${targetId}`}
                    className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Full Analysis</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
