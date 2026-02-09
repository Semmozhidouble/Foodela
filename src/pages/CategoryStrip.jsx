import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Coffee, UtensilsCrossed, Carrot, IceCream, Beer } from 'lucide-react';

const categories = [
  { name: 'Gourmet', icon: UtensilsCrossed },
  { name: 'Sushi', icon: Carrot },
  { name: 'Pizza', icon: Pizza },
  { name: 'Coffee', icon: Coffee },
  { name: 'Dessert', icon: IceCream },
  { name: 'Drinks', icon: Beer },
];

export default function CategoryStrip() {
  return (
    <div className="w-full py-16 overflow-hidden bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 tracking-tight">Explore Categories</h2>
        <motion.div 
          className="flex gap-8 cursor-grab active:cursor-grabbing pb-4"
          drag="x"
          dragConstraints={{ right: 0, left: -300 }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="relative min-w-[140px] h-[160px] flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 group overflow-hidden"
            >
              {/* Light Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite] z-0" />
              
              <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                <cat.icon className="w-7 h-7 text-slate-600 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="relative z-10 font-semibold text-slate-700 group-hover:text-slate-900">{cat.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}