'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useComicMode } from "@/context/ComicModeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Send, Music, Download, Eye } from "lucide-react";

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

  const secondaryButtonClasses = isComicMode
    ? 'comic-button-alt'
    : 'bg-white border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white';
  
  const textBodyColor = isComicMode ? 'text-black font-bold' : 'text-gray-600';

  return (
    <section id="inicio" className={`relative pt-32 pb-20 flex items-center min-h-screen ${heroClasses}`}>
      
      {/* Efecto de fondo en modo cómic */}
      {isComicMode && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 lg:pl-80">
        
        {/* LADO IZQUIERDO: Texto y Botones */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl md:order-1 order-2"
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
          
          {/* BOTONES */}
          <div className="flex flex-wrap gap-4 mt-10">
            {/* Botón Contacto */}
            <motion.a 
              href="#contact"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${primaryButtonClasses}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
              {content.hero.cta_contact}
            </motion.a>
            
            {/* Botón Spotify */}
            <motion.a 
              href="https://open.spotify.com/user/tu-usuario" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${secondaryButtonClasses}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Music size={20} />
              {content.hero.cta_spotify}
            </motion.a>
          </div>

          {/* BOTONES DE CV */}
          <div className="flex flex-wrap gap-4 mt-6">
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
        </motion.div>

        {/* LADO DERECHO: Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 relative w-full max-w-lg md:order-2 order-1"
        >
          <div className={`relative ${isComicMode ? 'animate-float' : ''}`}>
            <Image
              src="/hero-monitor-programmer.png"
              alt="Programador trabajando"
              width={700}
              height={500}
              priority
              className={`rounded-lg w-full h-auto object-cover transition-all duration-300 ${
                isComicMode 
                  ? 'border-4 border-black shadow-comic-lg' 
                  : 'shadow-2xl'
              }`}
            />
            
            {/* Efecto de "BANG!" en modo cómic */}
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
    </section>
  );
}