import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmptyState = ({ icon: Icon, title, description, actionText, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6"
      >
        <Icon size={40} className="text-slate-300" />
      </motion.div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">{description}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;