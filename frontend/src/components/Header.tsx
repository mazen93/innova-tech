'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { Logo } from '@/components/Logo';

export function Header() {
  const { lang, toggleLang, theme } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when shifting to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const headerBg = theme.sectionBgColor ?? '#ffffff';

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <header 
        className="fixed top-0 w-full z-50 py-4 glass-nav" 
        style={{ 
          backgroundColor: `color-mix(in srgb, var(--theme-section-bg), transparent 20%)`, 
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--theme-border)'
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo bgColor={headerBg} src={theme.logoUrl} className="h-[35px] object-contain" />
          </Link>

          {/* Desktop Navigation */}
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
              style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}
            >
              {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'} <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: 'var(--theme-text)', backgroundColor: 'transparent' }}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-24 px-6 gap-8 bg-white"
            style={{ backgroundColor: 'var(--theme-section-bg)', color: 'var(--theme-text)' }}
          >
            <nav className="flex flex-col gap-6 text-2xl font-bold">
              <motion.div variants={itemVariants}>
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>
                  {lang === 'ar' ? 'الخدمات' : 'Services'}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                  {lang === 'ar' ? 'المنتجات' : 'Products'}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  {lang === 'ar' ? 'من نحن' : 'About & Vision'}
                </Link>
              </motion.div>
            </nav>

            <motion.div variants={itemVariants} className="mt-auto pb-12 flex flex-col gap-6">
              <button 
                onClick={toggleLang} 
                className="flex items-center gap-3 text-lg font-medium"
              >
                <Globe size={24} />
                {lang === 'ar' ? 'English Version' : 'النسخة العربية'}
              </button>
              
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-lg font-bold shadow-xl"
                style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}
              >
                {lang === 'ar' ? 'اتصل بنا الآن' : 'Get in Touch'} <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
