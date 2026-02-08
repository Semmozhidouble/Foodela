import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, MessageSquare, CheckCircle, ChefHat, Truck, Package } from 'lucide-react';
import OrderTracker from '../components/OrderTracker';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import EmptyState from '../components/EmptyState';

const OrderTracking = () => {
  const { activeOrder } = useOrder();
  const navigate = useNavigate();
  const statusStep = activeOrder?.statusStep || 0;

  const getStatusInfo = (step) => {
    switch (step) {
      case 0: return { title: "Order Placed", subtitle: "We've received your order.", icon: Package, color: "text-blue-500", bg: "bg-blue-100" };
      case 1: return { title: "Preparing Your Food", subtitle: "The chef is working on your meal.", icon: ChefHat, color: "text-orange-500", bg: "bg-orange-100" };
      case 2: return { title: "Out for Delivery", subtitle: "Your food is on the way!", icon: Truck, color: "text-primary", bg: "bg-primary/10" };
      case 3: return { title: "Delivered", subtitle: "Enjoy your meal!", icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" };
      default: return { title: "Order Placed", subtitle: "We've received your order.", icon: Package, color: "text-blue-500", bg: "bg-blue-100" };
    }
  };

  const currentStatus = getStatusInfo(statusStep);
  const StatusIcon = currentStatus.icon;

  if (!activeOrder) {
    return (
      <div className="min-h-screen pt-24 px-6">
        <EmptyState 
          icon={Package}
          title="No Active Orders"
          description="You don't have any orders in progress right now."
          actionText="Start Ordering"
          actionLink="/restaurants"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div 
            key={statusStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${currentStatus.bg} mb-4 shadow-lg`}
          >
            <StatusIcon size={40} className={currentStatus.color} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{currentStatus.title}</h1>
          <p className="text-slate-500 text-lg">{currentStatus.subtitle}</p>
        </motion.div>

        {/* Tracker Component */}
        <div className="glass p-8 rounded-3xl shadow-sm">
          <OrderTracker currentStep={statusStep} />
        </div>

        {/* Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass h-64 rounded-3xl overflow-hidden relative bg-slate-200 flex items-center justify-center"
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Animated Marker */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <div className="bg-primary text-white p-3 rounded-full shadow-glow border-4 border-white">
              <Truck size={24} />
            </div>
            <div className="w-full h-2 bg-black/20 blur-sm rounded-full mt-2 mx-auto scale-x-75"></div>
          </motion.div>
          
          <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80" alt="Driver" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Michael R.</p>
                <p className="text-xs text-slate-500">Your Delivery Partner</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                <MessageSquare size={18} />
              </button>
              <button className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-glow">
                <Phone size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-800">{activeOrder.restaurantName || "Restaurant"}</h3>
                <p className="text-sm text-slate-500">Order #{activeOrder.id.slice(-6)}</p>
              </div>
              <span className="text-sm font-bold text-slate-800">${activeOrder.total.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              {activeOrder.items && activeOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-slate-600">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Delivery Address</p>
                <p className="text-sm text-slate-500">123 Innovation Dr, Tech City, TC 90210</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
           <button onClick={() => navigate('/')} className="text-primary font-medium hover:underline">
             Back to Home
           </button>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;