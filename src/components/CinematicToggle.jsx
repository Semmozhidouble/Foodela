import React from 'react';
import { motion } from 'framer-motion';
import { Film, X } from 'lucide-react';
import { useCinematic } from '../context/CinematicContext';

const CinematicToggle = () => {
  const { isCinematic, toggleCinematic } = useCinematic();

  return (
    <motion.button
      onClick={toggleCinematic}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed bottom-8 left-8 z-[100] p-4 rounded-full shadow-2xl transition-all duration-500 border border-white/10 backdrop-blur-md ${
        isCinematic 
          ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.5)]' 
          : 'bg-black/80 text-white hover:bg-black'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isCinematic ? <X size={24} /> : <Film size={24} />}
    </motion.button>
  );
};

export default CinematicToggle;