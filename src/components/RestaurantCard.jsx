import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Tag, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

const RestaurantCard = ({ data, index }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-glow hover:border-primary/20"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={data.image} 
          alt={data.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-xs font-bold text-slate-800">{data.time}</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              const isAdding = !favorites.includes(data.id);
              toggleFavorite(data.id);
              if (isAdding) {
                showToast(`Added ${data.name} to favorites`, 'success');
              } else {
                showToast(`Removed ${data.name} from favorites`, 'info');
              }
            }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
          >
            <Heart size={18} className={favorites.includes(data.id) ? "fill-primary text-primary" : "text-slate-400"} />
          </motion.button>
        </div>
        {data.offer && (
          <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1 shadow-lg shadow-primary/20">
            <Tag size={12} className="text-white" />
            <span className="text-xs font-bold text-white">{data.offer}</span>
          </div>
        )}
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