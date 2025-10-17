'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useComicMode } from '@/context/ComicModeContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { isComicMode } = useComicMode();

  return (
    <motion.div
      className="fixed top-8 right-28 z-50"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
    >
      <button
        onClick={toggleLanguage}
        className={`group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 ${
          isComicMode
            ? 'bg-comic-blue border-4 border-black shadow-comic'
            : 'bg-dark-blue border-2 border-light-gray'
        }`}
        aria-label="Toggle Language"
      >
        {/* Texto del idioma */}
        <span className={`font-bold text-lg ${isComicMode ? 'text-black' : 'text-white'}`}>
          {language === 'es' ? 'ES' : 'EN'}
        </span>

        {/* Tooltip */}
        <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-dark-blue text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        </span>

        {/* Indicador de idioma alternativo (pequeño) */}
        <span className={`absolute bottom-1 right-1 text-[8px] font-bold ${isComicMode ? 'text-black/50' : 'text-white/50'}`}>
          {language === 'es' ? 'EN' : 'ES'}
        </span>
      </button>
    </motion.div>
  );
}