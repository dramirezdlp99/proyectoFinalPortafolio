'use client';

import React from 'react';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Code, Palette, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();

  // Mapeo de iconos
  const iconMap: { [key: string]: React.ReactNode } = {
    code: <Code size={40} />,
    palette: <Palette size={40} />,
    gamepad: <Gamepad2 size={40} />
  };

  // Estilos condicionales
  const sectionBg = isComicMode ? 'bg-white' : 'bg-light-gray';
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-red' : 'text-dark-blue';
  const cardClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-comic-yellow hover:bg-comic-red hover:text-white'
    : 'bg-white shadow-xl border border-gray-200 hover:shadow-2xl hover:scale-105';

  return (
    <section id="services" className={`py-20 px-6 md:px-16 lg:pl-80 ${sectionBg} relative overflow-hidden`}>
      
      {/* Efecto de fondo cómic */}
      {isComicMode && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}

      <div className="container mx-auto relative z-10">
        {/* Título */}
        <motion.h2 
          className={`text-4xl font-bold text-center mb-12 ${titleClasses}`}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.services.title}
        </motion.h2>

        {/* Grid de Servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.items.map((service, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-xl transition-all duration-300 group ${cardClasses}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Ícono */}
              <div className={`mb-6 ${
                isComicMode 
                  ? 'text-black group-hover:text-white' 
                  : 'text-dark-blue'
              }`}>
                {iconMap[service.icon]}
              </div>

              {/* Título */}
              <h3 className={`text-2xl font-bold mb-4 ${
                isComicMode 
                  ? 'font-comic text-black group-hover:text-white' 
                  : 'text-dark-blue'
              }`}>
                {service.title}
              </h3>

              {/* Descripción */}
              <p className={`text-base mb-6 ${
                isComicMode 
                  ? 'text-black group-hover:text-white font-semibold' 
                  : 'text-gray-700'
              }`}>
                {service.description}
              </p>

              {/* Botón */}
              <a 
                href="#contact" 
                className={`inline-block px-6 py-2 rounded-lg font-semibold transition-all ${
                  isComicMode
                    ? 'bg-black text-comic-yellow border-2 border-black group-hover:bg-comic-yellow group-hover:text-black'
                    : 'border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white'
                }`}
              >
                {content.services.cta}
              </a>

              {/* Efecto decorativo en modo cómic */}
              {isComicMode && (
                <motion.div
                  className="absolute top-4 right-4 text-4xl font-black opacity-20"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ★
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}