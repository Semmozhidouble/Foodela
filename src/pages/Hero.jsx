import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1, x: -50 }}
          className="absolute top-20 left-10 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: y2, x: 50 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900"
          >
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Future</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-gray-600 max-w-lg"
          >
            Experience ultra-premium food delivery. Curated flavors, delivered with futuristic precision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-md group"
          >
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-2xl group-hover:bg-orange-500/30 transition-all duration-500" />
            <div className="relative flex items-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-2 shadow-lg transition-all duration-300 group-hover:shadow-orange-500/20 group-hover:border-orange-200/50">
              <Search className="w-6 h-6 text-gray-400 ml-3 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search for gourmet dishes..." 
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-gray-800 placeholder-gray-500 font-medium"
              />
            </div>
          </motion.div>
        </div>

        <div className="relative hidden lg:block h-[600px] pointer-events-none">
           {/* Floating Food Images */}
           <motion.img
             src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
             alt="Food"
             className="absolute top-10 right-10 w-64 h-64 object-cover rounded-full shadow-2xl border-4 border-white/50"
             animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.img
             src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
             alt="Food"
             className="absolute bottom-20 left-10 w-56 h-56 object-cover rounded-full shadow-2xl border-4 border-white/50"
             animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           />
        </div>
      </div>
    </section>
  );
}