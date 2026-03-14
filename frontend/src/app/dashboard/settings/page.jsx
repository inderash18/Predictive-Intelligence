"use client";
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  CreditCard,
  ChevronRight,
  Fingerprint,
  Mail,
  Globe,
  Smartphone,
  CheckCircle2,
  Lock,
  LogOut,
  Camera
} from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('My Profile');

  const tabs = [
    { name: 'My Profile', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Notifications', icon: Bell },
    { name: 'Appearance', icon: Eye },
    { name: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight">Account Settings</h1>
          <p className="text-[var(--body-text)] font-medium mt-2">Manage your profile, security preferences, and active sessions.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Nav Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
           {tabs.map((item) => (
             <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                activeTab === item.name 
                  ? 'bg-[var(--alternate-bg)] border border-[var(--border)] text-[var(--foreground)] shadow-sm' 
                  : 'text-[var(--body-text)] hover:bg-[var(--alternate-bg)] border border-transparent hover:text-[var(--foreground)]'
              }`}
             >
               <item.icon className={`w-4 h-4 ${activeTab === item.name ? 'text-[var(--primary)]' : ''}`} />
               <span>{item.name}</span>
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-3xl border border-[var(--border)]"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border)]">
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">Public Profile</h3>
                <p className="text-[var(--body-text)] text-sm">This information will be displayed to your team members.</p>
              </div>
              <button className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all hidden sm:block">
                Save Changes
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-[var(--alternate-bg)] flex items-center justify-center overflow-hidden border border-[var(--border)] shadow-sm">
                  <img src="https://ui-avatars.com/api/?name=Marcus+Vance&background=2563EB&color=fff&size=200" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <button className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="flex-1">
                 <div className="flex space-x-4 mb-4">
                   <button className="px-4 py-2 border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--alternate-bg)] rounded-lg font-semibold text-sm text-[var(--foreground)] transition-colors">
                     Change Avatar
                   </button>
                   <button className="px-4 py-2 font-semibold text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                     Remove
                   </button>
                 </div>
                 <p className="text-xs text-[var(--body-text)] font-medium">JPEG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--foreground)]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--body-text)] w-4 h-4" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-semibold text-[var(--foreground)] text-sm transition-all shadow-inner" 
                    defaultValue="Marcus Vance" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--foreground)]">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--body-text)] w-4 h-4" />
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none font-semibold text-[var(--foreground)] text-sm transition-all shadow-inner" 
                    defaultValue="marcus@predictx.ai" 
                  />
                </div>
              </div>
            </div>
            
            <button className="mt-8 w-full px-5 py-3 bg-gradient-primary text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all sm:hidden">
              Save Changes
            </button>
          </motion.div>

          {/* Security Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-3xl border border-[var(--border)]"
          >
            <div className="mb-8 pb-6 border-b border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">Security & Access</h3>
              <p className="text-[var(--body-text)] text-sm">Protect your account with extra layers of security.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Two-Factor Authentication (2FA)', status: 'Enabled', icon: Shield, active: true },
                { name: 'Biometric Login (WebAuthn)', status: 'Not Configured', icon: Fingerprint, active: false },
                { name: 'Password Update', status: 'Last changed 3 months ago', icon: Lock, active: false },
              ].map((setting) => (
                <div key={setting.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[var(--alternate-bg)] border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors">
                  <div className="flex items-start sm:items-center space-x-4 mb-4 sm:mb-0">
                    <div className={`p-3 rounded-xl flex shrink-0 ${setting.active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[var(--background)] text-[var(--body-text)] border border-[var(--border)]'}`}>
                      <setting.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--foreground)] text-sm mb-1">{setting.name}</p>
                      <p className="text-xs font-semibold text-[var(--body-text)] flex items-center">
                        {setting.active && <CheckCircle2 className="w-3 h-3 text-[#10B981] mr-1" />}
                        {setting.status}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all sm:w-auto w-full">
                    {setting.active ? 'Manage' : 'Configure'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Sessions */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-3xl border border-[var(--border)]"
          >
            <div className="mb-8 pb-6 border-b border-[var(--border)]">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">Active Sessions</h3>
              <p className="text-[var(--body-text)] text-sm">Review devices currently logged into your account.</p>
            </div>

            <div className="space-y-4">
               {/* Current Session */}
               <div className="flex items-center justify-between p-5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 relative overflow-hidden">
                 <div className="flex items-center space-x-4">
                   <div className="p-3 bg-[var(--background)] rounded-xl border border-[var(--border)] text-[var(--foreground)]">
                     <Globe className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="font-bold text-[var(--foreground)] text-sm">Windows 11 • Chrome Browser</p>
                     <p className="text-xs font-semibold text-[var(--body-text)] mt-1">192.168.1.42 • New York, US</p>
                   </div>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-[#10B981] mb-1">Current Session</span>
                 </div>
               </div>

               {/* Other Session */}
               <div className="flex items-center justify-between p-5 rounded-2xl bg-[var(--alternate-bg)] border border-[var(--border)] group">
                 <div className="flex items-center space-x-4">
                   <div className="p-3 bg-[var(--background)] rounded-xl border border-[var(--border)] text-[var(--body-text)]">
                     <Smartphone className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="font-bold text-[var(--foreground)] text-sm">iPhone 14 Pro • Safari mobile</p>
                     <p className="text-xs font-semibold text-[var(--body-text)] mt-1">10.0.0.12 • New York, US</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-4">
                    <span className="text-xs font-medium text-[var(--body-text)] hidden sm:block">Active 2 days ago</span>
                    <button className="p-2 sm:px-3 sm:py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center">
                      <LogOut className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Revoke</span>
                    </button>
                 </div>
               </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
