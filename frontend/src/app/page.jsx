"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Server, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Shield,
  Activity,
  Globe,
  Sparkles,
  ChevronRight,
  BrainCircuit,
  Lock,
  Layers,
  Hexagon
} from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 selection:text-orange-500 overflow-x-hidden font-sans">
      {/* Liquid Chrome Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <img 
          src="/bg.png" 
          alt="bg" 
          className="w-full h-full object-cover scale-150 animate-pulse-slow" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-10 max-w-[1600px] mx-auto relative z-20">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <div className="w-14 h-14 bg-white rounded-[22px] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:rotate-[360deg] transition-transform duration-1000">
            <Zap className="text-black w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-3xl text-white tracking-tighter leading-none">PredictX</span>
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mt-2">Intelligence</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-16 px-12 py-4 bg-white/[0.03] backdrop-blur-3xl rounded-full border border-white/5 shadow-2xl">
          {['Features', 'Servers', 'Security', 'Company'].map((item) => (
             <Link key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-black text-white/30 hover:text-orange-500 transition-all uppercase tracking-[0.2em]">{item}</Link>
          ))}
        </div>

        <div className="flex items-center space-x-10">
          <Link href="/login" className="text-[11px] font-black text-white/40 hover:text-white transition-all uppercase tracking-[0.2em]">Login</Link>
          <Link href="/register" className="px-10 py-4.5 rounded-[20px] bg-white text-black hover:bg-white/90 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all font-black text-xs uppercase tracking-[0.2em]">Create Account</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-32 pb-48 max-w-7xl mx-auto text-center z-10">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center space-x-4 px-6 py-2.5 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 bg-orange-500/10 rounded-full border border-orange-500/20 backdrop-blur-3xl">
            <Hexagon className="w-4 h-4 animate-spin-slow" />
            <span>Neural Core v4.0.0 Online</span>
          </div>
          
          <h1 className="text-8xl md:text-[11rem] font-black text-white mb-14 leading-[0.85] tracking-tighter chrome-text flex flex-col items-center">
             <span>Check the</span>
             <span className="text-orange-500 relative inline-block">
                Future.
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '100%' }}
                   transition={{ delay: 0.5, duration: 1 }}
                   className="absolute -bottom-4 left-0 h-4 bg-orange-500 rounded-full blur-[1px]" 
                />
             </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-white/40 mb-16 max-w-4xl mx-auto font-medium leading-relaxed">
            Use our smart AI tools to predict power usage, server failures, and computer health. Clear and simple data for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link 
              href="/dashboard" 
              className="group px-14 py-6 bg-white text-black rounded-[28px] font-black text-xl shadow-[0_32px_64_0_rgba(255,255,255,0.1)] hover:scale-[1.05] active:scale-95 transition-all flex items-center"
            >
              Start Now
              <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </Link>
            <Link href="/login" className="px-14 py-6 bg-white/5 border border-white/10 text-white rounded-[28px] font-black text-xl backdrop-blur-3xl hover:bg-white/10 transition-all flex items-center group">
              See How It Works <ChevronRight className="ml-4 w-7 h-7 group-hover:translate-x-2 transition-transform opacity-30 group-hover:opacity-100" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Value Matrix */}
      <section className="px-12 py-56 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-40">
             <span className="text-orange-500 font-black text-[11px] uppercase tracking-[0.4em] mb-8">Performance Indices</span>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12">The Speed of Thought.</h2>
             <div className="w-24 h-1 bg-white/10 rounded-full" />
          </div>

          <div className="grid md:grid-cols-4 gap-20">
            {[
              { label: 'System Uptime', val: '99.9%', icon: Shield, col: 'text-blue-500' },
              { label: 'Accuracy', val: '94.2%', icon: BrainCircuit, col: 'text-orange-500' },
              { label: 'Active Servers', val: '1.2M+', icon: Globe, col: 'text-emerald-500' },
              { label: 'Data Speed', val: '0.8ms', icon: Activity, col: 'text-red-500' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`p-5 bg-white/5 rounded-[20px] mb-8 border border-white/5 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 ${stat.col}`}>
                   <stat.icon className="w-8 h-8" />
                </div>
                <h4 className="text-6xl font-black text-white mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">{stat.val}</h4>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Modules */}
      <section id="ecosystem" className="px-12 py-60 max-w-[1400px] mx-auto z-10 relative">
        <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Power Demand',
                desc: 'Predict how much electricity your city or building needs based on data.',
                icon: Zap,
                img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Server Safety',
                desc: 'Check server health and get alerts before failures or crashes happen.',
                icon: Server,
                img: 'https://images.unsplash.com/photo-1558444479-c8f027d17c38?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'PC Health',
                desc: 'Keep your computer running smoothly with AI health checks.',
                icon: Cpu,
                img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800'
              }
            ].map((module, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="h-full bg-black rounded-[39px] p-12 relative flex flex-col justify-end min-h-[500px] overflow-hidden">
                   <div className="absolute inset-0 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000">
                      <img src={module.img} className="w-full h-full object-cover grayscale" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                   </div>
                   
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center mb-8 shadow-2xl">
                         <module.icon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-4xl font-black mb-6 tracking-tight text-white group-hover:text-orange-500 transition-colors">{module.title}</h3>
                      <p className="text-white/40 font-medium text-lg mb-10 leading-relaxed max-w-sm">{module.desc}</p>
                      <button className="flex items-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-all">
                         <span>Establish Node Connection</span>
                         <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-orange-500" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Security Engine */}
      <section id="security" className="px-12 py-60 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative z-10">
               <div className="w-20 h-20 bg-orange-500 rounded-[28px] flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(251,146,60,0.4)]">
                  <Lock className="w-10 h-10 text-black" />
               </div>
               <h2 className="text-7xl font-black text-white mb-10 tracking-tighter leading-none">Safe and <br /> Secure Data.</h2>
               <div className="space-y-12">
                  {[
                    { title: 'Privacy First', desc: 'All your data stays safe and private on your own servers.', icon: Shield },
                    { title: 'Full Record', desc: 'We keep a complete list of every check and prediction.', icon: Layers },
                    { title: 'Smart Protection', desc: 'Our AI finds and stops errors before they cause problems.', icon: BrainCircuit },
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-8 group">
                       <div className="shrink-0 pt-1 border-r border-white/5 pr-8"><item.icon className="w-8 h-8 text-white/20 group-hover:text-orange-500 transition-colors" /></div>
                       <div>
                          <h4 className="font-black text-2xl text-white mb-2 group-hover:translate-x-1 transition-transform">{item.title}</h4>
                          <p className="text-white/40 font-medium leading-relaxed max-w-md">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative">
               <motion.div 
                 animate={{ rotate: [0, 5, 0] }}
                 transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                 className="p-16 glass-card bg-white/[0.03] rounded-[60px] border-white/10 shadow-2xl relative z-10"
               >
                  <div className="flex flex-col items-center text-center">
                     <Hexagon className="w-24 h-24 text-orange-500 mb-10 animate-pulse" />
                     <p className="text-3xl font-black leading-tight mb-8 chrome-text font-serif italic">"Security is the most important part of predicting the future."</p>
                     <p className="text-white/20 uppercase tracking-[0.3em] font-black text-xs">Safe AI System</p>
                  </div>
               </motion.div>
               <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] z-0" />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-12 max-w-[1600px] mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-md">
            <div className="flex items-center space-x-4 mb-10 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-[18px] flex items-center justify-center shadow-2xl group-hover:rotate-180 transition-transform duration-700">
                <Zap className="text-black w-6 h-6" />
              </div>
              <span className="font-black text-3xl text-white tracking-tighter">PredictX</span>
            </div>
            <p className="text-white/20 font-medium text-lg leading-relaxed">The best AI platform for future predictions. Simple, safe, and powerful.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-32">
             <div className="flex flex-col space-y-6">
                <h4 className="text-[11px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">Features</h4>
                <Link href="/dashboard" className="text-sm font-black text-white/30 hover:text-orange-500 flex items-center group">
                   <span>Dashboard</span>
                   <ChevronRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/dashboard/server" className="text-sm font-black text-white/30 hover:text-orange-500 flex items-center group">
                   <span>Server Safety</span>
                   <ChevronRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/dashboard/electricity" className="text-sm font-black text-white/30 hover:text-orange-500 flex items-center group">
                   <span>Power Demand</span>
                   <ChevronRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
             </div>
             <div className="flex flex-col space-y-6">
                <h4 className="text-[11px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">Foundation</h4>
                <Link href="/dashboard/history" className="text-sm font-black text-white/30 hover:text-orange-500">History</Link>
                <Link href="/dashboard/settings" className="text-sm font-black text-white/30 hover:text-orange-500">Settings</Link>
                <Link href="#" className="text-sm font-black text-white/30 hover:text-orange-500">About Us</Link>
             </div>
             <div className="flex flex-col space-y-6">
                <h4 className="text-[11px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">Protocol</h4>
                <Link href="https://github.com/predictx" className="text-sm font-black text-white/30 hover:text-orange-500">GitHub Core</Link>
                <Link href="#" className="text-sm font-black text-white/30 hover:text-orange-500">Sync Slack</Link>
             </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">© 2024 PredictX Intelligence. PROPRIETARY NEURAL SYSTEM.</p>
           <div className="flex space-x-12">
              <Link href="#" className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] hover:text-orange-500 transition-colors">Privacy Subnet</Link>
              <Link href="#" className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] hover:text-orange-500 transition-colors">Usage Protocol</Link>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
