"use client";
import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Calendar,
  Activity,
  ChevronRight,
  Info,
  Search,
  Download,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const ElectricityPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [inputs, setInputs] = useState({
    avg_usage: 450,
    temperature: 28,
    is_weekend: false
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const demand = Math.round(inputs.avg_usage * (1 + (inputs.temperature - 25) * 0.05) * (inputs.is_weekend ? 0.8 : 1.2));
      setPrediction({
        demand,
        peakTime: "19:45 PM",
        confidence: 94.2,
        riskLevel: demand > 600 ? 'High' : (demand > 400 ? 'Medium' : 'Low'),
        trend: [
          { time: '10am', value: demand * 0.6 },
          { time: '12pm', value: demand * 0.8 },
          { time: '2pm', value: demand * 0.9 },
          { time: '4pm', value: demand * 1.05 },
          { time: '6pm', value: demand * 1.2 },
          { time: '8pm', value: demand * 1.1 },
          { time: '10pm', value: demand * 0.7 },
        ]
      });
      setLoading(false);
    }, 1200);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return '#F97316';
      case 'Medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center space-x-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-[#primary] bg-[var(--primary)]" />
             <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Prediction Module</span>
          </div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight">Electricity Forecast</h1>
          <p className="text-[var(--body-text)] font-medium mt-2">Simulate weather and usage variables to predict future grid demand.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-5 py-2.5 bg-[var(--alternate-bg)] border border-[var(--border)] rounded-xl font-semibold text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-all flex items-center group shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Save PDF Report
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-card p-8 rounded-3xl"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-primary text-white rounded-xl shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">Parameters</h3>
              <p className="text-sm text-[var(--body-text)] font-medium">Configure network inputs</p>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center group">
                <label className="text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Average Usage (MW)</label>
                <div className="relative cursor-help">
                  <Info className="w-4 h-4 text-[var(--body-text)] opacity-50 hover:opacity-100 transition-opacity" />
                  <div className="absolute right-0 bottom-6 w-48 p-2 bg-[var(--foreground)] text-[var(--background)] text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 font-medium">
                    Normal baseline typically ranges from 300 to 500 MW.
                  </div>
                </div>
              </div>
              <div className="relative group">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--body-text)] w-5 h-5 group-hover:text-[var(--primary)] transition-colors" />
                <input 
                  type="number" 
                  value={inputs.avg_usage}
                  onChange={(e) => setInputs({...inputs, avg_usage: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--alternate-bg)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all font-bold text-[var(--foreground)] text-lg shadow-inner" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Ambient Temperature</label>
                <span className="font-bold text-lg text-[var(--primary)]">{inputs.temperature}°C</span>
              </div>
              <div className="relative">
                <input 
                  type="range" 
                  min="0" max="50" 
                  value={inputs.temperature}
                  onChange={(e) => setInputs({...inputs, temperature: e.target.value})}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--primary) ${inputs.temperature * 2}%, var(--border) ${inputs.temperature * 2}%)`
                  }}
                />
                <style jsx>{`
                  input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--primary);
                    box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
                    cursor: pointer;
                    transition: transform 0.2s;
                  }
                  input[type=range]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                  }
                `}</style>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[var(--alternate-bg)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-[var(--body-text)]" />
                <span className="text-sm font-bold text-[var(--foreground)]">Is it a Weekend?</span>
              </div>
              <button 
                type="button"
                onClick={() => setInputs({...inputs, is_weekend: !inputs.is_weekend})}
                className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 border ${inputs.is_weekend ? 'bg-[var(--primary)] border-[var(--primary)]' : 'bg-[var(--border)] border-transparent'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${inputs.is_weekend ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-gradient-primary text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg focus:ring-4 focus:ring-[var(--primary)]/30 active:scale-[0.98] transition-all flex items-center justify-center ${loading ? 'opacity-80' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  ANALYZING
                </>
              ) : (
                <>RUN PREDICTION <ArrowRight className="ml-2 w-5 h-5" /></>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {prediction ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Gauge style stat */}
                  <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center relative border border-[var(--border)]">
                    <p className="text-[var(--body-text)] text-xs font-bold uppercase tracking-wider mb-2">Predicted Demand</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-5xl font-extrabold text-[var(--foreground)] tracking-tight">{prediction.demand}</span>
                      <span className="text-lg font-bold text-[var(--body-text)]">MW</span>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-3xl border border-[var(--border)] flex flex-col justify-center text-center overflow-hidden relative">
                    <p className="text-[var(--body-text)] text-xs font-bold uppercase tracking-wider mb-2">Peak Hour</p>
                    <span className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight">{prediction.peakTime}</span>
                    <Clock className="w-16 h-16 absolute -right-4 -bottom-4 text-[var(--border)] opacity-20" />
                  </div>
                  
                  <div className="glass-card p-6 rounded-3xl border border-[var(--border)] flex items-center justify-center relative">
                    <div className="w-32 h-32 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { value: prediction.confidence, fill: 'var(--primary)' },
                              { value: 100 - prediction.confidence, fill: 'var(--border)' }
                            ]}
                            cx="50%" cy="50%"
                            innerRadius={45}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-[var(--foreground)] leading-none">{prediction.confidence}%</span>
                        <span className="text-[10px] font-bold text-[var(--body-text)] uppercase mt-1">Accuracy</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border border-[var(--border)]">
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">Hourly Trend Forecast</h3>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center`} style={{ backgroundColor: `${getRiskColor(prediction.riskLevel)}15`, color: getRiskColor(prediction.riskLevel) }}>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {prediction.riskLevel} Risk Level
                    </div>
                  </div>

                  <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prediction.trend}>
                        <defs>
                          <linearGradient id="gradientTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--border)" />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: 'var(--body-text)', fontSize: 12, fontWeight: 600}} 
                          dy={15}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: 'var(--body-text)', fontSize: 12, fontWeight: 600}} 
                        />
                        <Tooltip 
                           contentStyle={{ 
                             borderRadius: '16px', 
                             border: '1px solid var(--border)', 
                             background: 'var(--card)',
                             color: 'var(--foreground)',
                             fontWeight: 600,
                             boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                           }}
                           cursor={{ stroke: '#2563EB', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2563EB" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#gradientTrend)" 
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* View Details Expandable */}
                  <div className="mt-8 border-t border-[var(--border)] pt-4">
                    <button 
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-sm font-semibold text-[var(--primary)] flex items-center hover:opacity-80 transition-opacity"
                    >
                      {showDetails ? 'Hide Technical Details' : 'View Actionable Insights'} 
                      <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[var(--alternate-bg)] p-6 rounded-2xl border border-[var(--border)]"
                        >
                           <h4 className="font-bold text-[var(--foreground)] mb-2">Automated Recommendation</h4>
                           <p className="text-[var(--body-text)] text-sm leading-relaxed mb-4">
                             Based on the predicted surge of {prediction.demand}MW, ensure standby units are prepared by 18:00 to handle the {prediction.peakTime} peak effectively without grid destabilization.
                           </p>
                           <button className="px-5 py-2.5 bg-white dark:bg-black border border-[var(--border)] rounded-lg font-bold text-sm text-[var(--foreground)] hover:border-[var(--primary)] transition-colors shadow-sm">
                             Acknowledge Alert
                           </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[500px] glass-card bg-[var(--alternate-bg)] rounded-3xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-24 h-24 bg-[var(--background)] rounded-full border border-[var(--border)] flex items-center justify-center shadow-sm mb-6">
                  <Activity className="w-10 h-10 text-[var(--body-text)] opacity-50" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Ready for Prediction</h3>
                <p className="text-[var(--body-text)] max-w-sm font-medium">
                  Adjust the parameters on the left and run the model to generate a custom forecast.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ElectricityPrediction;
