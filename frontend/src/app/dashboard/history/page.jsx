"use client";
import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Zap, 
  Server, 
  Cpu, 
  Download,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const mockHistory = [
  { id: 1, type: 'electricity', date: '2024-03-20 14:30', result: '524 MW', risk: 'Medium', status: 'Stable' },
  { id: 2, type: 'server', date: '2024-03-20 12:15', result: '12% Failure', risk: 'Low', status: 'Healthy' },
  { id: 3, type: 'pc_health', date: '2024-03-19 18:45', result: '82% Risk', risk: 'High', status: 'Critical' },
  { id: 4, type: 'server', date: '2024-03-19 10:20', result: '45% Failure', risk: 'Medium', status: 'Warning' },
  { id: 5, type: 'electricity', date: '2024-03-18 22:10', result: '310 MW', risk: 'Low', status: 'Optimal' },
];

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (type) => {
    switch(type) {
      case 'electricity': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'server': return <Server className="w-5 h-5 text-blue-500" />;
      case 'pc_health': return <Cpu className="w-5 h-5 text-purple-500" />;
      default: return <History className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Healthy':
      case 'Optimal':
      case 'Stable': return 'bg-green-50 text-green-700';
      case 'Warning': return 'bg-orange-50 text-orange-700';
      case 'Critical': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prediction History</h1>
          <p className="text-gray-500">Track and manage your historical AI analysis results.</p>
        </div>
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 flex items-center hover:bg-gray-50 transition-all">
          <Download className="w-5 h-5 mr-2" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold flex items-center text-sm border border-transparent hover:border-gray-200 transition-all">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <select className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm border border-transparent focus:ring-0">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Module</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Prediction Result</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Risk Level</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                        {getIcon(item.type)}
                      </div>
                      <span className="font-bold text-gray-900 capitalize">{item.type.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-500 font-medium">{item.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-900 font-bold">{item.result}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.risk === 'High' ? 'bg-red-100 text-red-600' : 
                      item.risk === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.risk} Risk
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">Showing 5 of 128 predictions</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
