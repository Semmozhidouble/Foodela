import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Text Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const letter = {
    hidden: { y: 40, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  // Cursor Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const springConfig = { stiffness: 50, damping: 20 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);
  
  const moveX = useTransform(xSpring, [-0.5, 0.5], [40, -40]);
  const moveY = useTransform(ySpring, [-0.5, 0.5], [40, -40]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent" />
        
        <motion.div 
          style={{ y: y1, x: -50 }}
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-300/10 rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          style={{ y: y2, x: 50 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-300/10 rounded-full blur-[100px] mix-blend-multiply" 
        />
      </div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-16 items-center pt-20">
        <motion.div style={{ opacity }} className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-orange-600 font-semibold tracking-wide uppercase text-xs"
          >
            <span className="w-8 h-[1px] bg-orange-600"></span>
            Next Gen Food Delivery
          </motion.div>

          <motion.h1 
            variants={container}
            initial="hidden"
            animate="show"
            className="text-6xl lg:text-8xl font-bold tracking-tighter text-slate-900 leading-[1.1]"
          >
            {"Taste the Future".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-4">
                {word.split("").map((char, j) => (
                  <motion.span key={j} variants={letter} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-xl text-slate-500 max-w-lg font-light leading-relaxed"
          >
            Experience ultra-premium dining at home. Curated flavors from the world's finest kitchens, delivered with futuristic precision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="relative max-w-lg group"
          >
            <div className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-3xl group-hover:bg-orange-500/20 transition-all duration-700" />
            <div className="relative flex items-center bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-2 shadow-2xl shadow-orange-500/5 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-orange-200/50">
              <div className="pl-4 pr-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Search for gourmet dishes, restaurants..." 
                className="w-full bg-transparent border-none outline-none px-2 py-4 text-slate-800 placeholder-slate-400 font-medium text-lg"
              />
              <button className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-orange-600 transition-colors duration-300 shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative hidden lg:block h-[800px] pointer-events-none perspective-1000">
           {/* Floating Food Images */}
           <motion.img
             src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
             alt="Food"
             className="absolute top-20 right-10 w-80 h-80 object-cover rounded-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border-8 border-white/30 backdrop-blur-sm z-20"
             style={{ x: moveX, y: moveY }}
             animate={{ rotate: [0, 3, 0], y: [0, -15, 0] }}
             transition={{ 
               rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
               y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
             }}
           />
           <motion.img
             src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
             alt="Food"
             className="absolute bottom-32 left-10 w-64 h-64 object-cover rounded-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border-8 border-white/30 backdrop-blur-sm z-10"
             style={{ x: useTransform(moveX, v => -v * 1.5), y: useTransform(moveY, v => -v * 1.5) }}
             animate={{ rotate: [0, -3, 0], y: [0, 20, 0] }}
             transition={{ 
               rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
               y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
             }}
           />
           
           {/* Decorative Blur Elements */}
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-orange-400/20 to-rose-400/20 rounded-full blur-[100px]"
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           />
        </div>
      </div>
    </section>
  );
}