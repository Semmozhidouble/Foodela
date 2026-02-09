import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';

const SoundToggle = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.button
      onClick={toggleMute}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed bottom-8 left-24 z-[100] p-4 rounded-full shadow-2xl transition-all duration-500 border border-white/10 backdrop-blur-md ${
        !isMuted 
          ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.5)]' 
          : 'bg-black/80 text-white hover:bg-black'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
};

export default SoundToggle;