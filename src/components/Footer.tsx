// src/components/Footer.tsx

import React from 'react';
import { useComicMode } from '@/context/ComicModeContext';
import { Mail, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const { isComicMode } = useComicMode();

  // Estilos Condicionales
  const footerBg = isComicMode ? 'bg-white border-t-4 border-black' : 'bg-light-gray';
  const textClasses = isComicMode ? 'text-black font-comic' : 'text-dark-blue';
  const socialIconClasses = isComicMode ? 'comic-button text-black border-4 border-black' : 'bg-dark-blue text-white hover:bg-dark-blue/80';
  
  // Menú de navegación rápido
  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre mí', href: '#about' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Servicios', href: '#services' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <footer id="footer" className={`py-12 px-6 md:px-16 ${footerBg}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Banner de Contacto del Footer */}
        <div className={`bg-dark-blue p-6 rounded-xl mb-12 flex items-center justify-between shadow-lg ${isComicMode ? 'border-4 border-black shadow-comic-lg' : ''}`}>
          <h3 className={`text-2xl font-bold ${isComicMode ? 'font-comic text-comic-yellow' : 'text-white'}`}>
            ¿Necesitas más información?
            <p className="text-sm font-normal mt-1">Escríbeme y hablemos de tu proyecto.</p>
          </h3>
          <a href="#contact" className={`px-6 py-3 rounded-lg font-semibold transition ${isComicMode ? 'comic-button font-comic' : 'bg-white text-dark-blue hover:bg-light-gray'}`}>
            Contáctame
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Logo y Copyright */}
          <div>
            {/* El logo simple que se ve en tu Figma */}
            <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-dark-blue shadow-md ${isComicMode ? 'border-comic-red' : ''}`}>
              <span className={`text-sm font-bold ${textClasses}`}>DRDLP</span>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              © 2025 David Ramírez de la Parra. Todos los derechos reservados.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className={`font-bold mb-4 ${textClasses}`}>Dirígete a:</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={`text-gray-600 hover:text-dark-blue transition ${isComicMode ? 'font-comic text-black hover:text-comic-red' : ''}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Frase de Motivación */}
          <div className="md:col-span-1">
            <h4 className={`font-bold mb-4 ${textClasses}`}>Mi Enfoque:</h4>
            <p className={`text-gray-600 ${isComicMode ? 'font-comic text-black' : ''}`}>
              Construyendo experiencias digitales con creatividad y tecnología.
            </p>
          </div>

          {/* Columna 4: Contacto Social */}
          <div>
            <h4 className={`font-bold mb-4 ${textClasses}`}>Contáctate conmigo</h4>
            <div className="flex gap-3">
              <a href="https://github.com/tu-usuario" target="_blank" className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${socialIconClasses}`}>
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/tu-usuario" target="_blank" className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${socialIconClasses}`}>
                <Linkedin size={20} />
              </a>
              <a href="mailto:tu.email@example.com" className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${socialIconClasses}`}>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}