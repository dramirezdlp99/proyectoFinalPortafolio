'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  // Estilos condicionales
  const sectionBg = isComicMode ? 'bg-white' : 'bg-light-gray';
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-red' : 'text-dark-blue';
  const textClasses = isComicMode ? 'text-black font-bold' : 'text-gray-700';
  const cardBorder = isComicMode ? 'border-4 border-black shadow-comic-lg bg-comic-yellow' : 'shadow-xl border border-light-gray bg-white';
  const navButtonClasses = isComicMode 
    ? 'bg-comic-red border-4 border-black text-white hover:bg-black hover:text-comic-red shadow-comic' 
    : 'bg-dark-blue text-white hover:bg-dark-blue/90';

  // Imágenes de ejemplo (crea estas en /public/)
  const images = [
    '/about-interest-1.png',
    '/about-interest-2.png', 
    '/about-interest-3.png'
  ];

  return (
    <section id="about" className={`py-20 px-6 md:px-16 lg:pl-80 ${sectionBg} relative overflow-hidden`}>
      
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
          {content.about.title}
          {isComicMode && (
            <motion.span 
              className="inline-block ml-4 text-comic-yellow"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              ★
            </motion.span>
          )}
        </motion.h2>

        <motion.div 
          className={`flex flex-col lg:flex-row items-center p-8 rounded-xl ${cardBorder} transition-all duration-300`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* CARRUSEL DE IMÁGENES (Izquierda) */}
          <div className="w-full lg:w-1/2 relative pr-0 lg:pr-8 mb-8 lg:mb-0">
            
            <div className="overflow-hidden rounded-xl" ref={emblaRef}>
              <div className="flex">
                {images.map((img, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Image 
                      src={img} 
                      alt={`About ${index + 1}`} 
                      width={600} 
                      height={400} 
                      className={`rounded-xl w-full h-auto object-cover transition-all duration-300 ${
                        isComicMode 
                          ? 'border-4 border-black shadow-comic' 
                          : 'shadow-lg'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de navegación */}
            <button 
              onClick={scrollPrev}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full z-10 transition-all ${navButtonClasses}`}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full z-10 transition-all ${navButtonClasses}`}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

          </div>

          {/* CONTENIDO (Derecha) */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-8">
            {content.about.items.map((item, index) => (
              <motion.div 
                key={index} 
                className={`${index === selectedIndex ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: index === selectedIndex ? 1 : 0, x: index === selectedIndex ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={`text-3xl font-bold mb-4 ${titleClasses}`}>
                  {item.title}
                </h3>
                <p className={`text-lg leading-relaxed ${textClasses}`}>
                  {item.content}
                </p>
              </motion.div>
            ))}
            
            {/* Dots indicadores */}
            <div className="flex justify-center lg:justify-start mt-6 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? isComicMode 
                        ? 'bg-comic-red border-2 border-black scale-125' 
                        : 'bg-dark-blue scale-125'
                      : 'bg-gray-400 hover:bg-dark-blue/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}