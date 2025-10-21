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
      {/* BARRA LATERAL IZQUIERDA - MÁS PEQUEÑA */}
      <div className="fixed left-0 top-0 h-full w-32 bg-dark-blue z-30 hidden lg:block" />
      
      {/* COMPONENTES FLOTANTES Y FIJOS */}
      <CircularMenu />
      <ComicModeToggle />
      <LanguageToggle />
      <ChatBot />
      
      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full lg:ml-32">
        <Hero />
        <About />
        <Projects />
        <SkillTree />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

// VERIFICAR DEPLOY EN VERCEL
// VERIFICAR NUEVAMENTE EL DESPLIEGUE EN VERCEL