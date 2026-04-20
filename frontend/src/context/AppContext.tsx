'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface ThemeConfig {
  primaryColor: string;
  primaryButtonTextColor: string;
  textColor: string;
  sectionBgColor: string;
  sectionBgColorAlt: string;
  borderColor: string;
  sidebarBgColor: string;
  logoUrl?: string | null;
  facebookUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  tiktokUrl?: string | null;
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
    root.style.setProperty('--theme-primary-text', theme.primaryButtonTextColor || '#ffffff');
    root.style.setProperty('--theme-text', theme.textColor);
    root.style.setProperty('--theme-section-bg', theme.sectionBgColor || '#f8fafc');
    root.style.setProperty('--theme-section-alt', theme.sectionBgColorAlt || '#ffffff');
    root.style.setProperty('--theme-border', theme.borderColor || '#e2e8f0');
    root.style.setProperty('--theme-sidebar-bg', theme.sidebarBgColor || '#ffffff');
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
