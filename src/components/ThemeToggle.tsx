'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useComicMode } from '@/context/ComicModeContext';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const { isComicMode } = useComicMode();
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación mismatch
  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  // Escuchar cambios del sistema cuando está en modo 'system'
  useEffect(() => {
    if (!mounted) return;
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, mounted]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={18} />, label: 'Claro' },
    { value: 'dark', icon: <Moon size={18} />, label: 'Oscuro' },
    { value: 'system', icon: <Monitor size={18} />, label: 'Sistema' },
  ];

  // No renderizar hasta que esté montado en el cliente
  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-8 right-48 z-50"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
    >
      <div className={`flex gap-2 p-2 rounded-full ${
        isComicMode
          ? 'bg-comic-purple border-4 border-black shadow-comic'
          : 'bg-white border-2 border-dark-blue shadow-lg'
      }`}>
        {themes.map((t) => (
          <motion.button
            key={t.value}
            onClick={() => handleThemeChange(t.value)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              theme === t.value
                ? isComicMode
                  ? 'bg-comic-yellow text-black border-2 border-black scale-110'
                  : 'bg-dark-blue text-white scale-110'
                : isComicMode
                  ? 'text-black hover:bg-comic-yellow/50'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={t.label}
            aria-label={t.label}
            whileHover={{ scale: theme === t.value ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.icon}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
