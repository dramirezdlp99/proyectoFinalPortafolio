'use client';

import { useComicMode } from '@/context/ComicModeContext';
import CircularMenu from '@/components/CircularMenu';
import ComicModeToggle from '@/components/ComicModeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import ChatBot from '@/components/ChatBot';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SkillTree from '@/components/SkillTree';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { isComicMode } = useComicMode();

  return (
    <div 
      data-comic-mode={isComicMode}
      className={`${isComicMode ? '' : 'bg-light-gray'} min-h-screen relative transition-all duration-300`}
    >
      
      {/* COMPONENTES FLOTANTES Y FIJOS */}
      <CircularMenu />
      <ComicModeToggle />
      <LanguageToggle />
      <ChatBot />
      
      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full">
        {/* Contenido con margen para el menú circular */}
        <div className="lg:pl-0 transition-all duration-300">
          <Hero />
          <About />
          <Projects />
          <SkillTree />
          <Services />
          <Testimonials />
          <Contact />
        </div>

        {/* Footer (sin margen, ocupa todo el ancho) */}
        <Footer />
      </main>
    </div>
  );
}