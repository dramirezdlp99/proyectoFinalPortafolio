'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function About() {
  return (
    <section id="about" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center">Sobre mí</h2>

        <Swiper spaceBetween={30} slidesPerView={1} className="mt-8">
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p>Soy estudiante de Ingeniería de Software con interés en desarrollo web, diseño de interfaces y soluciones que mejoren la experiencia de las personas. Busco crecer profesionalmente aportando valor a través del código y el diseño.</p>
              </div>
              <div className="w-48 h-48">
                <img src="/foto1.jpg" alt="yo" className="rounded-full" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p>Me apasiona aprender nuevas tecnologías, trabajar en proyectos colaborativos y aplicar la creatividad en cada desarrollo.</p>
              </div>
              <div className="w-48 h-48">
                <img src="/foto2.jpg" alt="yo2" className="rounded-full" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
