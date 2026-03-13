"use client";
import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Zap, 
  Server, 
  Cpu, 
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  History as HistoryIcon,
  Hexagon
} from 'lucide-react';
import { motion } from 'framer-motion';

const predictions = [
  { id: 1, type: 'Electricity', date: '2024-03-13 14:12 SYNC', result: '854.2 MW', risk: 'Medium', status: 'Completed' },
  { id: 2, type: 'Server', date: '2024-03-13 12:45 SYNC', result: '12% Failure Risk', risk: 'Low', status: 'Completed' },
  { id: 3, type: 'PC Health', date: '2024-03-13 10:20 SYNC', result: '98% Stability', risk: 'Low', status: 'Stable' },
  { id: 4, type: 'Server', date: '2024-03-12 21:10 SYNC', result: '82% Failure Risk', risk: 'Critical', status: 'Action Taken' },
  { id: 5, type: 'Electricity', date: '2024-03-12 18:30 SYNC', result: '920.5 MW', risk: 'High', status: 'Completed' },
  { id: 6, type: 'PC Health', date: '2024-03-12 15:45 SYNC', result: '72% Stability', risk: 'Warning', status: 'Optimized' },
];

const HistoryPage = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <Hexagon className="w-5 h-5 text-white animate-spin-slow opacity-20" />
             <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] leading-none">Prediction Records</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter chrome-text leading-none uppercase">History</h1>
          <p className="text-white/30 font-semibold text-lg mt-3 uppercase">A list of all previous predictions and results.</p>
        </div>
        <div className="flex space-x-6">
          <button className="px-8 py-4 bg-white/[0.03] border border-white/5 rounded-[20px] font-black text-[10px] text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center group shadow-2xl">
            <Download className="w-5 h-5 mr-3 opacity-30 group-hover:text-orange-500 group-hover:opacity-100" /> Full Audit Export
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between glass-card p-10 rounded-[40px] bg-white/[0.01] border border-white/5 shadow-2xl">
        <div className="relative w-full md:w-[500px] group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 w-6 h-6 group-hover:text-orange-500 transition-colors" />
          <input 
            placeholder="Initiate Search Sequence..."
            className="w-full pl-16 pr-8 py-6 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-orange-500/30 outline-none text-white font-black text-sm uppercase tracking-widest placeholder:text-white/10"
          />
        </div>
        <div className="flex items-center space-x-6 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-4 px-10 py-5 bg-white/5 rounded-[20px] font-black text-[10px] text-white/40 hover:bg-white/10 transition-all border border-white/5 uppercase tracking-[0.2em]">
            <Filter className="w-4 h-4" /> <span>Filters</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-4 px-10 py-5 bg-white/5 rounded-[20px] font-black text-[10px] text-white/40 hover:bg-white/10 transition-all border border-white/5 uppercase tracking-[0.2em]">
            <Calendar className="w-4 h-4" /> <span>Sync Range</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card rounded-[50px] bg-white/[0.01] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-12 py-8 text-[11px] font-black text-white/10 uppercase tracking-[0.4em]">Module Name</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/10 uppercase tracking-[0.4em] text-center">Date & Time</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/10 uppercase tracking-[0.4em]">Result</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/10 uppercase tracking-[0.4em] text-center">Risk</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/10 uppercase tracking-[0.4em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {predictions.map((pred, i) => (
                <motion.tr 
                  key={pred.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <td className="px-12 py-10">
                    <div className="flex items-center space-x-6">
                      <div className={`p-4 rounded-2xl border border-white/5 group-hover:scale-110 transition-all duration-500 ${
                        pred.type === 'Electricity' ? 'bg-orange-500/10 text-orange-500' :
                        pred.type === 'Server' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {pred.type === 'Electricity' ? <Zap className="w-6 h-6" /> :
                         pred.type === 'Server' ? <Server className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                      </div>
                      <div className="flex flex-col">
                         <span className="font-black text-lg text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight">{pred.type} Insight</span>
                         <span className="text-[9px] font-black text-white/10 uppercase tracking-widest mt-1">Operational Module</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10 text-center text-[11px] font-black text-white/20 uppercase tracking-widest">
                    {pred.date}
                  </td>
                  <td className="px-12 py-10">
                    <span className="font-mono text-xs font-black text-white/80 bg-white/5 px-6 py-2.5 rounded-xl border border-white/5 shadow-2xl group-hover:border-white/20 transition-all">
                      {pred.result}
                    </span>
                  </td>
                  <td className="px-12 py-10 text-center">
                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      pred.risk === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20 group-hover:bg-red-500 group-hover:text-black' :
                      pred.risk === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 group-hover:bg-orange-500 group-hover:text-black' :
                      pred.risk === 'Warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-black' : 
                      'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black'
                    }`}>
                      {pred.risk}
                    </span>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <button className="p-4 text-white/10 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-white/10">
                      <MoreHorizontal className="w-6 h-6" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-12 py-10 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Showing 6 of 1,240 inferences generated across $CORE_SYNC</p>
          <div className="flex space-x-3">
            <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-white/20 hover:bg-white/10 transition-all"><ChevronLeft className="w-5 h-5" /></button>
            <button className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl">1</button>
            <button className="px-6 py-3 bg-white/5 border border-white/5 text-white/30 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">2</button>
            <button className="px-6 py-3 bg-white/5 border border-white/5 text-white/30 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">3</button>
            <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-white/20 hover:bg-white/10 transition-all"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
