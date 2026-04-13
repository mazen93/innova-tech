'use client';

import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Logo } from '@/components/Logo';

export function Header() {
  const { lang, toggleLang, theme } = useAppContext();

  // Header uses a semi-transparent white glass effect — base color for logo detection
  // We use sectionBgColor so if admin sets a dark header bg, the logo adapts correctly
  const headerBg = theme.sectionBgColor ?? '#ffffff';

  return (
    <header className="fixed top-0 w-full z-50 py-4 glass-nav" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)' }}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo bgColor={headerBg} src={theme.logoUrl} className="h-[35px] object-contain" />
        </Link>
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium opacity-80" style={{ color: 'var(--theme-text)' }}>
          <Link href="/services" className="hover:opacity-100 transition-opacity">
            {lang === 'ar' ? 'الخدمات' : 'Services'}
          </Link>
          <Link href="/products" className="hover:opacity-100 transition-opacity">
            {lang === 'ar' ? 'المنتجات' : 'Products'}
          </Link>
          <Link href="/about" className="hover:opacity-100 transition-opacity">
            {lang === 'ar' ? 'من نحن' : 'About & Vision'}
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLang} 
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: 'var(--theme-text)' }}
          >
            <Globe size={16} />
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          
          <Link 
            href="/contact" 
            className="flex items-center gap-2 px-5 py-2.5 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
