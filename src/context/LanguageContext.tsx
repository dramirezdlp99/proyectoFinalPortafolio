'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import contentEs from '@/data/content-es.json';
import contentEn from '@/data/content-en.json';

type Language = 'es' | 'en';

// Definir el tipo completo basado en contentEs
type ContentType = typeof contentEs;

interface LanguageContextType {
  language: Language;
  content: ContentType;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  // Asegurar que ambos archivos JSON cumplen con el tipo ContentType
  const content: ContentType = language === 'es' ? contentEs : (contentEn as ContentType);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, content, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
