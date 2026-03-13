"use client";
import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp,
  Cpu,
  Database,
  Network,
  ArrowRight,
  ChevronRight,
  Hexagon,
  Waves,
  Sparkles,
  Search,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const ServerSentinel = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [inputs, setInputs] = useState({
    cpu_usage: 65,
    ram_usage: 78,
    disk_errors: 2,
    latency: 120
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const risk = Math.min(((inputs.cpu_usage * 0.3) + (inputs.ram_usage * 0.2) + (inputs.disk_errors * 15) + (inputs.latency * 0.1)), 100);
      setPrediction({
        riskScore: Math.round(risk),
        status: risk > 70 ? 'CRITICAL_FAILURE_POSSIBLE' : risk > 40 ? 'HARMONIC_INSTABILITY' : 'STATE_STABLE',
        reliability: 98.4,
        drift: [
          { name: 'CPU Drift', value: inputs.cpu_usage, threshold: 90 },
          { name: 'RAM Load', value: inputs.ram_usage, threshold: 95 },
          { name: 'Disk CRC', value: inputs.disk_errors * 20, threshold: 50 },
          { name: 'Network IO', value: (inputs.latency / 500) * 100, threshold: 80 },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <Hexagon className="w-5 h-5 text-blue-500 animate-spin-slow" />
             <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] leading-none">Server Health Check</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter chrome-text leading-none">Server Security</h1>
          <p className="text-white/30 font-semibold text-lg mt-3">Predicting server failures by checking system errors and load.</p>
        </div>
        <div className="flex space-x-6">
          <button className="px-8 py-4 bg-white/[0.03] border border-white/5 rounded-[20px] font-black text-[10px] text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center group">
            <Download className="w-4 h-4 mr-3 opacity-30 group-hover:text-blue-500 group-hover:opacity-100" /> Save Report
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Telemetry Input Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-card p-14 rounded-[50px] bg-white/[0.01] border border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="flex items-center space-x-5 mb-14 relative z-10">
            <div className="p-4 bg-white/5 rounded-[22px] border border-white/5 group-hover:rotate-[360deg] transition-transform duration-1000">
              <Server className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white leading-none tracking-tight">Server Stats</h3>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2 block">Current Performance</span>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-10 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">CPU Load %</label>
                <input 
                  type="number" 
                  value={inputs.cpu_usage}
                  onChange={(e) => setInputs({...inputs, cpu_usage: e.target.value})}
                  className="w-full px-6 py-5 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-blue-500/30 outline-none text-white font-black text-xl"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">RAM Load %</label>
                <input 
                  type="number" 
                  value={inputs.ram_usage}
                  onChange={(e) => setInputs({...inputs, ram_usage: e.target.value})}
                  className="w-full px-6 py-5 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-blue-500/30 outline-none text-white font-black text-xl"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Disk I/O CRC Errors</label>
              <div className="relative group">
                <Database className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6 group-hover:text-blue-500 transition-colors" />
                <input 
                  type="number" 
                  value={inputs.disk_errors}
                  onChange={(e) => setInputs({...inputs, disk_errors: e.target.value})}
                  className="w-full pl-16 pr-8 py-6 rounded-[28px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-blue-500/30 outline-none font-black text-white text-xl"
                />
              </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Latency (ms)</label>
                  <span className="text-blue-500 font-black text-xl tracking-tighter">{inputs.latency}ms</span>
               </div>
               <input 
                 type="range" 
                 min="10" max="1000" 
                 value={inputs.latency}
                 onChange={(e) => setInputs({...inputs, latency: e.target.value})}
                 className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500"
               />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-7 bg-white text-black rounded-[28px] font-black text-xl uppercase tracking-tighter flex items-center justify-center shadow-[0_32px_64px_-16px_rgba(255,255,255,0.2)] active:scale-95 transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02] hover:bg-white/90'}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin mr-4" />
                  CHECKING...
                </div>
              ) : (
                <>CHECK HEALTH <ChevronRight className="ml-3 w-7 h-7" /></>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results Panel */}
        <div className="lg:col-span-8 space-y-10">
          <AnimatePresence mode="wait">
            {prediction ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-10">
                   <div className="glass-card p-14 rounded-[60px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
                      <div className="relative w-64 h-64 scale-125 mb-8">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                               <Pie
                                  data={[
                                    { name: 'Risk', value: prediction.riskScore, fill: prediction.riskScore > 70 ? '#ef4444' : prediction.riskScore > 40 ? '#fb923c' : '#3b82f6' },
                                    { name: 'Safe', value: 100 - prediction.riskScore, fill: 'rgba(255,255,255,0.03)' },
                                  ]}
                                  innerRadius={70}
                                  outerRadius={90}
                                  stroke="none"
                                  startAngle={90}
                                  endAngle={450}
                                  dataKey="value"
                               />
                            </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-black text-white tracking-tighter">{prediction.riskScore}%</span>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-1">Risk Level</span>
                         </div>
                      </div>
                      <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        prediction.riskScore > 70 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        prediction.riskScore > 40 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {prediction.status}
                      </div>
                   </div>

                   <div className="flex flex-col space-y-10">
                      <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden flex-1 group">
                         <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-white tracking-tighter">System Analysis</h3>
                            <ShieldCheck className="w-6 h-6 text-emerald-500/40 group-hover:text-emerald-500 transition-colors" />
                         </div>
                         <div className="space-y-8">
                            {prediction.drift.map((d, i) => (
                              <div key={i} className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                   <span className="text-white/30">{d.name}</span>
                                   <span className={d.value > d.threshold ? 'text-red-500' : 'text-white/60'}>{Math.round(d.value)}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${d.value}%` }}
                                      className={`h-full rounded-full ${d.value > d.threshold ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} 
                                   />
                                </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="glass-card p-16 rounded-[60px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden">
                   <div className="flex items-center space-x-8 mb-12 relative z-10">
                      <div className="p-5 bg-blue-500 rounded-[28px] shadow-[0_20px_40px_rgba(59,130,246,0.3)]">
                         <Sparkles className="w-8 h-8 text-black" />
                      </div>
                      <div>
                         <h4 className="text-3xl font-black text-white tracking-tighter leading-none mb-3">Maintenance Protocol</h4>
                         <p className="text-white/30 font-bold text-lg leading-relaxed max-w-2xl">Neural engines have compiled a prioritized remedial directive dataset.</p>
                      </div>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-8 relative z-10">
                      {[
                        { title: 'IO Purge Protocol', desc: 'Clear node buffer and reset CRC parity sensors.', risk: 'IMMEDIATE', icon: Database },
                        { title: 'Harmonize Network IO', desc: 'Reroute packet flow via $SHARD_B to reduce latency jitters.', risk: 'PLANED', icon: Network },
                      ].map((item, i) => (
                        <div key={i} className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all cursor-pointer">
                           <div className="flex justify-between items-center mb-8">
                              <item.icon className="w-8 h-8 text-white/10 group-hover:text-blue-500 transition-colors" />
                              <span className="px-4 py-1 rounded-lg bg-white/5 text-[9px] font-black text-white/40 uppercase tracking-widest border border-white/5 group-hover:bg-blue-500 group-hover:text-black transition-all">{item.risk}</span>
                           </div>
                           <h5 className="text-2xl font-black text-white tracking-tighter mb-4 uppercase">{item.title}</h5>
                           <p className="text-white/40 font-medium leading-relaxed group-hover:text-white/60 transition-colors uppercase text-sm">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                   <div className="absolute right-[-20%] bottom-[-50%] w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[600px] glass-card bg-white/[0.01] rounded-[60px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-20 text-center relative overflow-hidden"
              >
                <div className="w-32 h-32 bg-white/5 rounded-[40px] flex items-center justify-center shadow-2xl mb-12 relative group cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                  <Activity className="w-14 h-14 text-white/10 group-hover:text-blue-500 transition-colors" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-6 leading-none uppercase">Sensor Idle</h3>
                <p className="text-white/20 max-w-md font-medium text-xl leading-relaxed uppercase">
                  Awaiting telemetry synchronization. Initialize live sensory seed data to view mortality matrix.
                </p>
                <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServerSentinel;
