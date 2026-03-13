"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Zap, 
  Server, 
  Cpu, 
  History, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Activity,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Electricity Prediction', icon: Zap, href: '/dashboard/electricity' },
  { name: 'Server Monitoring', icon: Server, href: '/dashboard/server' },
  { name: 'PC Health', icon: Cpu, href: '/dashboard/pc-health' },
  { name: 'Prediction History', icon: History, href: '/dashboard/history' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();

  return (
    <motion.div 
      animate={{ width: isCollapsed ? 120 : 340 }}
      className="h-screen fixed left-0 top-0 z-40 bg-black/60 backdrop-blur-[64px] flex flex-col border-r border-white/5 shadow-[24px_0_64px_rgba(0,0,0,0.8)] transition-all duration-500"
    >
      {/* Brand Header */}
      <div className="p-10 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-5 overflow-hidden">
          <div className="min-w-[56px] h-[56px] bg-white rounded-[24px] flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] group cursor-pointer hover:rotate-[360deg] transition-transform duration-1000">
            <Zap className="text-black w-8 h-8" />
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-black text-3xl text-white tracking-tighter leading-none">PredictX</span>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mt-2">Intelligence</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-6 space-y-3 overflow-y-auto custom-scrollbar">
        {!isCollapsed && <p className="px-6 mb-6 text-[11px] font-black text-white/10 uppercase tracking-[0.3em]">Synapse Mapping</p>}
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center h-16 rounded-[24px] transition-all duration-500",
                isActive 
                  ? "bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" 
                  : "hover:bg-white/[0.03]"
              )}
            >
              <div className={cn(
                "flex items-center justify-center min-w-[70px] h-full transition-all duration-500",
                isActive ? "text-orange-500" : "text-white/20 group-hover:text-white/60"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]")} />
              </div>
              
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col"
                >
                  <span className={cn(
                    "text-sm font-black tracking-tight transition-colors",
                    isActive ? "text-white" : "text-white/40 group-hover:text-white"
                  )}>
                    {item.name}
                  </span>
                  <span className="text-[9px] font-bold text-white/10 uppercase group-hover:text-white/20 transition-colors">Module Ready</span>
                </motion.div>
              )}

              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-pill"
                  className="absolute right-4 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      {!isCollapsed && (
        <div className="mx-8 mb-10 p-8 rounded-[32px] bg-white/[0.03] border border-white/5 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                 <Activity className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Neural Output</span>
            </div>
            <p className="text-xs font-bold text-white/50 leading-relaxed mb-6 group-hover:text-white/80 transition-colors">Processing 1.4M events/s across distributed nodes.</p>
            <div className="flex items-end space-x-1 h-8 mb-4">
               {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   transition={{ repeat: Infinity, duration: 1 + Math.random(), repeatType: 'reverse' }}
                   className="flex-1 bg-white/10 rounded-t-sm" 
                 />
               ))}
            </div>
            <div className="flex justify-between text-[9px] font-black tracking-widest text-orange-500">
               <span>CORE SYNC</span>
               <span>STABLE</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/5 bg-black/40">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center w-full h-14 rounded-2xl text-white/10 hover:bg-white/5 hover:text-white/60 transition-all font-bold text-sm"
        >
          <div className="flex items-center justify-center min-w-[56px]">
            {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </div>
          {!isCollapsed && <span className="uppercase tracking-[0.2em] text-[10px] font-black">Collapse Core</span>}
        </button>
        
        <button className="flex items-center w-full h-14 rounded-2xl text-red-500/40 hover:bg-red-500/5 hover:text-red-500 transition-all font-bold text-sm mt-2">
          <div className="flex items-center justify-center min-w-[56px]">
            <LogOut className="w-6 h-6" />
          </div>
          {!isCollapsed && <span className="uppercase tracking-[0.2em] text-[10px] font-black">Detach Session</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
