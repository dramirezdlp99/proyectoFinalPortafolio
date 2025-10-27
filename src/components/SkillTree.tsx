'use client';


import React, { useState, useEffect } from 'react';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Code, Database, GitBranch, Terminal, Globe, Zap,
  Layout, Server, FileCode, Palette, Cpu, Box
} from 'lucide-react';
import { motion } from 'framer-motion';


// Skill Map con iconos válidos
const getSkillIcon = (skillKey: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    mongodb: <Database size={24} />,
    frontend: <Layout size={24} />,
    backend: <Server size={24} />,
    java: <Code size={24} />,
    typescript: <Terminal size={24} />,
    html: <FileCode size={24} />,
    tailwind: <Palette size={24} />,
    nextjs: <Globe size={24} />,
    python: <Zap size={24} />,
    github: <GitBranch size={24} />,
    vscode: <Cpu size={24} />,
    react: <Box size={24} />,
  };
  return iconMap[skillKey];
};


interface SkillNodeProps {
  skillKey: string;
  top: string;
  left: string;
  isComicMode: boolean;
}


const SkillNode: React.FC<SkillNodeProps> = ({ skillKey, top, left, isComicMode }) => {
  const { content } = useLanguage();
  const skillData = content.skills.items[skillKey as keyof typeof content.skills.items];
  const { label, info } = skillData;
  const Icon = getSkillIcon(skillKey);
  
  const nodeClasses = isComicMode 
    ? 'bg-comic-red text-white border-4 border-black shadow-comic' 
    : 'bg-dark-blue text-white shadow-lg';
  const tooltipClasses = isComicMode 
    ? 'bg-black border-4 border-comic-yellow text-comic-yellow font-comic' 
    : 'bg-dark-blue text-white';


  return (
    <motion.div 
      className="absolute group z-10" 
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.div 
        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center cursor-pointer p-1 transition-all duration-200 ${nodeClasses}`}
        whileHover={{ scale: 1.2, rotate: 10 }}
        title={label}
      >
        {Icon}
      </motion.div>


      {/* Tooltip */}
      <div className={`absolute hidden group-hover:block bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-xs p-3 text-xs rounded-lg shadow-xl z-20 whitespace-normal ${tooltipClasses}`}>
        <p className="font-bold mb-1">{label}</p>
        <p>{info}</p>
      </div>
    </motion.div>
  );
};


export default function SkillTree() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
  // Mapeamos las habilidades con sus iconos
  const skillIconMap: { [key: string]: React.ReactNode } = {
    mongodb: <Database size={24} />,
    frontend: <Layout size={24} />,
    backend: <Server size={24} />,
    java: <Code size={24} />,
    typescript: <Terminal size={24} />,
    html: <FileCode size={24} />,
    tailwind: <Palette size={24} />,
    nextjs: <Globe size={24} />,
    python: <Zap size={24} />,
    github: <GitBranch size={24} />,
    vscode: <Cpu size={24} />,
    react: <Box size={24} />,
  };
  
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-red' : 'text-dark-blue';
  const containerClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-comic-yellow'
    : 'border-4 border-dark-blue bg-white shadow-2xl';
  
  // NUEVO: Color de líneas según modo
  const getLineColor = () => {
    if (isComicMode) return "#000";
    return isDarkMode ? "#E2E2E2" : "#060E28";
  };
  
  return (
    <section id="skills" className={`py-20 px-4 md:px-8 ${isComicMode ? 'bg-white' : 'bg-light-gray'} relative overflow-hidden`}>
      
      {/* Efecto de fondo cómic */}
      {isComicMode && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}


      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Título */}
        <motion.h2 
          className={`text-4xl font-bold text-center mb-16 ${titleClasses}`}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.skills.title}
        </motion.h2>


        {/* Contenedor del Árbol */}
        <motion.div 
          className={`relative w-full max-w-4xl h-[700px] mx-auto rounded-xl overflow-hidden ${containerClasses}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          {/* Líneas de Conexión - CORREGIDO */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Línea vertical principal */}
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke={getLineColor()} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            
            {/* Líneas horizontales */}
            <line x1="20%" y1="20%" x2="80%" y2="20%" stroke={getLineColor()} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke={getLineColor()} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            <line x1="20%" y1="80%" x2="80%" y2="80%" stroke={getLineColor()} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
          </svg>
          
          {/* NODOS DE HABILIDAD */}
          
          {/* Nivel 1: Especialización */}
          <SkillNode skillKey="frontend" top="10%" left="30%" isComicMode={isComicMode} />
          <SkillNode skillKey="backend" top="10%" left="70%" isComicMode={isComicMode} />


          {/* Nivel 2: Tecnologías Core */}
          <SkillNode skillKey="nextjs" top="35%" left="20%" isComicMode={isComicMode} />
          <SkillNode skillKey="react" top="35%" left="40%" isComicMode={isComicMode} />
          <SkillNode skillKey="java" top="35%" left="60%" isComicMode={isComicMode} />
          <SkillNode skillKey="mongodb" top="35%" left="80%" isComicMode={isComicMode} />


          {/* Nivel 3: Fundamentos */}
          <SkillNode skillKey="html" top="65%" left="15%" isComicMode={isComicMode} />
          <SkillNode skillKey="tailwind" top="65%" left="35%" isComicMode={isComicMode} />
          <SkillNode skillKey="typescript" top="65%" left="65%" isComicMode={isComicMode} />
          <SkillNode skillKey="python" top="65%" left="85%" isComicMode={isComicMode} />


          {/* Nivel 4: Herramientas */}
          <SkillNode skillKey="github" top="90%" left="35%" isComicMode={isComicMode} />
          <SkillNode skillKey="vscode" top="90%" left="65%" isComicMode={isComicMode} />
          
          {/* Decoración en modo cómic */}
          {isComicMode && (
            <>
              <motion.div
                className="absolute top-4 left-4 text-6xl font-black text-comic-red opacity-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ★
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 text-6xl font-black text-comic-yellow opacity-20"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                ⚡
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
