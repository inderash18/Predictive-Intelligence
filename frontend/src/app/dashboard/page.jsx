"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Server, 
  Cpu, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  Clock,
  ExternalLink,
  ChevronRight,
  Hexagon,
  Download
} from 'lucide-react';
import { 
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
  { name: 'Mon', usage: 400, failure: 10, crashes: 2 },
  { name: 'Tue', usage: 300, failure: 15, crashes: 5 },
  { name: 'Wed', usage: 600, failure: 5, crashes: 1 },
  { name: 'Thu', usage: 800, failure: 20, crashes: 8 },
  { name: 'Fri', usage: 700, failure: 30, crashes: 12 },
  { name: 'Sat', usage: 900, failure: 10, crashes: 4 },
  { name: 'Sun', usage: 500, failure: 8, crashes: 2 },
];

const ringData = [
  { name: 'Available', value: 92, fill: '#10B981' },
  { name: 'Used', value: 8, fill: 'var(--border)' },
];

const StatCard = ({ title, value, change, icon: Icon, colorClass, trend, sparklineData }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="glass-card p-6 rounded-3xl relative overflow-hidden group border border-[var(--border)]"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl bg-[var(--alternate-bg)] text-[var(--body-text)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${change.startsWith('+') ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
        {change} {change.startsWith('+') ? <ArrowUpRight className="ml-1 w-3 h-3" /> : <TrendingUp className="ml-1 w-3 h-3 rotate-180" />}
      </div>
    </div>
    <p className="text-[var(--body-text)] text-sm font-semibold mb-2">{title}</p>
    <div className="flex items-baseline space-x-2">
      <h3 className="text-3xl font-bold text-[var(--foreground)]">{value}</h3>
      {trend && <span className="text-xs text-[var(--body-text)] font-semibold uppercase">{trend}</span>}
    </div>
    
    {sparklineData && (
      <div className="h-12 w-full mt-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="usage" stroke="#2563EB" strokeWidth={2} fill="url(#sparkGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
  </motion.div>
);

const PredictionCard = ({ title, desc, icon: Icon, href, status, statusColor }) => (
  <Link href={href}>
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-card p-8 rounded-3xl group cursor-pointer flex flex-col h-full border border-[var(--border)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${statusColor}`}>
          {status}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{title}</h3>
      <p className="text-[var(--body-text)] text-sm leading-relaxed mb-8 flex-1">{desc}</p>
      
      <button className="w-full py-4 rounded-xl border border-[var(--border)] font-semibold text-[var(--foreground)] hover:bg-[var(--alternate-bg)] transition-colors flex items-center justify-center group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] text-sm">
        Run Prediction <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </motion.div>
  </Link>
);


const DashboardOverview = () => {
  return (
    <div className="space-y-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center space-x-2 mb-3">
             <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
             <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">System Active</span>
          </div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight">Dashboard Overview</h1>
          <p className="text-[var(--body-text)] font-medium text-base mt-2">Monitor predictive analytics and hardware health across your infrastructure.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-[var(--alternate-bg)] border border-[var(--border)] rounded-xl font-semibold text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-all flex items-center group">
            <Clock className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" /> Past 24 Hours
          </button>
          <button className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Primary Stat Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Avg. Electricity Demand" 
          value="854.2" 
          change="+12.5%" 
          trend="MW"
          icon={Zap} 
          sparklineData={data.map(d => ({ usage: d.usage + 100 }))}
        />
        <StatCard 
          title="Server Failure Risk" 
          value="0.02" 
          change="-4.2%" 
          trend="Index"
          icon={Server} 
          sparklineData={data.map(d => ({ usage: 30 - d.failure }))}
        />
        <StatCard 
          title="System Health" 
          value="98.2%" 
          change="+0.8%" 
          trend="Score"
          icon={Activity} 
          sparklineData={data.map(d => ({ usage: 90 + d.crashes }))}
        />
        <StatCard 
          title="Workload Speed" 
          value="12.4" 
          change="+2.1" 
          trend="TFLOP/S"
          icon={Cpu} 
          sparklineData={data}
        />
      </div>

      {/* Main Prediction Modules */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-[var(--foreground)]">Prediction Modules</h2>
           <Link href="/dashboard/history" className="text-sm font-semibold text-[var(--primary)] hover:underline flex items-center">
             View All Records <ChevronRight className="w-4 h-4 ml-1" />
           </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
           <PredictionCard 
             title="Electricity Forecast"
             desc="Predict future power consumption based on historical trends, weather drift, and temporal data."
             icon={Zap}
             href="/dashboard/electricity"
             status="Healthy"
             statusColor="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
           />
           <PredictionCard 
             title="Server Monitor"
             desc="Analyze server telemetry (CPU, RAM, Disk I/O, Latency) to predict catastrophic failure risk."
             icon={Server}
             href="/dashboard/server"
             status="Warning"
             statusColor="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
           />
           <PredictionCard 
             title="PC Health Check"
             desc="Monitor physical hardware decay, thermal states, and crash risks for individual workstations."
             icon={Cpu}
             href="/dashboard/pc-health"
             status="Stable"
             statusColor="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
           />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid lg:grid-cols-12 gap-6 pt-6">
        {/* Large Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 glass-card p-8 rounded-3xl border border-[var(--border)]"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">Usage Trend Forecast</h3>
              <p className="text-[var(--body-text)] text-sm font-medium mt-1">Machine prediction vs Historical baseline</p>
            </div>
            <div className="flex bg-[var(--alternate-bg)] p-1 rounded-lg border border-[var(--border)]">
              <button className="px-4 py-1.5 bg-white dark:bg-[#1E293B] shadow-sm rounded-md text-sm font-bold text-[var(--foreground)]">Live Data</button>
              <button className="px-4 py-1.5 text-sm font-semibold text-[var(--body-text)] hover:text-[var(--foreground)]">Predicted</button>
            </div>
          </div>
          
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="usageGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'var(--body-text)', fontSize: 12, fontWeight: 600}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'var(--body-text)', fontSize: 12, fontWeight: 600}} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid var(--border)', 
                    background: 'var(--card)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: 'var(--foreground)',
                    fontWeight: 600
                  }}
                  cursor={{ stroke: '#2563EB', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#usageGradient2)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI System Status */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 flex flex-col space-y-6"
        >
          <div className="glass-card p-8 rounded-3xl border border-[var(--border)] flex-1">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-xl text-[var(--foreground)] tracking-tight">System Alerts</h3>
                <span className="px-3 py-1 rounded-full bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 text-xs font-bold animate-soft-pulse">1 CRITICAL</span>
             </div>
             <div className="space-y-4">
                {[
                  { title: 'Cooling Unit Failure', time: '15 mins ago', icon: Server, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10' },
                  { title: 'Node 04 Latency High', time: '42 mins ago', icon: Activity, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
                  { title: 'Power Model Calibrated', time: '4 hours ago', icon: Hexagon, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[var(--alternate-bg)] transition-all border border-transparent hover:border-[var(--border)] cursor-pointer group">
                    <div className={`w-12 h-12 ${item.bg} rounded-[14px] flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors">{item.title}</p>
                      <p className="text-xs font-semibold text-[var(--body-text)]">{item.time}</p>
                    </div>
                    <ExternalLink className="ml-auto w-4 h-4 text-[var(--border)] group-hover:text-[var(--primary)] transition-all" />
                  </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default DashboardOverview;
