"use client";
import React from 'react';
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
  Activity
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
      animate={{ width: isCollapsed ? 100 : 300 }}
      className="h-screen fixed left-0 top-0 z-40 bg-card/80 backdrop-blur-2xl flex flex-col border-r border-border shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300"
    >
      {/* Brand Header */}
      <div className="p-8 flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className="min-w-[48px] h-[48px] bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group cursor-pointer hover:rotate-12 transition-transform duration-300">
            <Zap className="text-white w-6 h-6" />
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="font-extrabold text-2xl text-foreground tracking-tight leading-none">PredictX</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Intelligence</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {!isCollapsed && <p className="px-4 mb-4 text-[10px] font-bold text-[#4B5563] dark:text-[#94A3B8] uppercase tracking-wider">Main Menu</p>}
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center h-14 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-gradient-primary shadow-md text-white" 
                  : "hover:bg-[var(--alternate-bg)] text-[var(--body-text)] hover:text-[var(--foreground)]"
              )}
            >
              <div className="flex items-center justify-center min-w-[64px] h-full">
                <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-[var(--body-text)] group-hover:text-[var(--primary)]")} />
              </div>
              
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col flex-1 truncate pr-4"
                >
                  <span className="text-sm font-semibold tracking-tight truncate">
                    {item.name}
                  </span>
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center w-full h-12 rounded-xl text-[var(--body-text)] hover:bg-[var(--alternate-bg)] hover:text-[var(--foreground)] transition-all font-medium text-sm"
        >
          <div className="flex items-center justify-center min-w-[56px]">
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </div>
          {!isCollapsed && <span className="truncate">Collapse Sidebar</span>}
        </button>
        
        <button className="flex items-center w-full h-12 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all font-medium text-sm mt-1">
          <div className="flex items-center justify-center min-w-[56px]">
            <LogOut className="w-5 h-5" />
          </div>
          {!isCollapsed && <span className="truncate">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
