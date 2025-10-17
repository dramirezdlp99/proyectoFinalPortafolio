// src/app/layout.tsx

import './globals.css';
import React from 'react';
import Providers from '@/components/Providers'; // 👈 Importamos el nuevo Wrapper

export const metadata = {
  title: 'David Ramirez - Portafolio',
  description: 'Portafolio de David Ramírez - Ingeniería de Software'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* Nota: Eliminé la etiqueta <head> y los <link> de fuentes. 
        En Next.js App Router, las fuentes deben importarse en globals.css o usando next/font. 
        Ya importamos la fuente Comic Neue en globals.css.
      */}
      <body>
        {/* Envolvemos la aplicación con el componente Providers. 
            Esto asegura que todos los componentes hijos, incluyendo Hero.tsx, 
            tengan acceso al ComicModeContext. */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}