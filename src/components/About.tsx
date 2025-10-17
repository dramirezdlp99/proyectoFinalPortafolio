// src/components/About.tsx

'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Datos de la sección Sobre Mí
const aboutData = [
  {
    image: '/about-interest-1.png', // Reemplaza con tus imágenes
    title: 'Mi Pasión: Software y Diseño',
    content: 'Desde siempre he estado fascinado por cómo la tecnología y el diseño se unen para crear soluciones. Mi objetivo es transformar ideas complejas en productos digitales simples y funcionales. Mi enfoque principal es el desarrollo web moderno, usando Next.js y Tailwind CSS para interfaces rápidas y estéticamente agradables.',
  },
  {
    image: '/about-interest-2.png',
    title: 'Lo que Soy: Ingeniero en Formación',
    content: 'Actualmente, estoy en proceso de convertirme en Ingeniero de Software, lo que me ha proporcionado una base sólida en estructuras de datos, algoritmia y desarrollo de back-end. Combino esta lógica rigurosa con mi ojo para el diseño (UI/UX) para ofrecer soluciones completas y de alta calidad.',
  },
  {
    image: '/about-interest-3.png',
    title: 'Mis Aspiraciones Profesionales',
    content: 'Busco trabajar en proyectos que supongan un desafío, donde pueda aplicar mis conocimientos en IA, desarrollo full-stack y diseño. Me motiva especialmente la innovación y la creación de productos que tengan un impacto positivo en los usuarios y en el entorno digital.',
  },
];

export default function About() {
  const { isComicMode } = useComicMode();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Funciones para la navegación del carrusel
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  // Actualizar el índice del carrusel (para el indicador visual)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Estilos condicionales
  const sectionBg = isComicMode ? 'bg-white' : 'bg-white'; // Mantenemos blanco para contraste
  const titleClasses = isComicMode ? 'section-title font-comic' : 'text-dark-blue';
  const textClasses = isComicMode ? 'text-black' : 'text-gray-700';
  const cardBorder = isComicMode ? 'border-4 border-black shadow-comic' : 'shadow-xl border border-light-gray';
  const navButtonClasses = isComicMode ? 'comic-button' : 'bg-dark-blue text-white hover:bg-dark-blue/90';

  return (
    <section id="about" className={`py-20 px-6 md:px-16 lg:pl-64 ${sectionBg}`}>
      <div className="container mx-auto">
        {/* Título de la Sección - Centrado y con Estilo Figma */}
        <h2 className={`text-4xl font-bold text-center mb-12 ${titleClasses}`}>
          Sobre Mí
        </h2>

        <div className={`flex flex-col md:flex-row items-center bg-light-gray p-8 rounded-xl ${cardBorder} transition-all duration-300`}>
          
          {/* Carrusel de Imágenes (Izquierda) */}
          <div className="w-full md:w-1/2 relative pr-0 md:pr-8 mb-8 md:mb-0">
            
            <div className="overflow-hidden rounded-xl" ref={emblaRef}>
              <div className="flex">
                {aboutData.map((item, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      width={600} 
                      height={400} 
                      className={`rounded-xl w-full h-auto object-cover ${isComicMode ? 'border-4 border-black shadow-comic' : 'shadow-lg'}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de Navegación del Carrusel */}
            <button 
              onClick={scrollPrev}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full z-10 ${navButtonClasses}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full z-10 ${navButtonClasses}`}
            >
              <ChevronRight size={24} />
            </button>

          </div>

          {/* Contenido (Derecha) */}
          <div className="w-full md:w-1/2 pl-0 md:pl-8">
            {aboutData.map((item, index) => (
              <div 
                key={index} 
                // Solo muestra el contenido que coincide con el índice seleccionado
                className={`${index === selectedIndex ? 'block' : 'hidden'} transition-opacity duration-500`}
              >
                <h3 className={`text-3xl font-bold mb-4 ${titleClasses}`}>
                  {item.title}
                </h3>
                <p className={`text-lg leading-relaxed ${textClasses}`}>
                  {item.content}
                </p>
              </div>
            ))}
            
            {/* Dots/Indicadores de posición del Carrusel */}
            <div className="flex justify-center md:justify-start mt-6 space-x-2">
              {aboutData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 
                              ${index === selectedIndex 
                                ? 'bg-dark-blue scale-125' 
                                : 'bg-gray-400 hover:bg-dark-blue/50'
                              }
                              ${isComicMode && index === selectedIndex 
                                ? 'bg-comic-red border-2 border-black' 
                                : ''
                              }
                            `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}