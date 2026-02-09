import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const items = [
  { id: 1, name: "Truffle Pasta", price: "$24", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80" },
  { id: 2, name: "Wagyu Burger", price: "$18", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  { id: 3, name: "Dragon Roll", price: "$22", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80" },
  { id: 4, name: "Berry Cheesecake", price: "$12", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80" },
];

export default function Recommendations() {
  return (
    <section className="py-12 container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 border border-gray-100 group"
          >
            <div className="relative h-48 rounded-xl overflow-hidden mb-3">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="px-1">
              <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-orange-500 font-bold">{item.price}</span>
                <button className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors">Add to Cart</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}