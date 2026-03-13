"use client";
import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  Activity, 
  HardDrive, 
  ShieldAlert, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const ServerPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState({
    cpu_usage: 75,
    ram_usage: 82,
    disk_errors: 0,
    latency: 120
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const probability = Math.min(99, (inputs.cpu_usage * 0.3 + inputs.ram_usage * 0.2 + inputs.disk_errors * 15 + inputs.latency * 0.1));
      setResult({
        probability: Math.round(probability),
        status: probability > 70 ? 'Critical' : probability > 40 ? 'Warning' : 'Healthy',
        recommendations: probability > 70 
          ? ["Immediate resource scaling", "Check disk SMART status", "Consider failover"]
          : ["Monitor peak hours", "Optimize cache"],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl">
       <div>
        <h1 className="text-3xl font-bold text-gray-900">Server Sentinel</h1>
        <p className="text-gray-500">Infrastructure failure probability analyzer powered by system metrics.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
            <Server className="w-5 h-5 mr-2 text-blue-500" /> Infrastructure Metrics
          </h3>
          <form onSubmit={handlePredict} className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-gray-700">CPU Usage (%)</label>
                <span className="text-blue-600 font-bold">{inputs.cpu_usage}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={inputs.cpu_usage}
                onChange={(e) => setInputs({...inputs, cpu_usage: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-gray-700">RAM Utilization (%)</label>
                <span className="text-blue-600 font-bold">{inputs.ram_usage}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={inputs.ram_usage}
                onChange={(e) => setInputs({...inputs, ram_usage: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Disk Errors</label>
                <input 
                  type="number" 
                  value={inputs.disk_errors}
                  onChange={(e) => setInputs({...inputs, disk_errors: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Latency (ms)</label>
                <input 
                  type="number" 
                  value={inputs.latency}
                  onChange={(e) => setInputs({...inputs, latency: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center hover:bg-black transition-all"
            >
              {loading ? "Analyzing Hardware Stacks..." : "Analyze Failure Risk"}
            </button>
          </form>
        </div>

        <div>
          {result ? (
            <div className={`h-full rounded-3xl p-8 border ${
              result.status === 'Critical' ? 'bg-red-50 border-red-100' : 
              result.status === 'Warning' ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100'
            }`}>
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className={`text-2xl font-bold ${
                    result.status === 'Critical' ? 'text-red-700' : 
                    result.status === 'Warning' ? 'text-orange-700' : 'text-green-700'
                  }`}>
                    System Health: {result.status}
                  </h3>
                  <p className="text-gray-500 font-medium">Risk Score: {result.probability}%</p>
                </div>
                {result.status === 'Healthy' ? <CheckCircle2 className="w-10 h-10 text-green-500" /> : <AlertTriangle className={`w-10 h-10 ${result.status === 'Critical' ? 'text-red-500' : 'text-orange-500'}`} />}
              </div>

              <div className="space-y-8">
                <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      result.status === 'Healthy' ? 'bg-green-500' : 
                      result.status === 'Warning' ? 'bg-orange-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${result.probability}%` }} 
                  />
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <ShieldAlert className="w-4 h-4 mr-2" /> AI Recommendations
                  </h4>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-center text-sm font-semibold text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${result.status === 'Healthy' ? 'bg-green-400' : 'bg-red-400'}`} />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setResult(null)}
                  className="flex items-center text-gray-500 font-bold hover:text-gray-900 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset Metrics
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center">
              <Activity className="w-16 h-16 text-gray-300 mb-6 animate-pulse" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis Pending</h3>
              <p className="text-gray-500">Provide server telemetry data to calculate failure probability.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerPrediction;
