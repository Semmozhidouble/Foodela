import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Edit2, Save, Camera, LogOut, RotateCcw, Home, Briefcase, Trash2, Plus, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';

const Profile = () => {
  const { user, logout } = useAuth();
  const { orderHistory } = useOrder();
  const { reorderItems } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    phone: '+1 (555) 012-3456',
    address: '123 Innovation Dr, Tech City'
  });
  import { Link } from 'react-router-dom';
  
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', value: '123 Innovation Dr, Tech City, TC 90210' },
    { id: 2, type: 'Work', value: '456 Corporate Blvd, Business Park, BP 12345' }
  ]);
  const [newAddress, setNewAddress] = useState({ type: 'Home', value: '' });
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (newAddress.value) {
      setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
      setNewAddress({ type: 'Home', value: '' });
      setIsAddingAddress(false);
    }
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Update user context or backend here
  };

  const OrderCard = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl overflow-hidden border border-white/50"
      >
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-5 flex items-center gap-4 cursor-pointer hover:bg-white/40 transition-colors"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
             <img 
               src={order.items && order.items[0] ? order.items[0].image : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80"} 
               alt={order.restaurantName} 
               className="w-full h-full object-cover" 
             />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-800 text-lg">{order.restaurantName}</h3>
              <span className="font-bold text-slate-800">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-slate-500">
                {new Date(order.timestamp).toLocaleDateString()} • {order.items ? order.items.length : 0} Items
              </p>
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400"
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-5 pb-5 pt-0 border-t border-slate-100/50">
                <div className="py-4 space-y-3">
                  {order.items && order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-600 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold">
                          {item.quantity}
                        </span>
                        {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-slate-100/50">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.statusStep === 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.statusStep === 3 ? 'Delivered' : 'In Progress'}
                  </span>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      reorderItems(order.items);
                    }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm shadow-glow hover:bg-primary/90 transition-all"
                  >
                    <RotateCcw size={16} /> Reorder
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
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
              {orderHistory.length} Orders
            </div>
            <div className="bg-white/60 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-slate-700 shadow-sm">
              <MapPin size={18} className="text-primary" />
              {addresses.length} Saved Addresses
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
            
            <button 
              onClick={() => setActiveTab('addresses')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium ${activeTab === 'addresses' ? 'bg-primary text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <MapPin size={20} /> Saved Addresses
            </button>

            <div className="h-px bg-slate-200 my-2 mx-4"></div>

            <Link to="/settings" className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium text-slate-600 hover:bg-slate-100">
              <Settings size={20} /> Settings
            </Link>
            
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
            {activeTab === 'profile' && (
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
            )}
            
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {orderHistory.length === 0 ? (
                  <EmptyState 
                    icon={Package}
                    title="No past orders"
                    description="You haven't placed any orders yet."
                  />
                ) : (
                  orderHistory.map((order, i) => (
                    <OrderCard key={order.id} order={order} />
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div 
                key="addresses" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">My Addresses</h2>
                  <button 
                    onClick={() => setIsAddingAddress(!isAddingAddress)} 
                    className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
                  >
                    {isAddingAddress ? 'Cancel' : <><Plus size={16} /> Add New</>}
                  </button>
                </div>

                {isAddingAddress && (
                  <motion.form 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleAddAddress}
                    className="glass p-6 rounded-3xl mb-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-500 ml-1">Label</label>
                        <select 
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50"
                        >
                          <option>Home</option>
                          <option>Work</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-500 ml-1">Address</label>
                        <input 
                          type="text" 
                          value={newAddress.value}
                          onChange={(e) => setNewAddress({...newAddress, value: e.target.value})}
                          placeholder="Enter full address"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50"
                          required
                        />
                      </div>
                      <button className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                        Save Address
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="grid gap-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="glass p-5 rounded-3xl flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                          {addr.type === 'Home' ? <Home size={20} /> : addr.type === 'Work' ? <Briefcase size={20} /> : <MapPin size={20} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{addr.type}</h3>
                          <p className="text-slate-500 text-sm">{addr.value}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeAddress(addr.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;