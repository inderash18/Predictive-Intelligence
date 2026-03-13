"use client";
import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Calendar,
  Thermometer,
  ZapOff
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const ElectricityPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [inputs, setInputs] = useState({
    avg_usage: 450,
    temperature: 28,
    is_weekend: false
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPrediction({
        demand: Math.round(inputs.avg_usage * (1 + (inputs.temperature - 25) * 0.05) * (inputs.is_weekend ? 0.8 : 1.2)),
        peakTime: "7:00 PM",
        trend: [
          { time: '10am', value: 300 },
          { time: '12pm', value: 450 },
          { time: '2pm', value: 520 },
          { time: '4pm', value: 600 },
          { time: '6pm', value: 750 },
          { time: '8pm', value: 680 },
          { time: '10pm', value: 400 },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Electricity Demand Forecast</h1>
          <p className="text-gray-500">Predict future energy consumption based on historical patterns and environmental factors.</p>
        </div>
        <div className="flex space-x-2">
          <div className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-xl flex items-center font-semibold border border-yellow-100">
            <Zap className="w-4 h-4 mr-2" /> Live Monitoring
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" /> Prediction Inputs
          </h3>
          <form onSubmit={handlePredict} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-gray-400" /> Historical Usage (MW)
              </label>
              <input 
                type="number" 
                value={inputs.avg_usage}
                onChange={(e) => setInputs({...inputs, avg_usage: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium" 
                placeholder="e.g. 500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Thermometer className="w-4 h-4 mr-1 text-gray-400" /> Temperature (°C)
              </label>
              <input 
                type="number" 
                value={inputs.temperature}
                onChange={(e) => setInputs({...inputs, temperature: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium" 
                placeholder="e.g. 30"
              />
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl">
              <input 
                type="checkbox" 
                checked={inputs.is_weekend}
                onChange={(e) => setInputs({...inputs, is_weekend: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <span className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" /> Is Weekend?
              </span>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center hover:bg-blue-700 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Analyzing Data...
                </>
              ) : (
                <>Run Forecast <ArrowRight className="ml-2 w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {prediction ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm font-medium mb-1">Predicted Peak Demand</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-blue-600">{prediction.demand}</span>
                    <span className="text-xl font-bold text-gray-400">MW</span>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm font-medium mb-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> Estimated Peak Time
                  </p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-gray-900">{prediction.peakTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> Forecasted Usage Trend
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={prediction.trend}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <ZapOff className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Forecast Data</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Enter your parameters and click "Run Forecast" to see the AI analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectricityPrediction;
