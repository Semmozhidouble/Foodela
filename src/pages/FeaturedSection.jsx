import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

const restaurants = [
  {
    id: 1,
    name: "The Great Kabab Factory",
    image: "https://images.unsplash.com/photo-1546393168?w=800&q=80",
    rating: 4.8,
    time: "28 min",
    cuisine: "Indian • Premium"
  },
  {
    id: 2,
    name: "Sushi Zen",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.9,
    time: "35 min",
    cuisine: "Japanese • Sushi"
  },
  {
    id: 3,
    name: "La Pizzeria",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    rating: 4.7,
    time: "25 min",
    cuisine: "Italian • Woodfire"
  }
];

export default function FeaturedSection() {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Collections</h2>
            <p className="text-gray-500 mt-1">Curated premium dining experiences</p>
          </div>
          <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">View All</button>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 snap-x hide-scrollbar">
          {restaurants.map((item) => (
            <motion.div
              key={item.id}
              className="min-w-[300px] md:min-w-[400px] h-[500px] relative rounded-3xl overflow-hidden cursor-pointer snap-center group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-sm">{item.rating}</span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-300 mb-4">{item.cuisine}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg shadow-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Order Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}