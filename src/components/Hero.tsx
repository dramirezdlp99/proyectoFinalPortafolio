'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useComicMode } from "@/context/ComicModeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Send, Download, Eye } from "lucide-react";

export default function Hero() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();

  // Estilos condicionales
  const heroClasses = isComicMode ? 'bg-white' : 'bg-light-gray';
  
  const titleClasses = isComicMode 
    ? 'section-title font-comic text-5xl lg:text-7xl text-black leading-tight' 
    : 'text-5xl lg:text-6xl font-extrabold text-dark-blue leading-tight';
  
  const primaryButtonClasses = isComicMode 
    ? 'comic-button' 
    : 'bg-dark-blue text-white shadow-lg hover:bg-dark-blue/90';

  const textBodyColor = isComicMode ? 'text-black font-bold' : 'text-gray-600';

  return (
    <section id="inicio" className={`relative pt-32 pb-20 flex items-center min-h-screen ${heroClasses}`}>
      
      {/* Efecto de fondo en modo cómico */}
      {isComicMode && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}

      <div className="container mx-auto px-6 md:px-16">
        
        {/* GRID: Texto + Imagen */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* LADO IZQUIERDO: Texto */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* TÍTULO */}
            <h1 className={titleClasses}>
              {content.hero.title}
            </h1>
            
            {/* SUBTÍTULO */}
            <p className={`mt-6 text-2xl mb-3 font-semibold ${textBodyColor}`}>
              {content.hero.subtitle}
            </p>
            
            {/* DESCRIPCIÓN */}
            <p className={`mt-4 text-base ${isComicMode ? 'text-black' : 'text-gray-600'}`}>
              {content.hero.description}
            </p>
            
            {/* BOTÓN CONTACTO */}
            <motion.a 
              href="#contact"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all mt-8 ${primaryButtonClasses}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
              {content.hero.cta_contact}
            </motion.a>
          </motion.div>

          {/* LADO DERECHO: Imagen del monitor/programador */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className={`relative ${isComicMode ? 'animate-float' : ''}`}>
              <Image
                src="/hero-monitor-programmer.png"
                alt="Programador trabajando"
                width={600}
                height={450}
                priority
                className={`rounded-lg w-full h-auto object-cover transition-all duration-300 ${
                  isComicMode 
                    ? 'border-4 border-black shadow-comic-lg' 
                    : 'shadow-2xl'
                }`}
              />
              
              {/* Efecto "POW!" en modo cómic */}
              {isComicMode && (
                <motion.div
                  className="absolute -top-8 -right-8 bg-comic-red text-white font-black text-3xl px-4 py-2 rotate-12 border-4 border-black shadow-comic"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  POW!
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* SECCIÓN PRINCIPAL (Hero Section) - Con Foto y Spotify */}
        <motion.div 
          className={`p-8 rounded-xl ${
            isComicMode 
              ? 'bg-comic-yellow border-4 border-black shadow-comic-lg' 
              : 'bg-white shadow-2xl'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            isComicMode ? 'font-comic text-comic-red' : 'text-dark-blue'
          }`}>
            Hero Section - Sección Principal
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* IZQUIERDA: Foto y descripción */}
            <div className="flex flex-col items-center">
              {/* Foto circular */}
              <div className={`relative w-64 h-64 rounded-full overflow-hidden mb-6 ${
                isComicMode ? 'border-4 border-black shadow-comic' : 'border-4 border-dark-blue shadow-xl'
              }`}>
                <Image
                  src="/david-photo.jpg"
                  alt="David Ramírez de la Parra"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className={`text-2xl font-bold mb-2 ${
                isComicMode ? 'font-comic text-black' : 'text-dark-blue'
              }`}>
                David Ramírez de la Parra
              </h3>
              <p className={`text-center mb-4 ${
                isComicMode ? 'text-black font-semibold' : 'text-gray-600'
              }`}>
                Estudiante de Ingeniería de Software
              </p>

              {/* Botones CV */}
              <div className="flex gap-4">
                <motion.a
                  href="/cv/David-Ramirez-CV.pdf"
                  target="_blank"
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    isComicMode
                      ? 'bg-white border-4 border-black text-black hover:bg-black hover:text-white'
                      : 'border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye size={18} />
                  {content.hero.cv_view}
                </motion.a>

                <motion.a
                  href="/cv/David-Ramirez-CV.pdf"
                  download
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    isComicMode
                      ? 'bg-white border-4 border-black text-black hover:bg-black hover:text-white'
                      : 'border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Download size={18} />
                  {content.hero.cv_download}
                </motion.a>
              </div>
            </div>

            {/* DERECHA: Lista de puntos y Spotify */}
            <div>
              {/* Lista de habilidades/puntos */}
              <ul className={`space-y-3 mb-6 ${
                isComicMode ? 'text-black font-semibold' : 'text-gray-700'
              }`}>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${isComicMode ? 'text-comic-red' : 'text-dark-blue'}`}>✓</span>
                  <span>Desarrollo de aplicaciones web modernas con React y Next.js</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${isComicMode ? 'text-comic-red' : 'text-dark-blue'}`}>✓</span>
                  <span>Creación de interfaces intuitivas usando Figma y Tailwind CSS</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${isComicMode ? 'text-comic-red' : 'text-dark-blue'}`}>✓</span>
                  <span>Manejo de bases de datos con MySQL y MongoDB</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className={`mt-1 ${isComicMode ? 'text-comic-red' : 'text-dark-blue'}`}>✓</span>
                  <span>Enfoque en optimización, accesibilidad y experiencia de usuario</span>
                </li>
              </ul>

              {/* Reproductor de Spotify embebido */}
              <div className={`rounded-xl overflow-hidden ${
                isComicMode ? 'border-4 border-black shadow-comic' : 'shadow-lg'
              }`}>
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                ></iframe>
              </div>

              {/* Botón Ver Proyectos */}
              <motion.a
                href="#projects"
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all mt-6 w-full justify-center ${
                  isComicMode
                    ? 'bg-comic-red text-white border-4 border-black hover:bg-black shadow-comic'
                    : 'bg-dark-blue text-white hover:bg-dark-blue/90'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                Ver Proyectos
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}