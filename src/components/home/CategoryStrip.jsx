import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Coffee, Salad, IceCream, UtensilsCrossed, Cake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryStrip = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Pizza', icon: Pizza, color: 'bg-red-100 text-red-600', link: '/restaurants?type=Pizza' },
    { id: 2, name: 'Burgers', icon: UtensilsCrossed, color: 'bg-yellow-100 text-yellow-600', link: '/restaurants?type=Burger' },
    { id: 3, name: 'Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-600', link: '/restaurants?type=Cafe' },
    { id: 4, name: 'Healthy', icon: Salad, color: 'bg-green-100 text-green-600', link: '/restaurants?type=Healthy' },
    { id: 5, name: 'Desserts', icon: IceCream, color: 'bg-pink-100 text-pink-600', link: '/restaurants?type=Dessert' },
    { id: 6, name: 'Bakery', icon: Cake, color: 'bg-purple-100 text-purple-600', link: '/restaurants?type=Bakery' }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">What's on your mind?</h2>
          <p className="text-slate-500">Explore delicious food categories</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(category.link)}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all group"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow`}>
                  <Icon size={28} />
                </div>
                <span className="font-medium text-slate-700 text-sm">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryStrip;
