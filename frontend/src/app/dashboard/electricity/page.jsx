"use client";
import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Calendar,
  ZapOff,
  Activity,
  ChevronRight,
  Sparkles,
  Search,
  Download,
  Hexagon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const ElectricityPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [inputs, setInputs] = useState({
    avg_usage: 450,
    temperature: 28,
    is_weekend: false
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setPrediction({
        demand: Math.round(inputs.avg_usage * (1 + (inputs.temperature - 25) * 0.05) * (inputs.is_weekend ? 0.8 : 1.2)),
        peakTime: "19:45 SYNC",
        confidence: 94.2,
        trend: [
          { time: '10am', value: 300 },
          { time: '12pm', value: 450 },
          { time: '2pm', value: 520 },
          { time: '4pm', value: 600 },
          { time: '6pm', value: 750 },
          { time: '8pm', value: 680 },
          { time: '10pm', value: 400 },
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
             <Hexagon className="w-5 h-5 text-orange-500 animate-spin-slow" />
             <span className="text-[11px] font-black text-orange-500 uppercase tracking-[0.4em] leading-none">Electricity Prediction</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter chrome-text leading-none">Check Power Demand</h1>
          <p className="text-white/30 font-semibold text-lg mt-3">Predict how much electricity will be needed based on weather and usage.</p>
        </div>
        <div className="flex space-x-6">
          <button className="px-8 py-4 bg-white/[0.03] border border-white/5 rounded-[20px] font-black text-[10px] text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center group">
            <Download className="w-4 h-4 mr-3 opacity-30 group-hover:text-orange-500 group-hover:opacity-100" /> Save Report
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Input Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-card p-14 rounded-[50px] bg-white/[0.01] border border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="flex items-center space-x-5 mb-14 relative z-10">
            <div className="p-4 bg-white/5 rounded-[22px] border border-white/5 group-hover:rotate-[360deg] transition-transform duration-1000">
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white leading-none tracking-tight">Set Details</h3>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2 block">Enter Prediction Data</span>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-12 relative z-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Average Usage (MW)</label>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6 group-hover:text-orange-500 transition-colors" />
                <input 
                  type="number" 
                  value={inputs.avg_usage}
                  onChange={(e) => setInputs({...inputs, avg_usage: e.target.value})}
                  className="w-full pl-16 pr-8 py-6 rounded-[28px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-orange-500/30 outline-none transition-all font-black text-white text-xl placeholder:text-white/10" 
                  placeholder="SEED_DATA"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">Temperature (°C)</label>
                <span className="text-orange-500 font-black text-xl tracking-tighter">{inputs.temperature}°C</span>
              </div>
              <input 
                type="range" 
                min="0" max="50" 
                value={inputs.temperature}
                onChange={(e) => setInputs({...inputs, temperature: e.target.value})}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div className="flex items-center justify-between p-8 bg-white/[0.02] rounded-[32px] border border-white/5 shadow-2xl">
              <div className="flex items-center space-x-5">
                <Calendar className="w-6 h-6 text-white/20" />
                <span className="text-sm font-black text-white/60 uppercase tracking-widest">Is it a Weekend?</span>
              </div>
              <button 
                type="button"
                onClick={() => setInputs({...inputs, is_weekend: !inputs.is_weekend})}
                className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1.5 border border-white/10 ${inputs.is_weekend ? 'bg-orange-500 text-black' : 'bg-white/5'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-2xl transition-all ${inputs.is_weekend ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-7 bg-white text-black rounded-[28px] font-black text-xl uppercase tracking-tighter flex items-center justify-center shadow-[0_32px_64px_-16px_rgba(255,255,255,0.2)] active:scale-95 transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02] hover:bg-white/90'}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin mr-4" />
                  PREDICTING...
                </div>
              ) : (
                <>RUN PREDICTION <ChevronRight className="ml-3 w-7 h-7" /></>
              )}
            </button>
          </form>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.01] blur-[100px] rounded-full" />
        </motion.div>

        {/* Results Panel */}
        <div className="lg:col-span-8 flex flex-col space-y-10">
          <AnimatePresence mode="wait">
            {prediction ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="glass-card p-12 rounded-[50px] bg-orange-600 text-black shadow-2xl relative overflow-hidden group border-none">
                    <p className="text-black/50 text-[11px] font-black uppercase tracking-[0.3em] mb-3">Predicted Load</p>
                    <div className="flex items-baseline space-x-3 relative z-10">
                      <span className="text-6xl font-black tracking-tighter">{prediction.demand}</span>
                      <span className="text-2xl font-black text-black/30">MW</span>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                  </div>
                  <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.3em] mb-4 flex items-center">
                      <Clock className="w-4 h-4 mr-3 text-orange-500" /> Peak Hour
                    </p>
                    <div className="flex items-baseline space-x-3 relative z-10">
                      <span className="text-5xl font-black text-white tracking-tighter">{prediction.peakTime}</span>
                    </div>
                  </div>
                  <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.3em] mb-4">Accuracy</p>
                    <div className="flex items-baseline space-x-3 relative z-10">
                      <span className="text-5xl font-black text-orange-500 tracking-tighter">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-16 rounded-[60px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-16 relative z-10">
                    <div className="flex items-center space-x-5">
                      <div className="p-4 bg-white/5 text-white/40 border border-white/5 rounded-2xl">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-3xl font-black text-white tracking-tighter">Usage Trend</h3>
                         <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-1 block">Hourly Demand Forecast</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                       <span className="flex items-center text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">
                          <div className="w-3 h-3 rounded-full bg-orange-500 mr-3 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                          NEURAL TENSOR
                       </span>
                    </div>
                  </div>

                  <div className="h-[400px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prediction.trend}>
                        <defs>
                          <linearGradient id="gradientValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.02)" />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: 'rgba(255,255,255,0.15)', fontSize: 10, fontWeight: 900}} 
                          dy={20}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: 'rgba(255,255,255,0.15)', fontSize: 10, fontWeight: 900}} 
                        />
                        <Tooltip 
                           contentStyle={{ 
                             borderRadius: '32px', 
                             border: '1px solid rgba(255,255,255,0.1)', 
                             background: 'rgba(0,0,0,0.9)',
                             padding: '24px',
                             boxShadow: '0 40px 80px rgba(0,0,0,0.8)'
                           }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#fb923c" 
                          strokeWidth={5} 
                          fillOpacity={1} 
                          fill="url(#gradientValue)" 
                          animationDuration={2500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 flex items-center space-x-10 group overflow-hidden relative">
                   <div className="p-6 bg-orange-500 rounded-[28px] shadow-[0_20px_40px_rgba(251,146,60,0.4)] group-hover:scale-110 transition-transform duration-500">
                      <Sparkles className="w-8 h-8 text-black" />
                   </div>
                   <div className="flex-1 relative z-10">
                      <h4 className="text-2xl font-black text-white tracking-tighter mb-2 leading-none">Neural Directives</h4>
                      <p className="text-white/40 font-medium text-lg leading-relaxed">Based on the {prediction.demand}MW surge, initiate <span className="text-orange-500 font-black italic">Grid Protocol 04</span> to stabilize potential harmonics.</p>
                   </div>
                   <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-[18px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all relative z-10">Acknowledge</button>
                   <div className="absolute right-[-20%] bottom-[-50%] w-96 h-96 bg-orange-500/5 blur-[100px] pointer-events-none" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[600px] glass-card bg-white/[0.01] rounded-[60px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-20 text-center relative overflow-hidden"
              >
                <div className="w-32 h-32 bg-white/5 rounded-[40px] flex items-center justify-center shadow-2xl mb-12 relative group cursor-pointer hover:bg-white/10 transition-all">
                  <ZapOff className="w-14 h-14 text-white/10 group-hover:text-orange-500 transition-colors" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(251,146,60,0.8)]" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-6 leading-none">Neural Idle</h3>
                <p className="text-white/20 max-w-md font-medium text-xl leading-relaxed">
                  Neural inference engine awaiting sync parameters. Configure vector seeds to initiate simulation.
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

export default ElectricityPrediction;
