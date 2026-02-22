import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCart() {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-10 right-10 w-20 h-20 bg-black/80 backdrop-blur-2xl text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 border border-white/10 group"
    >
      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
      
      <div className="relative">
        <ShoppingBag className="w-7 h-7 group-hover:text-orange-400 transition-colors" />
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full text-xs flex items-center justify-center font-bold border-2 border-black shadow-lg">3</span>
      </div>
    </motion.button>
  );
}