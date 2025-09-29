'use client';
import React from 'react';

const projects = [
  {
    title: 'DigiHealth – Sistema de gestión clínica',
    desc: 'Plataforma diseñada para hospitales y clínicas que permite gestionar pacientes mediante identificación biométrica.',
    tech: 'React, Node.js, MongoDB, TailwindCSS',
    link: 'https://github.com/tuUsuario/digihealth'
  },
  {
    title: 'Landing Page de Turismo',
    desc: 'Sitio web responsivo para promocionar lugares turísticos de Nariño con enfoque visual e interactivo.',
    tech: 'Next.js, TailwindCSS, Figma',
    link: 'https://github.com/tuUsuario/landing-turismo'
  },
  {
    title: 'Shooter 3D – Juego en Unity',
    desc: 'Videojuego en primera persona desarrollado en Unity, con sistema de disparos y niveles básicos.',
    tech: 'Unity, C#',
    link: 'https://github.com/tuUsuario/shooter3d'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-12 section-panel">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center">Mis Proyectos</h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded shadow">
              <div className="h-40 bg-neutral-200 rounded mb-4 flex items-center justify-center">Imagen</div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm mt-2">{p.desc}</p>
              <p className="text-xs mt-2"><strong>Tecnologías:</strong> {p.tech}</p>
              <div className="mt-4">
                <a href={p.link} target="_blank" rel="noreferrer" className="px-4 py-2 bg-primary text-white rounded">Ver Proyecto</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
