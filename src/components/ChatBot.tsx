// src/components/ChatBot.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send } from 'lucide-react';
import { useComicMode } from '@/context/ComicModeContext'; // Usamos el modo cómic
import Image from 'next/image';

interface Message {
  from: 'me' | 'ai';
  text: string;
}

export default function ChatBot() {
  const { isComicMode } = useComicMode();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages, isOpen]);

  // Estilos Condicionales basados en el modo cómic
  const bubbleClasses = isComicMode
    ? 'comic-button border-4 border-black text-black shadow-comic'
    : 'bg-dark-blue text-white shadow-xl hover:scale-105';
  const chatWindowClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-comic-yellow'
    : 'shadow-2xl bg-white';
  const headerBg = isComicMode ? 'bg-comic-red' : 'bg-dark-blue';
  const inputBg = isComicMode ? 'bg-white border-2 border-black' : 'bg-light-gray';
  const sendButtonClasses = isComicMode 
    ? 'bg-comic-red border-4 border-black text-white hover:translate-x-0.5 hover:translate-y-0.5' 
    : 'bg-dark-blue text-white hover:bg-dark-blue/80';
  
  const aiBubbleClasses = isComicMode 
    ? 'bg-white border-2 border-black font-comic text-black' 
    : 'bg-light-gray text-dark-blue';
  const userBubbleClasses = 'bg-dark-blue text-white';

  async function send() {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { from: 'me', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.from === 'me' ? 'user' : 'assistant',
      content: m.text
    }));
    
    const payload = { message: userMessage, history };

    try {
      // ⚠️ ESTO ASUME QUE YA TIENES CREADA LA API ROUTE EN /api/gemini
      const res = await axios.post('/api/gemini', payload); 
      
      // Intentamos leer la respuesta directamente del payload de la API
      const aiText = res.data?.result || 'Lo siento, no pude obtener una respuesta de la IA.';
      setMessages(prev => [...prev, { from: 'ai', text: aiText }]);

    } catch (err) {
      console.error('Gemini API Error:', err);
      setMessages(prev => [...prev, { from: 'ai', text: 'Error al conectar con el David AI. Intenta más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  return (
    // Posicionamiento de la burbuja flotante
    <div className="fixed right-6 bottom-6 z-50">
      
      {/* 1. Burbuja Flotante */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${bubbleClasses}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* 2. Ventana de Chat */}
      {isOpen && (
        <div className={`fixed right-6 bottom-24 w-80 h-[400px] rounded-xl overflow-hidden flex flex-col ${chatWindowClasses}`}>
          
          {/* Encabezado */}
          <div className={`p-3 flex items-center justify-between ${headerBg} text-white`}>
            <div className={`flex items-center gap-2 ${isComicMode ? 'font-comic text-xl' : 'font-bold'}`}>
              <Image src="/superhero-icon.png" alt="Bot" width={30} height={30} className='rounded-full' /> 
              David AI
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75">
              <X size={20} />
            </button>
          </div>
          
          {/* Cuerpo de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-lg text-sm 
                    ${m.from === 'me' ? userBubbleClasses : aiBubbleClasses}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${aiBubbleClasses}`}>
                        ... Escribiendo
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} /> {/* Para el scroll automático */}
          </div>
          
          {/* Área de Entrada */}
          <div className={`p-3 flex border-t ${isComicMode ? 'border-t-black' : 'border-t-gray-200'}`}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isComicMode ? '¡Escribe aquí, HÉROE!' : 'Escribe tu mensaje...'}
              className={`flex-1 p-2 rounded-l-lg focus:outline-none text-sm ${inputBg} ${isComicMode ? 'font-comic' : ''}`}
            />
            <button
              onClick={send}
              disabled={isLoading}
              className={`p-2 rounded-r-lg text-white transition-colors flex items-center ${sendButtonClasses}`}
            >
              {isLoading ? '...' : <Send size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}