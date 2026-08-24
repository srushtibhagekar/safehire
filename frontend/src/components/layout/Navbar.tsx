import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { ShieldCheck, ShieldAlert, Sparkles, User as UserIcon, LogOut, Menu, X, LayoutDashboard, History, Bookmark, Settings } from 'lucide-react';

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
                  Safe<span className="text-cyan-400">Hire</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Verify Before You Apply</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors ${isActive('/') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className={`transition-colors ${isActive('/how-it-works') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${isActive('/about') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
            >
              About
            </Link>
            <Link
              to="/analyze"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                isActive('/analyze')
                  ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'border-slate-700 bg-slate-800/60 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Analyze Job</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`transition-colors ${isActive('/dashboard') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
              >
                Dashboard
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition ${
                  isActive('/admin') ? 'ring-1 ring-purple-400 font-semibold' : ''
                }`}
              >
                <ShieldAlert className="w-3 h-3" />
                <span>Admin Console</span>
              </Link>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 transition"
                >
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
                    alt="avatar"
                    className="w-6 h-6 rounded-full border border-cyan-500/40"
                  />
                  <span className="text-xs font-semibold max-w-[100px] truncate">{user?.name}</span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-800 mb-1">
                      <p className="font-semibold text-slate-200 truncate">{user?.name}</p>
                      <p className="text-slate-400 text-[11px] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                        {user?.role}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                      Dashboard
                    </Link>
                    <Link
                      to="/history"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <History className="w-3.5 h-3.5 text-blue-400" />
                      Analysis History
                    </Link>
                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                      Saved Results
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      Profile & Settings
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-purple-300 hover:bg-purple-900/30"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-red-400 hover:bg-red-500/10 text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
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
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium"
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium"
          >
            About
          </Link>
          <Link
            to="/analyze"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-cyan-400 font-semibold"
          >
            Analyze Job Posting
          </Link>

          {isAuthenticated ? (
            <>
              <div className="border-t border-slate-800 pt-3 space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-slate-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-slate-300"
                >
                  Analysis History
                </Link>
                <Link
                  to="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-slate-300"
                >
                  Saved Results
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-slate-300"
                >
                  Profile & Settings
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm text-purple-400 font-semibold"
                  >
                    Admin Console
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-sm text-red-400 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-sm font-semibold text-slate-200"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
