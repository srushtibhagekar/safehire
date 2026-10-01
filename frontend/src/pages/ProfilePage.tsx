import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Mail,
  ShieldCheck,
  Key,
  Lock,
  Copy,
  Check,
  Activity,
  Terminal,
  AlertCircle,
  Save,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const mockApiKey = 'sh_live_9f82d17c4b8e2190a6f8812c';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Password credentials updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>Security & Account Credentials</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-100">
          User Settings & API Access
        </h1>
        <p className="text-xs text-slate-400">
          Manage your SafeHire analyst identity, developer API credentials, and security preferences.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Account Profile & Quota */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-100 truncate">{user?.name}</h3>
                <p className="text-xs font-mono text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                  {user?.role === 'ADMIN' ? 'Security Operations Admin' : 'Security Analyst'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Account Status</span>
                <span className="text-emerald-400">Active / Verified</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monthly Scan Quota</span>
                <span className="text-slate-200">Unlimited (Early Access)</span>
              </div>
            </div>
          </div>

          {/* API Access Key Panel */}
          <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold uppercase">
              <Key className="w-4 h-4 text-sky-400" />
              <span>Developer API Key</span>
            </div>
            <p className="text-xs text-slate-400">
              Integrate SafeHire forensic scan webhooks into ATS, browser extensions, or job scrapers.
            </p>

            <div className="p-2.5 rounded-lg bg-[#080B11] border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 truncate mr-2">{mockApiKey}</span>
              <button
                onClick={handleCopyKey}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
                title="Copy API Key"
              >
                {apiKeyCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Update Credentials */}
        <div className="md:col-span-7">
          <div className="p-6 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">
                Change Password & Access Key
              </h3>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-sm font-sans flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save New Credentials</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
