import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const FoodItemCard = ({ item, index, restaurantId, restaurantName }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { showToast } = useToast();
  const [imageError, setImageError] = useState(false);

  // Get item quantity from cart
  const cartItem = cart.items?.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  // Handle add to cart with restaurant lock
  const handleAddToCart = () => {
    // Check if cart has items from different restaurant
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      showToast(`Your cart has items from ${cart.restaurantName}. Clear cart to add from ${restaurantName}`, 'warning');
      return;
    }

    if (!item.isAvailable) {
      showToast(`${item.name} is currently unavailable`, 'error');
      return;
    }

    addToCart({ ...item, restaurantId, restaurantName });
    showToast(`Added ${item.name} to cart`, 'success');
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      removeFromCart(item.id);
      showToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  // Generate food image
  const getFoodImage = () => {
    const category = item.category?.toLowerCase() || 'food';
    const itemId = item.id || Math.floor(Math.random() * 1000);
    
    const categoryImages = {
      biryani: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833'],
      pizza: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'https://images.unsplash.com/photo-1513104890138-7c749659a591'],
      burger: ['https://images.unsplash.com/photo-1550547660-d9450f859349', 'https://images.unsplash.com/photo-1561758033-d89a9ad46330'],
      starters: ['https://images.unsplash.com/photo-1555244162-803834f70033', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'],
      'main course': ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'],
      desserts: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb', 'https://images.unsplash.com/photo-1587314168485-3236d6710814'],
      drinks: ['https://images.unsplash.com/photo-1544145945-f90425340c7e', 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf'],
      beverages: ['https://images.unsplash.com/photo-1544145945-f90425340c7e', 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf'],
    };
    
    const images = categoryImages[category] || categoryImages['main course'];
    const selectedImage = images[itemId % images.length];
    
    return `${selectedImage}?w=400&q=80`;
  };

  const imageUrl = imageError ? getFoodImage() : (item.image || getFoodImage());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card p-4 rounded-[2rem] flex gap-4 items-center group relative overflow-hidden ${!item.isAvailable ? 'opacity-60' : ''}`}
    >
      {!item.isAvailable && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          Unavailable
        </div>
      )}
      
      {/* Image */}
      <div className="w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
          {item.isVegetarian ? (
            <span className="w-5 h-5 border-2 border-green-600 flex items-center justify-center rounded-sm p-[2px] flex-shrink-0">
              <span className="w-full h-full bg-green-600 rounded-full"></span>
            </span>
          ) : (
            <span className="w-5 h-5 border-2 border-red-600 flex items-center justify-center rounded-sm p-[2px] flex-shrink-0">
              <span className="w-full h-full bg-red-600 rounded-full"></span>
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-slate-800">${item.price.toFixed(2)}</span>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg px-2 py-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                className="bg-slate-100 text-slate-800 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Minus size={16} />
              </motion.button>
              <span className="font-bold text-slate-800 min-w-[20px] text-center">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="bg-primary text-white p-1.5 rounded-lg hover:bg-accent transition-colors"
              >
                <Plus size={16} />
              </motion.button>
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!item.isAvailable}
              className={`${item.isAvailable ? 'bg-slate-900 hover:bg-primary' : 'bg-slate-300 cursor-not-allowed'} text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-slate-200/50`}
            >
              <Plus size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;