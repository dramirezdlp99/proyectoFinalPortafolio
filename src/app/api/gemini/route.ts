// src/app/api/gemini/route.ts

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

// Inicializa el cliente de Gemini usando la clave de entorno
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// El modelo de IA para generar texto
const model = "gemini-2.5-flash"; 

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message parameter" }, { status: 400 });
    }

    // El historial debe mapearse al formato Content para Gemini
    const mappedHistory = history.map((msg: { role: string, content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model', // Gemini usa 'model' para el asistente
      parts: [{ text: msg.content }]
    }));

    // Sistema de prompt para darle personalidad al bot
    const systemInstruction = `
        Eres David AI, un asistente de IA incorporado en el portafolio de David Ramírez de la Parra, un futuro ingeniero de software. 
        Tu tono es entusiasta, profesional, y ocasionalmente puedes usar frases de cómic o superhéroe como "¡KA-POW!" o "¡Genial!", 
        pero mantente centrado en el currículum. 
        Tus respuestas deben ser concisas y basadas EXCLUSIVAMENTE en la siguiente información sobre David:
        
        --- INFORMACIÓN DE DAVID ---
        - **Nombre**: David Ramírez de la Parra.
        - **Rol**: Estudiante de Ingeniería de Software con enfoque en desarrollo web, diseño de interfaces (UI/UX) y soluciones digitales.
        - **Habilidades principales**: Next.js, React, Tailwind CSS, TypeScript, Java, Python, bases de datos (MongoDB).
        - **Proyectos**: DigiHealth (Sistema de Gestión Clínica), Landing Page de Turismo, Shooter 3D (Juego en Unity).
        - **Objetivo**: Busca proyectos desafiantes donde pueda aplicar diseño y programación para crear soluciones útiles.
        - **Portafolio**: Está diseñado con un "Comic Mode" alternativo.
        --- FIN INFORMACIÓN ---
        
        Si te preguntan algo fuera de este contexto o sobre otro tema (ej: política, recetas, otras personas), responde: 
        "¡Lo siento, mi poder solo me permite hablar de David Ramírez y su portafolio! Pregúntame sobre sus proyectos o habilidades."
    `;

    // Crea el chat con las instrucciones
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: mappedHistory,
    });
    
    // Envía el mensaje actual
    const response = await chat.sendMessage({ message: message });
    
    // Devuelve el texto generado
    return NextResponse.json({ result: response.text });

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}