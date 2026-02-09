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
    <div className="w-full py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore Categories</h2>
        <motion.div 
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -300 }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[120px] h-[140px] flex flex-col items-center justify-center bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:bg-orange-50 transition-colors">
                <cat.icon className="w-6 h-6 text-gray-600 group-hover:text-orange-500" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-orange-600">{cat.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}