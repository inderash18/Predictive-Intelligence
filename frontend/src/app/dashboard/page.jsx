"use client";
import React from 'react';
import { 
  Zap, 
  Server, 
  Cpu, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  Clock,
  ExternalLink,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  Hexagon,
  Waves
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
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
import { motion } from 'framer-motion';

const data = [
  { name: '00', usage: 400, failure: 10, crashes: 2 },
  { name: '04', usage: 300, failure: 15, crashes: 5 },
  { name: '08', usage: 600, failure: 5, crashes: 1 },
  { name: '12', usage: 800, failure: 20, crashes: 8 },
  { name: '16', usage: 700, failure: 30, crashes: 12 },
  { name: '20', usage: 900, failure: 10, crashes: 4 },
  { name: '24', usage: 500, failure: 8, crashes: 2 },
];

const ringData = [
  { name: 'Available', value: 92, fill: '#fb923c' },
  { name: 'Used', value: 8, fill: 'rgba(255,255,255,0.05)' },
];

const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
  <motion.div 
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="glass-card p-10 rounded-[40px] bg-white/[0.02] border border-white/5 shadow-2xl relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-10">
      <div className={`p-5 rounded-[20px] bg-white/5 border border-white/5 group-hover:border-orange-500/20 transition-all ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center ${change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
        {change} {change.startsWith('+') ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <TrendingUp className="ml-1 w-3 h-3 rotate-180" />}
      </div>
    </div>
    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{title}</p>
    <div className="flex items-baseline space-x-3">
      <h3 className="text-5xl font-black text-white tracking-tighter">{value}</h3>
      {trend && <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">{trend}</span>}
    </div>
    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/[0.01] rounded-full blur-3xl group-hover:bg-orange-500/5 transition-all duration-700" />
  </motion.div>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <Hexagon className="w-5 h-5 text-orange-500 animate-spin-slow" />
             <span className="text-[11px] font-black text-orange-500 uppercase tracking-[0.4em] leading-none">System Status: Active</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter chrome-text">Dashboard Overview</h1>
          <p className="text-white/30 font-semibold text-lg mt-3">Tracking performance and health of all connected servers.</p>
        </div>
        <div className="flex space-x-6">
          <button className="px-8 py-4 bg-white/[0.03] border border-white/5 rounded-[20px] font-black text-[10px] text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center group">
            <Clock className="w-4 h-4 mr-3 opacity-30 group-hover:text-orange-500 group-hover:opacity-100" /> Past 24 Hours
          </button>
          <button className="px-8 py-4 bg-white text-black rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-white/90 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] transition-all">
            Export Data
          </button>
        </div>
      </div>

      {/* Primary Stat Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Electricity Demand" 
          value="854.2" 
          change="+12.5%" 
          trend="MW"
          icon={Zap} 
          color="text-orange-500" 
        />
        <StatCard 
          title="Server Failure Risk" 
          value="0.02" 
          change="-4.2%" 
          trend="Safety Index"
          icon={Server} 
          color="text-blue-500" 
        />
        <StatCard 
          title="System Health" 
          value="98.2%" 
          change="+0.8%" 
          trend="Score"
          icon={Activity} 
          color="text-emerald-500" 
        />
        <StatCard 
          title="Workload Speed" 
          value="12.4" 
          change="+2.1" 
          trend="TFLOP/S"
          icon={Cpu} 
          color="text-red-500" 
        />
      </div>

      {/* Main Analytics Section */}
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Large Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 glass-card p-14 rounded-[50px] bg-white/[0.01] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-start mb-16 relative z-10">
            <div>
              <h3 className="text-4xl font-black text-white tracking-tighter leading-none">Usage Trend</h3>
              <p className="text-white/20 text-sm font-bold mt-3 uppercase tracking-widest">Real-time Data vs Prediction</p>
            </div>
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
              <button className="px-6 py-2 bg-white text-black rounded-xl shadow-2xl text-[10px] font-black uppercase tracking-widest">Live Data</button>
              <button className="px-6 py-2 text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">Prediction</button>
            </div>
          </div>
          
          <div className="h-[450px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="name" 
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
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 32px 64px -16px rgb(0 0 0 / 0.8)',
                    padding: '24px'
                  }}
                  cursor={{ stroke: '#fb923c', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#fb923c" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#usageGradient)" 
                  animationDuration={3000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Suggestion Side Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 flex flex-col space-y-10"
        >
          <div className="glass-card p-12 rounded-[50px] bg-orange-600 text-black shadow-[0_40px_80px_-20px_rgba(251,146,60,0.4)] relative overflow-hidden group border-none">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-black rounded-3xl group-hover:rotate-[360deg] transition-transform duration-1000">
                  <BrainCircuit className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">AI Suggestion</span>
              </div>
              <p className="text-3xl font-black leading-[1.1] mb-10 tracking-tighter">
                "Server temperature rising. Check cooling system to prevent shutdown."
              </p>
              <button className="flex items-center text-xs font-black bg-black text-white px-8 py-4 rounded-[18px] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                Fix Now <ChevronRight className="ml-3 w-5 h-5 text-orange-500" />
              </button>
            </div>
            {/* Liquid overlay for the colored card */}
            <div className="absolute inset-0 bg-white/10 opacity-30 group-hover:opacity-10 group-hover:scale-150 transition-all duration-1000 pointer-events-none" />
             <div className="absolute right-[-20%] bottom-[-20%] w-60 h-60 bg-black/20 rounded-full blur-[100px] pointer-events-none" />
          </div>

          <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 flex-1 relative overflow-hidden">
             <div className="flex justify-between items-center mb-12 relative z-10">
                <h3 className="font-black text-2xl text-white tracking-tighter">System Issues</h3>
                <span className="px-3 py-1 rounded-lg bg-orange-500 text-black text-[10px] font-black tracking-widest animate-pulse">2 CRITICAL</span>
             </div>
             <div className="space-y-8 relative z-10">
                {[
                  { title: 'Power Surge Forecast', time: '15 mins ago', icon: Zap, color: 'text-orange-500' },
                  { title: 'Server 04 Lagging', time: '42 mins ago', icon: Server, color: 'text-blue-500' },
                  { title: 'System Working Well', time: '4 hours ago', icon: ShieldCheck, color: 'text-emerald-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-6 p-6 rounded-[28px] hover:bg-white/[0.04] transition-all border border-transparent hover:border-white/5 cursor-pointer group">
                    <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${item.color} group-hover:bg-white/10 transition-colors border border-white/5 shadow-2xl group-hover:rotate-12`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-white leading-none mb-2 tracking-tight group-hover:text-orange-500 transition-colors uppercase">{item.title}</p>
                      <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">{item.time}</p>
                    </div>
                    <ExternalLink className="ml-auto w-5 h-5 text-white/5 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                ))}
             </div>
             <div className="absolute right-[-30%] top-[-30%] w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Grid for Distribution Analytics */}
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group">
          <div className="w-56 h-56 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ringData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {ringData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-white tracking-tighter shadow-orange-500/20 group-hover:scale-110 transition-transform">92%</span>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Core IQ</span>
            </div>
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-3xl font-black text-white tracking-tighter mb-6 text-center md:text-left">Machine Survival Confidence</h3>
            <p className="text-white/30 font-medium leading-relaxed text-center md:text-left max-w-sm mb-10 text-lg">
              Aggregate neural confidence across $NODE_SYNC protocol. Operational integrity confirmed.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-white/[0.03] rounded-[24px] border border-white/5 hover:border-white/20 transition-all group cursor-pointer shadow-2xl">
                <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] mb-3">Sync Drift</p>
                <p className="text-2xl font-black text-white">0.002%</p>
              </div>
              <div className="p-6 bg-white/[0.03] rounded-[24px] border border-white/5 hover:border-white/20 transition-all group cursor-pointer shadow-2xl">
                <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] mb-3">Core Heartbeat</p>
                <p className="text-2xl font-black text-white">0.4ms</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-orange-500/5 blur-[120px] rounded-full scale-0 group-hover:scale-100 transition-all duration-1000" />
        </div>

        <div className="glass-card p-12 rounded-[50px] bg-white/[0.01] border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-16 relative z-10">
            <h3 className="text-3xl font-black text-white tracking-tighter">Neuro-Node Distribution</h3>
            <div className="px-5 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-xl border border-emerald-500/20 tracking-widest shadow-2xl">SYNCED</div>
          </div>
          <div className="h-[250px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ borderRadius: '24px', background: '#000', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
                />
                <Bar dataKey="failure" fill="#fff" radius={[12, 12, 12, 12]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.failure > 20 ? '#fb923c' : 'rgba(255,255,255,0.1)'} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-10 px-4 relative z-10">
            {['US-EAST-1', 'EU-CENT-1', 'AP-SOUTH-1', 'SA-EAST-1'].map(r => (
              <span key={r} className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] group-hover:text-white/40 transition-colors">{r}</span>
            ))}
          </div>
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
              <Waves className="absolute bottom-0 right-0 w-80 h-80 text-orange-500/10 -rotate-12" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
