import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Printer,
  ArrowLeft,
  Calendar,
  Building,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

export const ReportViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      try {
        const res = await analysisService.getReport(id);
        if (res.success && res.report) {
          setReportData(res.report);
        }
      } catch (err) {
        console.error('Report fetch error:', err);
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Generating official SafeHire verification report...</p>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-100">Report Not Found</h2>
        <Link to="/analyze" className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold">
          Analyze New Job
        </Link>
      </div>
    );
  }

  const { analysis, jobPost, indicators, reportCode, generatedAt, disclaimer } = reportData;
  const isFraud = analysis.classification === 'LIKELY_FRAUDULENT';
  const isCaution = analysis.classification === 'NEEDS_CAUTION';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Controls (Hidden on Print) */}
      <div className="flex items-center justify-between no-print border-b border-slate-800 pb-4">
        <Link
          to={`/results/${id}`}
          className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Interactive Analysis
        </Link>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-2 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Formal Printable Document Certificate */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-8 print:bg-white print:text-black print:border-slate-300 print:shadow-none">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 print:border-slate-300 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg print:border print:border-slate-400">
              <FileCheck2 className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-100 print:text-black">
                SafeHire Intelligence Verification Audit
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Decision-Support Recruitment Fraud Risk Certificate
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-0.5">
            <span className="text-xs font-mono font-bold text-cyan-400 print:text-cyan-700 block">
              CERTIFICATE: {reportCode}
            </span>
            <span className="text-[11px] text-slate-400 print:text-slate-600 block">
              Generated: {new Date(generatedAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Evaluated Job Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 print:text-slate-500 font-semibold block">Job Title:</span>
            <span className="font-bold text-slate-200 print:text-black text-sm">{jobPost.title}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-slate-500 font-semibold block">Company / Employer:</span>
            <span className="font-bold text-slate-200 print:text-black text-sm">{jobPost.companyName}</span>
          </div>
          {jobPost.salary && (
            <div>
              <span className="text-slate-400 print:text-slate-500 font-semibold block">Advertised Salary:</span>
              <span className="font-mono text-slate-200 print:text-black">{jobPost.salary}</span>
            </div>
          )}
          {jobPost.location && (
            <div>
              <span className="text-slate-400 print:text-slate-500 font-semibold block">Location:</span>
              <span className="text-slate-200 print:text-black">{jobPost.location}</span>
            </div>
          )}
        </div>

        {/* Risk Score & Assessment Stamp */}
        <div className="p-6 rounded-2xl border border-slate-800 print:border-slate-300 bg-slate-950/80 print:bg-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400 print:text-slate-600">
              SafeHire Risk Assessment
            </span>
            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
              <span
                className={`text-5xl font-black ${
                  isFraud ? 'text-red-400 print:text-red-600' : isCaution ? 'text-amber-400 print:text-amber-600' : 'text-emerald-400 print:text-emerald-600'
                }`}
              >
                {analysis.riskScore}
              </span>
              <span className="text-sm font-semibold text-slate-500">/ 100 Risk Index</span>
            </div>
            <p className="text-xs text-slate-300 print:text-slate-700 max-w-md pt-1 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Stamp Badge */}
          <div
            className={`px-6 py-3 rounded-2xl border-2 text-center uppercase tracking-widest font-black text-sm ${
              isFraud
                ? 'border-red-500 text-red-400 bg-red-500/10 print:border-red-600 print:text-red-700'
                : isCaution
                ? 'border-amber-500 text-amber-400 bg-amber-500/10 print:border-amber-600 print:text-amber-700'
                : 'border-emerald-500 text-emerald-400 bg-emerald-500/10 print:border-emerald-600 print:text-emerald-700'
            }`}
          >
            {analysis.classification.replace('_', ' ')}
            <span className="text-[10px] block font-mono font-normal tracking-normal lowercase opacity-80 mt-0.5">
              Confidence: {analysis.confidence}%
            </span>
          </div>
        </div>

        {/* Explainable Indicators Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 print:text-black border-b border-slate-800 print:border-slate-300 pb-2">
            Identified Fraud & Linguistic Warning Indicators
          </h3>

          <div className="space-y-3">
            {indicators.map((ind: any, i: number) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-800 print:border-slate-300 bg-slate-950/40 print:bg-white text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-slate-200 print:text-black">
                  <span>{ind.title}</span>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 print:text-cyan-700">
                    Severity: {ind.severity}
                  </span>
                </div>
                <p className="text-slate-400 print:text-slate-700">{ind.explanation}</p>
                {ind.evidence && (
                  <p className="text-[11px] font-mono text-slate-300 print:text-slate-800 bg-slate-900 print:bg-slate-100 p-2 rounded border border-slate-800 print:border-slate-200">
                    Evidence: {ind.evidence}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Candidate Action Plan */}
        <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2 text-xs">
          <h4 className="font-bold text-slate-200 print:text-black uppercase tracking-wider text-[11px]">
            Recommended Safety Action
          </h4>
          <p className="text-slate-300 print:text-slate-700 leading-relaxed">
            {analysis.recommendation}
          </p>
        </div>

        {/* Model Architecture & Academic Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800 print:border-slate-300 text-[11px] font-mono text-slate-500">
          <span>Classifier: {analysis.modelName} (v{analysis.modelVersion})</span>
          <span>Benchmark: EMSCAD Recruitment Dataset</span>
        </div>

        {/* Formal Legal Disclaimer */}
        <div className="text-[10px] text-slate-500 print:text-slate-600 leading-relaxed border-t border-slate-800 print:border-slate-300 pt-4">
          <strong className="text-slate-400 print:text-slate-700">Notice: </strong>
          {disclaimer}
        </div>

      </div>

    </div>
  );
};
