'use client';

import React from 'react';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();

  // Estilos condicionales
  const footerBg = isComicMode 
    ? 'bg-white border-t-4 border-black' 
    : 'bg-light-gray';
  const textClasses = isComicMode ? 'text-black font-bold' : 'text-dark-blue';
  const socialIconClasses = isComicMode 
    ? 'bg-comic-yellow border-4 border-black text-black hover:bg-black hover:text-comic-yellow shadow-comic' 
    : 'bg-dark-blue text-white hover:bg-dark-blue/80';
  const bannerClasses = isComicMode
    ? 'bg-comic-red border-4 border-black shadow-comic-lg'
    : 'bg-dark-blue';
  const bannerButtonClasses = isComicMode
    ? 'comic-button-alt'
    : 'bg-white text-dark-blue hover:bg-light-gray';

  // Menú de navegación
  const navItems = [
    { label: content.nav.home, href: '#inicio' },
    { label: content.nav.about, href: '#about' },
    { label: content.nav.projects, href: '#projects' },
    { label: content.nav.services, href: '#services' },
    { label: content.nav.contact, href: '#contact' },
  ];

  return (
    <footer id="footer" className={`py-12 px-6 md:px-16 ${footerBg}`}>
      <div className="container mx-auto max-w-6xl">
        
        {/* BANNER DE CTA */}
        <motion.div 
          className={`p-6 md:p-8 rounded-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 ${bannerClasses}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className={`text-2xl md:text-3xl font-bold ${
              isComicMode ? 'font-comic text-comic-yellow' : 'text-white'
            }`}>
              {content.footer.cta_title}
            </h3>
            <p className={`text-sm md:text-base mt-1 ${
              isComicMode ? 'text-white font-semibold' : 'text-gray-200'
            }`}>
              {content.footer.cta_subtitle}
            </p>
          </div>
          <motion.a 
            href="#contact" 
            className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${bannerButtonClasses}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.footer.cta_button}
          </motion.a>
        </motion.div>

        {/* GRID DE INFORMACIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* COLUMNA 1: Logo y Copyright */}
          <div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isComicMode
                ? 'bg-comic-yellow border-4 border-black shadow-comic'
                : 'bg-white border-4 border-dark-blue shadow-md'
            }`}>
              {isComicMode ? (
                <Image
                  src="/drdlp-logo-comic.png"
                  alt="DRDLP Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/drdlp-logo.png"
                  alt="DRDLP Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              )}
            </div>
            <p className={`mt-4 text-xs ${
              isComicMode ? 'text-black' : 'text-gray-600'
            }`}>
              {content.footer.copyright}
            </p>
          </div>

          {/* COLUMNA 2: Navegación */}
          <div>
            <h4 className={`font-bold mb-4 ${textClasses}`}>
              {content.footer.nav_title}
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className={`transition-colors ${
                      isComicMode 
                        ? 'text-black hover:text-comic-red font-semibold' 
                        : 'text-gray-600 hover:text-dark-blue'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: Frase motivacional */}
          <div className="md:col-span-1">
            <h4 className={`font-bold mb-4 ${textClasses}`}>
              {content.footer.motto_title}
            </h4>
            <p className={`text-sm ${
              isComicMode ? 'text-black font-semibold' : 'text-gray-600'
            }`}>
              {content.footer.motto_text}
            </p>
          </div>

          {/* COLUMNA 4: Redes Sociales */}
          <div>
            <h4 className={`font-bold mb-4 ${textClasses}`}>
              {content.footer.contact_title}
            </h4>
            <div className="flex gap-3">
              <motion.a 
                href="https://github.com/tu-usuario" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${socialIconClasses}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/tu-usuario" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${socialIconClasses}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="mailto:tu.email@example.com"
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${socialIconClasses}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className={`border-t pt-6 ${
          isComicMode ? 'border-black border-t-4' : 'border-gray-300'
        }`}>
          <p className={`text-center text-sm ${
            isComicMode ? 'text-black font-semibold' : 'text-gray-500'
          }`}>
            Made with ❤️ by David Ramírez de la Parra
          </p>
        </div>
      </div>
    </footer>
  );
}