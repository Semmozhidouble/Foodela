import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Pizza, Coffee, IceCream, Salad, ChefHat } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: ChefHat },
  { id: 'italian', label: 'Italian', icon: Pizza },
  { id: 'indian', label: 'Indian', icon: Utensils },
  { id: 'chinese', label: 'Chinese', icon: Utensils },
  { id: 'cafe', label: 'Cafe', icon: Coffee },
  { id: 'dessert', label: 'Dessert', icon: IceCream },
  { id: 'healthy', label: 'Healthy', icon: Salad },
];

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="glass p-3 rounded-2xl shadow-sm">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300 whitespace-nowrap flex-shrink-0
                ${isActive 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30' 
                  : 'bg-white/50 text-slate-600 hover:bg-white hover:shadow-md'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
              <span>{category.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
