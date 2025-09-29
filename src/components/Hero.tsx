'use client';
import React, { useState } from 'react';

export default function Hero() {
  const [isComic, setIsComic] = useState(false);

  function toggleComic() {
    setIsComic(v => !v);
    if (!isComic) document.body.classList.add('comic');
    else document.body.classList.remove('comic');
  }

  return (
    <section id="home" className="py-12 section-panel">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary">Construyendo el futuro con diseño y software</h1>
          <p className="mt-4 text-sm md:text-base text-neutral-700 max-w-xl">
            Transformo ideas en experiencias digitales útiles y atractivas. A través del diseño y la programación, busco crear soluciones que simplifiquen la vida de las personas.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#contact" className="px-5 py-2 bg-primary text-white rounded shadow">Contacto</a>

            <a href="https://open.spotify.com/playlist/TU_PLAYLIST_ID" target="_blank" rel="noreferrer" className="px-4 py-2 border rounded flex items-center gap-2">
              <img src="/spotify-icon.png" alt="spotify" className="w-5 h-5" />
              Reproducir Spotify
            </a>

            <a href="#projects" className="px-4 py-2 border rounded">Ver Proyectos</a>

            <button onClick={toggleComic} className="ml-2 px-3 py-1 border rounded">
              Comic Mode
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img src="/hero-photo.jpg" alt="hero" className="w-full rounded-md shadow" />
        </div>
      </div>
    </section>
  );
}
