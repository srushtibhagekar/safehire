import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { AdminStats, AdminCharts } from '../../types/admin';
import { RiskBarChart } from '../../components/charts/RiskBarChart';
import { IndicatorFrequencyChart } from '../../components/charts/IndicatorFrequencyChart';
import { AnalysisTrendLine } from '../../components/charts/AnalysisTrendLine';
import { PredictionDonut } from '../../components/charts/PredictionDonut';
import {
  ShieldAlert,
  Users,
  FileCheck2,
  AlertTriangle,
  Cpu,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Activity,
  Terminal,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [charts, setCharts] = useState<AdminCharts | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await adminService.getStats();
      if (res.success) {
        setStats(res.stats);
        setCharts(res.charts);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Admin SOC Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D121D] border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Security Operations Center (SOC) Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100">
            System Telemetry & Fraud Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Platform-wide scam detection volume, heuristic trigger frequencies, and model latency metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/model"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition"
          >
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>Model Health & Retraining</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>User Accounts</span>
          </Link>
        </div>
      </div>

      {/* KPI Telemetry Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Scans Audited</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-100 font-mono">
            {stats?.totalAnalyses || 0}
          </p>
          <span className="text-[10px] text-slate-500 font-mono">Across all platform users</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D121D] border border-emerald-500/20 space-y-2">
          <span className="text-[11px] font-mono text-emerald-400 uppercase">Verified Genuine</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {stats?.genuineCount || 0}
          </p>
          <span className="text-[10px] text-slate-500 font-mono">Authentic postings</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D121D] border border-amber-500/20 space-y-2">
          <span className="text-[11px] font-mono text-amber-400 uppercase">Caution Required</span>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
            {stats?.cautionCount || 0}
          </p>
          <span className="text-[10px] text-slate-500 font-mono">Moderate anomalies</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D121D] border border-rose-500/20 space-y-2">
          <span className="text-[11px] font-mono text-rose-400 uppercase">Fraud Detected</span>
          <p className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
            {stats?.fraudCount || 0}
          </p>
          <span className="text-[10px] text-slate-500 font-mono">Scam postings blocked</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Analysis Volume Trends */}
        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
              Weekly Audit Activity Trends
            </h3>
            <span className="text-[10px] font-mono text-sky-400">Total vs Fraudulent</span>
          </div>
          {charts?.trends ? (
            <AnalysisTrendLine data={charts.trends} />
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-slate-500 font-mono">
              Gathering trend telemetry...
            </div>
          )}
        </div>

        {/* Chart 2: Top Scam Signal Triggers */}
        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
              Top Triggered Scam Indicators
            </h3>
            <span className="text-[10px] font-mono text-rose-400">Frequency Ranking</span>
          </div>
          {charts?.topIndicators ? (
            <IndicatorFrequencyChart data={charts.topIndicators} />
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-slate-500 font-mono">
              Gathering indicator frequencies...
            </div>
          )}
        </div>

        {/* Chart 3: Risk Score Distribution */}
        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
              Risk Score Spectrum Breakdown
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Binned 0-100</span>
          </div>
          {charts?.riskRanges ? (
            <RiskBarChart data={charts.riskRanges} />
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-slate-500 font-mono">
              Gathering spectrum ranges...
            </div>
          )}
        </div>

        {/* Chart 4: Classification Ratio */}
        <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
              Overall Threat Classification Donut
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Proportional Share</span>
          </div>
          {charts?.distribution ? (
            <PredictionDonut data={charts.distribution} />
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-slate-500 font-mono">
              Gathering ratio breakdown...
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
