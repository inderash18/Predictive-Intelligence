"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import CommandBar from '@/components/CommandBar';
import RealTimeAlert from '@/components/RealTimeAlert';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
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
