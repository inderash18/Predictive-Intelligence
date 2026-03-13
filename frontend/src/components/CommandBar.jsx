"use client";
import React, { useState, useEffect } from 'react';
import { 
  Command, 
  Search, 
  Bell, 
  Settings, 
  User,
  Zap,
  Server,
  Cpu,
  History,
  LayoutDashboard,
  Moon,
  Sun,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

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
      <div className="flex items-center justify-between px-10 py-5 bg-black/20 backdrop-blur-3xl sticky top-0 z-30 border-b border-white/5">
        <div className="flex items-center flex-1 max-w-xl">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-4 px-6 py-3 w-full max-w-md bg-white/5 hover:bg-white/10 rounded-2xl text-white/20 text-sm transition-all border border-white/5 group"
          >
            <Search className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
            <span className="flex-1 text-left font-semibold text-white/30 group-hover:text-white/50">Search...</span>
            <span className="bg-white/10 px-2 py-0.5 rounded-lg border border-white/5 text-[10px] font-black text-white/40">⌘K</span>
          </button>
        </div>

        <div className="flex items-center space-x-8">
          <div className="relative group">
            <button className="p-3 text-white/40 hover:text-orange-500 hover:bg-orange-500/10 rounded-2xl transition-all relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-black animate-pulse" />
            </button>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />
          
          <button className="flex items-center space-x-4 px-2 py-2 pr-5 rounded-full hover:bg-white/5 shadow-2xl transition-all border border-transparent hover:border-white/5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-400 p-[1px]">
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=4" alt="profile" />
               </div>
            </div>
            <div className="flex flex-col items-start">
               <span className="text-sm font-black text-white group-hover:text-orange-500 transition-colors">Marcus Vance</span>
               <span className="text-[10px] font-bold text-white/30 group-hover:text-white/50 uppercase tracking-widest">Admin</span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -24 }}
              className="w-full max-w-3xl bg-black/40 rounded-[32px] shadow-2xl border border-white/10 overflow-hidden relative z-10 backdrop-blur-3xl"
            >
              <div className="flex items-center px-8 py-7 border-b border-white/5">
                <Search className="w-6 h-6 text-orange-500 mr-6" />
                <input 
                  autoFocus
                  placeholder="Search and run commands..."
                  className="w-full bg-transparent border-none focus:ring-0 text-2xl font-black text-white placeholder:text-white/10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                <p className="px-5 mb-4 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Quick Actions</p>
                <div className="space-y-2">
                  {filteredCommands.map((cmd) => (
                    <button 
                      key={cmd.name}
                      onClick={() => { setIsOpen(false); }}
                      className="w-full flex items-center space-x-5 px-6 py-5 rounded-2xl hover:bg-white/5 group transition-all border border-transparent hover:border-white/5"
                    >
                      <div className="w-12 h-12 bg-white/5 p-3 rounded-xl flex items-center justify-center transition-colors group-hover:bg-orange-500/10 border border-white/5">
                        <cmd.icon className="w-6 h-6 text-white/40 group-hover:text-orange-500 shadow-sm" />
                      </div>
                      <div className="flex-1 text-left">
                         <span className="block font-black text-white group-hover:text-orange-500 tracking-tight transition-colors">{cmd.name}</span>
                         <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest leading-none">Run Module</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/5 group-hover:text-orange-500/40 transition-all group-hover:translate-x-1" />
                    </button>
                  ))}
                  {filteredCommands.length === 0 && (
                    <div className="p-16 text-center">
                      <Zap className="w-16 h-16 text-white/5 mx-auto mb-6" />
                      <p className="text-white/20 font-black text-xl">No active nodes found for "{search}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <div className="flex space-x-10">
                  <div className="flex items-center space-x-3">
                    <span className="bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[10px] font-black text-white/40">ENT</span>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">Select</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[10px] font-black text-white/40">ESC</span>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">Close</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                   <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest opacity-80">System Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const ChevronRight = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default CommandBar;
