"use client";
import React, { useState } from 'react';
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
  Eye,
  RotateCcw,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const predictions = [
  { id: 1, type: 'Electricity Forecast', date: '2 hours ago', params: ['450 MW', '28°C', 'Weekday'], result: '854.2 MW', risk: 'Medium', status: 'Completed' },
  { id: 2, type: 'Server Monitor', date: '5 hours ago', params: ['85% CPU', '12ms Latency', '0 Disk Err'], result: '12% Failure Risk', risk: 'Low', status: 'Completed' },
  { id: 3, type: 'PC Health Check', date: '1 day ago', params: ['95°C CPU', '80°C GPU'], result: '98% Crash Risk', risk: 'Critical', status: 'Alert Sent' },
  { id: 4, type: 'Server Monitor', date: '2 days ago', params: ['92% RAM', '50ms Latency', '2 Disk Err'], result: '82% Failure Risk', risk: 'High', status: 'Action Taken' },
  { id: 5, type: 'Electricity Forecast', date: '3 days ago', params: ['300 MW', '15°C', 'Weekend'], result: '280.5 MW', risk: 'Low', status: 'Completed' },
  { id: 6, type: 'PC Health Check', date: '4 days ago', params: ['50°C CPU', '40°C GPU'], result: '72% Stability', risk: 'Medium', status: 'Optimized' },
  { id: 7, type: 'Electricity Forecast', date: '1 week ago', params: ['600 MW', '35°C', 'Weekday'], result: '920.5 MW', risk: 'High', status: 'Completed' },
];

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeActions, setActiveActions] = useState(null);

  const getRiskColor = (level) => {
    switch(level) {
      case 'Critical': return { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', border: 'border-[#EF4444]/20' };
      case 'High': return { bg: 'bg-[#F97316]/10', text: 'text-[#F97316]', border: 'border-[#F97316]/20' };
      case 'Medium': return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20' };
      default: return { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', border: 'border-[#10B981]/20' };
    }
  };

  const getTypeIcon = (type) => {
    if (type.includes('Electricity')) return { icon: Zap, bg: 'bg-gradient-primary text-white' };
    if (type.includes('Server')) return { icon: Server, bg: 'bg-[var(--alternate-bg)] text-[var(--foreground)] border border-[var(--border)]' };
    return { icon: Cpu, bg: 'bg-[var(--alternate-bg)] text-[var(--foreground)] border border-[var(--border)]' };
  };

  const filteredData = predictions.filter(item => 
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.result.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.risk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight">Prediction Records</h1>
          <p className="text-[var(--body-text)] font-medium mt-2">View, filter, and export historical analysis and inference logs.</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4 rounded-2xl border border-[var(--border)]">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--body-text)] w-5 h-5 focus:text-[var(--primary)] transition-colors" />
          <input 
            placeholder="Search records by type, result, or risk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--alternate-bg)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none text-[var(--foreground)] font-medium text-sm placeholder:text-[var(--body-text)]/70 transition-all shadow-inner"
          />
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--alternate-bg)] rounded-xl font-semibold text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-all border border-[var(--border)]">
            <Filter className="w-4 h-4" /> <span>Filters</span> <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--alternate-bg)] rounded-xl font-semibold text-sm text-[var(--foreground)] hover:bg-[var(--border)] transition-all border border-[var(--border)]">
            <Calendar className="w-4 h-4" /> <span>Date Range</span> <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
          </button>
          <div className="h-8 w-px bg-[var(--border)] hidden md:block mx-2" />
          <span className="text-xs font-semibold text-[var(--body-text)] whitespace-nowrap hidden md:block">{filteredData.length} Records</span>
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--alternate-bg)]">
                <th className="px-6 py-4 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Prediction Type</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Parameters</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Result</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--body-text)] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredData.map((pred, i) => {
                const typeStyle = getTypeIcon(pred.type);
                const riskStyle = getRiskColor(pred.risk);
                const isActionsOpen = activeActions === pred.id;

                return (
                  <motion.tr 
                    key={pred.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-[var(--alternate-bg)] transition-colors relative"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform ${typeStyle.bg}`}>
                          <typeStyle.icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-sm text-[var(--foreground)] whitespace-nowrap">{pred.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-[var(--body-text)]">{pred.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {pred.params.map(p => (
                          <span key={p} className="px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-[10px] font-bold text-[var(--body-text)] whitespace-nowrap uppercase">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-sm text-[var(--foreground)]">
                        {pred.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskStyle.bg} ${riskStyle.text} ${riskStyle.border}`}>
                        {pred.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                         onClick={() => setActiveActions(isActionsOpen ? null : pred.id)}
                         className="p-2 text-[var(--body-text)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                         aria-label="More actions"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu for Actions */}
                      <AnimatePresence>
                        {isActionsOpen && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-10 top-12 w-40 bg-[var(--card)] rounded-xl shadow-lg border border-[var(--border)] py-1 z-20"
                          >
                            <button className="w-full text-left px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--alternate-bg)] flex items-center transition-colors">
                              <Eye className="w-4 h-4 mr-2" /> View Details
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--alternate-bg)] flex items-center transition-colors">
                              <RotateCcw className="w-4 h-4 mr-2" /> Re-run
                            </button>
                            <div className="my-1 border-t border-[var(--border)]" />
                            <button className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 flex items-center transition-colors">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                );
              })}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[var(--body-text)]">
                    <p className="font-semibold text-lg">No records found matching "{searchQuery}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Overlay (Clicking outside closes dropdown) */}
        {activeActions && (
          <div className="fixed inset-0 z-10" onClick={() => setActiveActions(null)} />
        )}

        {/* Pagination Controls */}
        <div className="px-6 py-4 bg-[var(--alternate-bg)] border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-[var(--body-text)]">
            Showing <span className="font-bold text-[var(--foreground)]">{filteredData.length}</span> of <span className="font-bold text-[var(--foreground)]">1,240</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-[var(--border)] rounded-lg text-[var(--body-text)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3 py-1.5 bg-[var(--primary)] text-white font-bold text-xs rounded-lg shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-[var(--border)] text-[var(--body-text)] font-semibold text-xs rounded-lg hover:bg-[var(--background)] transition-colors">2</button>
            <button className="px-3 py-1.5 border border-[var(--border)] text-[var(--body-text)] font-semibold text-xs rounded-lg hover:bg-[var(--background)] transition-colors">3</button>
            <span className="text-[var(--body-text)]">...</span>
            <button className="px-3 py-1.5 border border-[var(--border)] text-[var(--body-text)] font-semibold text-xs rounded-lg hover:bg-[var(--background)] transition-colors">124</button>
            <button className="p-2 border border-[var(--border)] rounded-lg text-[var(--body-text)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors"><ChevronRight className="w-4 h-4" /></button>
            
            <div className="ml-4 pl-4 border-l border-[var(--border)] flex items-center">
              <span className="text-xs font-semibold text-[var(--body-text)] mr-2">Rows per page:</span>
              <button className="px-2 py-1.5 border border-[var(--border)] rounded-lg text-xs font-bold text-[var(--foreground)] flex items-center hover:bg-[var(--background)] transition-colors">
                10 <ChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
