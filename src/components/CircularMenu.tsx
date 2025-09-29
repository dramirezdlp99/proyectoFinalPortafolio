'use client';
import React from 'react';
import Link from 'next/link';

const items = [
  { id: 'home', label: 'Inicio', icon: '🏠', href: '#home' },
  { id: 'about', label: 'Sobre mí', icon: '👤', href: '#about' },
  { id: 'projects', label: 'Proyectos', icon: '🗂️', href: '#projects' },
  { id: 'services', label: 'Servicios', icon: '💼', href: '#services' },
  { id: 'testimonials', label: 'Testimonios', icon: '💬', href: '#testimonials' },
  { id: 'contact', label: 'Contacto', icon: '✉️', href: '#contact' }
];

export default function CircularMenu() {
  return (
    <div className="fixed left-4 top-20 z-50">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full bg-primary flex items-center justify-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <img src="/logo.png" alt="logo" className="w-14 h-14" />
          </div>
        </div>

        {items.map((it, idx) => {
          const angle = (360 / items.length) * idx;
          const r = 38;
          const left = 50 + r * Math.cos((angle - 90) * Math.PI / 180);
          const top = 50 + r * Math.sin((angle - 90) * Math.PI / 180);
          return (
            <a
              key={it.id}
              href={it.href}
              style={{ left: `${left}%`, top: `${top}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
              title={it.label}
            >
              <span className="text-sm">{it.icon}</span>
            </a>
          );
        })}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-4 border-white opacity-80 animate-pulse"></div>
      </div>
    </div>
  );
}
