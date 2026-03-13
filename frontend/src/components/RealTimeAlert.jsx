"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  X, 
  Zap, 
  Server, 
  Cpu, 
  Info,
  BellRing
} from 'lucide-react';

const RealTimeAlert = () => {
  const [alerts, setAlerts] = useState([]);

  // Mocking real-time arrivals
  useEffect(() => {
    const timer = setTimeout(() => {
      addAlert({
        id: Date.now(),
        title: "Server Crash Risk",
        message: "AI detected an 82% risk that Server B might crash soon.",
        severity: "critical",
        icon: Server
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
    // Auto remove after 10 seconds
    setTimeout(() => {
      removeAlert(alert.id);
    }, 10000);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const severityStyles = {
    critical: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-orange-50 border-orange-200 text-orange-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconStyles = {
    critical: "bg-red-500 text-white",
    warning: "bg-orange-500 text-white",
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col space-y-4 max-w-sm w-full">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`p-6 rounded-[2rem] border shadow-2xl backdrop-blur-xl flex items-start space-x-4 relative overflow-hidden group ${severityStyles[alert.severity]}`}
          >
            <div className={`p-2.5 rounded-xl shadow-lg shrink-0 ${iconStyles[alert.severity]}`}>
              <alert.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 pr-6">
              <h4 className="font-extrabold text-sm tracking-tight mb-1">{alert.title}</h4>
              <p className="text-[11px] font-medium opacity-80 leading-relaxed">{alert.message}</p>
            </div>
            <button 
              onClick={() => removeAlert(alert.id)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {/* Animated Progress Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-black/10"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RealTimeAlert;
