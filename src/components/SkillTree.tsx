'use client';

import React from 'react';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Code, Database, GitBranch, Terminal, Globe, Zap,
  Layout, Server, FileCode, Palette, Cpu, Box
} from 'lucide-react';
import { motion } from 'framer-motion';

// Skill Map con iconos válidos
const skillMap = {
  mongodb: { label: 'MongoDB', icon: Database, info: 'Manejo de bases de datos NoSQL para escalabilidad.' },
  frontend: { label: 'Frontend Dev', icon: Layout, info: 'Creación de interfaces de usuario modernas y responsivas.' },
  backend: { label: 'Backend Dev', icon: Server, info: 'Desarrollo de lógica de negocio y APIs robustas.' },
  java: { label: 'Java', icon: Code, info: 'Dominio en programación orientada a objetos (POO) y sistemas empresariales.' },
  typescript: { label: 'TypeScript', icon: Terminal, info: 'Escribo código JavaScript más seguro y escalable.' },
  html: { label: 'HTML5/CSS3', icon: FileCode, info: 'Base fundamental del desarrollo web y estructuración.' },
  tailwind: { label: 'Tailwind CSS', icon: Palette, info: 'Desarrollo rápido de UI/UX con enfoque utility-first.' },
  nextjs: { label: 'Next.js', icon: Globe, info: 'Aplicaciones React full-stack con rendering optimizado (SSR/SSG).' },
  python: { label: 'Python', icon: Zap, info: 'Automatización, scripting y análisis de datos.' },
  github: { label: 'GitHub', icon: GitBranch, info: 'Control de versiones y colaboración en equipo.' },
  vscode: { label: 'VS Code', icon: Cpu, info: 'Entorno de desarrollo ágil y productivo.' },
  react: { label: 'React', icon: Box, info: 'Biblioteca para interfaces de usuario interactivas.' },
};

interface SkillNodeProps {
  skillKey: keyof typeof skillMap;
  top: string;
  left: string;
  isComicMode: boolean;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skillKey, top, left, isComicMode }) => {
  const { label, icon: Icon, info } = skillMap[skillKey];
  
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
        <Icon size={24} />
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
  
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-red' : 'text-dark-blue';
  const containerClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-comic-yellow'
    : 'border-4 border-dark-blue bg-white shadow-2xl';
  
  return (
    <section id="skills" className={`py-20 px-6 md:px-16 lg:pl-80 ${isComicMode ? 'bg-white' : 'bg-light-gray'} relative overflow-hidden`}>
      
      {/* Efecto de fondo cómic */}
      {isComicMode && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}

      <div className="container mx-auto relative z-10">
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
          
          {/* Líneas de Conexión */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Línea vertical principal */}
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke={isComicMode ? "#000" : "#060E28"} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            
            {/* Líneas horizontales */}
            <line x1="20%" y1="20%" x2="80%" y2="20%" stroke={isComicMode ? "#000" : "#060E28"} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke={isComicMode ? "#000" : "#060E28"} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            <line x1="20%" y1="80%" x2="80%" y2="80%" stroke={isComicMode ? "#000" : "#060E28"} strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
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