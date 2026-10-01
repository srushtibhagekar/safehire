import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Building2,
  History,
  Bookmark,
  User,
  Sun,
  Moon,
  ArrowRight,
  ShieldAlert,
  Activity,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface CommandItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, isAuthenticated } = useAuth();

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
      category: 'Actions',
      title: 'Analyze a job posting',
      description: 'Run verification checks on a job post or recruiter message',
      icon: Sparkles,
      action: () => {
        navigate('/analyze');
        setIsOpen(false);
      },
    },
    {
      id: 'companies',
      category: 'Actions',
      title: 'Check company directory',
      description: 'Audit corporate domain age and hiring channels',
      icon: Building2,
      action: () => {
        navigate('/companies');
        setIsOpen(false);
      },
    },
    {
      id: 'dashboard',
      category: 'Navigation',
      title: 'Open workspace dashboard',
      description: 'View recent verification activity',
      icon: Activity,
      action: () => {
        navigate(isAuthenticated ? '/dashboard' : '/login');
        setIsOpen(false);
      },
    },
    {
      id: 'history',
      category: 'Navigation',
      title: 'Verification history',
      description: 'Browse all previously analyzed job postings',
      icon: History,
      action: () => {
        navigate(isAuthenticated ? '/history' : '/login');
        setIsOpen(false);
      },
    },
    {
      id: 'saved',
      category: 'Navigation',
      title: 'Saved analyses',
      description: 'View bookmarked job verifications',
      icon: Bookmark,
      action: () => {
        navigate(isAuthenticated ? '/saved' : '/login');
        setIsOpen(false);
      },
    },
    {
      id: 'how-it-works',
      category: 'Navigation',
      title: 'Detection methodology',
      description: 'Learn how SafeHire detects fake jobs and scam indicators',
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
            category: 'Admin',
            title: 'Model performance & retraining',
            description: 'Evaluate accuracy metrics and trigger model updates',
            icon: ShieldAlert,
            action: () => {
              navigate('/admin/model');
              setIsOpen(false);
            },
          },
        ]
      : []),
    {
      id: 'theme',
      category: 'Preferences',
      title: `Toggle theme (${theme === 'dark' ? 'Light' : 'Dark'})`,
      description: 'Switch between light and dark interface',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
  ];

  const filtered = commands.filter(
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
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.12 }}
            className="relative w-full max-w-xl bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-10 font-sans"
            onKeyDown={handleKeyDownModal}
          >
            {/* Input Bar */}
            <div className="flex items-center px-3.5 py-3 border-b border-border">
              <Search className="w-4 h-4 text-text-muted mr-2.5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-xs text-foreground placeholder-text-muted focus:outline-none"
                autoFocus
              />
              <kbd className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-surface-subtle border border-border">
                ESC
              </kbd>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-text-muted">
                  No commands found.
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-xs transition-colors ${
                        isSelected
                          ? 'bg-surface-subtle text-foreground'
                          : 'text-text-secondary hover:bg-surface-hover'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        <div className="min-w-0">
                          <span className="font-medium truncate block text-foreground">
                            {cmd.title}
                          </span>
                          <span className="text-[11px] text-text-muted truncate block">
                            {cmd.description}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-text-muted ml-2 shrink-0">
                        {cmd.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-3.5 py-2 bg-surface-subtle border-t border-border flex items-center justify-between text-[11px] text-text-muted font-mono">
              <div className="flex items-center gap-2">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <span>SafeHire</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
