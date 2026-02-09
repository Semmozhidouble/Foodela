import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef({});

  // Premium sound assets
  const sounds = {
    sizzle: 'https://assets.mixkit.co/active_storage/sfx/2414/2414-preview.mp3',
    crunch: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    pour: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  };

  useEffect(() => {
    // Preload sounds with low volume for subtlety
    Object.entries(sounds).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.15; // Premium subtle volume
      audioRefs.current[key] = audio;
    });
  }, []);

  const playSound = (type) => {
    if (isMuted || !audioRefs.current[type]) return;
    
    const audio = audioRefs.current[type];
    if (!audio.paused) {
      audio.currentTime = 0;
    }
    audio.play().catch(e => console.warn("Audio play failed:", e));
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <SoundContext.Provider value={{ playSound, toggleMute, isMuted }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);