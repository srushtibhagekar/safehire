import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Terminal,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide your email address and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Sign In to SafeHire
          </h1>
          <p className="text-xs text-slate-400">
            Access your threat dashboard, saved dossiers, and inspection telemetry.
          </p>
        </div>

        {/* Auth Panel */}
        <div className="rounded-2xl bg-[#0D121D] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Account Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Password</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-mono text-sky-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition shadow-sm font-sans flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-sky-400 hover:underline font-semibold font-mono">
              Create one now
            </Link>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1 text-center">
          <span className="text-slate-300 font-semibold block">Demo Accounts</span>
          <div>Admin: <code className="text-sky-400">admin@safehire.ai</code> / <code className="text-slate-300">Admin@1234</code></div>
          <div>User: <code className="text-sky-400">user@safehire.ai</code> / <code className="text-slate-300">User@1234</code></div>
        </div>

      </div>
    </div>
  );
};
