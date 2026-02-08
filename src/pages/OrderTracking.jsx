import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, Phone, MessageSquare, CheckCircle, ChefHat, Truck, Package, 
  Store, AlertCircle, ArrowLeft, Clock4, User, XCircle, RefreshCw
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { orderAPI } from '../services/apiService';
import EmptyState from '../components/EmptyState';

const OrderTracking = () => {
  const { activeOrder, setActiveOrder } = useOrder();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefetching, setIsRefetching] = useState(false);

  // Fetch order on mount
  useEffect(() => {
    const fetchOrder = async () => {
      if (activeOrder && activeOrder.id.toString() === orderId) {
        setOrder(activeOrder);
        setLoading(false);
        return;
      }

      if (orderId) {
        try {
          setLoading(true);
          const orderData = await orderAPI.getById(orderId);
          setOrder(orderData);
          setActiveOrder(orderData);
          setError(null);
        } catch (err) {
          console.error('Error fetching order:', err);
          setError('Failed to load order details');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Update local order when activeOrder updates (WebSocket)
  useEffect(() => {
    if (activeOrder && activeOrder.id.toString() === orderId) {
      setOrder(activeOrder);
    }
  }, [activeOrder, orderId]);

  // Manual refresh
  const handleRefresh = async () => {
    if (!orderId) return;
    
    setIsRefetching(true);
    try {
      const orderData = await orderAPI.getById(orderId);
      setOrder(orderData);
      setActiveOrder(orderData);
      setError(null);
    } catch (err) {
      console.error('Error refreshing order:', err);
    } finally {
      setIsRefetching(false);
    }
  };

  // Status configuration
  const statusConfig = {
    'PLACED': { 
      step: 0, 
      title: "Order Placed", 
      message: "We've received your order!", 
      icon: Package, 
      color: "text-blue-500", 
      bg: "bg-blue-100",
      emoji: "📦"
    },
    'CONFIRMED': { 
      step: 1, 
      title: "Restaurant Confirmed", 
      message: "Restaurant has accepted your order!", 
      icon: Store, 
      color: "text-purple-500", 
      bg: "bg-purple-100",
      emoji: "✅"
    },
    'PREPARING': { 
      step: 2, 
      title: "Preparing Your Food", 
      message: "Your meal is being prepared with care!", 
      icon: ChefHat, 
      color: "text-orange-500", 
      bg: "bg-orange-100",
      emoji: "👨‍🍳"
    },
    'READY': { 
      step: 3, 
      title: "Ready for Pickup", 
      message: "Your order is ready!", 
      icon: Clock4, 
      color: "text-amber-500", 
      bg: "bg-amber-100",
      emoji: "🔔"
    },
    'OUT_FOR_DELIVERY': { 
      step: 4, 
      title: "Out for Delivery", 
      message: "Your food is on the way!", 
      icon: Truck, 
      color: "text-primary", 
      bg: "bg-primary/10",
      emoji: "🚴"
    },
    'DELIVERED': { 
      step: 5, 
      title: "Delivered", 
      message: "Enjoy your meal!", 
      icon: CheckCircle, 
      color: "text-green-500", 
      bg: "bg-green-100",
      emoji: "🎉"
    },
    'CANCELLED': { 
      step: -1, 
      title: "Order Cancelled", 
      message: "This order has been cancelled", 
      icon: XCircle, 
      color: "text-red-500", 
      bg: "bg-red-100",
      emoji: "❌"
    }
  };

  const currentStatus = order ? statusConfig[order.status] || statusConfig['PLACED'] : statusConfig['PLACED'];
  const StatusIcon = currentStatus.icon;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Skeleton loaders */}
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-slate-200 rounded-3xl"></div>
            <div className="h-64 bg-slate-200 rounded-3xl"></div>
            <div className="h-48 bg-slate-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen pt-24 px-6">
        <EmptyState 
          icon={AlertCircle}
          title={error || "Order Not Found"}
          description="We couldn't find the order you're looking for."
          actionText="Back to Home"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        {/* PHASE 1: ORDER HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-3xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${currentStatus.bg}`}>
                <StatusIcon size={32} className={currentStatus.color} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{currentStatus.title}</h1>
                <p className="text-slate-500">{currentStatus.message}</p>
                <p className="text-sm text-slate-400 mt-1">Order #{order.id}</p>
              </div>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isRefetching}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
              title="Refresh order status"
            >
              <RefreshCw size={20} className={`text-slate-500 ${isRefetching ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-sm text-slate-500">Restaurant</p>
              <p className="font-bold text-slate-800">{order.restaurantName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Estimated Delivery</p>
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <Clock size={16} className="text-primary" />
                {order.estimatedDeliveryTime || 35} mins
              </p>
            </div>
          </div>

          {order.deliveryAddress && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2">
              <MapPin size={18} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-slate-500">Delivering to</p>
                <p className="font-medium text-slate-800">{order.deliveryAddress}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* PHASE 2: LIVE STATUS TIMELINE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Order Progress</h2>
          
          <div className="relative">
            {/* Timeline */}
            {['PLACED', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((status, index) => {
              const config = statusConfig[status];
              const Icon = config.icon;
              const isCompleted = currentStatus.step >= config.step;
              const isCurrent = currentStatus.step === config.step;
              const isNext = currentStatus.step + 1 === config.step;

              return (
                <motion.div 
                  key={status}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative flex items-center gap-4 mb-6 last:mb-0"
                >
                  {/* Connector Line */}
                  {index < 5 && (
                    <div className={`absolute left-5 top-12 w-0.5 h-12 transition-colors duration-500 ${
                      isCompleted ? 'bg-primary' : 'bg-slate-200'
                    }`}></div>
                  )}

                  {/* Status Icon */}
                  <motion.div 
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted ? config.bg : 'bg-slate-100'
                    } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                  >
                    <Icon size={20} className={isCompleted ? config.color : 'text-slate-400'} />
                    
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </motion.div>

                  {/* Status Info */}
                  <div className="flex-1">
                    <h3 className={`font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                      {config.title}
                    </h3>
                    <p className={`text-sm ${isCompleted ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isNext ? 'Coming up next' : config.message}
                    </p>
                  </div>

                  {/* Emoji indicator */}
                  {isCurrent && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl"
                    >
                      {config.emoji}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* PHASE 3: RESTAURANT PREPARATION STATUS */}
        {(currentStatus.step === 2) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center"
              >
                <ChefHat size={32} className="text-orange-500" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800">Cooking in Progress</h3>
                <p className="text-slate-600">The chef is preparing your delicious meal</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-orange-500"
                      animate={{ width: ['30%', '70%', '30%'] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-600">~{Math.floor((order.estimatedDeliveryTime || 35) * 0.6)} mins</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: DELIVERY PARTNER TRACKING */}
        {currentStatus.step >= 4 && order.deliveryPartnerName && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-3xl"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-4">Delivery Partner</h2>
            
            <div className="flex items-center gap-4">
              <img 
                src={order.deliveryPartnerPhoto || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80"} 
                alt={order.deliveryPartnerName} 
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">{order.deliveryPartnerName}</h3>
                <p className="text-sm text-slate-500">Your delivery partner</p>
                {order.deliveryPartnerPhone && (
                  <p className="text-sm text-slate-600 mt-1">{order.deliveryPartnerPhone}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                  <MessageSquare size={20} />
                </button>
                {order.deliveryPartnerPhone && (
                  <a 
                    href={`tel:${order.deliveryPartnerPhone}`}
                    className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-glow"
                  >
                    <Phone size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Animated delivery tracker */}
            {currentStatus.step === 4 && (
              <div className="mt-6 relative h-32 bg-slate-100 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                
                <motion.div 
                  animate={{ 
                    x: ['5%', '85%'],
                    y: [20, 40, 20]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "linear"
                  }}
                  className="absolute top-10"
                >
                  <div className="bg-primary text-white p-2 rounded-full shadow-glow border-4 border-white">
                    <Truck size={20} />
                  </div>
                  <div className="w-8 h-2 bg-black/10 blur-sm rounded-full mt-2 mx-auto"></div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Order Items & Payment Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-3xl"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Order Summary</h2>
          
          {order.items && order.items.length > 0 && (
            <div className="space-y-3 mb-4 pb-4 border-b border-slate-100">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-slate-800">{item.quantity}x {item.itemName}</p>
                    <p className="text-sm text-slate-500">${item.price?.toFixed(2)} each</p>
                  </div>
                  <p className="font-bold text-slate-800">${(item.price * item.quantity)?.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${((order.totalAmount || 0) - (order.deliveryFee || 0) - (order.taxAmount || 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span>${(order.deliveryFee || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax</span>
              <span>${(order.taxAmount || 0).toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold text-slate-800">
              <span>Total</span>
              <span>${(order.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Payment Method</p>
              <p className="font-medium text-slate-800">{order.paymentMethod?.replace('_', ' ') || 'COD'}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.paymentStatus === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
              order.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {order.paymentStatus || 'PENDING'}
            </div>
          </div>
        </motion.div>

        {/* Help & Support */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-500 mb-2">Need help with your order?</p>
          <button className="text-primary font-medium hover:underline">
            Contact Support
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default OrderTracking;
