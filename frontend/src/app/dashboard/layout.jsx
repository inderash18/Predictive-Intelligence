"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import CommandBar from '@/components/CommandBar';
import RealTimeAlert from '@/components/RealTimeAlert';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Dynamic Background Image */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src="/liquid_chrome_abstract_bg_1773422680996.png" 
          alt="bg" 
          className="w-full h-full object-cover scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div 
        className="flex-1 flex flex-col relative z-20 transition-all duration-500"
        style={{ marginLeft: isCollapsed ? '120px' : '340px' }}
      >
        <CommandBar />
        <main className="p-4 md:p-10 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <RealTimeAlert />
      </div>
    </div>
  );
};

export default DashboardLayout;
