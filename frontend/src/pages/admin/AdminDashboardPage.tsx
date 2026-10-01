import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { AdminStats, AdminCharts } from '../../types/admin';
import { RiskBarChart } from '../../components/charts/RiskBarChart';
import { IndicatorFrequencyChart } from '../../components/charts/IndicatorFrequencyChart';
import { AnalysisTrendLine } from '../../components/charts/AnalysisTrendLine';
import { PredictionDonut } from '../../components/charts/PredictionDonut';
import { Users, Cpu, FileText } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [charts, setCharts] = useState<AdminCharts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Admin Console & Analytics
          </h1>
          <p className="text-xs text-text-secondary">
            System performance, heuristic trigger frequencies, and platform scan volume.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/model"
            className="px-3 py-1.5 rounded-md bg-surface border border-border text-foreground hover:bg-surface-hover text-xs font-medium transition flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-text-muted" />
            <span>Model Health</span>
          </Link>
          <Link
            to="/admin/users"
            className="px-3 py-1.5 rounded-md bg-surface border border-border text-foreground hover:bg-surface-hover text-xs font-medium transition flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-text-muted" />
            <span>Users</span>
          </Link>
          <Link
            to="/admin/job-posts"
            className="px-3 py-1.5 rounded-md bg-surface border border-border text-foreground hover:bg-surface-hover text-xs font-medium transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-text-muted" />
            <span>Job Registry</span>
          </Link>
        </div>
      </div>

      {/* Stats Line */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-text-muted">Total Analyses</span>
          <p className="text-2xl font-black font-mono text-foreground">{stats?.totalAnalyses || 0}</p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400">Verified Genuine</span>
          <p className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">{stats?.genuineCount || 0}</p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-400">Needs Caution</span>
          <p className="text-2xl font-black font-mono text-amber-700 dark:text-amber-400">{stats?.cautionCount || 0}</p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-border space-y-1">
          <span className="text-[10px] font-mono uppercase text-rose-700 dark:text-rose-400">High-Risk Fraud</span>
          <p className="text-2xl font-black font-mono text-rose-700 dark:text-rose-400">{stats?.fraudCount || 0}</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Trend Line */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Weekly Analysis Volume
            </h3>
            <span className="text-[10px] font-mono text-text-muted">Total vs Fraudulent</span>
          </div>
          {charts?.trends ? (
            <AnalysisTrendLine data={charts.trends} />
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-text-muted font-mono">
              Loading trends...
            </div>
          )}
        </div>

        {/* Top Indicators */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Most Triggered Scam Indicators
            </h3>
            <span className="text-[10px] font-mono text-text-muted">Frequency Rank</span>
          </div>
          {charts?.topIndicators ? (
            <IndicatorFrequencyChart data={charts.topIndicators} />
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-text-muted font-mono">
              Loading frequency data...
            </div>
          )}
        </div>

        {/* Risk Distribution */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Risk Score Distribution
            </h3>
            <span className="text-[10px] font-mono text-text-muted">0 - 100 Spectrum</span>
          </div>
          {charts?.riskRanges ? (
            <RiskBarChart data={charts.riskRanges} />
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-text-muted font-mono">
              Loading distribution...
            </div>
          )}
        </div>

        {/* Donut Ratio */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Threat Classification Share
            </h3>
            <span className="text-[10px] font-mono text-text-muted">Proportion</span>
          </div>
          {charts?.distribution ? (
            <PredictionDonut data={charts.distribution} />
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-text-muted font-mono">
              Loading share data...
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
