'use client';
import React from 'react';

const skills = [
  { id: 'next', label: 'Next.js', icon: '/icons/nextjs.svg' },
  { id: 'tail', label: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  { id: 'mongo', label: 'MongoDB', icon: '/icons/mongo.svg' },
  { id: 'react', label: 'React', icon: '/icons/react.svg' },
  { id: 'node', label: 'Node.js', icon: '/icons/node.svg' },
  { id: 'ts', label: 'TypeScript', icon: '/icons/ts.svg' },
  { id: 'py', label: 'Python', icon: '/icons/python.svg' },
  { id: 'git', label: 'GitHub', icon: '/icons/github.svg' },
  { id: 'vscode', label: 'VS Code', icon: '/icons/vscode.svg' }
];

export default function SkillTree() {
  return (
    <section id="skills" className="py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold">Árbol de Habilidades</h2>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {skills.map(s => (
            <div key={s.id} className="group relative w-20 h-20 flex items-center justify-center">
              <img src={s.icon} alt={s.label} className="w-12 h-12" />
              <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition bg-white text-sm text-primary py-1 px-2 rounded shadow -translate-y-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
