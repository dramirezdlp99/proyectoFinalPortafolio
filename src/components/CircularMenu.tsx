'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useComicMode } from "@/context/ComicModeContext";
import { useLanguage } from "@/context/LanguageContext";
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

  const items = [
    { icon: <Home size={20} />, href: "#inicio", label: content.nav.home },
    { icon: <User size={20} />, href: "#about", label: content.nav.about },
    { icon: <Briefcase size={20} />, href: "#projects", label: content.nav.projects },
    { icon: <Layers size={20} />, href: "#services", label: content.nav.services },
    { icon: <MessageSquare size={20} />, href: "#contact", label: content.nav.contact },
    { icon: <Star size={20} />, href: "#testimonials", label: content.nav.testimonials },
    { icon: <Code size={20} />, href: "#skills", label: content.nav.skills },
  ];

  const radius = 95;
  const menuSize = 'w-56 h-56';

  return (
    <div className="fixed top-8 left-8 z-50" style={{ position: 'fixed' }}>
      <motion.div
        className={`relative ${menuSize} rounded-full flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-300 ${
          isComicMode
            ? 'bg-comic-red border-4 border-black shadow-comic-lg'
            : 'bg-dark-blue'
        }`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Círculo animado de fondo */}
        <motion.div
          className={`absolute ${menuSize} rounded-full ${
            isComicMode
              ? 'border-4 border-dashed border-black/30'
              : 'border-4 border-dashed border-light-gray/30'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Logo central */}
        <div 
          className={`w-24 h-24 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
            isComicMode
              ? 'bg-comic-yellow border-4 border-black shadow-comic'
              : 'bg-light-gray border-4 border-white shadow-inner'
          }`}
        >
          {/* Usa tu logo. Si es PNG transparente, usa Image de Next.js */}
          {isComicMode ? (
            <Image
              src="/drdlp-logo-comic.png"
              alt="DRDLP Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          ) : (
            <Image
              src="/drdlp-logo.png"
              alt="DRDLP Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          )}
        </div>

        {/* Íconos en círculo */}
        {items.map((item, i) => {
          const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.a
              key={i}
              href={item.href}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: `translate(-50%, -50%)`,
              }}
              className={`absolute group flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 z-20 ${
                isComicMode
                  ? 'bg-comic-yellow text-black border-4 border-black hover:bg-black hover:text-comic-yellow shadow-comic'
                  : 'bg-light-gray text-dark-blue border-2 border-dark-blue hover:bg-dark-blue hover:text-white'
              }`}
              whileHover={{ scale: 1.2, rotate: 10 }}
              title={item.label}
            >
              {item.icon}

              {/* Tooltip */}
              <span className={`absolute px-3 py-1 rounded-md font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                i < 3 ? 'top-full mt-2' : 'bottom-full mb-2'
              } ${
                isComicMode
                  ? 'bg-black text-comic-yellow border-2 border-comic-yellow'
                  : 'bg-dark-blue text-white'
              }`}>
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}