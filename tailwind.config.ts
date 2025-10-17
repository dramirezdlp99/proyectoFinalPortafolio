import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales del portafolio formal
        'dark-blue': '#060E28',
        'light-gray': '#E2E2E2',
        
        // Colores del modo cómic (vibrantes y llamativos)
        'comic-red': '#FF3B3B',      // Rojo intenso
        'comic-yellow': '#FFD600',   // Amarillo brillante
        'comic-blue': '#00B8FF',     // Azul cian
        'comic-orange': '#FF6B35',   // Naranja vibrante
        'comic-pink': '#FF1493',     // Rosa fuerte
        'comic-purple': '#9D4EDD',   // Morado
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Fuente estilo cómic (será añadida en globals.css)
        comic: ['Bangers', 'Comic Neue', 'cursive'],
      },
      boxShadow: {
        // Sombras estilo cómic (offset negro)
        'comic': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'comic-lg': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'comic-xl': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;