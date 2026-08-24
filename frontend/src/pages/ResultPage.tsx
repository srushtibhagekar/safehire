import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import { RiskGauge } from '../components/analyzer/RiskGauge';
import { IndicatorCard } from '../components/analyzer/IndicatorCard';
import { RecommendationChecklist } from '../components/analyzer/RecommendationChecklist';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Bookmark,
  Printer,
  FileDown,
  Share2,
  Sparkles,
  ArrowLeft,
  Building,
  MapPin,
  DollarSign,
  Globe,
  Mail,
  Check,
} from 'lucide-react';

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      try {
        const res = await analysisService.getAnalysisById(id);
        if (res.success && res.analysis) {
          setAnalysis(res.analysis);
        }
      } catch (err) {
        console.error('Failed to load analysis result:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  const handleSaveToggle = async () => {
    if (!analysis?._id && !analysis?.id) return;
    const targetId = analysis._id || analysis.id!;
    try {
      if (isSaved) {
        await analysisService.unsaveAnalysis(targetId);
        setIsSaved(false);
      } else {
        await analysisService.saveAnalysis(targetId);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Save toggle error:', err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Loading analysis intelligence report...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100">Analysis Record Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested recruitment analysis could not be located in our database.
        </p>
        <Link
          to="/analyze"
          className="inline-block px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
        >
          Run New Analysis
        </Link>
      </div>
    );
  }

  const job = (analysis.jobPostId as any) || analysis.jobPost || {};
  const indicators = analysis.indicators || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 no-print">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Scan Another Job
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToggle}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              isSaved
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved' : 'Save Analysis'}</span>
          </button>

          <Link
            to={`/reports/${analysis.id || (analysis as any)._id}`}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Report</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              SafeHire Assessment Report
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Scanned on {new Date(analysis.createdAt).toLocaleDateString()}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Model: {analysis.modelName} (v{analysis.modelVersion})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {job.title || 'Evaluated Job Position'}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <strong className="text-slate-100">{job.companyName}</strong>
          </span>
          {job.location && (
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> {job.salary}
            </span>
          )}
        </div>
      </div>

      {/* Primary Score & Explanation Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Risk Gauge Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <RiskGauge
            score={analysis.riskScore}
            classification={analysis.classification}
            confidence={analysis.confidence}
            size={240}
          />
        </div>

        {/* Executive Summary & AI Findings */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Executive Risk Synthesis
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {analysis.summary}
            </p>
          </div>

          <RecommendationChecklist
            classification={analysis.classification}
            recommendation={analysis.recommendation}
          />
        </div>

      </div>

      {/* Explainable AI Indicators Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Why SafeHire Flagged This Job
            </h2>
            <p className="text-xs text-slate-400">
              Detailed breakdown of linguistic patterns, communication channels, and fee indicators.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
            {indicators.length} Signal(s) Identified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicators.map((ind, idx) => (
            <IndicatorCard key={ind.id || (ind as any)._id || idx} indicator={ind} />
          ))}
        </div>
      </div>

      {/* Disclaimer Card */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
        <span className="font-semibold text-slate-300">Decision-Support Notice: </span>
        SafeHire provides an automated risk assessment and is not a legal or definitive verification service. A high-risk score does not conclusively prove fraud, and a low-risk score does not guarantee that a job is legitimate.
      </div>

    </div>
  );
};
