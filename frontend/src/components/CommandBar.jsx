"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Sun,
  Moon,
  LayoutDashboard,
  Zap,
  Server,
  Cpu,
  History,
  Settings,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');

  // Simple script to toggle .dark class on <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Electricity Prediction', icon: Zap, href: '/dashboard/electricity' },
    { name: 'Server Monitoring', icon: Server, href: '/dashboard/server' },
    { name: 'Computer Health', icon: Cpu, href: '/dashboard/pc-health' },
    { name: 'History', icon: History, href: '/dashboard/history' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 bg-[var(--background)]/80 backdrop-blur-3xl sticky top-0 z-30 border-b border-[var(--border)] shadow-sm">
        <div className="flex items-center flex-1 max-w-xl">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-3 px-4 py-2 w-full max-w-sm bg-[var(--alternate-bg)] hover:bg-[var(--border)] rounded-full text-[var(--body-text)] text-sm transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none"
            aria-label="Search and run commands"
          >
            <Search className="w-4 h-4 text-[var(--body-text)] group-hover:text-[var(--primary)] transition-colors" />
            <span className="flex-1 text-left font-medium">Search...</span>
            <span className="bg-white dark:bg-black px-2 py-0.5 rounded shadow-sm border border-[var(--border)] text-xs font-bold text-[var(--body-text)]">⌘K</span>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
            className="p-2 text-[var(--body-text)] hover:text-[var(--primary)] hover:bg-[var(--alternate-bg)] rounded-full transition-all focus:ring-2 focus:ring-[var(--primary)] outline-none"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <div className="relative group">
            <button className="p-2 text-[var(--body-text)] hover:text-[var(--primary)] hover:bg-[var(--alternate-bg)] rounded-full transition-all relative focus:ring-2 focus:ring-[var(--primary)] outline-none" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--background)] animate-pulse" />
            </button>
          </div>

          <div className="h-8 w-px bg-[var(--border)]" />
          
          <button className="flex items-center space-x-3 px-2 py-1 pr-4 rounded-full hover:bg-[var(--alternate-bg)] transition-all border border-transparent hover:border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border)]">
              <img src="https://ui-avatars.com/api/?name=Marcus+Vance&background=random" alt="User Profile" />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
               <span className="text-sm font-bold text-[var(--foreground)] leading-none">Marcus Vance</span>
               <span className="text-xs font-medium text-[var(--body-text)]">Admin</span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden relative z-10"
            >
              <div className="flex items-center px-6 py-4 border-b border-[var(--border)]">
                <Search className="w-5 h-5 text-[var(--primary)] mr-4" />
                <input 
                  autoFocus
                  placeholder="What do you need?"
                  className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium text-[var(--foreground)] placeholder:text-[var(--body-text)] outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="p-4 max-h-[400px] overflow-y-auto">
                <p className="px-4 mb-2 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Quick Actions</p>
                <div className="space-y-1">
                  {filteredCommands.map((cmd) => (
                    <button 
                      key={cmd.name}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-[var(--alternate-bg)] group transition-all text-left"
                    >
                      <div className="p-2 rounded-md bg-[var(--alternate-bg)] group-hover:bg-[var(--primary)] text-[var(--body-text)] group-hover:text-white transition-colors">
                        <cmd.icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1 font-semibold text-[var(--foreground)]">{cmd.name}</span>
                      <ChevronRight className="w-5 h-5 text-[var(--border)] group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-1" />
                    </button>
                  ))}
                  {filteredCommands.length === 0 && (
                    <div className="py-12 text-center text-[var(--body-text)]">
                      <p className="font-semibold text-lg">No results found for "{search}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-3 bg-[var(--alternate-bg)] border-t border-[var(--border)] flex items-center justify-end">
                <div className="flex items-center space-x-2 text-xs text-[var(--body-text)] font-medium">
                  <span className="bg-white dark:bg-black px-2 py-0.5 rounded shadow-sm border border-[var(--border)] shadow-sm">esc</span>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandBar;
