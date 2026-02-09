import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_RESTAURANTS = [
  {
    id: 1,
    name: "The Great Kabab Factory",
    image: "https://images.unsplash.com/photo-1546393168?w=800&q=80",
    rating: 4.8,
    deliveryTime: "28",
    cuisine: "Indian • Premium"
  },
  {
    id: 2,
    name: "Sushi Zen",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.9,
    deliveryTime: "35",
    cuisine: "Japanese • Sushi"
  },
  {
    id: 3,
    name: "La Pizzeria",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    rating: 4.7,
    deliveryTime: "25",
    cuisine: "Italian • Woodfire"
  }
];

const FeaturedCard = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-w-[320px] md:min-w-[450px] h-[600px] relative rounded-[2rem] overflow-hidden cursor-pointer snap-center group"
    >
      <Link to={`/restaurant/${item.id}`} className="block w-full h-full">
        {/* Background Image with Zoom Effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img 
            src={item.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        </motion.div>
        
        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span className="text-white font-bold text-xs tracking-wide uppercase">Trending</span>
          </div>
        </div>
        
        <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-bold text-sm">{item.rating}</span>
        </div>

        {/* Content Area - Slides up on hover */}
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <h3 className="text-4xl font-bold text-white mb-2 leading-tight tracking-tight">{item.name}</h3>
            <p className="text-white/80 mb-6 text-lg font-medium">{item.cuisine}</p>
            
            {/* Hidden details reveal on hover */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bold">{item.deliveryTime} min</span>
                    </div>
                    <span className="text-white/60 text-sm font-medium">Free Delivery</span>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function FeaturedSection({ restaurants = [], loading }) {
  const displayItems = restaurants.length > 0 ? restaurants : DEFAULT_RESTAURANTS;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Featured Collections</h2>
            <p className="text-slate-500 mt-2 text-lg">Curated premium dining experiences selected for you</p>
          </div>
          <button className="text-slate-900 font-bold hover:text-orange-600 transition-colors flex items-center gap-2 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-16 pt-4 px-4 -mx-4 snap-x hide-scrollbar">
          {loading ? (
             [1,2,3].map(i => (
               <div key={i} className="min-w-[320px] md:min-w-[450px] h-[600px] bg-slate-100 rounded-[2rem] animate-pulse snap-center" />
             ))
          ) : (
            displayItems.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}