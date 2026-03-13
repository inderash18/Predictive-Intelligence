"use client";
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Globe, 
  Cloud,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({ icon: Icon, title, desc, action }) => (
    <div className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors cursor-pointer group">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
          <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
      {action || <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />}
    </div>
  );

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                  <Cloud className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Administrator</h3>
                <p className="text-gray-500 font-medium">admin@predictx.ai</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              Edit Profile
            </button>
          </div>
          
          <div className="divide-y divide-gray-50">
            <SettingItem 
              icon={Lock} 
              title="Security & Password" 
              desc="Update your password and enable two-factor authentication"
            />
            <SettingItem 
              icon={Bell} 
              title="Notifications" 
              desc="Critical alerts, prediction reports, and system updates"
            />
            <SettingItem 
              icon={Globe} 
              title="Language & Region" 
              desc="English (United States) - GMT -05:00"
            />
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50">
            <h3 className="text-lg font-bold text-gray-900">System Preferences</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <SettingItem 
              icon={darkMode ? Moon : Sun} 
              title="Appearance" 
              desc="Customize how PredictX looks on your device"
              action={
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              }
            />
            <SettingItem 
              icon={Shield} 
              title="Data Privacy" 
              desc="Control how your prediction data is used and stored"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
