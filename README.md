# 🦸‍♂️ Portfolio Personal - David Ramírez de la Parra

Portafolio web profesional con temática de cómics y asistente de IA integrado. Desarrollado con Next.js 15, TypeScript y Tailwind CSS.

## 🎯 Descripción

Este portafolio personal combina diseño moderno con una experiencia única inspirada en el universo de los cómics. Incluye un modo alternativo "Comic Mode" que transforma la interfaz en una experiencia visual estilo historieta, reflejando mi pasión por personajes como Spider-Man y el diseño visual innovador.

## ✨ Características Principales

### 🎨 Diseño Dual
- **Modo Normal**: Interfaz profesional y minimalista con animaciones suaves
- **Comic Mode**: Experiencia visual inspirada en cómics con efectos retro y tipografía estilo historieta

### 🤖 David AI - Asistente Inteligente
- Chatbot integrado con **Gemini AI** que responde preguntas sobre mi experiencia, proyectos y habilidades
- Conversación natural en español e inglés
- Personalidad basada en frases de cómics y superhéroes

### 🌍 Multi-idioma
- Soporte completo para **Español** e **Inglés**
- Cambio de idioma dinámico sin recargar la página

### 📱 Totalmente Responsive
- Diseño adaptable desde móviles hasta pantallas 4K
- Navegación optimizada para touch y desktop

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para código robusto
- **Tailwind CSS** - Diseño utility-first
- **Framer Motion** - Animaciones fluidas

### Backend & AI
- **Gemini AI (Google)** - Modelo de lenguaje para el chatbot
- **API Routes de Next.js** - Endpoints serverless

### Herramientas
- **Git & GitHub** - Control de versiones
- **Vercel** - Despliegue y hosting
- **VS Code** - Entorno de desarrollo

## 📂 Estructura del Proyecto

proyecto-portafolio/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── contact/ # Endpoint de contacto
│ │ │ └── gemini/ # API de David AI
│ │ ├── [locale]/ # Rutas multiidioma
│ │ └── layout.tsx
│ ├── components/
│ │ ├── About.tsx # Sección "Acerca de mí"
│ │ ├── ChatBot.tsx # Componente del chatbot
│ │ ├── CircularMenu.tsx # Menú de navegación circular
│ │ ├── ComicModeToggle.tsx # Switch de modo cómics
│ │ ├── Contact.tsx # Formulario de contacto
│ │ ├── Hero.tsx # Sección principal
│ │ ├── LanguageToggle.tsx # Cambio de idioma
│ │ ├── Projects.tsx # Galería de proyectos
│ │ ├── Services.tsx # Servicios ofrecidos
│ │ ├── SkillTree.tsx # Árbol de habilidades interactivo
│ │ └── Testimonials.tsx # Testimonios de clientes
│ └── data/
│ ├── content-en.json # Contenido en inglés
│ └── content-es.json # Contenido en español
├── public/ # Recursos estáticos
└── package.json


## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ instalado
- npm o yarn

### Instalación

1. Clona el repositorio:
git clone https://github.com/tu-usuario/proyecto-portafolio.git
cd proyecto-portafolio


2. Instala las dependencias:
npm install

3. Configura las variables de entorno:

Crea un archivo `.env.local` en la raíz:
GEMINI_API_KEY=tu_api_key_de_gemini


4. Ejecuta el servidor de desarrollo:
npm run dev


5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎭 Secciones del Portafolio

### 1. Hero
Sección de bienvenida con animaciones dinámicas y call-to-action para descargar CV o contactar.

### 2. Acerca de Mí
Presentación personal, filosofía de trabajo y experiencia académica/laboral.

### 3. Árbol de Habilidades
Visualización interactiva de mis competencias técnicas organizadas por categorías:
- Frontend Development
- Backend Development
- UI/UX Design
- Herramientas y Control de Versiones

### 4. Proyectos
Galería de 10 proyectos destacados con descripciones y tecnologías utilizadas:
- Dr. Music (Plataforma de música con IA)
- Portfolio Personal
- Calculadora Avanzada
- Plant Simulator
- Interior Decorator
- Sistema de Reservas
- Spider-Man Fan Page
- Netflix Clone
- Card Maps Explorer
- Portfolio Web v1

### 5. Servicios
Servicios profesionales ofrecidos:
- Desarrollo Web Personalizado
- Diseño UX/UI Profesional
- Desarrollo de Aplicaciones Interactivas

### 6. Testimonios
Opiniones de clientes y colaboradores sobre mi trabajo.

### 7. Contacto
Formulario funcional para enviar mensajes directamente.

## 🎨 Decisiones de Diseño

### ¿Por qué Comic Mode?
Como fan de Spider-Man y los cómics en general, quise reflejar mi personalidad en el diseño. El modo cómics no es solo una estética, sino una forma de mostrar creatividad y diferenciación en un mercado saturado de portafolios tradicionales.

### Paleta de Colores
- **Modo Normal**: Tonos oscuros (navy, azul marino) con acentos vibrantes (cyan, amarillo)
- **Comic Mode**: Colores primarios brillantes (rojo, amarillo, azul) con efectos de tinta y sombras retro

### Tipografía
- **Modo Normal**: Inter (moderna y legible)
- **Comic Mode**: Bangers (estilo historieta)

## 🤖 David AI - Características Técnicas

El chatbot utiliza el modelo **Gemini 2.5 Flash** de Google con:
- **System Instruction personalizado** con toda mi información profesional
- **Historial de conversación** para contexto
- **Respuestas en tiempo real** con streaming
- **Soporte multiidioma** automático

## 📊 Métricas de Rendimiento

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 95+
- **100% Responsive**: Mobile, Tablet, Desktop, 4K

## 🌐 Despliegue

El proyecto está desplegado en **Vercel**:
- **URL**: [https://david-ramirez-portafolio.vercel.app](https://david-ramirez-portafolio.vercel.app)
- **Deploy automático** desde la rama `main`
- **Preview deployments** para cada PR

## 📝 Licencia

Este proyecto es de uso personal. Si deseas utilizar partes del código, por favor da crédito.

## 📧 Contacto

- **Email**: davidramirezdelaparra99@gmail.com
- **LinkedIn**: [davidramirezdelaparra](#)
- **GitHub**: [dramirezdlp99](#)

---

**Realizado por David Ramírez de la Parra**