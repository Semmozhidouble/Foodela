import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Search } from 'lucide-react';
import { restaurants, menuItems } from '../data/mockData';
import FoodItemCard from '../components/FoodItemCard';

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const imageY = useTransform(scrollY, [0, 300], [0, 100]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const restaurant = restaurants.find(r => r.id === parseInt(id)) || restaurants[0];
  const items = menuItems.filter(item => item.restaurantId === parseInt(id) || item.restaurantId === 1); // Fallback to id 1 for demo

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Parallax Header Image */}
      <div className="relative h-[40vh] overflow-hidden">
        <motion.div style={{ y: imageY, opacity: headerOpacity }} className="absolute inset-0">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </motion.div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 z-20">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30 hover:bg-white hover:text-slate-800 transition-all"
          >
            <ArrowLeft size={24} />
          </motion.button>
        </div>
      </div>

      {/* Restaurant Info Card - Overlapping */}
      <div className="relative z-10 -mt-12 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-[2.5rem] p-8 shadow-glass"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg font-bold">
                  <Star size={14} className="fill-current" /> {restaurant.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {restaurant.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> 2.5 km away
                </span>
                <span>{restaurant.tags.join(" • ")}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
               <button className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                 <Search size={20} />
               </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu Section */}
      <div className="px-6 max-w-7xl mx-auto mt-12">
        <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar mb-8 border-b border-slate-200 pb-2">
          {['Recommended', 'Starters', 'Main Course', 'Desserts', 'Drinks'].map((cat, i) => (
            <button key={cat} className={`whitespace-nowrap pb-2 font-medium transition-colors ${i === 0 ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <FoodItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;