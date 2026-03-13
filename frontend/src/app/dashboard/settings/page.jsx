"use client";
import React from 'react';
import { 
  User, 
  Shield, 
  Settings as SettingsIcon, 
  Bell, 
  Eye, 
  CreditCard,
  ChevronRight,
  Fingerprint,
  Mail,
  Zap,
  Globe,
  Sun,
  Moon,
  Laptop,
  Hexagon,
  Lock,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
             <Hexagon className="w-5 h-5 text-white/20 animate-spin-slow" />
             <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] leading-none">Settings</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter chrome-text leading-none uppercase">Account Settings</h1>
          <p className="text-white/30 font-semibold text-lg mt-3 uppercase">Manage your profile, security, and appearance preferences.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Nav Sidebar */}
        <div className="lg:col-span-3 space-y-3">
           {[
             { name: 'My Profile', icon: User, active: true },
             { name: 'Security', icon: Shield, active: false },
             { name: 'Notifications', icon: Bell, active: false },
             { name: 'Appearance', icon: Eye, active: false },
             { name: 'Billing', icon: CreditCard, active: false },
           ].map((item) => (
             <button 
              key={item.name}
              className={`w-full flex items-center space-x-5 px-8 py-5 rounded-[24px] transition-all font-black text-xs uppercase tracking-widest ${
                item.active ? 'bg-white text-black shadow-2xl scale-105' : 'text-white/20 hover:bg-white/[0.03] hover:text-white/60'
              }`}
             >
               <item.icon className="w-5 h-5" />
               <span>{item.name}</span>
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-12">
           {/* Profile Section */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-14 rounded-[50px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden group"
           >
              <div className="flex items-center justify-between mb-14 relative z-10">
                 <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Identity Profile</h3>
                 <button className="px-8 py-3 bg-orange-500 text-black rounded-[18px] font-black text-[10px] shadow-[0_20px_40px_rgba(251,146,60,0.3)] uppercase tracking-[0.2em] hover:scale-105 transition-all">Synchronize Node</button>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-12 mb-16 relative z-10">
                 <div className="relative group/avatar">
                    <div className="w-32 h-32 rounded-[40px] bg-white/[0.03] flex items-center justify-center overflow-hidden border-2 border-white/10 shadow-2xl relative z-10 p-1">
                       <img src="https://i.pravatar.cc/150?u=4" alt="avatar" className="rounded-[36px] grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 rounded-[40px] flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20 cursor-pointer backdrop-blur-sm">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Update</span>
                    </div>
                    <div className="absolute -right-3 -top-3 w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-black border-4 border-[#050505] z-30 shadow-2xl">
                       <Zap className="w-5 h-5" />
                    </div>
                 </div>
                 <div className="flex-1">
                    <p className="text-4xl font-black text-white leading-none mb-3 tracking-tighter uppercase">Marcus Vance</p>
                    <p className="text-lg font-bold text-white/20 uppercase tracking-widest">Administrator</p>
                    <div className="flex items-center space-x-6 mt-6">
                       <span className="flex items-center text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Verified Admin</span>
                       <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] border-l border-white/10 pl-6">US-EAST-01</span>
                    </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 relative z-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Official Identity Label</label>
                    <div className="relative group">
                       <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 w-5 h-5 group-hover:text-orange-500 transition-colors" />
                       <input className="w-full pl-16 pr-8 py-6 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-orange-500/30 font-black text-white text-lg uppercase transition-all" defaultValue="Marcus Vance" />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Communication Channel</label>
                    <div className="relative group">
                       <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 w-5 h-5 group-hover:text-orange-500 transition-colors" />
                       <input className="w-full pl-16 pr-8 py-6 rounded-[24px] bg-white/5 border border-white/5 focus:ring-1 focus:ring-orange-500/30 font-black text-white text-lg transition-all" defaultValue="marcus@cybergrid.ai" />
                    </div>
                 </div>
              </div>
              <div className="absolute right-[-10%] bottom-[-20%] w-96 h-96 bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
           </motion.div>

           {/* Security Settings */}
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-14 rounded-[50px] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden"
           >
              <h3 className="text-3xl font-black text-white tracking-tighter mb-12 uppercase">Access & Security</h3>
              <div className="space-y-6">
                 {[
                   { name: 'Dual-Factor Authentication', status: 'ACTIVE_NODE', icon: Shield, active: true },
                   { name: 'Hardware Biometrics (FIDO2)', status: 'SYNCH_REQUIRED', icon: Fingerprint, active: false },
                   { name: 'Neural Session Timeout', status: '15 MINUTES', icon: Globe, active: true },
                 ].map((setting) => (
                   <div key={setting.name} className="flex items-center justify-between p-8 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:bg-orange-500 hover:border-transparent transition-all cursor-pointer">
                      <div className="flex items-center space-x-6">
                         <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-black transition-colors">
                            <setting.icon className="w-6 h-6 text-white/20 group-hover:text-orange-500 shadow-2xl" />
                         </div>
                         <div>
                            <p className="font-black text-white group-hover:text-black text-xl tracking-tight transition-colors uppercase">{setting.name}</p>
                            <p className="text-[10px] font-black text-white/20 group-hover:text-black/40 uppercase tracking-[0.2em] mt-1 transition-colors">{setting.status}</p>
                         </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-black transition-colors" />
                   </div>
                 ))}
              </div>
           </motion.div>

           {/* Preference Toggle */}
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-14 rounded-[50px] bg-white text-black shadow-[0_40px_80px_rgba(255,255,255,0.1)] overflow-hidden relative group"
           >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                 <div className="flex items-center space-x-8 mb-10 md:mb-0">
                    <div className="p-5 bg-black rounded-[24px] shadow-2xl">
                       <Eye className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                       <h4 className="text-4xl font-black tracking-tighter uppercase leading-none">System Rendering</h4>
                       <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em] mt-3 leading-none">Global Interface Seed</p>
                    </div>
                 </div>
                 <div className="flex p-2 bg-black/5 rounded-[28px] border border-black/5">
                    <button className="flex items-center space-x-3 px-8 py-3 hover:bg-white rounded-2xl font-black text-[10px] text-black/40 uppercase tracking-[0.2em] transition-all">
                       <Sun className="w-4 h-4" /> <span>Light</span>
                    </button>
                    <button className="flex items-center space-x-3 px-8 py-3 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all scale-105">
                       <Moon className="w-4 h-4 text-orange-500" /> <span>Midnight</span>
                    </button>
                    <button className="flex items-center space-x-3 px-8 py-3 hover:bg-white rounded-2xl font-black text-[10px] text-black/40 uppercase tracking-[0.2em] transition-all">
                       <Laptop className="w-4 h-4" /> <span>Auto</span>
                    </button>
                 </div>
              </div>
              <div className="absolute left-[-10%] top-[-20%] w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
