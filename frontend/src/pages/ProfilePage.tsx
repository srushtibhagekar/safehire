import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { authService } from '../services/authService';
import {
  User,
  Mail,
  Shield,
  Calendar,
  Lock,
  Sun,
  Moon,
  LogOut,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, refreshUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.updateProfile({
        name,
        newPassword: newPassword || undefined,
      });
      if (res.success) {
        setMessage('Profile updated successfully.');
        setNewPassword('');
        setConfirmPassword('');
        await refreshUser();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
          <User className="w-6 h-6 text-cyan-400" />
          Account & Security Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your candidate credentials, security authentication, and interface preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: User Badge Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 text-center flex flex-col items-center">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-cyan-500 shadow-lg shadow-cyan-500/20"
          />
          <div>
            <h3 className="text-base font-bold text-slate-100">{user?.name}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <span className="inline-block mt-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Role: {user?.role}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 text-left">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Status: <strong className="text-emerald-400">Verified</strong></span>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full mt-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Right: Update Form & Theme */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Edit Profile Form */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-400" /> Personal & Password Details
            </h3>

            {message && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address (Read-only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-500 text-xs cursor-not-allowed"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Change Password (Leave blank to keep current)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>

          {/* Theme & Preferences */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-100">Interface Appearance</h4>
              <p className="text-xs text-slate-400">Toggle between Cybersecurity Dark and Crisp Light modes</p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-semibold transition"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
