import React, { createContext, useContext, useState } from 'react';

const CinematicContext = createContext();

export const CinematicProvider = ({ children }) => {
  const [isCinematic, setIsCinematic] = useState(false);

  const toggleCinematic = () => setIsCinematic(prev => !prev);

  return (
    <CinematicContext.Provider value={{ isCinematic, toggleCinematic }}>
      {children}
    </CinematicContext.Provider>
  );
};

export const useCinematic = () => useContext(CinematicContext);