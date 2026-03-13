"use client";
import React, { useState } from 'react';
import { 
  Cpu, 
  Thermometer, 
  Dna, 
  Activity, 
  ShieldCheck, 
  AlertOctagon,
  Fan,
  Monitor
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const PCHealth = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState({
    cpu_temp: 65,
    gpu_temp: 70,
    ram_usage: 60,
    disk_load: 40
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const risk = Math.min(99, (inputs.cpu_temp * 0.4 + inputs.gpu_temp * 0.3 + inputs.ram_usage * 0.2 + inputs.disk_load * 0.1) - 30);
      setResult({
        risk: Math.max(5, Math.round(risk)),
        status: risk > 80 ? 'Critical' : risk > 50 ? 'Unstable' : 'Optimized',
        chartData: [
          { name: 'CPU', val: inputs.cpu_temp, limit: 90 },
          { name: 'GPU', val: inputs.gpu_temp, limit: 85 },
          { name: 'RAM', val: inputs.ram_usage, limit: 95 },
          { name: 'Disk', val: inputs.disk_load, limit: 100 },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl">
       <div>
        <h1 className="text-3xl font-bold text-gray-900">PC Health & Crash Predictor</h1>
        <p className="text-gray-500">Hardware thermals and resource load analysis to prevent sudden system crashes.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
            <Monitor className="w-5 h-5 mr-2 text-purple-600" /> Hardware Telemetry
          </h3>
          <form onSubmit={handlePredict} className="space-y-6">
            {[
              { label: 'CPU Temperature (°C)', key: 'cpu_temp', icon: Thermometer },
              { label: 'GPU Temperature (°C)', key: 'gpu_temp', icon: Fan },
              { label: 'RAM Utilization (%)', key: 'ram_usage', icon: Activity },
              { label: 'Disk Persistence (%)', key: 'disk_load', icon: Cpu },
            ].map((field) => (
              <div key={field.key}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-600 flex items-center">
                    <field.icon className="w-4 h-4 mr-1 text-gray-400" /> {field.label}
                  </label>
                  <span className="text-purple-600 font-bold">{inputs[field.key]}</span>
                </div>
                <input 
                  type="range" 
                  min="30" max="100" 
                  value={inputs[field.key]}
                  onChange={(e) => setInputs({...inputs, [field.key]: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            ))}
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-100 flex items-center justify-center hover:bg-purple-700 transition-all"
            >
              {loading ? "Simulating Stress Test..." : "Calculate Crash Risk"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 space-y-8">
          {result ? (
            <>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-gray-500 font-bold mb-1">System Stability Score</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-5xl font-extrabold ${
                      result.status === 'Optimized' ? 'text-green-500' : 
                      result.status === 'Unstable' ? 'text-orange-500' : 'text-red-500'
                    }`}>{100 - result.risk}%</span>
                    <span className="text-xl font-bold text-gray-400">Stable</span>
                  </div>
                  <div className={`mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${
                     result.status === 'Optimized' ? 'bg-green-50 text-green-700' : 
                     result.status === 'Unstable' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {result.status === 'Optimized' ? <ShieldCheck className="w-4 h-4 mr-2" /> : <AlertOctagon className="w-4 h-4 mr-2" />}
                    Status: {result.status}
                  </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 flex items-center justify-center">
                  <Dna className="w-48 h-48 rotate-12" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" /> Real-time Thermal Distribution
                </h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="val" radius={[8, 8, 0, 0]} barSize={40}>
                        {result.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.val > entry.limit * 0.8 ? '#ef4444' : '#8b5cf6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center">
              <Thermometer className="w-16 h-16 text-gray-300 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Check System Health</h3>
              <p className="text-gray-500">Optimize cooling and workload by forecasting potential system crashes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCHealth;
