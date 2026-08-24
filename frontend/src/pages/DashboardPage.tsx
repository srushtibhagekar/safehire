import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import { PredictionDonut } from '../components/charts/PredictionDonut';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileText,
  History,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await analysisService.getAnalyses({ limit: 6 });
        if (res.success) {
          setAnalyses(res.data || []);
        }
      } catch (err) {
        console.error('Failed to load analyses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const total = analyses.length;
  const genuine = analyses.filter((a) => a.classification === 'LIKELY_GENUINE').length;
  const caution = analyses.filter((a) => a.classification === 'NEEDS_CAUTION').length;
  const fraud = analyses.filter((a) => a.classification === 'LIKELY_FRAUDULENT').length;

  const chartData = [
    { name: 'Likely Genuine', value: genuine, color: '#10B981' },
    { name: 'Needs Caution', value: caution, color: '#F59E0B' },
    { name: 'Likely Fraudulent', value: fraud, color: '#EF4444' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Welcome Header & Quick Action */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Candidate Protection Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Welcome back, {user?.name || 'Job Seeker'}!
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Inspect job listings before submitting personal information. SafeHire AI analyzes linguistic patterns, fee demands, and recruiter authenticity in seconds.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze New Job</span>
        </Link>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Analyses</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-slate-100">{total}</p>
          <span className="text-[11px] text-slate-500">Scans recorded</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold">Likely Genuine</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-emerald-400">{genuine}</p>
          <span className="text-[11px] text-slate-500">Safe to apply</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-semibold">Needs Caution</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-amber-400">{caution}</p>
          <span className="text-[11px] text-slate-500">Verification needed</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-red-500/20 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-red-400 font-semibold">Likely Fraudulent</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-3xl font-black text-red-400">{fraud}</p>
          <span className="text-[11px] text-slate-500">Scams averted</span>
        </div>
      </div>

      {/* 3. Main Dashboard Layout (Recent Scans + Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Analyses List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Recent Scans
            </h3>
            <Link to="/history" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
              View All History <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500">Loading recent scan records...</div>
          ) : analyses.length === 0 ? (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No Job Analyses Yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Paste a job posting into the analyzer to assess risk and detect fraud indicators.
              </p>
              <Link
                to="/analyze"
                className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs mt-2"
              >
                Scan First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {analyses.map((item) => {
                const job: any = item.jobPostId || item.jobPost;
                const isScam = item.classification === 'LIKELY_FRAUDULENT';
                const isCaution = item.classification === 'NEEDS_CAUTION';

                return (
                  <Link
                    key={item._id || item.id}
                    to={`/results/${item._id || item.id}`}
                    className="block p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition group shadow-md"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition truncate">
                            {job?.title || 'Job Analysis'}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {job?.companyName || 'Unknown Employer'} • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Risk Badge */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span
                            className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                              isScam
                                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                : isCaution
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            Score: {item.riskScore}/100
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Breakdown Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Risk Distribution
          </h3>
          <p className="text-xs text-slate-400">Proportion of scanned postings across categories</p>
          <PredictionDonut data={chartData} />
        </div>

      </div>

    </div>
  );
};
