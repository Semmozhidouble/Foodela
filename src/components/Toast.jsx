import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-slate-800/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-2xl border border-white/10"
    >
      {type === 'success' && <CheckCircle size={20} className="text-green-400" />}
      {type === 'info' && <Info size={20} className="text-blue-400" />}
      <span className="font-medium text-sm">{message}</span>
    </motion.div>
  );
};

export default Toast;