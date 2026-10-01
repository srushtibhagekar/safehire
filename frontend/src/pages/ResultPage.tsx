import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Calendar,
  Terminal,
  FileText,
  Activity,
  Copy,
} from 'lucide-react';

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      try {
        const res = await analysisService.getAnalysisById(id);
        if (res.success && res.analysis) {
          setAnalysis(res.analysis);
        }
      } catch (err) {
        console.error('Failed to load analysis dossier:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  const handleSaveToggle = async () => {
    if (!analysis?._id && !analysis?.id) return;
    const targetId = (analysis._id || analysis.id)!;
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3 font-mono">
        <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Loading forensic analysis dossier...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 font-sans">
        <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100 font-mono">Analysis Dossier Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested recruitment verification record does not exist or has expired.
        </p>
        <Link
          to="/analyze"
          className="inline-block px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-bold font-sans"
        >
          Run New Scan
        </Link>
      </div>
    );
  }

  const job = analysis.jobPost;
  const isGenuine = analysis.classification === 'LIKELY_GENUINE';
  const isCaution = analysis.classification === 'NEEDS_CAUTION';
  const isFraud = analysis.classification === 'LIKELY_FRAUDULENT';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Top Action & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/analyze"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Back to scanner"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-semibold bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                Dossier #{analysis.id?.substring(0, 8) || (analysis as any)._id?.substring(0, 8) || 'AUDIT'}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">•</span>
              <span className="text-[11px] font-mono text-slate-400">
                {new Date(analysis.createdAt).toLocaleString()}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-100 mt-1">
              Recruitment Security Audit
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              isSaved
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <Link
            to={`/reports/${analysis.id || (analysis as any)._id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Formal Report</span>
          </Link>
        </div>
      </div>

      {/* Main Investigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Trust Score & Core Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <RiskGauge
            score={analysis.riskScore}
            classification={analysis.classification}
            confidence={analysis.confidence}
            showTrustScore={true}
          />

          {/* Job Target Details Panel */}
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider border-b border-slate-800/80 pb-2">
              Audited Job Posting
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Position</span>
                <p className="font-semibold text-slate-100">{job?.title || 'Unspecified Role'}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Employer</span>
                <p className="font-semibold text-slate-200">{job?.companyName || 'Unspecified'}</p>
              </div>

              {job?.salary && (
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Offered Salary</span>
                  <p className="font-mono text-sky-400 font-medium">{job.salary}</p>
                </div>
              )}

              {job?.location && (
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Location</span>
                  <p className="text-slate-300">{job.location}</p>
                </div>
              )}

              {job?.companyWebsite && (
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Corporate Website</span>
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 hover:underline text-xs truncate block font-mono"
                  >
                    {job.companyWebsite}
                  </a>
                </div>
              )}

              {job?.contactEmail && (
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Hiring Contact</span>
                  <p className="font-mono text-slate-300">{job.contactEmail}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Executive Summary, Detected Threat Signals & Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Executive Summary */}
          <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Forensic Executive Summary
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {analysis.summary ||
                'The multi-stage heuristic engine has completed linguistic, domain integrity, and payment extraction checks on this position.'}
            </p>
          </div>

          {/* Detected Fraud Signals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Detected Forensic Signals ({analysis.indicators?.length || 0})
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Sorted by severity rating
              </span>
            </div>

            {analysis.indicators && analysis.indicators.length > 0 ? (
              <div className="space-y-3">
                {analysis.indicators.map((ind, idx) => (
                  <IndicatorCard key={idx} indicator={ind} index={idx} />
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#0D121D] border border-slate-800 text-center space-y-1">
                <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-200 font-mono">
                  Zero High-Risk Indicators Detected
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  The listing exhibits standard recruitment linguistics with no predatory payment demands.
                </p>
              </div>
            )}
          </div>

          {/* Mitigation Protocols */}
          <RecommendationChecklist
            classification={analysis.classification}
            recommendationText={analysis.recommendation}
          />
        </div>
      </div>

    </div>
  );
};
