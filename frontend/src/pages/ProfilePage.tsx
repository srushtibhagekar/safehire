import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Copy, Check } from 'lucide-react';

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
    setMessage('Password credentials updated.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-foreground">
      
      {/* Header */}
      <div className="pb-4 border-b border-border space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Account Settings
        </h1>
        <p className="text-xs text-text-secondary">
          Manage your account profile, API credentials, and security settings.
        </p>
      </div>

      {message && (
        <div className="p-3 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 font-mono">
          ✓ {message}
        </div>
      )}

      <div className="space-y-6 text-xs">
        
        {/* Profile Details */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-text-muted font-mono uppercase block">Name</span>
              <p className="font-semibold text-foreground text-sm">{user?.name || 'User'}</p>
            </div>
            <div>
              <span className="text-[10px] text-text-muted font-mono uppercase block">Email Address</span>
              <p className="font-mono text-text-secondary">{user?.email || 'N/A'}</p>
            </div>
            <div>
              <span className="text-[10px] text-text-muted font-mono uppercase block">Role</span>
              <p className="font-mono text-text-secondary">{user?.role || 'USER'}</p>
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
            Developer API Key
          </h3>
          <p className="text-text-secondary text-xs">
            Use this secret key to query the SafeHire verification engine via REST API or ATS integrations.
          </p>

          <div className="p-2 rounded bg-surface-subtle border border-border flex items-center justify-between font-mono text-xs">
            <span className="text-foreground truncate mr-2">{mockApiKey}</span>
            <button
              onClick={handleCopyKey}
              className="px-2 py-1 rounded bg-surface hover:bg-surface-hover border border-border text-foreground transition shrink-0 flex items-center gap-1 text-[11px]"
            >
              {apiKeyCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{apiKeyCopied ? 'Copied' : 'Copy key'}</span>
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="p-5 rounded-lg bg-surface border border-border space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
            Change Password
          </h3>

          <form onSubmit={handlePasswordUpdate} className="space-y-3 max-w-sm">
            <div className="space-y-1">
              <label className="text-xs text-foreground font-medium">Current password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-zinc-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-foreground font-medium">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-zinc-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-md bg-foreground text-background font-medium text-xs hover:opacity-90 transition shadow-sm"
            >
              Update password
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
