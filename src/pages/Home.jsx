import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, categories } from '../data/mockData';

const Home = () => {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-glow"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Fastest Delivery in Town</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Taste the <span className="text-accent">Future</span> of <br/> Food Delivery
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/restaurants">
                <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  Order Now <ArrowRight size={20} />
                </button>
              </Link>
              <div className="glass bg-white/10 border-white/20 px-6 py-4 rounded-2xl flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs opacity-80">Delivering to</p>
                  <p className="font-semibold">Downtown, New York</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Categories</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[100px] h-[120px] glass-card rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white transition-colors"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="font-medium text-slate-600">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} data={restaurant} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;