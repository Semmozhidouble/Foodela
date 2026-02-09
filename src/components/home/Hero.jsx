import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-primary via-orange-500 to-amber-500 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
            >
              🎉 Welcome to Foodela
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              Delicious Food
              <br />
              <span className="text-white/90">Delivered Fast</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-md"
            >
              Order from the best restaurants near you and get it delivered right to your door in minutes.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <button 
                onClick={() => navigate('/restaurants')}
                className="px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
              >
                Order Now
                <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/restaurants')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                Explore Menu
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 pt-8"
            >
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-white/80 text-sm">Restaurants</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-white/80 text-sm">Dishes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-white/80 text-sm">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Floating food images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block h-[500px]"
          >
            {/* Main food image */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80"
            >
              <div className="w-full h-full bg-white rounded-full shadow-2xl p-8 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" 
                  alt="Delicious burger"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

            {/* Floating food items */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
              className="absolute top-10 right-10 w-32 h-32 bg-white rounded-3xl shadow-xl p-3"
            >
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80" 
                alt="Pizza"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.5,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-3xl shadow-xl p-3"
            >
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80" 
                alt="Salad"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C320,100 640,0 1440,50 L1440,100 L0,100 Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
