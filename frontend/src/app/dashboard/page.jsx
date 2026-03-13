"use client";
import React from 'react';
import { 
  Zap, 
  Server, 
  Cpu, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Clock
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
  Bar
} from 'recharts';

const data = [
  { name: '00:00', usage: 400, failure: 10, crashes: 2 },
  { name: '04:00', usage: 300, failure: 15, crashes: 5 },
  { name: '08:00', usage: 600, failure: 5, crashes: 1 },
  { name: '12:00', usage: 800, failure: 20, crashes: 8 },
  { name: '16:00', usage: 700, failure: 30, crashes: 12 },
  { name: '20:00', usage: 900, failure: 10, crashes: 4 },
  { name: '23:59', usage: 500, failure: 8, crashes: 2 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-sm font-bold flex items-center ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change} <TrendingUp className="ml-1 w-4 h-4" />
      </span>
    </div>
    <p className="text-gray-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Dashboard</h1>
        <p className="text-gray-500">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Electricity Demand" 
          value="524 MW" 
          change="+12.5%" 
          icon={Zap} 
          color="bg-yellow-50 text-yellow-600" 
        />
        <StatCard 
          title="Failure Risk" 
          value="Low" 
          change="-4.2%" 
          icon={Server} 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="System Health" 
          value="98.2%" 
          change="+0.8%" 
          icon={Activity} 
          color="bg-green-50 text-green-600" 
        />
        <StatCard 
          title="Active Models" 
          value="12" 
          change="+2" 
          icon={Cpu} 
          color="bg-purple-50 text-purple-600" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">Infrastructure Demand Trends</h3>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 text-gray-600 focus:ring-0">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Real-time Risk Alerts</h3>
          <div className="space-y-6">
            {[
              { type: 'Server Failure', level: 'High', time: '12 mins ago', icon: Server, color: 'text-red-500 bg-red-50' },
              { type: 'Demand Spike', level: 'Medium', time: '45 mins ago', icon: Zap, color: 'text-orange-500 bg-orange-50' },
              { type: 'System Update', level: 'Info', time: '2 hours ago', icon: Cpu, color: 'text-blue-500 bg-blue-50' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start space-x-4 group cursor-pointer hover:translate-x-1 transition-transform">
                <div className={`p-3 rounded-xl ${alert.color}`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900">{alert.type}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">{alert.level}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
            View All Logs
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">System Crash Risk Probability</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="crashes" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Quick System Audit</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Model Accuracy</span>
                <span className="text-blue-600 font-bold">94.2%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Server Stability</span>
                <span className="text-green-500 font-bold">89.5%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '89.5%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Predicted Downtime</span>
                <span className="text-red-400 font-bold">0.4h / month</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
