'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', lastname: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      await axios.post('/api/contact', form);
      setStatus('Enviado. ¡Gracias!');
      setForm({ name: '', lastname: '', email: '', message: '' });
    } catch (err) {
      setStatus('Error al enviar');
    }
  }

  return (
    <section id="contact" className="py-12 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img src="/contact-illustration.png" alt="contact" className="w-full max-w-sm" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Contacto</h2>
          <form onSubmit={submit} className="mt-4 space-y-3 text-black">
            <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} name="name" required placeholder="Nombre" className="w-full border px-3 py-2 rounded" />
            <input value={form.lastname} onChange={e=>setForm({...form, lastname: e.target.value})} name="lastname" placeholder="Apellido" className="w-full border px-3 py-2 rounded" />
            <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} name="email" required placeholder="Correo" className="w-full border px-3 py-2 rounded" />
            <textarea value={form.message} onChange={e=>setForm({...form, message: e.target.value})} name="message" placeholder="Mensaje" className="w-full border px-3 py-2 rounded" />
            <div className="flex gap-4">
              <button type="submit" className="px-4 py-2 bg-white text-primary rounded">Enviar</button>
              <a href="tel:+573001234567" className="px-4 py-2 border rounded bg-white text-primary">Llámame</a>
            </div>
          </form>

          <div className="mt-4">
            <a href="https://github.com/tuUsuario" target="_blank" rel="noreferrer" className="mr-4">GitHub</a>
            <a href="https://www.linkedin.com/in/tuUsuario" target="_blank" rel="noreferrer" className="mr-4">LinkedIn</a>
            <a href="mailto:tuemail@example.com">Correo</a>
          </div>

          <p className="mt-2 text-sm text-white">{status}</p>
        </div>
      </div>
    </section>
  );
}
