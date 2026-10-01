import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  History,
  Bookmark,
  Settings,
  Building2,
  Search,
  Activity,
  Terminal,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
        metaKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080B11]/90 dark:bg-[#080B11]/90 light:bg-white/95 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 transition-colors duration-200">
      {/* Top Telemetry Ticker (Subtle) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#05070B] border-b border-slate-900 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            SAFEHIRE ENGINE ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">ML Model v2.4 (BERT + Heuristic Rule Engine)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Detection Latency: ~140ms</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={triggerCommandPalette}
            className="flex items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors"
          >
            <span>Quick Command</span>
            <kbd className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all duration-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-100 group-hover:text-white transition-colors">
                  Safe<span className="text-sky-400 font-extrabold">Hire</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                  INTEL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-slate-800 text-sky-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Overview
              </Link>
              <Link
                to="/analyze"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  isActive('/analyze') || isActive('/results')
                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-300 font-semibold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Analyze Job</span>
              </Link>
              <Link
                to="/companies"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/companies')
                    ? 'bg-slate-800 text-sky-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Companies</span>
              </Link>
              <Link
                to="/how-it-works"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/how-it-works')
                    ? 'bg-slate-800 text-sky-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Methodology
              </Link>
              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/about')
                    ? 'bg-slate-800 text-sky-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                About
              </Link>

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-slate-800 text-sky-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dashboard</span>
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition ${
                    isActive('/admin') ? 'ring-1 ring-rose-400 font-semibold' : ''
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Admin SOC</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              onClick={triggerCommandPalette}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition"
              title="Search commands and job records"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Search...</span>
              <kbd className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0D121D] hover:bg-slate-800 text-slate-200 transition text-xs"
                >
                  <div className="w-6 h-6 rounded-md bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 font-mono font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-medium max-w-[100px] truncate">{user?.name}</span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0D121D] border border-slate-800 shadow-2xl py-2 z-50 text-xs font-sans"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-800 mb-1">
                      <p className="font-semibold text-slate-200 truncate">{user?.name}</p>
                      <p className="text-slate-400 text-[11px] font-mono truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 font-mono uppercase">
                        Role: {user?.role}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    >
                      <LayoutDashboard className="w-4 h-4 text-sky-400" />
                      Intelligence Dashboard
                    </Link>
                    <Link
                      to="/history"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    >
                      <History className="w-4 h-4 text-slate-400" />
                      Verification History
                    </Link>
                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    >
                      <Bookmark className="w-4 h-4 text-amber-400" />
                      Saved Dossiers
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Security & Settings
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-rose-300 hover:bg-rose-950/30"
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        Admin Security Console
                      </Link>
                    )}

                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-400 hover:bg-rose-500/10 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition shadow-sm font-sans font-medium"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={triggerCommandPalette}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0D121D] px-4 pt-3 pb-6 space-y-3 font-sans">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium text-sm border-b border-slate-800/50"
          >
            Overview
          </Link>
          <Link
            to="/analyze"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sky-400 font-semibold text-sm border-b border-slate-800/50"
          >
            <Sparkles className="w-4 h-4" />
            Analyze Job Posting
          </Link>
          <Link
            to="/companies"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-200 font-medium text-sm border-b border-slate-800/50"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            Company Verification
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 font-medium text-sm border-b border-slate-800/50"
          >
            Methodology
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 font-medium text-sm border-b border-slate-800/50"
          >
            About
          </Link>

          {isAuthenticated ? (
            <div className="pt-2 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm text-slate-300"
              >
                Intelligence Dashboard
              </Link>
              <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm text-slate-300"
              >
                Verification History
              </Link>
              <Link
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm text-slate-300"
              >
                Saved Dossiers
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm text-slate-300"
              >
                Settings & Credentials
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-rose-400 font-semibold"
                >
                  Admin Security Console
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-sm text-rose-400 font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-sm font-semibold text-slate-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-sky-500 text-slate-950 text-sm font-semibold"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
