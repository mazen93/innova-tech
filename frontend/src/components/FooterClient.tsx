'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { Logo } from '@/components/Logo';

export function FooterClient() {
  const { lang, theme } = useAppContext();
  const footerBg = theme.sectionBgColor ?? '#f8fafc';

  return (
    <footer
      className="border-t py-16 mt-20 transition-colors duration-500"
      style={{ backgroundColor: 'var(--theme-section-bg)', borderColor: 'rgba(0,0,0,0.08)', color: 'var(--theme-text)' }}
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
