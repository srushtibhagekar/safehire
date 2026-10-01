import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Building2,
  History,
  Bookmark,
  User,
  Sun,
  Moon,
  ArrowRight,
  Command,
  CornerDownLeft,
  FileText,
  Activity,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Investigation' | 'Telemetry' | 'System';
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, isAuthenticated } = useAuth();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'analyze',
      category: 'Investigation',
      title: 'Analyze New Job Posting',
      description: 'Run deep heuristic and NLP verification on a job listing',
      icon: Sparkles,
      badge: 'Scanner',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      action: () => {
        navigate('/analyze');
        setIsOpen(false);
      },
    },
    {
      id: 'companies',
      category: 'Investigation',
      title: 'Company Verification Directory',
      description: 'Audit corporate domain age, recruiter identity, and fraud alerts',
      icon: Building2,
      badge: 'Intelligence',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      action: () => {
        navigate('/companies');
        setIsOpen(false);
      },
    },
    {
      id: 'dashboard',
      category: 'Navigation',
      title: 'Threat Intelligence Dashboard',
      description: 'View real-time detection telemetry and recent scan dossiers',
      icon: Activity,
      action: () => {
        navigate(isAuthenticated ? '/dashboard' : '/login');
        setIsOpen(false);
      },
    },
    {
      id: 'history',
      category: 'Navigation',
      title: 'Verification History',
      description: 'Browse all previously audited job postings and risk logs',
      icon: History,
      action: () => {
        navigate(isAuthenticated ? '/history' : '/login');
        setIsOpen(false);
      },
    },
    {
      id: 'saved',
      category: 'Navigation',
      title: 'Saved Security Dossiers',
      description: 'Access bookmarked analyses and exported reports',
      icon: Bookmark,
      action: () => {
        navigate(isAuthenticated ? '/saved' : '/login');
        setIsOpen(false);
      },
    },
    {
      id: 'how-it-works',
      category: 'Telemetry',
      title: 'Detection Pipeline Architecture',
      description: 'Examine the multi-stage machine learning & NLP classification model',
      icon: ShieldCheck,
      action: () => {
        navigate('/how-it-works');
        setIsOpen(false);
      },
    },
    ...(isAdmin
      ? [
          {
            id: 'admin-model',
            category: 'Telemetry' as const,
            title: 'ML Model Performance & Retraining',
            description: 'Evaluate ROC-AUC, confusion matrix, and trigger model weights update',
            icon: ShieldAlert,
            badge: 'Admin SOC',
            badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
            action: () => {
              navigate('/admin/model');
              setIsOpen(false);
            },
          },
        ]
      : []),
    {
      id: 'theme',
      category: 'System',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      description: 'Toggle interface visual theme and contrast system',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: 'profile',
      category: 'System',
      title: 'Profile & Security Credentials',
      description: 'Manage account access keys, API tokens, and scan quota',
      icon: User,
      action: () => {
        navigate(isAuthenticated ? '/profile' : '/login');
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDownModal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Global quick-trigger custom event helper */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-[#0D121D] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10"
              onKeyDown={handleKeyDownModal}
            >
              {/* Search Input Bar */}
              <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#121826]">
                <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search actions (e.g. 'Analyze', 'Company', 'Model')..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700 rounded">
                  ESC
                </kbd>
              </div>

              {/* Command List */}
              <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/50">
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-1">
                    <p className="text-sm font-medium text-slate-300">No matching security actions</p>
                    <p className="text-xs text-slate-500">Try searching for 'analyze', 'company', or 'dashboard'</p>
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-sky-500/10 text-white border border-sky-500/30'
                            : 'text-slate-300 hover:bg-slate-800/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-200 truncate">{cmd.title}</span>
                              {cmd.badge && (
                                <span
                                  className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                                    cmd.badgeColor || 'text-slate-400 bg-slate-800 border-slate-700'
                                  }`}
                                >
                                  {cmd.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">{cmd.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4 shrink-0">
                          {isSelected && (
                            <CornerDownLeft className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Palette Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#090D15] border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">↑</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">↵</kbd> select
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>SafeHire Core V2.4</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
