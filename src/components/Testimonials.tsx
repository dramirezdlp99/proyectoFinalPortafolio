'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
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
  const sectionBg = isComicMode ? 'bg-comic-yellow/20' : 'bg-white';
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-red' : 'text-dark-blue';
  const cardClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-white'
    : 'bg-light-gray shadow-xl border border-gray-200';
  const navButtonClasses = isComicMode
    ? 'bg-comic-red border-4 border-black text-white hover:bg-black hover:text-comic-red shadow-comic'
    : 'bg-dark-blue text-white hover:bg-dark-blue/90';

  return (
    <section id="testimonials" className={`py-20 px-6 md:px-16 lg:pl-80 ${sectionBg} relative overflow-hidden`}>
      
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
          {content.testimonials.title}
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Contenedor de Embla */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {content.testimonials.items.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    className={`p-8 rounded-xl transition-all duration-300 ${cardClasses}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Ícono de comillas */}
                    <div className={`mb-6 ${
                      isComicMode ? 'text-comic-red' : 'text-dark-blue'
                    }`}>
                      <Quote size={48} />
                    </div>

                    {/* Texto del testimonio */}
                    <p className={`text-lg mb-8 italic leading-relaxed ${
                      isComicMode 
                        ? 'text-black font-semibold' 
                        : 'text-gray-700'
                    }`}>
                      {testimonial.text}
                    </p>

                    {/* Información del autor */}
                    <div className="flex items-center gap-4">
                      <div className={`relative w-16 h-16 rounded-full overflow-hidden ${
                        isComicMode ? 'border-4 border-black shadow-comic' : 'border-2 border-gray-300'
                      }`}>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className={`font-bold text-lg ${
                          isComicMode 
                            ? 'font-comic text-comic-red' 
                            : 'text-dark-blue'
                        }`}>
                          {testimonial.name}
                        </p>
                        <p className={`text-sm ${
                          isComicMode ? 'text-black font-semibold' : 'text-gray-600'
                        }`}>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Estrellas decorativas en modo cómic */}
                    {isComicMode && (
                      <div className="absolute top-4 right-4 text-comic-yellow text-2xl">
                        ★★★★★
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          <button
            onClick={scrollPrev}
            className={`absolute top-1/2 -left-4 lg:-left-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all ${navButtonClasses}`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute top-1/2 -right-4 lg:-right-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all ${navButtonClasses}`}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {content.testimonials.items.map((_, index) => (
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
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}