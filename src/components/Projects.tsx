// src/components/Projects.tsx

'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Github, Link } from 'lucide-react';

// --- DATOS DE PROYECTOS (Reemplaza los links con los reales) ---
const projects = [
  {
    id: 1,
    title: 'DigiHealth – Sistema de Gestión Clínica',
    description: 'Plataforma completa para la gestión hospitalaria, abarcando desde el registro biométrico de pacientes hasta el manejo de inventario médico y citas. Diseño enfocado en UI/UX profesional.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Figma'],
    link: 'https://github.com/tu-usuario/digihealth-repo', // Enlace a GitHub o Vercel
    image: '/project-digihealth.png', // Imagen de ejemplo
  },
  {
    id: 2,
    title: 'Landing Page de Turismo Interactivo',
    description: 'Diseño responsive y animado de una landing page para una agencia de viajes, utilizando animaciones fluidas y un diseño moderno. Excelente rendimiento gracias a Next.js.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://vercel.com/tu-usuario/turismo-page',
    image: '/project-turismo.png', 
  },
  {
    id: 3,
    title: 'Shooter 3D - Juego en Unity',
    description: 'Desarrollo de un prototipo de videojuego First-Person Shooter (FPS) en 3D. Aplicación de lógica de juego, física y scripting avanzado.',
    tech: ['Unity', 'C#', 'Blender'],
    link: 'https://github.com/tu-usuario/shooter-3d-repo',
    image: '/project-shooter.png',
  },
];
// ----------------------------------------------------------------

export default function Projects() {
  const { isComicMode } = useComicMode();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  // Sincroniza el índice del carrusel para los puntos de navegación
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);


  // --- ESTILOS CONDICIONALES ---
  const titleClasses = isComicMode ? 'section-title font-comic' : 'text-dark-blue';
  const cardClasses = isComicMode 
    ? 'border-4 border-black shadow-comic-lg bg-comic-yellow/90' 
    : 'shadow-xl bg-white border border-light-gray';
  const buttonClasses = isComicMode ? 'comic-button font-comic text-black' : 'bg-dark-blue text-white hover:bg-dark-blue/90';
  const navButtonClasses = isComicMode ? 'comic-button' : 'bg-dark-blue text-white';

  return (
    <section id="projects" className={`py-20 px-6 md:px-16 lg:pl-64 ${isComicMode ? 'bg-white' : 'bg-light-gray'}`}>
      <div className="container mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${titleClasses}`}>
          Mis Proyectos
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Contenedor de Embla */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                  {/* Tarjeta de Proyecto: IDÉNTICA A FIGMA */}
                  <div className={`flex flex-col lg:flex-row items-center p-8 rounded-xl transition-all duration-300 ${cardClasses}`}>
                    
                    {/* Imagen */}
                    <div className="w-full lg:w-1/2 h-64 lg:h-auto relative mb-6 lg:mb-0 lg:mr-8 flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`rounded-lg object-cover ${isComicMode ? 'border-4 border-black' : 'shadow-md'}`}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="w-full lg:w-1/2">
                      <h3 className={`text-3xl font-bold mb-3 ${isComicMode ? 'font-comic text-comic-red text-shadow-comic' : 'text-dark-blue'}`}>
                        {project.title}
                      </h3>
                      <p className={`mb-4 ${isComicMode ? 'text-black' : 'text-gray-700'}`}>{project.description}</p>
                      
                      {/* Tecnologías */}
                      <div className="mb-6">
                        <p className={`font-semibold mb-1 ${isComicMode ? 'text-black' : 'text-dark-blue'}`}>
                          Tecnologías:
                        </p>
                        <span className={`text-sm ${isComicMode ? 'font-comic text-dark-blue' : 'text-gray-600'}`}>
                          {project.tech.join(' | ')}
                        </span>
                      </div>

                      {/* Botón "Ver Proyecto" */}
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition hover:scale-[1.02] ${buttonClasses}`}
                      >
                        <Link size={20} />
                        Ver Proyecto
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de Navegación */}
          <button
            onClick={scrollPrev}
            className={`absolute top-1/2 left-0 md:-left-8 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 ${navButtonClasses} transition-all`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute top-1/2 right-0 md:-right-8 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 ${navButtonClasses} transition-all`}
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Puntos de Navegación (Dots) */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                            ${index === selectedIndex 
                              ? `${isComicMode ? 'bg-comic-red border-2 border-black scale-125' : 'bg-dark-blue scale-125'}` 
                              : 'bg-gray-400 hover:bg-dark-blue/50'
                            }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}