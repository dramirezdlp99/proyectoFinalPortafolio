'use client';
import React from 'react';

const services = [
  { title: 'Desarrollo Web Personalizado', desc: 'Construyo sitios web modernos, rápidos y totalmente responsivos.', more: '#' },
  { title: 'Diseño UX/UI Profesional', desc: 'Interfaces atractivas y fáciles de usar, prototipadas en Figma.', more: '#' },
  { title: 'Desarrollo de Aplicaciones Interactivas', desc: 'Desde apps web hasta videojuegos básicos en Unity.', more: '#' }
];

export default function Services() {
  return (
    <section id="services" className="py-12 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center">Servicios</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white text-primary p-6 rounded">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm mt-2">{s.desc}</p>
              <div className="mt-4">
                <a href="#contact" className="px-4 py-2 border rounded">Más detalles</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
