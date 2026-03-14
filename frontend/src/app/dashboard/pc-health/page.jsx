"use client";
import React, { useState } from 'react';
import { 
  Laptop, 
  ArrowRight, 
  Activity, 
  Thermometer, 
  HardDrive,
  Cpu,
  ChevronRight,
  Info,
  Download,
  AlertTriangle
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
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const PCHealthPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const [inputs, setInputs] = useState({
    cpu_temp: 50,
    gpu_temp: 60,
    ram_usage: 45,
    disk_load: 30
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API logic
    setTimeout(() => {
      const risk_score = (inputs.cpu_temp * 0.4) + (inputs.gpu_temp * 0.3) + (inputs.ram_usage * 0.2) + (inputs.disk_load * 0.1);
      const risk = inputs.cpu_temp > 95 || inputs.gpu_temp > 95 ? 99 : Math.min(99, Math.max(0, risk_score - 30));
      
      let status = "Stable";
      let riskLevel = "Low";
      if (risk > 80) { status = "Critical"; riskLevel = "High"; }
      else if (risk > 50) { status = "Risk of Crash"; riskLevel = "Medium"; }

      setPrediction({
        status,
        riskLevel,
        crashRisk: Math.round(risk),
        trend: [
          { time: '-30m', value: Math.max(0, risk - 20) },
          { time: '-20m', value: Math.max(0, risk - 10) },
          { time: '-10m', value: Math.max(0, risk - 5) },
          { time: 'Now', value: risk },
          { time: '+10m', value: Math.min(100, risk + 5) },
          { time: '+20m', value: Math.min(100, risk + 15) },
          { time: '+30m', value: Math.min(100, risk + 20) },
        ]
      });
      setLoading(false);
    }, 1200);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const SliderInput = ({ label, icon: Icon, min, max, value, suffix, onChange }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <label className="text-xs font-bold text-[var(--body-text)] uppercase tracking-wider flex items-center">
           <Icon className="w-4 h-4 mr-2" /> {label}
        </label>
        <span className="font-bold text-lg text-[var(--primary)]">{value}{suffix}</span>
      </div>
      <div className="relative group px-1">
        <input 
          type="range" 
          min={min} max={max} 
          value={value}
          onChange={onChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer border border-[var(--border)]"
          style={{
            background: `linear-gradient(to right, var(--primary) ${(value - min) / (max - min) * 100}%, var(--alternate-bg) ${(value - min) / (max - min) * 100}%)`
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
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center space-x-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
             <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Prediction Module</span>
          </div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight">Computer Health Check</h1>
          <p className="text-[var(--body-text)] font-medium mt-2">Evaluate thermal dynamics and physical strain to predict hardware failure.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-5 py-2.5 bg-[var(--alternate-bg)] border border-[var(--border)] rounded-xl font-semibold text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-all flex items-center shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export Log
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 glass-card p-8 rounded-3xl border border-[var(--border)]"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-primary text-white rounded-xl shadow-md">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">Hardware Bio-Stats</h3>
              <p className="text-sm text-[var(--body-text)] font-medium">Device internal logic</p>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-8">
            <SliderInput 
              label="CPU Temp" icon={Thermometer} 
              min="20" max="110" value={inputs.cpu_temp} suffix="°C" 
              onChange={(e) => setInputs({...inputs, cpu_temp: e.target.value})} 
            />
            <SliderInput 
              label="GPU Temp" icon={Thermometer} 
              min="20" max="110" value={inputs.gpu_temp} suffix="°C" 
              onChange={(e) => setInputs({...inputs, gpu_temp: e.target.value})} 
            />
            <SliderInput 
              label="RAM Usage" icon={Cpu} 
              min="0" max="100" value={inputs.ram_usage} suffix="%" 
              onChange={(e) => setInputs({...inputs, ram_usage: e.target.value})} 
            />
            <SliderInput 
              label="Disk Load" icon={HardDrive} 
              min="0" max="100" value={inputs.disk_load} suffix="%" 
              onChange={(e) => setInputs({...inputs, disk_load: e.target.value})} 
            />

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
                <>EVALUATE HEALTH <ArrowRight className="ml-2 w-5 h-5" /></>
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
                  <div className="glass-card p-6 rounded-3xl border border-[var(--border)] flex items-center justify-center relative">
                    <div className="w-32 h-32 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { value: prediction.crashRisk, fill: getRiskColor(prediction.riskLevel) },
                              { value: 100 - prediction.crashRisk, fill: 'var(--border)' }
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
                        <span className="text-xl font-bold text-[var(--foreground)] leading-none">{prediction.crashRisk}%</span>
                        <span className="text-[10px] font-bold text-[var(--body-text)] uppercase mt-1">Crash Risk</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center border border-[var(--border)]">
                    <p className="text-[var(--body-text)] text-xs font-bold uppercase tracking-wider mb-3">System Stability</p>
                    <span 
                       className="text-2xl font-extrabold tracking-tight px-4 py-2 bg-[var(--alternate-bg)]/50 rounded-xl"
                       style={{ color: getRiskColor(prediction.riskLevel) }}
                    >
                      {prediction.status}
                    </span>
                  </div>
                  
                  <div className="glass-card p-6 rounded-3xl border border-[var(--border)] flex flex-col justify-center text-center overflow-hidden relative">
                    <p className="text-[var(--body-text)] text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 mr-2" /> Severity
                    </p>
                    <div className={`mx-auto px-6 py-2 rounded-full text-base font-bold bg-[var(--background)] shadow-sm`} style={{ color: getRiskColor(prediction.riskLevel) }}>
                      {prediction.riskLevel}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border border-[var(--border)]">
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">Temporal Decay Matrix</h3>
                    <div className="text-xs font-medium text-[var(--body-text)] px-3 py-1 bg-[var(--alternate-bg)] border border-[var(--border)] rounded-full">
                       Crash Threshold Proximity
                    </div>
                  </div>

                  <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prediction.trend}>
                        <defs>
                          <linearGradient id="pcGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={getRiskColor(prediction.riskLevel)} stopOpacity={0.2}/>
                            <stop offset="95%" stopColor={getRiskColor(prediction.riskLevel)} stopOpacity={0}/>
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
                          domain={[0, 100]}
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
                           cursor={{ stroke: getRiskColor(prediction.riskLevel), strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={getRiskColor(prediction.riskLevel)} 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#pcGradient)" 
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-8 border-t border-[var(--border)] pt-4">
                    <button 
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-sm font-semibold text-[var(--primary)] flex items-center hover:opacity-80 transition-opacity"
                    >
                      {showDetails ? 'Hide Root Cause Analysis' : 'Show Remediation Suggestions'} 
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
                           <h4 className="font-bold text-[var(--foreground)] mb-3">Diagnostic Advice</h4>
                           <ul className="text-[var(--body-text)] text-sm leading-relaxed mb-4 list-disc pl-5 space-y-1">
                             {inputs.cpu_temp > 85 && <li><strong className="text-[var(--foreground)]">Critical:</strong> Clean CPU fan or replace thermal paste to prevent logic core melting.</li>}
                             {inputs.gpu_temp > 80 && <li><strong className="text-[var(--foreground)]">Warning:</strong> Improve chassis airflow, GPU thermal throttling imminent.</li>}
                             {inputs.ram_usage > 90 && <li><strong className="text-[var(--foreground)]">Notice:</strong> System paging heavily. Close background apps.</li>}
                             {prediction.riskLevel === 'Low' && <li><strong className="text-[#10B981]">Clear:</strong> System operating within safe biological constraints.</li>}
                           </ul>
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
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Ready for Diagnostics</h3>
                <p className="text-[var(--body-text)] max-w-sm font-medium">
                  Scan and submit device telemetry (Temperature, RAM, HDD) to analyze system longevity.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PCHealthPrediction;
