import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MapPin, Lock, CheckCircle, ArrowLeft, ChevronRight, Wallet, Truck, Smartphone, AlertCircle, BadgeCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { orderAPI } from '../services/apiService';

const Checkout = () => {
  const { cart, cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('COD');

  const deliveryFee = 2.99;
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;
  const totalAmount = cartTotal + deliveryFee + taxAmount;

  const paymentMethods = [
    { id: 'COD', name: 'Cash on Delivery', icon: Wallet, description: 'Pay when you receive' },
    { id: 'UPI', name: 'UPI Payment', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'CREDIT_CARD', name: 'Credit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'DEBIT_CARD', name: 'Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
    { id: 'WALLET', name: 'Wallet', icon: Wallet, description: 'Paytm, PhonePe Wallet' }
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Validate cart has restaurant ID
      if (!cart.restaurantId) {
        throw new Error('Restaurant information missing. Please add items from a restaurant.');
      }

      // Simulate payment for non-COD
      if (selectedPayment !== 'COD') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const orderRequest = {
        restaurantId: cart.restaurantId,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        })),
        deliveryAddress: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}`,
        deliveryInstructions,
        paymentMethod: selectedPayment
      };

      console.log('Creating order:', orderRequest);
      const order = await orderAPI.create(orderRequest);
      console.log('Order created successfully:', order);
      
      clearCart();
      showToast('Order placed successfully! 🎉', 'success');
      setTimeout(() => navigate(`/order-tracking?orderId=${order.id}`), 1500);
      
    } catch (error) {
      console.error('Order failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to place order';
      setPaymentError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/restaurants')} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all">
          Browse Restaurants
        </button>
      </div>
    );
  }

  console.log('Cart data:', { cart, cartItems, cartTotal });

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Cart
        </button>

        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <h1 className="text-3xl font-bold text-slate-800">Checkout</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/50">
            <span className={step >= 1 ? "text-primary font-bold" : ""}>1. Address</span>
            <ChevronRight size={14} />
            <span className={step >= 2 ? "text-primary font-bold" : ""}>2. Payment</span>
            <ChevronRight size={14} />
            <span className={step >= 3 ? "text-primary font-bold" : ""}>3. Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-8 rounded-3xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary">
                      <MapPin size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Delivery Address</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Street Address *</label>
                      <input 
                        type="text" 
                        placeholder="123 Main Street, Apartment 4B" 
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" 
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">City *</label>
                        <input 
                          type="text" 
                          placeholder="New York" 
                          value={deliveryAddress.city}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">State *</label>
                        <input 
                          type="text" 
                          placeholder="NY" 
                          value={deliveryAddress.state}
                          onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" 
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">ZIP Code *</label>
                      <input 
                        type="text" 
                        placeholder="10001" 
                        value={deliveryAddress.zipCode}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Delivery Instructions (Optional)</label>
                      <textarea 
                        placeholder="Ring the bell, leave at door, etc."
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none" 
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if (deliveryAddress.street && deliveryAddress.city && deliveryAddress.state && deliveryAddress.zipCode) {
                          setStep(2);
                        } else {
                          showToast('Please fill in all required address fields', 'error');
                        }
                      }}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-8 rounded-3xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary">
                      <Wallet size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Select Payment Method</h2>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      const isSelected = selectedPayment === method.id;
                      
                      return (
                        <motion.button
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                            isSelected 
                              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <IconComponent size={24} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-800">{method.name}</h3>
                              {isSelected && <BadgeCheck size={18} className="text-primary" />}
                            </div>
                            <p className="text-sm text-slate-500">{method.description}</p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {paymentError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-4"
                    >
                      <AlertCircle size={20} className="text-red-500" />
                      <p className="text-sm text-red-700">{paymentError}</p>
                    </motion.div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={() => setStep(1)} 
                      className="flex-1 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setStep(3)}
                      className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 20 }}
                  className="glass p-8 rounded-3xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-2 rounded-xl text-primary">
                      <CheckCircle size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Review & Place Order</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Restaurant & Items */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Truck size={16} /> Order from {cart.restaurantName}
                      </h3>
                      <div className="space-y-1">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-slate-600">{item.quantity}x {item.name}</span>
                            <span className="font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <MapPin size={16} /> Delivery To
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {deliveryAddress.street}<br />
                        {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
                      </p>
                      {deliveryInstructions && (
                        <p className="text-slate-500 text-xs mt-2 italic">"{deliveryInstructions}"</p>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <CreditCard size={16} /> Payment Method
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {paymentMethods.find(m => m.id === selectedPayment)?.name}
                      </p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button 
                        onClick={() => setStep(2)} 
                        className="flex-1 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        disabled={isProcessing}
                      >
                        Back
                      </button>
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-glow hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Processing...
                          </>
                        ) : (
                          <>Place Order - ${totalAmount.toFixed(2)}</>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }} 
              className="glass p-6 rounded-3xl sticky top-24"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-slate-600">
                  <span>Items ({cartItems.length})</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes (8%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-px bg-slate-200 my-4"></div>
              
              <div className="flex justify-between text-xl font-bold text-slate-800 mb-6">
                <span>Total</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Lock size={14} /> Secure Checkout
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;