'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useComicMode } from "@/context/ComicModeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Send, Download, Eye } from "lucide-react";

export default function Hero() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();

  const heroClasses = isComicMode ? 'bg-white' : 'bg-light-gray';
  
  const titleClasses = isComicMode 
    ? 'section-title font-comic text-5xl lg:text-7xl leading-tight' 
    : 'text-5xl lg:text-6xl font-extrabold leading-tight hero-title-custom';
  
  const titleStyle = isComicMode ? {
    textShadow: '3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 4px 4px 0px #000',
    WebkitTextStroke: '2px #000',
    letterSpacing: '0.08em',
    wordSpacing: '0.1em',
    color: '#E2E2E2'
  } : {
    letterSpacing: '0.02em',
  };
  
  const primaryButtonClasses = isComicMode 
    ? 'comic-button' 
    : 'bg-dark-blue text-white shadow-lg hover:bg-dark-blue/90';

  const textBodyColor = isComicMode ? 'text-black font-bold' : 'text-gray-600';

  return (
    <section id="inicio" className={`relative pt-32 pb-20 flex items-center min-h-screen ${heroClasses}`}>
      
      {isComicMode && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}

      <div className="section-container">
        
        {/* LOGO MOBILE - Solo visible en mobile - ACTUALIZADO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8 lg:hidden"
        >
          <div className={`w-24 h-24 rounded-full overflow-hidden ${
            isComicMode ? 'border-4 border-black shadow-comic' : 'border-4 border-dark-blue shadow-xl'
          }`}>
            <Image
              src={isComicMode ? "/david-logo-comic.png" : "/david-logo.png"}
              alt="DRDLF Logo"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* COLUMNA TEXTO - En mobile va después de la imagen */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h1 
              className={titleClasses}
              style={titleStyle}
            >
              {content.hero.title}
            </h1>
            
            <p className={`mt-6 text-2xl mb-3 font-semibold ${textBodyColor}`}>
              {content.hero.subtitle}
            </p>
            
            <p className={`mt-4 text-base ${isComicMode ? 'text-black' : 'text-gray-600'}`}>
              {content.hero.description}
            </p>
            
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

          {/* IMAGEN PROGRAMADOR - En mobile va primero (después del logo) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-1 lg:order-2"
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
            {content.hero.hero_section_title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            <div className="flex flex-col items-center">
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
                {content.hero.profile_role}
              </p>

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

            <div>
              <ul className={`space-y-3 mb-6 ${
                isComicMode ? 'text-black font-semibold' : 'text-gray-700'
              }`}>
                {content.hero.skills_list.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`mt-1 ${isComicMode ? 'text-comic-red' : 'text-dark-blue'}`}>✓</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

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

              <motion.a
                href="#projects"
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all mt-6 w-full justify-center ${
                  isComicMode
                    ? 'bg-comic-red text-white border-4 border-black hover:bg-black shadow-comic'
                    : 'bg-dark-blue text-white hover:bg-dark-blue/90'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {content.hero.view_projects}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
