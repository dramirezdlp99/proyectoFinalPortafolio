// src/components/SkillTree.tsx

'use client';

import React from 'react';
import { useComicMode } from '@/context/ComicModeContext';
import { 
  Code, Database, GitBranch, Terminal, Globe, Zap,
  // 💡 ICONOS CORREGIDOS: Usamos iconos válidos de lucide-react 
  CodeSquare, // Sustituye a LayoutPanelLeft (para Frontend)
  Server,     // Sustituye a LayoutPanelRight (para Backend)
  CheckSquare, FileText, Component,
} from 'lucide-react';
import Image from 'next/image';

// --- DATOS DEL ÁRBOL ---
const skillMap = {
  mongodb: { label: 'MongoDB', icon: Database, info: 'Manejo de bases de datos NoSQL para escalabilidad.' },
  // 💡 ICONOS CORREGIDOS
  frontend: { label: 'Frontend Dev', icon: CodeSquare, info: 'Creación de interfaces de usuario modernas y responsivas.' },
  backend: { label: 'Backend Dev', icon: Server, info: 'Desarrollo de lógica de negocio y APIs robustas.' },
  java: { label: 'Java', icon: Code, info: 'Dominio en programación orientada a objetos (POO) y sistemas empresariales.' },
  typescript: { label: 'TypeScript', icon: Terminal, info: 'Escribo código JavaScript más seguro y escalable.' },
  html: { label: 'HTML5/CSS3', icon: FileText, info: 'Base fundamental del desarrollo web y estructuración.' },
  tailwind: { label: 'Tailwind CSS', icon: Component, info: 'Desarrollo rápido de UI/UX con enfoque utility-first.' },
  nextjs: { label: 'Next.js', icon: Globe, info: 'Aplicaciones React full-stack con rendering optimizado (SSR/SSG).' },
  python: { label: 'Python', icon: Zap, info: 'Automatización, scripting y análisis de datos.' },
  github: { label: 'GitHub', icon: GitBranch, info: 'Control de versiones y colaboración en equipo.' },
  vscode: { label: 'VS Code', icon: CheckSquare, info: 'Entorno de desarrollo ágil y productivo.' },
};

// Componente para un nodo del árbol (sin cambios en la lógica)
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
    ? 'bg-dark-blue border-2 border-comic-yellow text-comic-yellow font-comic' 
    : 'bg-dark-blue text-white';

  return (
    <div className="absolute group z-10" style={{ top, left, transform: 'translate(-50%, -50%)' }}>
      <div 
        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center cursor-pointer p-1 transition-all duration-200 hover:scale-110 ${nodeClasses}`}
        title={label}
      >
        <Icon size={24} />
      </div>

      {/* Tooltip Interactivo (Muestra info al hacer hover) */}
      <div className={`absolute hidden group-hover:block bottom-full mb-3 w-max max-w-xs p-3 text-xs rounded-lg shadow-xl z-20 whitespace-normal ${tooltipClasses}`}>
        <p className="font-bold mb-1">{label}</p>
        <p>{info}</p>
      </div>
    </div>
  );
};


export default function SkillTree() {
  const { isComicMode } = useComicMode();
  
  const titleClasses = isComicMode ? 'section-title font-comic' : 'text-dark-blue';
  
  return (
    <section id="skills" className={`py-20 px-6 md:px-16 lg:pl-64 ${isComicMode ? 'bg-white' : 'bg-light-gray'}`}>
      <div className="container mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${titleClasses}`}>
          Árbol de Habilidades (Skill Tree)
        </h2>

        {/* Contenedor del Árbol */}
        <div className="relative w-full max-w-4xl h-[700px] mx-auto border-4 border-dark-blue rounded-xl bg-white shadow-2xl overflow-hidden">
          
          {/* Estilo Cómic de Fondo (opcional) */}
          {/* ... (código de fondo si tienes la imagen) */}
          
          {/* Líneas de Conexión (sin cambios) */}
          <div className="absolute top-0 left-1/2 h-full w-0.5 bg-dark-blue transform -translate-x-1/2 opacity-50" />
          <div className="absolute top-[20%] left-[20%] w-[60%] h-0.5 bg-dark-blue transform -translate-x-1/2 opacity-50" />
          <div className="absolute top-[50%] left-[10%] w-[80%] h-0.5 bg-dark-blue transform -translate-x-1/2 opacity-50" />
          <div className="absolute top-[80%] left-[20%] w-[60%] h-0.5 bg-dark-blue transform -translate-x-1/2 opacity-50" />
          
          
          {/* --- NODOS DE HABILIDAD (con claves corregidas) --- */}

          {/* Nivel 1: Raíz/Especialización */}
          <SkillNode skillKey="frontend" top="10%" left="30%" isComicMode={isComicMode} />
          <SkillNode skillKey="backend" top="10%" left="70%" isComicMode={isComicMode} />

          {/* Nivel 2: Tecnologías Core (ramas de Frontend/Backend) */}
          <SkillNode skillKey="nextjs" top="35%" left="20%" isComicMode={isComicMode} />
          <SkillNode skillKey="tailwind" top="35%" left="40%" isComicMode={isComicMode} />
          <SkillNode skillKey="java" top="35%" left="60%" isComicMode={isComicMode} />
          <SkillNode skillKey="mongodb" top="35%" left="80%" isComicMode={isComicMode} />

          {/* Nivel 3: Fundamentos y Diseño */}
          <SkillNode skillKey="html" top="65%" left="15%" isComicMode={isComicMode} />
          <SkillNode skillKey="typescript" top="65%" left="50%" isComicMode={isComicMode} />
          <SkillNode skillKey="python" top="65%" left="85%" isComicMode={isComicMode} />

          {/* Nivel 4: Herramientas */}
          <SkillNode skillKey="github" top="90%" left="25%" isComicMode={isComicMode} />
          <SkillNode skillKey="vscode" top="90%" left="75%" isComicMode={isComicMode} />
          
        </div>
      </div>
    </section>
  );
}