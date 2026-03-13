"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Globe,
  Database,
  Building2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Enterprise' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Node Deployed Successfully. Welcome to PredictX.', {
        style: {
          borderRadius: '16px',
          background: '#0f172a',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '12px'
        }
      });
      router.push('/login');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Chrome Background Overlay */}
      <div className="absolute inset-0 z-0 text-white">
        <img 
          src="/bg.png" 
          alt="background" 
          className="w-full h-full object-cover opacity-50 contrast-125 saturate-0 scale-110"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[540px] relative z-10"
      >
        <div className="text-center mb-12">
           <div className="w-16 h-16 bg-white rounded-[22px] flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Database className="text-black w-8 h-8" />
           </div>
           <h1 className="text-4xl font-black tracking-tight text-white uppercase chrome-text">Deploy Global Node</h1>
           <p className="text-white/30 font-medium mt-2">Begin your high-fidelity predictive journey.</p>
        </div>

        <div className="glass-card bg-white/[0.02] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-white/10 rounded-[3rem] p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/5 border border-white/5 focus:ring-2 focus:ring-orange-500 transition-all font-bold text-white placeholder:text-white/10" 
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Type</label>
                <div className="relative group">
                  <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  <select 
                    className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/5 border border-white/5 focus:ring-2 focus:ring-orange-500 transition-all font-bold text-white/50 appearance-none"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option>Enterprise</option>
                    <option>Datacenter</option>
                    <option>Utility Grid</option>
                    <option>Research</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/5 border border-white/5 focus:ring-2 focus:ring-orange-500 transition-all font-bold text-white placeholder:text-white/10 shadow-inner" 
                  placeholder="name@company.ai"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/5 border border-white/5 focus:ring-2 focus:ring-orange-500 transition-all font-black text-white placeholder:text-white/10 shadow-inner" 
                  placeholder="Create complex key"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center group"
              >
                {loading ? (
                   <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Provision Node <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center flex flex-col items-center space-y-6">
          <p className="text-slate-500 font-bold text-sm">
            Already have a deployed node? <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
          <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TLS 1.3</span>
             </div>
             <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Multi-Region Deployment</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
