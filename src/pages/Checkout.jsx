import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MapPin, Calendar, Lock, CheckCircle, ArrowLeft, ChevronRight, Wallet, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Redirect after success
      setTimeout(() => navigate('/order-tracking'), 2000);
    }, 2000);
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-primary font-medium hover:underline">
          Go back to Home
        </button>
      </div>
    );
  }

  const totalAmount = cartTotal + 2.99 + (cartTotal * 0.08);

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Order Placed Successfully!</h2>
        <p className="text-slate-500 mb-8">Your food is being prepared. Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Cart
        </button>

        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Checkout</h1>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className={step >= 1 ? "text-primary" : ""}>Address</span>
            <ChevronRight size={14} />
            <span className={step >= 2 ? "text-primary" : ""}>Payment</span>
            <ChevronRight size={14} />
            <span className={step >= 3 ? "text-primary" : ""}>Review</span>
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
                      <MapPin size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Delivery Address</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 ml-1">Street Address</label>
                        <input type="text" placeholder="123 Main St" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 ml-1">City</label>
                        <input type="text" placeholder="New York" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 ml-1">State</label>
                        <input type="text" placeholder="NY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 ml-1">ZIP Code</label>
                        <input type="text" placeholder="10001" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold mt-4 hover:bg-slate-700 transition-colors">
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
                      <CreditCard size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Payment Method</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <button className="p-4 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col items-center gap-2 text-primary font-bold">
                        <CreditCard size={24} /> Card
                      </button>
                      <button className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 flex flex-col items-center gap-2 text-slate-600 font-medium transition-colors">
                        <Wallet size={24} /> UPI
                      </button>
                      <button className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 flex flex-col items-center gap-2 text-slate-600 font-medium transition-colors">
                        <Truck size={24} /> COD
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 ml-1">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 outline-none focus:border-primary/50 transition-colors" />
                        <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 ml-1">Expiry Date</label>
                        <div className="relative">
                          <input type="text" placeholder="MM/YY" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 outline-none focus:border-primary/50 transition-colors" />
                          <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 ml-1">CVC</label>
                        <div className="relative">
                          <input type="text" placeholder="123" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 outline-none focus:border-primary/50 transition-colors" />
                          <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                        Back
                      </button>
                      <button onClick={() => setStep(3)} className="flex-[2] bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-700 transition-colors">
                        Review Order
                      </button>
                    </div>
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
                      <CheckCircle size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Review & Place Order</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-700 mb-2">Delivery To</h3>
                      <p className="text-slate-500 text-sm">123 Main St, New York, NY 10001</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-700 mb-2">Payment Method</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-2"><CreditCard size={16} /> Visa ending in 4242</p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                        Back
                      </button>
                      <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-glow hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-3xl sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              <div className="border-t border-slate-100 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Taxes (8%)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-800 pt-2">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                <Lock size={12} /> Secure Checkout
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;