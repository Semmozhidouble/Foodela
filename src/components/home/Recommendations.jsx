import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Clock, Percent } from 'lucide-react';

const Recommendations = () => {
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Contactless delivery and secure payments',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Order anytime, anywhere, any day',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      icon: Percent,
      title: 'Best Offers',
      description: 'Exclusive deals and discounts for you',
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Why Choose Foodela?</h2>
          <p className="text-slate-500">We make food delivery simple and delightful</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-3xl text-center"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                  <Icon size={32} className={feature.color} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
