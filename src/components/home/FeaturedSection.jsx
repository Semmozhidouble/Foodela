import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../../services/apiService';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantAPI.getAll();
        setRestaurants(data.slice(0, 3)); // Top 3 featured
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-slate-200 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Featured Restaurants</h2>
          <p className="text-slate-500">Top picks just for you</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              className="glass rounded-3xl overflow-hidden cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={restaurant.image || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80`}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-slate-800">{restaurant.rating || '4.5'}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  {restaurant.description || 'Delicious food delivered fast'}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{restaurant.deliveryTime || '30-40'} min</span>
                    </div>
                    <div className="text-primary font-bold">
                      ${restaurant.deliveryFee?.toFixed(2) || '2.99'} delivery
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={() => navigate('/restaurants')}
            className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-glow hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto"
          >
            View All Restaurants
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedSection;
