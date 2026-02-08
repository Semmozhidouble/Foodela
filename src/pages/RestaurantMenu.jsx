import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Search, ChefHat } from 'lucide-react';
import { restaurantAPI } from '../services/apiService';
import FoodItemCard from '../components/FoodItemCard';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef([]);
  const { cart } = useCart();
  const { showToast } = useToast();
  
  // Parallax effects
  const imageY = useTransform(scrollY, [0, 300], [0, 100]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Get restaurant image with fallback
  const getRestaurantImage = (restaurant) => {
    if (!restaurant) return '';
    
    const restaurantType = restaurant.restaurantType?.toLowerCase() || restaurant.cuisine?.toLowerCase() || 'restaurant';
    
    const typeImages = {
      biryani: `https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80`,
      pizza: `https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80`,
      burger: `https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80`,
      'south indian': `https://images.unsplash.com/photo-1626074353765-517a681e40be?w=1200&q=80`,
      'north indian': `https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80`,
      chinese: `https://images.unsplash.com/photo-1580959375944-ad5eb1c0d443?w=1200&q=80`,
      cafe: `https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80`,
      bakery: `https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80`,
    };
    
    return typeImages[restaurantType] || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80`;
  };

  // Fetch restaurant and menu data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [restaurantData, menuData] = await Promise.all([
          restaurantAPI.getById(id),
          restaurantAPI.getMenuByCategories(id)
        ]);
        setRestaurant(restaurantData);
        setMenuCategories(menuData);
        
        // Check cart lock
        if (cart.restaurantId && cart.restaurantId !== parseInt(id)) {
          showToast(`Your cart has items from another restaurant`, 'warning');
        }
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
        showToast('Failed to load menu', 'error');
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  // Smooth scroll to category
  const scrollToCategory = (index) => {
    setActiveCategory(index);
    categoryRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  };

  // Filter menu items by search
  const filteredCategories = menuCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  if (loading || !restaurant) {
    return (
      <div className="min-h-screen pb-24 pt-24 px-6 max-w-7xl mx-auto">
        <div className="h-[40vh] bg-slate-200 rounded-[2.5rem] animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <SkeletonLoader key={i} type="list" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Parallax Header Image */}
      <div className="relative h-[40vh] overflow-hidden">
        <motion.div style={{ y: imageY, opacity: headerOpacity }} className="absolute inset-0">
          <img 
            src={getRestaurantImage(restaurant)} 
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
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{restaurant.name}</h1>
                {restaurant.isOpen ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">Open</span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-bold">Closed</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm mb-3">
                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg font-bold">
                  <Star size={14} className="fill-current" /> {restaurant.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {restaurant.deliveryTime} min
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {restaurant.address || 'Nearby'}
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                {restaurant.cuisine}
                {restaurant.restaurantType && ` • ${restaurant.restaurantType}`}
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl bg-slate-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu Section */}
      <div className="px-6 max-w-7xl mx-auto mt-12">
        {/* Category Tabs */}
        {menuCategories.length > 0 && (
          <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-sm mb-8">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              {menuCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => scrollToCategory(index)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    activeCategory === index
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.name} ({category.items.length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items by Category */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, catIndex) => (
            <div 
              key={category.name}
              ref={el => categoryRefs.current[catIndex] = el}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ChefHat size={24} className="text-primary" />
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                  <FoodItemCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                    restaurantId={parseInt(id)}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            icon={Search}
            title="No items found"
            description={searchQuery ? `No menu items match "${searchQuery}"` : "This restaurant hasn't added menu items yet"}
            actionText="Clear Search"
            onAction={() => setSearchQuery('')}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;