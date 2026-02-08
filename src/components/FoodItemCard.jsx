import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const FoodItemCard = ({ item, index }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-4 rounded-[2rem] flex gap-4 items-center group relative overflow-hidden"
    >
      {/* Image */}
      <div className="w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-slate-800 text-lg mb-1">{item.name}</h3>
          {item.isVeg && (
            <span className="w-4 h-4 border-2 border-green-500 flex items-center justify-center rounded-sm p-[1px]">
              <span className="w-full h-full bg-green-500 rounded-full"></span>
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-slate-800">${item.price.toFixed(2)}</span>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
            addToCart(item);
            showToast(`Added ${item.name} to cart`);
          }} className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-slate-200/50">
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;