import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';

const DEFAULT_ITEMS = [
  { id: 1, name: "Truffle Pasta", price: "$24", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80" },
  { id: 2, name: "Wagyu Burger", price: "$18", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  { id: 3, name: "Dragon Roll", price: "$22", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80" },
  { id: 4, name: "Berry Cheesecake", price: "$12", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80" },
];

export default function Recommendations({ items = [], loading }) {
  const displayItems = items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100 group"
          >
            <div className="relative h-64 rounded-[2rem] overflow-hidden mb-5">
              <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            <div className="px-2 pb-2">
              <h3 className="font-bold text-slate-900 text-xl mb-1">{item.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{item.restaurantName || "Premium Kitchen"}</p>
              <div className="flex justify-between items-center">
                <span className="text-slate-900 font-bold text-lg">${item.price}</span>
                <button className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-slate-900/20">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}