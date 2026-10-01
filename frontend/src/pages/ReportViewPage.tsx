import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import { ShieldCheck, Printer, ArrowLeft } from 'lucide-react';

export const ReportViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      try {
        const res = await analysisService.getAnalysisById(id);
        if (res.success && res.analysis) {
          setAnalysis(res.analysis);
        }
      } catch (err) {
        console.error('Failed to load report:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-2 text-xs text-text-muted font-mono">
        <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        <p>Loading formal report...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-3 font-sans">
        <h2 className="text-base font-bold text-foreground">Report Not Found</h2>
        <Link to="/analyze" className="inline-block px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium">
          Return to Analyzer
        </Link>
      </div>
    );
  }

  const job = analysis.jobPost;
  const trustScore = 100 - analysis.riskScore;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Top Bar (Hidden in Print) */}
      <div className="no-print flex items-center justify-between border-b border-border pb-3">
        <Link
          to={`/results/${analysis.id || (analysis as any)._id}`}
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analysis</span>
        </Link>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Official Report Document */}
      <div className="p-8 sm:p-10 rounded-lg bg-surface border border-border shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
        
        {/* Header */}
        <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-foreground text-background flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-foreground text-sm">SafeHire Verification Report</span>
            </div>
            <p className="text-xs text-text-muted">Recruitment Fraud & Job Authenticity Assessment</p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-text-muted">
            <div>Report #{analysis.id?.substring(0, 8) || (analysis as any)._id?.substring(0, 8)}</div>
            <div>{new Date(analysis.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-md bg-surface-subtle border border-border text-xs font-mono">
          <div>
            <span className="text-[10px] text-text-muted uppercase block">Classification</span>
            <span className="font-bold text-foreground">{analysis.classification.replace(/_/g, ' ')}</span>
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase block">Trust Score</span>
            <span className="font-bold text-foreground">{trustScore} / 100</span>
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase block">Confidence</span>
            <span className="font-bold text-foreground">{analysis.confidence}%</span>
          </div>
        </div>

        {/* Job Information */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-text-muted font-bold tracking-wider border-b border-border pb-1">
            1. Job Post Target
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Title</span>
              <span className="text-foreground">{job?.title || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Company</span>
              <span className="text-foreground">{job?.companyName || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Location</span>
              <span className="text-foreground">{job?.location || 'Unspecified'}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Salary</span>
              <span className="text-foreground">{job?.salary || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono uppercase text-text-muted font-bold tracking-wider border-b border-border pb-1">
            2. Executive Assessment
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Detected Signals */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-text-muted font-bold tracking-wider border-b border-border pb-1">
            3. Forensic Indicators ({analysis.indicators?.length || 0})
          </h3>
          {analysis.indicators && analysis.indicators.length > 0 ? (
            <div className="space-y-2">
              {analysis.indicators.map((ind, i) => (
                <div key={i} className="p-2.5 rounded bg-surface-subtle border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-semibold text-foreground">{ind.title}</span>
                    <span className="text-[10px] text-text-muted uppercase">[{ind.severity}]</span>
                  </div>
                  <p className="text-text-secondary text-[11px]">{ind.explanation}</p>
                  {ind.evidence && (
                    <p className="font-mono text-[10px] text-foreground bg-surface p-1.5 rounded border border-border">
                      "{ind.evidence}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
              ✓ No high-risk indicators detected.
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono uppercase text-text-muted font-bold tracking-wider border-b border-border pb-1">
            4. Guidance for Applicant
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            {analysis.recommendation}
          </p>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between text-[10px] font-mono text-text-muted">
          <span>SafeHire Core Verification System</span>
          <span>Zero PII Stored</span>
        </div>

      </div>

    </div>
  );
};
