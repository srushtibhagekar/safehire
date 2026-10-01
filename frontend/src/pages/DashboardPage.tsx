import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Search,
  Filter,
  Activity,
  Terminal,
  ChevronRight,
  Eye,
  Trash2,
  Building2,
  Calendar,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<'ALL' | 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await analysisService.getAnalyses({ limit: 20 });
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
    { name: 'Likely Genuine', value: genuine || 1, color: '#10B981' },
    { name: 'Needs Caution', value: caution, color: '#F59E0B' },
    { name: 'Likely Fraudulent', value: fraud, color: '#F43F5E' },
  ];

  // Filtering
  const filteredAnalyses = analyses.filter((item) => {
    const titleMatch = (item.jobPost?.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const companyMatch = (item.jobPost?.companyName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const riskMatch = filterRisk === 'ALL' || item.classification === filterRisk;
    return (titleMatch || companyMatch) && riskMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Top Intelligence Workspace Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D121D] border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Threat Intelligence Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100">
            Welcome, {user?.name || 'Security Analyst'}
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Live telemetry of audited job opportunities, linguistic anomaly distributions, and fraud signal investigations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/analyze"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Audit New Listing</span>
          </Link>
        </div>
      </div>

      {/* Main Workspace Layout (Center: Feed/Table, Right: Contextual Telemetry) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CENTER (8 cols): Interactive Verification Workspace */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0D121D] border border-slate-800/90 text-xs">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, company, or keyword..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Risk Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 font-mono text-[11px]">
              <button
                onClick={() => setFilterRisk('ALL')}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterRisk === 'ALL'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({total})
              </button>
              <button
                onClick={() => setFilterRisk('LIKELY_GENUINE')}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterRisk === 'LIKELY_GENUINE'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                Verified ({genuine})
              </button>
              <button
                onClick={() => setFilterRisk('NEEDS_CAUTION')}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterRisk === 'NEEDS_CAUTION'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-amber-400 hover:bg-amber-500/10'
                }`}
              >
                Caution ({caution})
              </button>
              <button
                onClick={() => setFilterRisk('LIKELY_FRAUDULENT')}
                className={`px-2.5 py-1 rounded-md transition ${
                  filterRisk === 'LIKELY_FRAUDULENT'
                    ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                    : 'text-rose-400 hover:bg-rose-500/10'
                }`}
              >
                High Risk ({fraud})
              </button>
            </div>
          </div>

          {/* Interactive Stream / Records */}
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Audited Opportunities & Forensic Records</span>
              <span>Showing {filteredAnalyses.length} of {total} records</span>
            </div>

            {loading ? (
              <div className="py-16 text-center space-y-2 font-mono">
                <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-400">Loading audit feed...</p>
              </div>
            ) : filteredAnalyses.length === 0 ? (
              <div className="py-16 px-4 text-center space-y-3 font-sans">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-200 font-mono">No Audit Records Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {searchQuery
                      ? 'No analyses match your search query. Try searching for a different company or keyword.'
                      : 'You have not scanned any job listings yet. Run your first forensic scan to detect potential scams.'}
                  </p>
                </div>
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 text-xs font-bold font-sans"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run First Analysis</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/70">
                {filteredAnalyses.map((item) => {
                  const targetId = item.id || (item as any)._id;
                  const isExpanded = expandedId === targetId;
                  const isGen = item.classification === 'LIKELY_GENUINE';
                  const isCaut = item.classification === 'NEEDS_CAUTION';
                  const isFr = item.classification === 'LIKELY_FRAUDULENT';
                  const trustScore = 100 - item.riskScore;

                  return (
                    <div
                      key={targetId}
                      className="p-4 hover:bg-[#111726]/60 transition-colors group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-sky-300 transition">
                            {item.jobPost?.title || 'Audited Job Post'}
                          </h4>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1 font-medium text-slate-300">
                              <Building2 className="w-3.5 h-3.5 text-slate-500" />
                              {item.jobPost?.companyName || 'Unspecified'}
                            </span>
                            {item.jobPost?.salary && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-sky-400">{item.jobPost.salary}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Trust Score & View Button */}
                        <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0">
                          <div className="text-right font-mono">
                            <div className="text-xs text-slate-500 uppercase">Trust Score</div>
                            <div
                              className={`text-base font-extrabold ${
                                isGen ? 'text-emerald-400' : isCaut ? 'text-amber-400' : 'text-rose-400'
                              }`}
                            >
                              {trustScore}
                              <span className="text-[11px] text-slate-600 font-normal">/100</span>
                            </div>
                          </div>

                          <Link
                            to={`/results/${targetId}`}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 transition"
                            title="Inspect Full Dossier"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Brief Forensic Summary Snippet */}
                      {item.summary && (
                        <p className="text-[11px] text-slate-400 mt-2 line-clamp-1 font-sans">
                          {item.summary}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT (4 cols): Contextual Telemetry & Threat Vectors */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Classification Distribution Instrument */}
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider border-b border-slate-800/80 pb-2 flex items-center justify-between">
              <span>Risk Distribution</span>
              <span className="text-[10px] text-slate-500">n = {total}</span>
            </h3>

            <PredictionDonut data={chartData} />

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
              <div className="p-2 rounded-lg bg-[#080B11]">
                <span className="text-[10px] text-emerald-400 block">Verified</span>
                <strong className="text-sm text-slate-100">{genuine}</strong>
              </div>
              <div className="p-2 rounded-lg bg-[#080B11]">
                <span className="text-[10px] text-amber-400 block">Caution</span>
                <strong className="text-sm text-slate-100">{caution}</strong>
              </div>
              <div className="p-2 rounded-lg bg-[#080B11]">
                <span className="text-[10px] text-rose-400 block">High Risk</span>
                <strong className="text-sm text-slate-100">{fraud}</strong>
              </div>
            </div>
          </div>

          {/* Active Threat Intelligence Advisory */}
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-5 space-y-3 font-sans">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Active Fraud Alert
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 space-y-1">
              <p className="font-semibold">Advance Check Scam Surges</p>
              <p className="text-[11px] text-rose-400 leading-snug">
                Job postings offering $70-$90/hr for data entry requiring purchase of Apple kits via check are currently the #1 reported scam vector this quarter.
              </p>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-5 space-y-3 text-xs">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
              Investigation Shortcuts
            </h4>
            <div className="space-y-1.5">
              <Link
                to="/history"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#080B11] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-sky-400" />
                  <span>Full Verification History</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                to="/saved"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#080B11] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Saved Security Dossiers</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>

              <Link
                to="/companies"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#080B11] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Company Trust Directory</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
