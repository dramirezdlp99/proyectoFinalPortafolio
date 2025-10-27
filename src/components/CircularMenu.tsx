'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useComicMode } from "@/context/ComicModeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import {
  Home,
  User,
  Briefcase,
  Code,
  Layers,
  Star,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

export default function CircularMenu() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = [
    { icon: <Home size={20} />, href: "#inicio", label: content.nav.home },
    { icon: <User size={20} />, href: "#about", label: content.nav.about },
    { icon: <Briefcase size={20} />, href: "#projects", label: content.nav.projects },
    { icon: <Code size={20} />, href: "#skills", label: content.nav.skills },
    { icon: <Layers size={20} />, href: "#services", label: content.nav.services },
    { icon: <Star size={20} />, href: "#testimonials", label: content.nav.testimonials },
    { icon: <MessageSquare size={20} />, href: "#contact", label: content.nav.contact },
  ];

  const radius = 75;
  const centerSize = 'w-20 h-20';
  const containerSize = 'w-48 h-48';

  return (
    <>
      {/* MENÚ DESKTOP */}
      <div className="hidden lg:block fixed top-12 left-4 z-50">
        <div className={`relative ${containerSize}`}>
          <motion.div
            className={`absolute inset-0 rounded-full transition-all duration-300`}
            style={{
              backgroundColor: isComicMode ? '#FF3B3B' : '#060E28',
              border: isComicMode ? '4px solid #000' : 'none',
              boxShadow: isComicMode ? '4px 4px 0px #000' : 'none'
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: isComicMode ? '4px dashed rgba(0,0,0,0.3)' : '4px dashed rgba(226,226,226,0.3)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${centerSize} rounded-full flex items-center justify-center z-10 transition-all duration-300`}
            style={{
              backgroundColor: isComicMode ? '#FFD600' : '#E2E2E2',
              border: isComicMode ? '4px solid #000' : '4px solid #fff',
              boxShadow: isComicMode ? '2px 2px 0px #000' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <Image
              src={isComicMode ? "/drdlp-logo-comic.png" : "/drdlp-logo.png"}
              alt="DRDLP Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>

          {items.map((item, i) => {
            const angle = (i / items.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            return (
              <motion.a
                key={i}
                href={item.href}
                className="absolute group flex items-center justify-center w-10 h-10 rounded-full shadow-lg z-20 transition-colors duration-200"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  backgroundColor: isComicMode ? '#FFD600' : '#E2E2E2',
                  color: isComicMode ? '#000' : '#060E28',
                  border: isComicMode ? '4px solid #000' : '2px solid #060E28'
                }}
                initial={{
                  x: '-50%',
                  y: '-50%'
                }}
                whileHover={{ 
                  scale: 1.2,
                  y: '-60%',
                  backgroundColor: isComicMode ? '#E2E2E2' : '#060E28',
                  color: isComicMode ? '#000' : '#fff',
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                {item.icon}

                <span 
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                  style={{
                    backgroundColor: isComicMode ? '#000' : '#060E28',
                    color: isComicMode ? '#FFD600' : '#fff',
                    border: isComicMode ? '2px solid #FFD600' : 'none'
                  }}
                >
                  {item.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* MENÚ MOBILE */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{
            backgroundColor: isComicMode ? '#FF3B3B' : '#060E28',
            color: '#fff',
            border: isComicMode ? '4px solid #000' : 'none',
            boxShadow: isComicMode ? '2px 2px 0px #000' : 'none'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-0 rounded-xl p-4 shadow-xl"
            style={{
              backgroundColor: isComicMode ? '#FFD600' : '#fff',
              border: isComicMode ? '4px solid #000' : '2px solid #060E28'
            }}
          >
            {items.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all"
                style={{
                  fontWeight: isComicMode ? 'bold' : 'normal'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
