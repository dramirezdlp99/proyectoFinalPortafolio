'use client';

import React from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function Services() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();

  // Imágenes para cada servicio (guárdalas en /public/)
  const serviceImages = [
    '/service-web-dev.png',     // Desarrollo Web
    '/service-ux-ui.png',       // Diseño UX/UI
    '/service-interactive.png'  // Aplicaciones Interactivas
  ];

  // Fondo azul para toda la sección
  const sectionBg = isComicMode ? 'bg-comic-blue' : 'bg-dark-blue';
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-yellow' : 'text-white';
  const cardClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-white hover:bg-comic-yellow'
    : 'bg-white shadow-xl hover:shadow-2xl hover:scale-105';

  return (
    <section id="services" className={`py-20 px-6 md:px-16 ${sectionBg} relative overflow-hidden`}>
      
      {/* Efecto de fondo cómic */}
      {isComicMode && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
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
              className={`rounded-xl overflow-hidden transition-all duration-300 group ${cardClasses}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Imagen del servicio */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={serviceImages[index]}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${
                  isComicMode 
                    ? 'font-comic text-comic-red' 
                    : 'text-dark-blue'
                }`}>
                  {service.title}
                </h3>

                <p className={`text-sm mb-6 ${
                  isComicMode 
                    ? 'text-black font-semibold' 
                    : 'text-gray-700'
                }`}>
                  {service.description}
                </p>

                {/* Botón */}
                <a 
                  href="#contact" 
                  className={`inline-block px-6 py-2 rounded-lg font-semibold transition-all ${
                    isComicMode
                      ? 'bg-comic-red text-white border-4 border-black hover:bg-black hover:text-comic-yellow shadow-comic'
                      : 'border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white'
                  }`}
                >
                  {content.services.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}