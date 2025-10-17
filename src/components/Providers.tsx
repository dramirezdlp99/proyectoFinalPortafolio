'use client';

import { ComicModeProvider } from '@/context/ComicModeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ComicModeProvider>
        {children}
      </ComicModeProvider>
    </LanguageProvider>
  );
}