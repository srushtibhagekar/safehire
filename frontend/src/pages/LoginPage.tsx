import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

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
      setError('Please enter your email and password.');
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
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 font-sans text-foreground">
      <div className="w-full max-w-sm space-y-5">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="w-7 h-7 rounded bg-foreground text-background flex items-center justify-center mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Sign in to SafeHire
          </h1>
          <p className="text-xs text-text-secondary">
            Access your verification workspace and saved analyses.
          </p>
        </div>

        {/* Panel */}
        <div className="p-5 rounded-lg bg-surface border border-border shadow-sm space-y-4">
          {error && (
            <div className="p-2.5 rounded bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-text-secondary hover:text-foreground">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 disabled:opacity-50 transition shadow-sm mt-1"
            >
              {loading ? 'Authenticating...' : 'Sign in'}
            </button>
          </form>

          <div className="pt-3 border-t border-border text-center text-xs text-text-secondary">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-foreground hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
