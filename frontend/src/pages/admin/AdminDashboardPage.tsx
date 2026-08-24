import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { AdminStats, AdminCharts } from '../../types/admin';
import { PredictionDonut } from '../../components/charts/PredictionDonut';
import { RiskBarChart } from '../../components/charts/RiskBarChart';
import { AnalysisTrendLine } from '../../components/charts/AnalysisTrendLine';
import { IndicatorFrequencyChart } from '../../components/charts/IndicatorFrequencyChart';
import {
  ShieldAlert,
  Users,
  FileText,
  TrendingUp,
  Cpu,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [charts, setCharts] = useState<AdminCharts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await adminService.getStats();
        if (res.success) {
          setStats(res.stats);
          setCharts(res.charts);
        }
      } catch (err) {
        console.error('Admin stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Loading system security analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" /> Security Administration Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            System Operations & Fraud Trends
          </h1>
          <p className="text-xs text-slate-400">
            Real-time telemetry, model metrics, user management, and aggregate recruitment scam indicators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/users"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/model"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition"
          >
            Model Performance
          </Link>
        </div>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 shadow-lg">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Users</span>
          <p className="text-2xl font-black text-slate-100">{stats?.totalUsers || 0}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 shadow-lg">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Analyses</span>
          <p className="text-2xl font-black text-cyan-400">{stats?.totalAnalyses || 0}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-1 shadow-lg">
          <span className="text-[11px] text-emerald-400 font-semibold block">Genuine</span>
          <p className="text-2xl font-black text-emerald-400">{stats?.genuineCount || 0}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-1 shadow-lg">
          <span className="text-[11px] text-amber-400 font-semibold block">Needs Caution</span>
          <p className="text-2xl font-black text-amber-400">{stats?.cautionCount || 0}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-red-500/20 space-y-1 shadow-lg">
          <span className="text-[11px] text-red-400 font-semibold block">Fraudulent</span>
          <p className="text-2xl font-black text-red-400">{stats?.fraudCount || 0}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1 shadow-lg">
          <span className="text-[11px] text-purple-400 font-semibold block">Avg Risk Score</span>
          <p className="text-2xl font-black text-purple-300">{stats?.averageRiskScore || 0}/100</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Prediction Distribution Donut */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Prediction Distribution
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Live Database Ratio</span>
          </div>
          <p className="text-xs text-slate-400">Classified proportion of all processed job advertisements</p>
          <PredictionDonut data={charts?.distribution || []} />
        </div>

        {/* Risk Score Ranges Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Risk Score Distribution Histogram
            </h3>
            <span className="text-[10px] font-mono text-slate-500">0–100 Scale Bands</span>
          </div>
          <p className="text-xs text-slate-400">Frequency of postings clustered by calibrated risk severity</p>
          <RiskBarChart data={charts?.riskRanges || []} />
        </div>

        {/* Scan Volume Trend Line */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              Analysis Activity Trends
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Recent 7-Day Velocity</span>
          </div>
          <p className="text-xs text-slate-400">Inspection volume and detected scams over time</p>
          <AnalysisTrendLine data={charts?.trends || []} />
        </div>

        {/* Top Triggered Fraud Indicators */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Top Triggered Fraud Indicators
            </h3>
            <span className="text-[10px] font-mono text-slate-500">NLP & Heuristic Aggregates</span>
          </div>
          <p className="text-xs text-slate-400">Most frequent scam signals detected across postings</p>
          <IndicatorFrequencyChart data={charts?.topIndicators || []} />
        </div>

      </div>

      {/* Quick Admin Navigation Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/users"
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs text-slate-300 hover:text-white transition"
        >
          <span className="flex items-center gap-2 font-semibold">
            <Users className="w-4 h-4 text-cyan-400" /> User Directory
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
        </Link>

        <Link
          to="/admin/job-posts"
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs text-slate-300 hover:text-white transition"
        >
          <span className="flex items-center gap-2 font-semibold">
            <FileText className="w-4 h-4 text-blue-400" /> Global Job Audit Log
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
        </Link>

        <Link
          to="/admin/model"
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs text-slate-300 hover:text-white transition"
        >
          <span className="flex items-center gap-2 font-semibold">
            <Cpu className="w-4 h-4 text-purple-400" /> ML Benchmark & Retraining
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
        </Link>
      </div>

    </div>
  );
};
