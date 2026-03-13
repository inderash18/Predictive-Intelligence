"use client";
import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  X, 
  Zap, 
  Server, 
  Cpu, 
  ShieldCheck,
  Bell,
  Activity,
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RealTimeAlert = () => {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    type: 'critical',
    title: 'Cluster 08 Failure Imminent',
    message: 'Thermal drift exceeding safety threshold by 12.4% on Core-0.',
    icon: Server
  });

  useEffect(() => {
    // Simulate real-time alerts
    const timer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    initial: { opacity: 0, x: 100, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.9 }
  };

  const severityStyles = {
    critical: {
      bg: 'bg-[#ef4444]',
      text: 'text-black',
      border: 'border-white/20',
      iconBg: 'bg-black',
      iconText: 'text-red-500',
      glow: 'shadow-[0_24px_48px_rgba(239,68,68,0.4)]'
    },
    warning: {
      bg: 'bg-orange-500',
      text: 'text-black',
      border: 'border-white/20',
      iconBg: 'bg-black',
      iconText: 'text-orange-500',
      glow: 'shadow-[0_24px_48px_rgba(251,146,60,0.4)]'
    }
  };

  const style = severityStyles[alert.type];

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-12 right-12 z-50 w-[420px]">
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`p-10 rounded-[40px] ${style.bg} ${style.glow} border ${style.border} relative overflow-hidden group`}
          >
            {/* Liquid Background Pulse */}
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute inset-0 bg-black blur-[40px] scale-150 pointer-events-none" 
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-5">
                   <div className={`p-4 ${style.iconBg} rounded-[20px] shadow-2xl group-hover:rotate-[360deg] transition-transform duration-1000`}>
                      <alert.icon className={`w-6 h-6 ${style.iconText}`} />
                   </div>
                   <div className="flex flex-col">
                      <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${style.text} opacity-60 leading-none`}>Neural Alert Vector</span>
                      <h4 className={`text-2xl font-black ${style.text} tracking-tighter mt-1 leading-none uppercase`}>{alert.title}</h4>
                   </div>
                </div>
                <button 
                  onClick={() => setVisible(false)}
                  className={`p-3 rounded-2xl ${style.iconBg} ${style.text} hover:scale-110 active:scale-95 transition-all shadow-xl`}
                >
                  <X className={`w-5 h-5 ${style.iconText}`} />
                </button>
              </div>

              <p className={`text-lg font-bold ${style.text} opacity-80 leading-relaxed max-w-[320px] mb-8 uppercase`}>
                {alert.message}
              </p>

              <div className="flex items-center space-x-5">
                 <button className={`flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl`}>
                    Establish Fail-Safe
                 </button>
                 <button className={`p-4 bg-white/20 backdrop-blur-3xl rounded-2xl border border-white/20 transition-all hover:bg-white/40`}>
                    <Activity className={`w-5 h-5 ${style.text}`} />
                 </button>
              </div>
            </div>

            {/* Animation Progress Bar */}
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 10, ease: 'linear' }}
              onAnimationComplete={() => setVisible(false)}
              className="absolute bottom-0 left-0 h-2 bg-black/20"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RealTimeAlert;
