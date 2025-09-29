'use client';
import React from 'react';

const testimonials = [
  { name: 'Jacqueline Wright', text: 'Excelente trabajo y muy profesional.', img: '/user1.jpg' },
  { name: 'Carlos Pérez', text: 'Buena comunicación y calidad en el desarrollo.', img: '/user2.jpg' }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center">Testimonios</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-neutralCustom p-6 rounded">
              <p>{t.text}</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm">Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
