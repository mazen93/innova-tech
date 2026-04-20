'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Logo } from '@/components/Logo';
import { Globe, Share2, ExternalLink, Mail, Phone, ArrowUpRight } from 'lucide-react';

export function FooterClient() {
  const { lang, theme } = useAppContext();
  const footerBg = theme.sectionBgColor ?? '#f8fafc';

  const socialLinks = [
    { id: 'facebook', icon: Globe, url: theme.facebookUrl },
    { id: 'twitter', icon: Share2, url: theme.twitterUrl },
    { id: 'instagram', icon: Globe, url: theme.instagramUrl },
    { id: 'linkedin', icon: Share2, url: theme.linkedinUrl },
    { id: 'youtube', icon: Globe, url: theme.youtubeUrl },
    { id: 'tiktok', icon: Share2, url: theme.tiktokUrl },
  ].filter(link => link.url);

  return (
    <footer
      className="border-t py-16 mt-20 transition-colors duration-500"
      style={{ backgroundColor: 'var(--theme-section-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center mb-5">
            {/* Logo adapts: natural on light bg, white on dark bg */}
            <Logo bgColor={footerBg} src={theme.logoUrl} className="h-[32px] object-contain" />
          </div>
          <p className="max-w-sm mb-6 text-sm leading-relaxed opacity-70">
            {lang === 'ar'
              ? 'نقود الحدود الرقمية من خلال حلول شاملة للويب والموبايل والتسويق. الشركة الأم لـ Idarax و Drovo و Shukran.'
              : 'Leading the digital frontier through comprehensive web, mobile, and marketing solutions. Parent company of Idarax, Drovo, and Shukran.'}
          </p>
          
          {/* Social Media Links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, var(--theme-primary), transparent 90%)`, 
                    color: 'var(--theme-primary)',
                    border: '1px solid var(--theme-border)'
                  }}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          )}

          <p className="text-xs opacity-50">
            &copy; 2026 Innova Tech. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 opacity-90">{lang === 'ar' ? 'الشركة' : 'Company'}</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li>
              <Link href="/about" className="hover:opacity-100 transition-opacity">
                {lang === 'ar' ? 'من نحن' : 'About Us'}
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:opacity-100 transition-opacity">
                {lang === 'ar' ? 'الخدمات' : 'Services'}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:opacity-100 transition-opacity">
                {lang === 'ar' ? 'المنتجات' : 'Products'}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 opacity-90">{lang === 'ar' ? 'التواصل' : 'Contact'}</h4>
          <ul className="space-y-3 text-sm opacity-70">
            <li>
              <Link href="/contact" className="hover:opacity-100 transition-opacity">
                {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
              </Link>
            </li>
            <li>hello@innova.dev</li>
            <li>+1 (800) 555-0199</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

