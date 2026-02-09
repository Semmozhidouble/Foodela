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
      className="fixed bottom-8 right-8 w-16 h-16 bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/20 z-50 border border-white/10"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 rounded-full text-xs flex items-center justify-center font-bold border-2 border-black">3</span>
      </div>
    </motion.button>
  );
}