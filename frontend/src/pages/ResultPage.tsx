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
  Bookmark,
  Printer,
  Share2,
  ArrowLeft,
  Check,
  FileText,
  Building2,
  ExternalLink,
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-2 text-xs text-text-muted font-mono">
        <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        <p>Loading analysis...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-3 font-sans">
        <h2 className="text-base font-bold text-foreground">Analysis Record Not Found</h2>
        <p className="text-xs text-text-secondary">
          The requested job verification report does not exist or was deleted.
        </p>
        <Link
          to="/analyze"
          className="inline-block px-3.5 py-2 rounded-md bg-foreground text-background text-xs font-medium"
        >
          Run a new analysis
        </Link>
      </div>
    );
  }

  const job = analysis.jobPost;
  const isGenuine = analysis.classification === 'LIKELY_GENUINE';
  const isCaution = analysis.classification === 'NEEDS_CAUTION';
  const isFraud = analysis.classification === 'LIKELY_FRAUDULENT';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            to="/analyze"
            className="p-1.5 rounded-md border border-border text-text-secondary hover:text-foreground hover:bg-surface-hover transition"
            title="Back to analyzer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
              <span>REPORT ID #{analysis.id?.substring(0, 8) || (analysis as any)._id?.substring(0, 8)}</span>
              <span>•</span>
              <span>{new Date(analysis.createdAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-lg font-bold text-foreground mt-0.5">
              {job?.title || 'Job Analysis Result'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition ${
              isSaved
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400'
                : 'bg-surface border-border text-text-secondary hover:text-foreground hover:bg-surface-hover'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary hover:text-foreground hover:bg-surface-hover text-xs font-medium transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <Link
            to={`/reports/${analysis.id || (analysis as any)._id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-subtle border border-border text-foreground hover:bg-surface-hover text-xs font-medium transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Formal Report</span>
          </Link>
        </div>
      </div>

      {/* Main Investigation Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Trust Score + Subject Job Info (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <RiskGauge
            score={analysis.riskScore}
            classification={analysis.classification}
            confidence={analysis.confidence}
            showTrustScore={true}
          />

          {/* Job Target Details */}
          <div className="p-4 rounded-lg bg-surface border border-border space-y-3 text-xs">
            <h3 className="text-[11px] font-mono uppercase text-text-muted font-semibold border-b border-border pb-2">
              Job Information
            </h3>

            <div className="space-y-2.5">
              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase block">Role</span>
                <p className="font-semibold text-foreground">{job?.title || 'Unspecified'}</p>
              </div>

              <div>
                <span className="text-[10px] text-text-muted font-mono uppercase block">Company</span>
                <p className="font-semibold text-foreground">{job?.companyName || 'Unspecified'}</p>
              </div>

              {job?.salary && (
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase block">Compensation</span>
                  <p className="font-mono text-foreground">{job.salary}</p>
                </div>
              )}

              {job?.location && (
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase block">Location</span>
                  <p className="text-text-secondary">{job.location}</p>
                </div>
              )}

              {job?.companyWebsite && (
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase block">Website</span>
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:underline truncate block font-mono text-[11px]"
                  >
                    {job.companyWebsite}
                  </a>
                </div>
              )}

              {job?.contactEmail && (
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase block">Contact Email</span>
                  <p className="font-mono text-text-secondary">{job.contactEmail}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Verification Breakdown & Evidence (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Executive Summary */}
          <div className="p-4 rounded-lg bg-surface border border-border space-y-2">
            <h3 className="text-[11px] font-mono uppercase text-text-muted font-semibold">
              Analysis Summary
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Detected Signals with Interactive Evidence */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase font-mono tracking-wider text-foreground">
                Detected Signals ({analysis.indicators?.length || 0})
              </h3>
              <span className="text-[11px] text-text-muted font-mono">
                Click a signal to inspect quoted evidence
              </span>
            </div>

            {analysis.indicators && analysis.indicators.length > 0 ? (
              <div className="space-y-2">
                {analysis.indicators.map((ind, idx) => (
                  <IndicatorCard key={idx} indicator={ind} index={idx} />
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-surface border border-border text-center text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                ✓ No high-risk fraud indicators detected in this posting.
              </div>
            )}
          </div>

          {/* Action Recommendations */}
          <RecommendationChecklist
            classification={analysis.classification}
            recommendationText={analysis.recommendation}
          />

        </div>

      </div>

    </div>
  );
};
