'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface ThemeConfig {
  primaryColor: string;
  textColor: string;
  sectionBgColor: string;
  sectionBgColorAlt: string;
  logoUrl?: string | null;
}

interface AppContextType {
  lang: Language;
  toggleLang: () => void;
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialTheme }: { children: React.ReactNode, initialTheme: ThemeConfig }) {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  // Sync RTL with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Inject CSS Variables for Theme
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primaryColor);
    root.style.setProperty('--theme-text', theme.textColor);
    root.style.setProperty('--theme-section-bg', theme.sectionBgColor || '#f8fafc');
    root.style.setProperty('--theme-section-alt', theme.sectionBgColorAlt || '#ffffff');
  }, [theme]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <AppContext.Provider value={{ lang, toggleLang, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
