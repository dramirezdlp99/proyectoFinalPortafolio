// src/context/ComicModeContext.tsx

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ComicModeContextType {
  isComicMode: boolean;
  toggleComicMode: () => void;
}

const ComicModeContext = createContext<ComicModeContextType | undefined>(undefined);

export const useComicMode = () => {
  const context = useContext(ComicModeContext);
  if (!context) {
    throw new Error('useComicMode must be used within a ComicModeProvider');
  }
  return context;
};

interface ComicModeProviderProps {
  children: ReactNode;
}

export const ComicModeProvider: React.FC<ComicModeProviderProps> = ({ children }) => {
  // Usamos useState con un valor inicial de false (modo formal por defecto)
  const [isComicMode, setIsComicMode] = useState(false);

  const toggleComicMode = () => {
    setIsComicMode(prevMode => !prevMode);
  };

  return (
    <ComicModeContext.Provider value={{ isComicMode, toggleComicMode }}>
      {children}
    </ComicModeContext.Provider>
  );
};