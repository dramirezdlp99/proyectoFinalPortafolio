'use client';

import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComicModeToggle() {
  const { isComicMode, toggleComicMode } = useComicMode();
  const { content } = useLanguage();

  // Aplicar/quitar la clase 'comic-mode' del body
  useEffect(() => {
    if (isComicMode) {
      document.body.classList.add('comic-mode');
    } else {
      document.body.classList.remove('comic-mode');
    }
  }, [isComicMode]);

  return (
    <motion.div
      className="fixed top-8 right-8 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <button
        onClick={toggleComicMode}
        className={`group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 ${
          isComicMode
            ? 'bg-comic-yellow border-4 border-black shadow-comic'
            : 'bg-dark-blue border-2 border-light-gray'
        }`}
        title={content.comicMode.tooltip}
        aria-label="Toggle Comic Mode"
      >
        {/* Ícono con animación */}
        <motion.div
          animate={{ rotate: isComicMode ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles 
            className={`w-7 h-7 ${isComicMode ? 'text-black' : 'text-white'}`} 
          />
        </motion.div>

        {/* Tooltip */}
        <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-blue text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {content.comicMode.tooltip}
        </span>

        {/* Efecto de "explosión" al activar modo cómic */}
        <AnimatePresence>
          {isComicMode && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-comic-red rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI) / 4) * 40,
                    y: Math.sin((i * Math.PI) / 4) * 40,
                  }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}