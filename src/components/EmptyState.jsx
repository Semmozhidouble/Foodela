import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmptyState = ({ icon: Icon, title, description, actionText, actionLink, onAction }) => {
  const handleAction = (e) => {
    if (onAction) {
      e.preventDefault();
      onAction();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 relative"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-slate-300/50 rounded-full"
        />
        <Icon size={40} className="text-slate-400 relative z-10" />
      </motion.div>
      <motion.h2 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-xl font-bold text-slate-800 mb-2"
      >
        {title}
      </motion.h2>
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-500 mb-8 max-w-md mx-auto"
      >
        {description}
      </motion.p>
      {actionText && actionLink && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link 
            to={actionLink} 
            onClick={handleAction}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            {actionText}
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default EmptyState;