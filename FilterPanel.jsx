import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const FilterPanel = () => {
  const filters = ["Rating 4.0+", "Under 30 min", "Pure Veg", "New Arrivals", "Offers"];
  
  return (
    <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar py-2 px-1">
      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/60 shadow-sm text-slate-700 font-semibold whitespace-nowrap hover:bg-white transition-colors"
      >
        <SlidersHorizontal size={18} /> Filters
      </motion.button>
      
      <div className="w-[1px] h-8 bg-slate-300 mx-1 flex-shrink-0"></div>

      {filters.map((filter, i) => (
        <motion.button
          key={i}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/40 text-slate-600 font-medium whitespace-nowrap hover:bg-white hover:shadow-md transition-all"
        >
          {filter}
        </motion.button>
      ))}
      
    </div>
  );
};

export default FilterPanel;