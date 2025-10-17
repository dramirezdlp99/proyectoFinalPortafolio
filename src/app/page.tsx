// src/app/page.tsx

'use client'; 

import { useComicMode } from '@/context/ComicModeContext';
import CircularMenu from '@/components/CircularMenu';
import ComicModeToggle from '@/components/ComicModeToggle';
import ChatBot from '@/components/ChatBot';

// ⚠️ Usamos alias @/ para las importaciones
import Hero from '@/components/Hero'; 
import About from '@/components/About';
import Projects from '@/components/Projects';
import SkillTree from '@/components/SkillTree';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer'; 


const HomePage = () => {
  // 💡 Usar el hook para el estado global del modo
  const { isComicMode } = useComicMode();

  return (
    // 💡 Contenedor principal para aplicar el fondo y el modo global
    <div 
      data-comic-mode={isComicMode}
      // El fondo gris claro de tu diseño para el modo formal
      className={`${isComicMode ? '' : 'bg-light-gray'} min-h-screen relative`}
    >
      
      {/* 1. COMPONENTES FIJOS Y FLOTANTES (Menú Circular y Toggle) */}
      {/* Estos componentes se posicionan FIXED/ABSOLUTE internamente en sus propios archivos.
        Simplemente los llamamos aquí.
      */}
      <CircularMenu />    {/* Menú circular a la izquierda */}
      <ComicModeToggle /> {/* Botón Comic Mode en top-right */}
      <ChatBot />         {/* Chatbot flotante en bottom-right */}
      
      {/* 2. CONTENIDO PRINCIPAL (Hero, About, Projects, etc.) */}
      <main className="flex-1 w-full">
        {/* ⚠️ CLAVE: Este div aplica el margen a todo el contenido que 
          debe estar a la derecha del menú circular. El lg:pl-64 
          es un margen/padding suficiente para no superponerse.
        */}
        <div className="lg:pl-64 transition-all duration-300"> 
          <Hero />
          <About />
          <Projects />
          <SkillTree />
          <Services />
          <Testimonials />
          <Contact />
          {/* El Footer NO tiene este padding/margen, por eso va fuera del div */}
        </div>

        {/* 3. FOOTER (Ocupa todo el ancho) */}
        <Footer />
        
      </main>
    </div>
  );
};

export default HomePage;