import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Edit2, Save, Camera, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data for order history
const mockOrderHistory = [
  {
    id: "ORD-2024-001",
    restaurantName: "Sushi Master",
    date: "Feb 24, 2024",
    status: "Delivered",
    total: 42.50,
    items: "Volcano Roll, Miso Soup, Green Tea",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80"
  },
  {
    id: "ORD-2024-002",
    restaurantName: "Burger Lab",
    date: "Feb 20, 2024",
    status: "Delivered",
    total: 28.90,
    items: "Classic Burger, Fries, Coke",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80"
  }
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    phone: '+1 (555) 012-3456',
    address: '123 Innovation Dr, Tech City'
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Update user context or backend here
  };

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass rounded-[2rem] p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-orange-500/10 -z-10" />
        
        <div className="relative mt-4 md:mt-0">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200">
            <img src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 bg-slate-800 text-white p-2.5 rounded-full shadow-lg hover:bg-primary transition-colors">
            <Camera size={18} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">{userData.name}</h1>
          <p className="text-slate-500 mb-6">{userData.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white/60 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-700 shadow-sm">
              <Package size={18} className="text-primary" />
              {mockOrderHistory.length} Orders
            </div>
            <div className="bg-white/60 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-700 shadow-sm">
              <MapPin size={18} className="text-primary" />
              Saved Addresses
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-3xl p-4 space-y-2 sticky top-24">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium ${activeTab === 'profile' ? 'bg-primary text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <User size={20} /> Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium ${activeTab === 'orders' ? 'bg-primary text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Package size={20} /> Order History
            </button>
            
            <div className="h-px bg-slate-200 my-2 mx-4"></div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium text-red-500 hover:bg-red-50"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' ? (
              <motion.div 
                key="profile" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                className="glass rounded-3xl p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-800">Profile Details</h2>
                  <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
                    className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors"
                  >
                    {isEditing ? <><Save size={18} /> Save Changes</> : <><Edit2 size={18} /> Edit Profile</>}
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 ml-1">Full Name</label>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${isEditing ? 'bg-white border-primary/30 ring-4 ring-primary/5' : 'bg-slate-50 border-transparent'}`}>
                      <User size={20} className="text-slate-400" />
                      <input 
                        type="text" 
                        value={userData.name} 
                        onChange={(e) => setUserData({...userData, name: e.target.value})} 
                        disabled={!isEditing} 
                        className="bg-transparent w-full outline-none text-slate-800 font-medium" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 ml-1">Email Address</label>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${isEditing ? 'bg-white border-primary/30 ring-4 ring-primary/5' : 'bg-slate-50 border-transparent'}`}>
                      <Mail size={20} className="text-slate-400" />
                      <input 
                        type="email" 
                        value={userData.email} 
                        onChange={(e) => setUserData({...userData, email: e.target.value})} 
                        disabled={!isEditing} 
                        className="bg-transparent w-full outline-none text-slate-800 font-medium" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 ml-1">Phone Number</label>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${isEditing ? 'bg-white border-primary/30 ring-4 ring-primary/5' : 'bg-slate-50 border-transparent'}`}>
                      <Phone size={20} className="text-slate-400" />
                      <input 
                        type="tel" 
                        value={userData.phone} 
                        onChange={(e) => setUserData({...userData, phone: e.target.value})} 
                        disabled={!isEditing} 
                        className="bg-transparent w-full outline-none text-slate-800 font-medium" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {mockOrderHistory.map((order, i) => (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={order.id} className="glass-card p-5 rounded-3xl flex flex-col sm:flex-row gap-5 items-center">
                    <img src={order.image} alt={order.restaurantName} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1 w-full text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
                        <h3 className="font-bold text-slate-800 text-lg">{order.restaurantName}</h3>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{order.status}</span>
                      </div>
                      <p className="text-slate-500 text-sm mb-2">{order.items}</p>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2">
                        <span className="text-xs font-medium text-slate-400">{order.date}</span>
                        <span className="font-bold text-slate-800">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;