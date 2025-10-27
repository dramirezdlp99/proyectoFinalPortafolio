'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects() {
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
    : 'shadow-xl bg-light-gray border border-gray-200';
  const buttonClasses = isComicMode 
    ? 'comic-button' 
    : 'bg-dark-blue text-white hover:bg-dark-blue/90';
  const navButtonClasses = isComicMode 
    ? 'bg-comic-red border-4 border-black text-white hover:bg-black hover:text-comic-red shadow-comic' 
    : 'bg-dark-blue text-white hover:bg-dark-blue/90';

  // Imágenes de proyectos (crea estas en /public/)
  const projectImages = [
    '/project-digihealth.png',
    '/project-turismo.png',
    '/project-shooter.png'
  ];

  return (
    <section id="projects" className={`py-20 px-4 md:px-8 ${sectionBg} relative overflow-hidden`}>
      
      {/* Efecto de fondo cómic */}
      {isComicMode && (
        <>
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="comic-halftone w-full h-full"></div>
          </div>
          {/* Efectos decorativos */}
          <motion.div
            className="absolute top-10 right-10 text-9xl font-black text-comic-red opacity-10"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            POW!
          </motion.div>
        </>
      )}

      <div className="section-container relative z-10">
        {/* Título */}
        <motion.h2 
          className={`text-4xl font-bold text-center mb-12 ${titleClasses}`}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.projects.title}
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Contenedor de Embla */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {content.projects.items.map((project, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                  <motion.div 
                    className={`flex flex-col lg:flex-row items-center p-8 rounded-xl transition-all duration-300 ${cardClasses}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    
                    {/* IMAGEN */}
                    <div className="w-full lg:w-1/2 h-64 lg:h-80 relative mb-6 lg:mb-0 lg:mr-8 flex-shrink-0">
                      <Image
                        src={projectImages[index]}
                        alt={project.title}
                        fill
                        className={`rounded-lg object-cover transition-all duration-300 ${
                          isComicMode 
                            ? 'border-4 border-black shadow-comic' 
                            : 'shadow-md'
                        }`}
                      />
                      
                      {/* Badge de número en modo cómic */}
                      {isComicMode && (
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-comic-red text-white font-black text-2xl flex items-center justify-center rounded-full border-4 border-black shadow-comic transform rotate-12">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    {/* CONTENIDO */}
                    <div className="w-full lg:w-1/2">
                      <h3 className={`text-2xl lg:text-3xl font-bold mb-3 ${
                        isComicMode 
                          ? 'font-comic text-comic-red text-shadow-comic' 
                          : 'text-dark-blue'
                      }`}>
                        {project.title}
                      </h3>
                      
                      <p className={`mb-4 text-base ${
                        isComicMode 
                          ? 'text-black font-semibold' 
                          : 'text-gray-700'
                      }`}>
                        {project.description}
                      </p>
                      
                      {/* Tecnologías */}
                      <div className="mb-6">
                        <p className={`font-semibold mb-2 ${
                          isComicMode ? 'text-black' : 'text-dark-blue'
                        }`}>
                          Tecnologías:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span 
                              key={i} 
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                isComicMode
                                  ? 'bg-comic-yellow text-black border-2 border-black'
                                  : 'bg-dark-blue text-white'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Botón */}
                      <motion.a 
                        href={project.link || "#"} 
                        target={project.link && project.link !== "#" ? "_blank" : "_self"}
                        rel={project.link && project.link !== "#" ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${buttonClasses}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          if (!project.link || project.link === "#") {
                            e.preventDefault();
                            alert("Este proyecto aún no tiene enlace configurado. Edita el JSON para agregar el link.");
                          }
                        }}
                      >
                        <ExternalLink size={20} />
                        {content.projects.cta}
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          <button
            onClick={scrollPrev}
            className={`absolute top-1/2 -left-4 lg:-left-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all ${navButtonClasses}`}
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute top-1/2 -right-4 lg:-right-16 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all ${navButtonClasses}`}
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {content.projects.items.map((_, index) => (
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
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}