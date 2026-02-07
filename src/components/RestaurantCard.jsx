import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

const RestaurantCard = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={data.image} 
          alt={data.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-xs font-bold text-slate-800">{data.time}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800">{data.name}</h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-lg">
            <Star size={14} className="fill-green-500 text-green-500" />
            <span className="text-sm font-bold text-green-700">{data.rating}</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm mb-3">{data.tags.join(" • ")}</p>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{data.priceRange}</span>
          <span>•</span>
          <span>Delivery $2.99</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;