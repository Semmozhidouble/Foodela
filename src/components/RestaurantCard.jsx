import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Tag, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';

const RestaurantCard = ({ data, index }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [imageError, setImageError] = useState(false);

  // Format display data - handle both mock and API formats
  const displayTime = data.deliveryTime ? `${data.deliveryTime} min` : (data.time || '30 min');
  const displayTags = data.cuisine ? [data.cuisine] : (data.tags || []);
  const displayFee = data.deliveryFee ? `$${data.deliveryFee.toFixed(2)}` : '$2.99';
  
  // Generate unique restaurant/food images for each restaurant
  const getFallbackImage = () => {
    const cuisine = data.cuisine?.toLowerCase() || 'restaurant';
    const restaurantId = data.id || Math.floor(Math.random() * 1000);
    
    // Curated collection of working restaurant/food images from Unsplash
    const foodImages = {
      italian: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',  // Pizza
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',  // Pasta
        'https://images.unsplash.com/photo-1595295333158-4742f28fbd85',  // Italian dish
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141',  // Pizza slice
      ],
      indian: [
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe',  // Indian curry
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d',  // Indian thali
        'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',  // Biryani
        'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8',  // Indian food
      ],
      chinese: [
        'https://images.unsplash.com/photo-1580959375944-ad5eb1c0d443',  // Chinese food
        'https://images.unsplash.com/photo-1563245372-f21724e3856d',  // Dim sum
        'https://images.unsplash.com/photo-1563979086-6189e1af3a27',  // Noodles
        'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',  // Chinese cuisine
      ],
      cafe: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24',  // Cafe interior
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',  // Coffee
        'https://images.unsplash.com/photo-1453614512568-c4024d13c247',  // Cafe
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814',  // Breakfast cafe
      ],
      'coffee shop': [
        'https://images.unsplash.com/photo-1511920170033-f8396924c348',  // Coffee shop
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31',  // Espresso
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',  // Coffee
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e',  // Cafe latte
      ],
      'fast food': [
        'https://images.unsplash.com/photo-1561758033-d89a9ad46330',  // Burgers
        'https://images.unsplash.com/photo-1550547660-d9450f859349',  // Burger
        'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9',  // Burger close-up
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90',  // Fast food
      ],
      dessert: [
        'https://images.unsplash.com/photo-1563805042-7684c019e1cb',  // Cake
        'https://images.unsplash.com/photo-1587314168485-3236d6710814',  // Ice cream
        'https://images.unsplash.com/photo-1488477181946-6428a0291777',  // Pastry
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587',  // Dessert
      ],
      general: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',  // Restaurant
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',  // Restaurant interior
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',  // Dining
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836',  // Food plating
      ],
    };
    
    const images = foodImages[cuisine] || foodImages.general;
    const selectedImage = images[restaurantId % images.length];
    
    return `${selectedImage}?w=800&q=80`;
  };
  
  // Try to use the API image, but if it's broken/incomplete, use unique fallback
  const getImageUrl = () => {
    if (imageError) return getFallbackImage();
    if (!data.image) return getFallbackImage();
    
    // Check if the Unsplash URL looks incomplete (missing full photo ID)
    const unsplashPattern = /photo-(\d{10})(\?|$)/;
    if (data.image.includes('unsplash') && unsplashPattern.test(data.image)) {
      // URL looks incomplete, use fallback instead
      return getFallbackImage();
    }
    
    return data.image;
  };
  
  const imageUrl = getImageUrl();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-[2rem] overflow-hidden group cursor-pointer hover:border-primary/20"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          src={imageUrl} 
          alt={data.name} 
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-xs font-bold text-slate-800">{displayTime}</span>
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
            <Heart size={18} className={favorites.includes(data.id) ? "fill-primary text-primary" : "text-slate-400 hover:text-primary transition-colors"} />
          </motion.button>
        </div>
        {data.offer && (
          <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-xl flex items-center gap-1 shadow-lg shadow-primary/20">
            <Tag size={12} className="text-white" />
            <span className="text-xs font-bold text-white">{data.offer}</span>
          </div>
        )}
        {!data.isOpen && data.isOpen !== undefined && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full font-bold text-slate-800">Closed</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">{data.name}</h3>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-lg">
            <Star size={14} className="fill-green-500 text-green-500" />
            <span className="text-sm font-bold text-green-700">{data.rating}</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm mb-3">{data.description || displayTags.join(" • ")}</p>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{data.priceRange || '$$'}</span>
          <span>•</span>
          <span>Delivery {displayFee}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;