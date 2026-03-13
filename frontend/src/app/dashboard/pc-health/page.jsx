"use client";
import React, { useState } from 'react';
import { 
  Cpu, 
  Thermometer, 
  Activity, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight,
  Hexagon,
  Sparkles,
  Search,
  Download,
  Fingerprint,
  Zap,
  Waves
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const PCHealthPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [inputs, setInputs] = useState({
    cpu_temp: 55,
    gpu_temp: 62,
    ram_usage: 12,
    disk_load: 45
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const stability = 100 - (Math.max(0, inputs.cpu_temp - 70) * 2 + Math.max(0, inputs.gpu_temp - 80) * 1.5 + (inputs.ram_usage > 14 ? 20 : 0));
      setPrediction({
        stabilityScore: Math.round(Math.max(0, stability)),
        crashRisk: stability < 50 ? 'HIGH_MORTALITY' : stability < 80 ? 'STATE_UNSTABLE' : 'STABLE_NODE',
        thermalMap: [
          { segment: 'Core 0', temp: inputs.cpu_temp, limit: 95 },
          { segment: 'Core 1', temp: inputs.cpu_temp + 2, limit: 95 },
          { segment: 'VRAM', temp: inputs.gpu_temp - 5, limit: 105 },
          { segment: 'HotSpot', temp: inputs.gpu_temp + 12, limit: 110 },
        ],
        history: [
          { t: '12:00', stability: 98 },
          { t: '12:15', stability: 96 },
          { t: '12:30', stability: 92 },
          { t: '12:45', stability: 94 },
          { t: '13:00', stability: 88 },
          { t: '13:15', stability: stability },
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
             <Hexagon className="w-5 h-5 text-emerald-500 animate-spin-slow" />
             <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none">Computer Health Check</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter chrome-text leading-none">System Stability</h1>
          <p className="text-white/30 font-semibold text-lg mt-3">Check if your computer is healthy or if it might crash soon.</p>
        </div>
        <div className="flex space-x-6">
          <button className="px-8 py-4 bg-white/[0.03] border border-white/5 rounded-[20px] font-black text-[10px] text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center group">
            <Fingerprint className="w-4 h-4 mr-3 opacity-30 group-hover:text-emerald-500 group-hover:opacity-100" /> Log In
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Thermal Input Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-card p-14 rounded-[50px] bg-white/[0.01] border border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="flex items-center space-x-5 mb-14 relative z-10">
            <div className="p-4 bg-white/5 rounded-[22px] border border-white/5 group-hover:rotate-[360deg] transition-transform duration-1000">
              <Thermometer className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white leading-none tracking-tight">System Heat</h3>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2 block">Check Temperatures</span>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-12 relative z-10">
            <div className="space-y-8">
              <div className="space-y-3">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">CPU Temperature</label>
                    <span className="text-white font-black text-lg">{inputs.cpu_temp}°C</span>
                 </div>
                 <input type="range" min="30" max="100" value={inputs.cpu_temp} onChange={(e) => setInputs({...inputs, cpu_temp: e.target.value})} className="w-full h-1 bg-white/5 rounded-full appearance-none accent-emerald-500" />
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">GPU Core Temp</label>
                    <span className="text-white font-black text-lg">{inputs.gpu_temp}°C</span>
                 </div>
                 <input type="range" min="30" max="100" value={inputs.gpu_temp} onChange={(e) => setInputs({...inputs, gpu_temp: e.target.value})} className="w-full h-1 bg-white/5 rounded-full appearance-none accent-emerald-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">RAM Usage (GB)</label>
                <input 
                  type="number" 
                  value={inputs.ram_usage}
                  onChange={(e) => setInputs({...inputs, ram_usage: e.target.value})}
                  className="w-full px-6 py-5 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-emerald-500/30 outline-none text-white font-black text-xl"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Disk Load %</label>
                <input 
                  type="number" 
                  value={inputs.disk_load}
                  onChange={(e) => setInputs({...inputs, disk_load: e.target.value})}
                  className="w-full px-6 py-5 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-emerald-500/30 outline-none text-white font-black text-xl"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-7 bg-white text-black rounded-[28px] font-black text-xl uppercase tracking-tighter flex items-center justify-center shadow-[0_32px_64px_-16px_rgba(255,255,255,0.2)] active:scale-95 transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02] hover:bg-white/90'}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin mr-4" />
                  SYNCING DIE...
                </div>
              ) : (
                <>ANALYZE INTEGRITY <ChevronRight className="ml-3 w-7 h-7" /></>
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
                                    { name: 'Stability', value: prediction.stabilityScore, fill: prediction.stabilityScore < 50 ? '#ef4444' : prediction.stabilityScore < 80 ? '#fb923c' : '#10b981' },
                                    { name: 'Loss', value: 100 - prediction.stabilityScore, fill: 'rgba(255,255,255,0.03)' },
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
                            <span className="text-6xl font-black text-white tracking-tighter">{prediction.stabilityScore}%</span>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-1 text-center leading-none">Integrity <br /> Quotient</span>
                         </div>
                      </div>
                      <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        prediction.stabilityScore < 50 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        prediction.stabilityScore < 80 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        {prediction.crashRisk}
                      </div>
                   </div>

                   <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-center mb-10">
                         <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Inference Matrix</h3>
                         <Activity className="w-6 h-6 text-emerald-500/40" />
                      </div>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={prediction.history}>
                            <Line 
                              type="monotone" 
                              dataKey="stability" 
                              stroke="#10b981" 
                              strokeWidth={4} 
                              dot={false}
                              animationDuration={2500}
                            />
                            <Tooltip contentStyle={{background: '#000', border: 'none', borderRadius: '16px'}} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-8 p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                         <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Stability Summary</p>
                         <p className="text-sm font-bold text-white/60 leading-relaxed uppercase">Neural core confirms structural integrity across silicon lattice. No fatal drift detected.</p>
                      </div>
                   </div>
                </div>

                <div className="glass-card p-16 rounded-[60px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden">
                   <div className="flex items-center space-x-8 mb-16 relative z-10">
                      <div className="p-5 bg-emerald-500 rounded-[28px] shadow-[0_20px_40px_rgba(16,185,129,0.3)]">
                         <Zap className="w-8 h-8 text-black" />
                      </div>
                      <div>
                         <h4 className="text-3xl font-black text-white tracking-tighter leading-none mb-3">Hardware Cooling Directive</h4>
                         <p className="text-white/30 font-bold text-lg leading-relaxed uppercase">Optimal thermal distribution compiled via bi-neural simulation.</p>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-4 gap-6 relative z-10">
                      {prediction.thermalMap.map((node, i) => (
                        <div key={i} className="p-8 rounded-[36px] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-all cursor-pointer">
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">{node.segment}</p>
                           <p className={`text-4xl font-black mb-4 ${node.temp > node.limit - 10 ? 'text-red-500' : 'text-white'}`}>{node.temp}°C</p>
                           <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full ${node.temp > node.limit - 10 ? 'bg-red-500' : 'bg-emerald-500'} transition-all duration-1000`} style={{width: `${(node.temp/node.limit)*100}%`}} />
                           </div>
                        </div>
                      ))}
                   </div>
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
                  <Activity className="w-14 h-14 text-white/10 group-hover:text-emerald-500 transition-colors" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-6 uppercase">Node Survival Offline</h3>
                <p className="text-white/20 max-w-md font-medium text-xl leading-relaxed uppercase">
                  Hardware telemetry sub-system dormant. Synchronize sensor seeds to view local survival quotients.
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

export default PCHealthPredictor;
