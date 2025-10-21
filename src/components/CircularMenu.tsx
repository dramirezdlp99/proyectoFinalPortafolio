'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useComicMode } from "@/context/ComicModeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import {
  Home,
  User,
  Briefcase,
  Code,
  Layers,
  Star,
  MessageSquare,
} from "lucide-react";

export default function CircularMenu() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    { icon: <Home size={isScrolled ? 16 : 20} />, href: "#inicio", label: content.nav.home },
    { icon: <User size={isScrolled ? 16 : 20} />, href: "#about", label: content.nav.about },
    { icon: <Briefcase size={isScrolled ? 16 : 20} />, href: "#projects", label: content.nav.projects },
    { icon: <Code size={isScrolled ? 16 : 20} />, href: "#skills", label: content.nav.skills },
    { icon: <Layers size={isScrolled ? 16 : 20} />, href: "#services", label: content.nav.services },
    { icon: <Star size={isScrolled ? 16 : 20} />, href: "#testimonials", label: content.nav.testimonials },
    { icon: <MessageSquare size={isScrolled ? 16 : 20} />, href: "#contact", label: content.nav.contact },
  ];

  // Tamaños según scroll
  const radius = isScrolled ? 50 : 95;
  const centerSize = isScrolled ? 'w-12 h-12' : 'w-24 h-24';
  const containerSize = isScrolled ? 'w-32 h-32' : 'w-56 h-56';

  return (
    <motion.div
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-4 left-4' 
          : 'top-1/2 left-8 -translate-y-1/2'
      }`}
      animate={{
        scale: isScrolled ? 0.6 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative ${containerSize} transition-all duration-300`}>
        {/* Semicírculo de fondo */}
        <motion.div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isComicMode
              ? 'bg-comic-red border-4 border-black shadow-comic-lg'
              : 'bg-dark-blue'
          }`}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 50% 50%, 0 50%)',
          }}
        />

        {/* Círculo giratorio decorativo (solo visible cuando no está scrolleado) */}
        {!isScrolled && (
          <motion.div
            className={`absolute inset-0 rounded-full ${
              isComicMode
                ? 'border-4 border-dashed border-black/30'
                : 'border-4 border-dashed border-light-gray/30'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 50% 50%, 0 50%)',
            }}
          />
        )}

        {/* Logo central */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${centerSize} rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
            isComicMode
              ? 'bg-comic-yellow border-4 border-black shadow-comic'
              : 'bg-light-gray border-4 border-white shadow-inner'
          }`}
        >
          <Image
            src={isComicMode ? "/drdlp-logo-comic.png" : "/drdlp-logo.png"}
            alt="DRDLP Logo"
            width={isScrolled ? 30 : 60}
            height={isScrolled ? 30 : 60}
            className="object-contain"
          />
        </div>

        {/* Íconos en semicírculo */}
        {items.map((item, i) => {
          // Ángulo solo para semicírculo izquierdo (180 grados)
          const angle = (i / (items.length - 1)) * Math.PI - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.a
              key={i}
              href={item.href}
              className={`absolute group flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-20 ${
                isScrolled ? 'w-8 h-8' : 'w-12 h-12'
              } ${
                isComicMode
                  ? 'bg-comic-yellow text-black border-4 border-black shadow-comic'
                  : 'bg-light-gray text-dark-blue border-2 border-dark-blue'
              }`}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ 
                backgroundColor: isComicMode ? '#000' : '#060E28',
                color: isComicMode ? '#FFD600' : '#fff',
              }}
              title={item.label}
            >
              {item.icon}

              {/* Círculo de hover (iluminación) */}
              <motion.div
                className="absolute inset-0 rounded-full bg-light-gray opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
              />

              {/* Tooltip */}
              {!isScrolled && (
                <span className={`absolute left-full ml-4 px-3 py-1 rounded-md font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  isComicMode
                    ? 'bg-black text-comic-yellow border-2 border-comic-yellow'
                    : 'bg-dark-blue text-white'
                }`}>
                  {item.label}
                </span>
              )}
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}