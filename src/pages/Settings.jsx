import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    dataSharing: false
  });
  const [language, setLanguage] = useState('English');

  const Toggle = ({ isOn, onToggle }) => (
    <div 
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-primary' : 'bg-slate-300'}`} 
      onClick={onToggle}
    >
      <motion.div 
        layout 
        className="bg-white w-4 h-4 rounded-full shadow-md" 
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Bell size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">Email Notifications</p>
                  <p className="text-sm text-slate-500">Receive updates about your orders via email</p>
                </div>
                <Toggle isOn={notifications.email} onToggle={() => setNotifications({...notifications, email: !notifications.email})} />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">Push Notifications</p>
                  <p className="text-sm text-slate-500">Get real-time updates on your device</p>
                </div>
                <Toggle isOn={notifications.push} onToggle={() => setNotifications({...notifications, push: !notifications.push})} />
              </div>
               <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">SMS Notifications</p>
                  <p className="text-sm text-slate-500">Receive text messages for delivery updates</p>
                </div>
                <Toggle isOn={notifications.sms} onToggle={() => setNotifications({...notifications, sms: !notifications.sms})} />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Lock size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">Profile Visibility</p>
                  <p className="text-sm text-slate-500">Allow others to see your profile</p>
                </div>
                <Toggle isOn={privacy.profileVisibility} onToggle={() => setPrivacy({...privacy, profileVisibility: !privacy.profileVisibility})} />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">Data Sharing</p>
                  <p className="text-sm text-slate-500">Share usage data to help us improve</p>
                </div>
                <Toggle isOn={privacy.dataSharing} onToggle={() => setPrivacy({...privacy, dataSharing: !privacy.dataSharing})} />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Globe size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Language</h2>
            </div>
            <div className="flex items-center gap-4">
               {['English', 'Spanish', 'French'].map((lang) => (
                 <button
                   key={lang}
                   onClick={() => setLanguage(lang)}
                   className={`px-6 py-3 rounded-xl font-medium transition-all ${language === lang ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                 >
                   {lang}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;