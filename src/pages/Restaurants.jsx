import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import RestaurantCard from '../components/RestaurantCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SkeletonLoader from '../components/SkeletonLoader';
import { restaurants } from '../data/mockData';

const Restaurants = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    // Simulate network delay for skeleton demo
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 relative overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-red-50/40 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Hero / Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative z-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 tracking-wide uppercase"
          >
            Premium Selection
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Exquisite</span> Dining
          </h1>
          <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
            Discover the finest restaurants delivering to your doorstep. Curated for quality, speed, and taste.
          </p>
          
          <SearchBar />
        </motion.div>

        {/* Filters & Sort */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="sticky top-24 z-30 mb-8"
        >
          <div className="glass p-2 rounded-2xl shadow-sm">
            <FilterPanel />
          </div>
        </motion.div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            // Skeleton Loading State
            Array(8).fill(0).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonLoader />
              </motion.div>
            ))
          ) : (
            // Actual Data
            filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={restaurant.id} 
                data={restaurant} 
                index={index} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;