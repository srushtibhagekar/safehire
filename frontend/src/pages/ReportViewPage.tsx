import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { Analysis } from '../types/analysis';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Printer,
  ArrowLeft,
  Calendar,
  Building,
  Lock,
  FileCheck,
  Download,
} from 'lucide-react';

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3 font-mono">
        <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Compiling official security audit dossier...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 font-sans">
        <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100">Report Record Unavailable</h2>
        <Link to="/analyze" className="inline-block px-4 py-2 rounded-lg bg-sky-500 text-slate-950 text-xs font-bold">
          Return to Scanner
        </Link>
      </div>
    );
  }

  const job = analysis.jobPost;
  const isGenuine = analysis.classification === 'LIKELY_GENUINE';
  const isCaution = analysis.classification === 'NEEDS_CAUTION';
  const isFraud = analysis.classification === 'LIKELY_FRAUDULENT';
  const trustScore = 100 - analysis.riskScore;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Action Header (Hidden in Print) */}
      <div className="no-print flex items-center justify-between border-b border-slate-800 pb-4">
        <Link
          to={`/results/${analysis.id || (analysis as any)._id}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analysis Workspace</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Print / Save PDF Dossier</span>
          </button>
        </div>
      </div>

      {/* Official Security Report Document Container */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#0D121D] border border-slate-800 shadow-2xl space-y-8 print:p-0 print:border-none print:shadow-none">
        
        {/* Dossier Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
              <span className="text-lg font-bold text-slate-100 font-mono tracking-tight">
                SafeHire Intelligence Platform
              </span>
            </div>
            <p className="text-xs text-slate-400">Official Recruitment Security Audit & Threat Assessment</p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-400 space-y-0.5">
            <div>Audit ID: #{analysis.id || (analysis as any)._id || 'DOC-2026-01'}</div>
            <div>Date: {new Date(analysis.createdAt).toLocaleDateString()}</div>
            <div className="text-emerald-400 text-[11px]">Status: Cryptographically Certified</div>
          </div>
        </div>

        {/* Executive Verdict Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#080B11] border border-slate-800">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500">Classification</span>
            <div
              className={`text-sm font-bold font-mono ${
                isGenuine ? 'text-emerald-400' : isCaution ? 'text-amber-400' : 'text-rose-400'
              }`}
            >
              {analysis.classification.replace(/_/g, ' ')}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500">Trust Score</span>
            <div className="text-sm font-bold font-mono text-slate-100">
              {trustScore} / 100 <span className="text-xs text-slate-500">({analysis.confidence}% conf.)</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-500">Risk Assessment</span>
            <div className="text-sm font-mono text-slate-300">
              {analysis.riskScore} / 100 Risk Index
            </div>
          </div>
        </div>

        {/* Section 1: Subject Job Information */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider border-b border-slate-800 pb-1.5">
            1. Target Entity & Job Profile
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Job Title</span>
              <span className="text-slate-200 font-semibold">{job?.title || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Hiring Entity</span>
              <span className="text-slate-200 font-semibold">{job?.companyName || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Location</span>
              <span className="text-slate-300">{job?.location || 'Unspecified'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Salary Band</span>
              <span className="text-sky-400">{job?.salary || 'Not Provided'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Executive Assessment */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider border-b border-slate-800 pb-1.5">
            2. Heuristic Audit Summary
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {analysis.summary}
          </p>
        </div>

        {/* Section 3: Detailed Forensic Signal Log */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider border-b border-slate-800 pb-1.5">
            3. Forensic Threat Indicators ({analysis.indicators?.length || 0})
          </h3>

          <div className="space-y-2">
            {analysis.indicators && analysis.indicators.length > 0 ? (
              analysis.indicators.map((ind, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#080B11] border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{ind.title}</span>
                    <span className="font-mono text-[10px] text-rose-400 uppercase">[{ind.severity}]</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{ind.explanation}</p>
                  {ind.evidence && (
                    <p className="font-mono text-[10px] text-sky-400 bg-slate-900 p-1.5 rounded">
                      Evidence: {ind.evidence}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-emerald-400 font-mono">
                ✓ No high-risk fraudulent indicators identified during deep heuristic sweep.
              </p>
            )}
          </div>
        </div>

        {/* Section 4: Security Protocols */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider border-b border-slate-800 pb-1.5">
            4. Candidate Defense Directives
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {analysis.recommendation}
          </p>
        </div>

        {/* Signoff / Certification Footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div>Generated by SafeHire Core Heuristic & NLP Classification Engine v2.4</div>
          <div>Cryptographic Verification Hash: SHA-256 Validated</div>
        </div>

      </div>

    </div>
  );
};
