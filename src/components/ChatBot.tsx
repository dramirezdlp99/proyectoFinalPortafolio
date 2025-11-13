'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bot, X, Send } from 'lucide-react';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  from: 'me' | 'ai';
  text: string;
}

export default function ChatBot() {
  const { isComicMode } = useComicMode();
  const { content, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages, isOpen]);

  const bubbleClasses = isComicMode
    ? 'bg-comic-red border-4 border-black text-white shadow-comic'
    : 'bg-dark-blue text-white shadow-xl';
  const chatWindowClasses = isComicMode
    ? 'border-4 border-black shadow-comic-lg bg-comic-yellow'
    : 'shadow-2xl bg-white';
  const headerBg = isComicMode ? 'bg-comic-red border-b-4 border-black' : 'bg-dark-blue';
  const inputBg = isComicMode ? 'bg-white border-4 border-black font-bold' : 'bg-light-gray';
  const sendButtonClasses = isComicMode 
    ? 'bg-black text-comic-yellow border-4 border-black hover:bg-comic-yellow hover:text-black' 
    : 'bg-dark-blue text-white hover:bg-dark-blue/80';
  
  const aiBubbleClasses = isComicMode 
    ? 'bg-white border-2 border-black font-bold text-black shadow-comic' 
    : 'bg-light-gray text-dark-blue';
  const userBubbleClasses = isComicMode
    ? 'bg-black text-comic-yellow border-2 border-black shadow-comic'
    : 'bg-dark-blue text-white';

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
    
    const payload = { message: userMessage, history, language };

    try {
      const res = await axios.post('/api/gemini', payload); 
      const aiText = res.data?.result || 'Lo siento, no pude obtener una respuesta.';
      setMessages(prev => [...prev, { from: 'ai', text: aiText }]);
    } catch (err) {
      console.error('Gemini API Error:', err);
      setMessages(prev => [...prev, { 
        from: 'ai', 
        text: 'Error al conectar con David AI. Intenta más tarde.' 
      }]);
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
    <div className="fixed right-6 bottom-6 z-50">
      
      {/* BURBUJA FLOTANTE */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${bubbleClasses}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* VENTANA DE CHAT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`fixed right-6 bottom-24 w-80 md:w-96 h-[500px] rounded-xl overflow-hidden flex flex-col ${chatWindowClasses}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            
            {/* ENCABEZADO */}
            <div className={`p-4 flex items-center justify-between ${headerBg} text-white`}>
              <div className={`flex items-center gap-3 ${isComicMode ? 'font-comic text-xl' : 'font-bold'}`}>
                <div className={`w-10 h-10 rounded-full overflow-hidden ${
                  isComicMode ? 'border-4 border-black' : 'border-2 border-white'
                }`}>
                  <Image 
                    src="/chatbot-ai-icon.png" 
                    alt="David AI" 
                    width={40} 
                    height={40} 
                    className="object-cover"
                  />
                </div>
                {content.chatbot.title}
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:opacity-75 transition-opacity"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* CUERPO DE MENSAJES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className={`text-center text-sm ${
                  isComicMode ? 'text-black font-bold' : 'text-gray-500'
                }`}>
                  {isComicMode ? '¡KA-POW! Pregúntame sobre David!' : 'Pregúntame sobre David Ramírez'}
                </div>
              )}
              
              {messages.map((m, i) => (
                <motion.div 
                  key={i} 
                  className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      m.from === 'me' ? userBubbleClasses : aiBubbleClasses
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${aiBubbleClasses}`}>
                    {content.chatbot.typing}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* ÁREA DE ENTRADA */}
            <div className={`p-3 flex border-t ${
              isComicMode ? 'border-t-4 border-black' : 'border-t-gray-200'
            }`}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isComicMode ? content.chatbot.placeholder_comic : content.chatbot.placeholder}
                className={`flex-1 p-2 rounded-l-lg focus:outline-none text-sm ${inputBg}`}
              />
              <button
                onClick={send}
                disabled={isLoading}
                className={`p-2 rounded-r-lg transition-all flex items-center justify-center min-w-[50px] ${sendButtonClasses}`}
                aria-label="Send message"
              >
                {isLoading ? '...' : <Send size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}