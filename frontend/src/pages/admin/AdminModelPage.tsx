import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { ModelMetricData } from '../../types/admin';
import {
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Database,
  Calendar,
  Layers,
  Sparkles,
  BarChart,
} from 'lucide-react';

export const AdminModelPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelMetricData[]>([]);
  const [loading, setLoading] = useState(true);
  const [retraining, setRetraining] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await adminService.getModelMetrics();
      if (res.success) {
        setMetrics(res.metrics || []);
      }
    } catch (err) {
      console.error('Fetch model metrics error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleRetrain = async () => {
    setRetraining(true);
    setMessage('');
    setError('');

    try {
      const res = await adminService.retrainModels();
      if (res.success) {
        setMessage('Model retraining successfully executed! Benchmark metrics updated.');
        await fetchMetrics();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Retraining failed on Python FastAPI ML service.');
    } finally {
      setRetraining(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Admin Console
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-purple-400" />
            Machine Learning Evaluation & Performance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Evaluation metrics computed across TF-IDF + Logistic Regression, Random Forest, and SVM models on the EMSCAD benchmark dataset.
          </p>
        </div>

        <button
          onClick={handleRetrain}
          disabled={retraining}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-2 transition disabled:opacity-50 self-start sm:self-auto shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${retraining ? 'animate-spin' : ''}`} />
          <span>{retraining ? 'Retraining Models...' : 'Retrain & Evaluate'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">Loading ML evaluation metrics...</div>
      ) : metrics.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <Cpu className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No Model Metrics Recorded</p>
          <p className="text-xs text-slate-500">
            Click "Retrain & Evaluate" to train candidate models and store benchmark statistics.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Model Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m) => {
              const isPrimary = m.modelName === 'LogisticRegression';

              return (
                <div
                  key={m.modelName}
                  className={`p-6 rounded-2xl bg-slate-900/90 border shadow-xl space-y-4 relative overflow-hidden ${
                    isPrimary ? 'border-cyan-500/40 ring-1 ring-cyan-500/20' : 'border-slate-800'
                  }`}
                >
                  {isPrimary && (
                    <span className="absolute top-3 right-3 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Primary Active Model
                    </span>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Cpu className={`w-4 h-4 ${isPrimary ? 'text-cyan-400' : 'text-purple-400'}`} />
                      {m.modelName}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">v{m.modelVersion}</span>
                  </div>

                  {/* Metrics Table */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Accuracy</span>
                      <span className="text-base font-black text-slate-100 font-mono">
                        {(m.accuracy * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Precision</span>
                      <span className="text-base font-black text-cyan-400 font-mono">
                        {(m.precision * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Recall</span>
                      <span className="text-base font-black text-amber-400 font-mono">
                        {(m.recall * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">F1-Score</span>
                      <span className="text-base font-black text-emerald-400 font-mono">
                        {(m.f1Score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {m.rocAuc ? (
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">ROC-AUC Metric</span>
                      <span className="font-mono font-bold text-purple-300">{m.rocAuc.toFixed(3)}</span>
                    </div>
                  ) : null}

                  {/* Confusion Matrix */}
                  {m.confusionMatrix && m.confusionMatrix.length === 2 && (
                    <div className="pt-2 border-t border-slate-800 space-y-1.5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                        Confusion Matrix (Test Split)
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-center font-mono text-xs">
                        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          <span className="text-[9px] block text-slate-500">True Genuine</span>
                          <strong>{m.confusionMatrix[0][0]}</strong>
                        </div>
                        <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-300">
                          <span className="text-[9px] block text-slate-500">False Fraud</span>
                          <strong>{m.confusionMatrix[0][1]}</strong>
                        </div>
                        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          <span className="text-[9px] block text-slate-500">False Genuine</span>
                          <strong>{m.confusionMatrix[1][0]}</strong>
                        </div>
                        <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          <span className="text-[9px] block text-slate-500">True Fraud</span>
                          <strong>{m.confusionMatrix[1][1]}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-500 font-mono pt-1">
                    Trained: {new Date(m.trainedAt).toLocaleString()} ({m.datasetSize} samples)
                  </div>
                </div>
              );
            })}
          </div>

          {/* Model Comparison Summary */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Machine Learning Architecture Comparison
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              SafeHire utilizes <strong>TF-IDF Vectorization</strong> with sublinear term frequency scaling and bi-gram tokenization. <strong>Logistic Regression</strong> serves as the primary inference engine due to its calibrated probability output and robust interpretability, while <strong>Random Forest</strong> and <strong>SVM</strong> provide ensemble validation across non-linear linguistic patterns.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
