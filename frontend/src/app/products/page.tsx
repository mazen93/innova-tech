'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Box } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Products() {
  const { lang, theme } = useAppContext();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  return (
    <div className="py-24 px-6 min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 opacity-60" style={{ color: 'var(--theme-text)', backgroundColor: 'var(--theme-primary)', opacity: 0.15 }}>
            <Box size={14} style={{ color: 'var(--theme-text)' }}/> <span style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'المنظومة' : 'Ecosystem'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' ? 'مبني بواسطة Innova.' : 'Built by Innova.'}
          </h1>
          <p className="text-xl opacity-80" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' 
              ? 'نحن لا نبني برمجيات للعملاء فحسب؛ نحن نهندس منصات كاملة تحدد فئاتها.'
              : "We don't just build software for clients; we engineer complete platforms that define their categories."}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 opacity-50" style={{ color: 'var(--theme-text)' }}>
             {lang === 'ar' ? 'جاري تحميل المنظومة...' : 'Loading ecosystem...'}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl opacity-50 bg-white" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' ? 'منظومة منتجاتنا تتوسع حاليًا.' : 'Our product ecosystem is currently expanding. Visit the Dashboard to add entries.'}
          </div>
        ) : (
          <div className="space-y-8">
            {products.map((prod) => {
              const name = lang === 'ar' && prod.nameAr ? prod.nameAr : prod.name;
              const tagline = lang === 'ar' && prod.taglineAr ? prod.taglineAr : prod.tagline;
              const description = lang === 'ar' && prod.descriptionAr ? prod.descriptionAr : prod.description;
              const features = lang === 'ar' && prod.featuresAr ? prod.featuresAr : prod.features;

              return (
              <div key={prod.id} className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-all duration-300 border" style={{ backgroundColor: 'var(--theme-section-alt)', borderColor: 'var(--theme-primary)' }}>
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-xl transform group-hover:scale-105 transition-transform duration-500" style={{ backgroundColor: 'var(--theme-primary)' }}>
                  <span className="text-6xl font-serif font-bold italic">{name[0]}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--theme-text)' }}>{name}</h2>
                  <h3 className="text-xl opacity-60 font-medium mb-6" style={{ color: 'var(--theme-text)' }}>{tagline}</h3>
                  <p className="mb-8 max-w-2xl leading-relaxed text-lg opacity-80" style={{ color: 'var(--theme-text)' }}>
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {features.split(',').map((f: string) => (
                      <span key={f} className="px-4 py-1.5 opacity-80 text-sm font-semibold rounded-full border" style={{ color: 'var(--theme-text)', borderColor: 'var(--theme-primary)' }}>
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 font-bold transition hover:opacity-70" style={{ color: 'var(--theme-primary)' }}>
                    {lang === 'ar' ? `استكشف منصة ${name}` : `Explore ${name} platform`} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
