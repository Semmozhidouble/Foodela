import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm mb-4"
    >
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
          <button 
            onClick={() => {
              removeFromCart(item.id);
              showToast('Item removed from cart', 'info');
            }}
            className="text-slate-400 hover:text-red-500 transition-colors p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <p className="text-slate-500 text-sm mb-4">${item.price.toFixed(2)}</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white rounded-xl p-1 border border-slate-100 shadow-sm">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                } else {
                  removeFromCart(item.id);
                  showToast('Item removed from cart', 'info');
                }
              }}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-600"
            >
              <Minus size={16} />
            </motion.button>
            <span className="font-bold text-slate-800 w-6 text-center">{item.quantity}</span>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-600"
            >
              <Plus size={16} />
            </motion.button>
          </div>
          <div className="text-right flex-1">
            <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;