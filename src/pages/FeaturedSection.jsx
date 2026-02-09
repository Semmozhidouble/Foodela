import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Clock, ArrowRight } from 'lucide-react';
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-w-[300px] md:min-w-[400px] h-[500px] relative rounded-[2.5rem] overflow-hidden cursor-pointer snap-center group perspective-1000"
    >
      <Link to={`/restaurant/${item.id}`} className="block w-full h-full">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img 
            src={item.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </motion.div>
        
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg transform translate-z-20">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-bold text-sm">{item.rating}</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 transform translate-z-30">
          <motion.div
            initial={{ y: 20, opacity: 0.8 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{item.name}</h3>
            <p className="text-gray-300 mb-6 text-lg font-medium">{item.cuisine}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/90 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold">{item.deliveryTime} min</span>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-white/20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function FeaturedSection({ restaurants = [], loading }) {
  const displayItems = restaurants.length > 0 ? restaurants : DEFAULT_RESTAURANTS;

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

        <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-4 -mx-4 snap-x hide-scrollbar perspective-1000">
          {loading ? (
             [1,2,3].map(i => (
               <div key={i} className="min-w-[300px] md:min-w-[400px] h-[500px] bg-gray-200 rounded-[2.5rem] animate-pulse snap-center" />
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