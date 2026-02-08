import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/restaurants" className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all">
          Start Ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">My Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-3xl sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Taxes (8%)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-slate-800">
                  <span>Total</span>
                  <span>${(cartTotal + 2.99 + (cartTotal * 0.08)).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;