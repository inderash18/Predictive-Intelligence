"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  X, 
  Eye, 
  ArrowRight, 
  Github,
  Chrome
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('token', 'mock_token');
      toast.success('Login Successful', {
        style: {
          borderRadius: '24px',
          background: '#111',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      });
      router.push('/dashboard');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
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
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-[700px] min-h-[500px] glass-card rounded-[40px] relative z-10 flex flex-col p-8 md:p-14 overflow-hidden"
      >
        {/* Close Button & Right Arrow Navigation */}
        <button className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform">
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Auth Tabs */}
        <div className="flex items-center justify-center space-x-12 mb-16">
          <button 
            onClick={() => setActiveTab('signin')}
            className="group relative"
          >
            <span className={`text-5xl font-bold transition-all ${activeTab === 'signin' ? 'text-white' : 'text-white/20 hover:text-white/40'}`}>Sign In</span>
            {activeTab === 'signin' && (
              <motion.div 
                layoutId="underline"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-2 bg-orange-500 rounded-full"
              />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('join')}
            className={`text-5xl font-bold transition-all ${activeTab === 'join' ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-white/40 ml-2">Email</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="hey@vino.costa"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-8 py-6 rounded-[24px] bg-white/5 border border-white/10 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all text-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-white/40 ml-2">Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-8 py-6 rounded-[24px] bg-white/5 border border-white/10 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all text-lg"
              />
              <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <Eye className="w-6 h-6" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-6 bg-white text-black rounded-[24px] font-black text-xl uppercase tracking-tighter hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center shadow-2xl"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          {/* Social Logins */}
          <div className="flex items-center justify-center space-x-4 pt-4">
            {[
              { icon: Chrome, color: 'hover:bg-green-500/10' },
              { icon: Github, color: 'hover:bg-white/10' },
              { icon: (props) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .76-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.03 2.62 4.03 2.65 4.05-.02.05-.42 1.44-1.35 2.82zM13 3.5c.73-.89 1.22-2.14 1.08-3.38-1.06.04-2.34.71-3.1 1.6-.68.79-1.28 2.06-1.12 3.25 1.18.09 2.37-.58 3.14-1.47z"/>
                </svg>
              ), color: 'hover:bg-white/10' },
              { icon: (props) => (
                <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                  <path d="M17.5 19H9V7.5h8.5v11.5zm-7.5-1h6.5v-9.5H10v9.5zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1.5c-4.694 0-8.5 3.806-8.5 8.5s3.806 8.5 8.5 8.5 8.5-3.806 8.5-8.5-3.806-8.5-8.5-8.5z" />
                </svg>
              ), color: 'hover:bg-blue-600/10' },
            ].map((Social, i) => (
              <button 
                key={i}
                className={`w-28 h-12 rounded-[16px] border border-white/10 flex items-center justify-center transition-all ${Social.color} group`}
              >
                <Social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
