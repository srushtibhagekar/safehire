import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password reset request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 font-sans text-foreground">
      <div className="w-full max-w-sm space-y-5">
        
        <div className="space-y-1">
          <div className="w-7 h-7 rounded bg-foreground text-background flex items-center justify-center mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Reset password
          </h1>
          <p className="text-xs text-text-secondary">
            Enter your email to receive recovery instructions.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-surface border border-border shadow-sm space-y-4">
          {error && (
            <div className="p-2.5 rounded bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="text-center space-y-3 py-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-xs text-text-secondary">
                Instructions have been dispatched to <strong className="text-foreground">{email}</strong>.
              </p>
              <Link
                to="/login"
                className="inline-block px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium"
              >
                Return to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Account email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 disabled:opacity-50 transition shadow-sm mt-1"
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-border text-center text-xs">
            <Link to="/login" className="text-text-secondary hover:text-foreground inline-flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
