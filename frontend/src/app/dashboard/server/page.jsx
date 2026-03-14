"use client";
import React, { useState } from 'react';
import { 
  Server, 
  ArrowRight, 
  Activity, 
  Cpu, 
  HardDrive,
  Wifi,
  ChevronRight,
  Info,
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
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const ServerPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const [inputs, setInputs] = useState({
    cpu_usage: 45,
    ram_usage: 60,
    disk_errors: 0,
    network_latency: 12
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const failure_score = (inputs.cpu_usage * 0.3) + (inputs.ram_usage * 0.2) + (inputs.disk_errors * 10) + (inputs.network_latency * 0.1);
      const risk = Math.min(99, failure_score / 100);
      
      let healthStatus = "Healthy";
      let riskLevel = "Low";
      if (risk > 0.7) { healthStatus = "Critical"; riskLevel = "High"; }
      else if (risk > 0.4) { healthStatus = "Warning"; riskLevel = "Medium"; }

      setPrediction({
        status: healthStatus,
        riskLevel,
        failureProbability: Math.round(risk * 100),
        trend: [
          { time: '-60m', value: Math.max(0, risk * 100 - 15) },
          { time: '-45m', value: Math.max(0, risk * 100 - 10) },
          { time: '-30m', value: Math.max(0, risk * 100 - 5) },
          { time: '-15m', value: risk * 100 },
          { time: 'Now', value: risk * 100 + 5 },
          { time: '+15m', value: Math.min(100, risk * 100 + 15) },
          { time: '+30m', value: Math.min(100, risk * 100 + 25) },
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
          <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight">Server Monitor</h1>
          <p className="text-[var(--body-text)] font-medium mt-2">Analyze infrastructure metadata to predict catastrophic node failures.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-5 py-2.5 bg-[var(--alternate-bg)] border border-[var(--border)] rounded-xl font-semibold text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-all flex items-center shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export Diagnostics
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
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">Node Telemetry</h3>
              <p className="text-sm text-[var(--body-text)] font-medium">Configure hardware parameters</p>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-8">
            <SliderInput 
              label="CPU Usage" icon={Cpu} 
              min="0" max="100" value={inputs.cpu_usage} suffix="%" 
              onChange={(e) => setInputs({...inputs, cpu_usage: e.target.value})} 
            />
            <SliderInput 
              label="RAM Usage" icon={Activity} 
              min="0" max="100" value={inputs.ram_usage} suffix="%" 
              onChange={(e) => setInputs({...inputs, ram_usage: e.target.value})} 
            />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center group">
                <label className="text-xs font-bold text-[var(--body-text)] uppercase tracking-wider flex items-center">
                   <HardDrive className="w-4 h-4 mr-2" /> Disk Errors
                </label>
                <div className="relative cursor-help">
                  <Info className="w-4 h-4 text-[var(--body-text)] opacity-50 hover:opacity-100" />
                  <div className="absolute right-0 bottom-6 w-48 p-2 bg-[var(--foreground)] text-[var(--background)] text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 font-medium">
                    Number of I/O errors detected recently. High values heavily impact risk.
                  </div>
                </div>
              </div>
              <input 
                type="number" 
                value={inputs.disk_errors}
                onChange={(e) => setInputs({...inputs, disk_errors: e.target.value})}
                className="w-full px-4 py-4 rounded-xl bg-[var(--alternate-bg)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all font-bold text-[var(--foreground)] text-lg shadow-inner" 
              />
            </div>

            <SliderInput 
              label="Network Latency" icon={Wifi} 
              min="0" max="500" value={inputs.network_latency} suffix="ms" 
              onChange={(e) => setInputs({...inputs, network_latency: e.target.value})} 
            />

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-gradient-primary text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg focus:ring-4 focus:ring-[var(--primary)]/30 active:scale-[0.98] transition-all flex items-center justify-center ${loading ? 'opacity-80' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  RUNNING CHECK
                </>
              ) : (
                <>ANALYZE NODE STATUS <ArrowRight className="ml-2 w-5 h-5" /></>
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
                              { value: prediction.failureProbability, fill: getRiskColor(prediction.riskLevel) },
                              { value: 100 - prediction.failureProbability, fill: 'var(--border)' }
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
                        <span className="text-xl font-bold text-[var(--foreground)] leading-none">{prediction.failureProbability}%</span>
                        <span className="text-[10px] font-bold text-[var(--body-text)] uppercase mt-1">Risk</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center border border-[var(--border)]">
                    <p className="text-[var(--body-text)] text-xs font-bold uppercase tracking-wider mb-3">Overall Health</p>
                    <span 
                       className="text-3xl font-extrabold tracking-tight"
                       style={{ color: getRiskColor(prediction.riskLevel) }}
                    >
                      {prediction.status}
                    </span>
                  </div>
                  
                  <div className="glass-card p-6 rounded-3xl border border-[var(--border)] flex flex-col justify-center text-center overflow-hidden relative">
                    <p className="text-[var(--body-text)] text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 mr-2" /> Alert Level
                    </p>
                    <div className={`mx-auto px-4 py-1.5 rounded-full text-sm font-bold border`} style={{ borderColor: getRiskColor(prediction.riskLevel) + '40', color: getRiskColor(prediction.riskLevel), backgroundColor: getRiskColor(prediction.riskLevel) + '15' }}>
                      {prediction.riskLevel} Priority
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border border-[var(--border)]">
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">Failure Trajectory</h3>
                    <div className="text-xs font-medium text-[var(--body-text)] px-3 py-1 bg-[var(--alternate-bg)] border border-[var(--border)] rounded-full">
                       Predicted Time-to-Failure
                    </div>
                  </div>

                  <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prediction.trend}>
                        <defs>
                          <linearGradient id="serverGradient" x1="0" y1="0" x2="0" y2="1">
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
                          fill="url(#serverGradient)" 
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
                      {showDetails ? 'Hide Diagnostics' : 'View Suggested Remediation'} 
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
                           <h4 className="font-bold text-[var(--foreground)] mb-2">Automated Directives</h4>
                           <ul className="text-[var(--body-text)] text-sm leading-relaxed mb-4 list-disc pl-5">
                             {inputs.cpu_usage > 80 && <li>Scale CPU compute resources immediately to prevent thermal capping.</li>}
                             {inputs.disk_errors > 0 && <li>High impact I/O fault detected. Schedule drive array RAID regeneration.</li>}
                             {prediction.riskLevel === 'High' && <li>Failover secondary node to active state. Drain traffic from current node.</li>}
                             {prediction.riskLevel === 'Low' && <li>Operating parameters nominal. No action required.</li>}
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
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Awaiting Telemetry</h3>
                <p className="text-[var(--body-text)] max-w-sm font-medium">
                  Provide node metrics (CPU, RAM, Disk, Latency) to simulate failure probability.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServerPrediction;
