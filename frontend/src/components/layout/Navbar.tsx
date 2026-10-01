import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  ShieldCheck,
  Search,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  ChevronDown,
  LayoutDashboard,
  History,
  Bookmark,
  Settings,
  ShieldAlert,
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
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand & Left Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-foreground text-background flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">
                SafeHire
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  location.pathname === '/'
                    ? 'text-foreground font-semibold bg-surface-subtle'
                    : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                Overview
              </Link>
              <Link
                to="/analyze"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/analyze') || isActive('/results')
                    ? 'text-foreground font-semibold bg-surface-subtle'
                    : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                Analyze
              </Link>
              <Link
                to="/companies"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/companies')
                    ? 'text-foreground font-semibold bg-surface-subtle'
                    : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                Companies
              </Link>
              <Link
                to="/how-it-works"
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/how-it-works')
                    ? 'text-foreground font-semibold bg-surface-subtle'
                    : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                Methodology
              </Link>

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive('/dashboard')
                      ? 'text-foreground font-semibold bg-surface-subtle'
                      : 'text-text-secondary hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  Dashboard
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3 py-1.5 rounded-md text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors ${
                    isActive('/admin') ? 'font-semibold bg-rose-500/10' : ''
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={triggerCommandPalette}
              className="flex items-center gap-3 px-2.5 py-1.5 rounded-md bg-surface-subtle border border-border text-text-secondary hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 text-xs transition"
            >
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-text-muted" />
                <span>Search...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-text-muted">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-border bg-surface hover:bg-surface-hover text-foreground text-xs font-medium transition"
                >
                  <div className="w-5 h-5 rounded bg-surface-subtle border border-border flex items-center justify-center font-mono font-bold text-[10px]">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="truncate max-w-[100px]">{user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-text-muted" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-1.5 w-52 rounded-lg bg-surface border border-border shadow-lg py-1.5 z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="font-semibold text-foreground truncate">{user?.name}</p>
                      <p className="text-text-muted text-[11px] truncate font-mono">{user?.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-1.5 text-text-secondary hover:text-foreground hover:bg-surface-hover"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/history"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-1.5 text-text-secondary hover:text-foreground hover:bg-surface-hover"
                    >
                      <History className="w-3.5 h-3.5" />
                      Verification History
                    </Link>
                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-1.5 text-text-secondary hover:text-foreground hover:bg-surface-hover"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Saved Analyses
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-1.5 text-text-secondary hover:text-foreground hover:bg-surface-hover"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Settings & Keys
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Admin Console
                      </Link>
                    )}

                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-left"
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
                  className="px-3 py-1.5 text-xs font-medium rounded-md text-text-secondary hover:text-foreground transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:opacity-90 transition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={triggerCommandPalette}
              className="p-1.5 rounded-md text-text-secondary hover:text-foreground"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-text-secondary hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 py-3 space-y-2 text-xs">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-foreground font-medium"
          >
            Overview
          </Link>
          <Link
            to="/analyze"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-foreground font-medium"
          >
            Analyze Job
          </Link>
          <Link
            to="/companies"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-foreground font-medium"
          >
            Companies
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-text-secondary"
          >
            Methodology
          </Link>

          {isAuthenticated ? (
            <div className="border-t border-border pt-2 space-y-1.5">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-foreground font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-text-secondary"
              >
                Verification History
              </Link>
              <Link
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-text-secondary"
              >
                Saved Analyses
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left py-1.5 text-rose-600 dark:text-rose-400"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 flex items-center gap-2 border-t border-border">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-md border border-border text-foreground font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-md bg-foreground text-background font-medium"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
