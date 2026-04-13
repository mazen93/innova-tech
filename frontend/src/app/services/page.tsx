'use client';
import { useEffect, useState } from 'react';
import { Globe, Smartphone, LineChart, Blocks, ShieldCheck, Zap } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

// Icons are always rendered white — they sit inside a theme-primary colored box
const icons: Record<string, JSX.Element> = {
  Globe: <Globe color="#ffffff" size={28} />,
  Smartphone: <Smartphone color="#ffffff" size={28} />,
  LineChart: <LineChart color="#ffffff" size={28} />,
  Blocks: <Blocks color="#ffffff" size={28} />,
  ShieldCheck: <ShieldCheck color="#ffffff" size={28} />,
  Zap: <Zap color="#ffffff" size={28} />,
};

export default function Services() {
  const { lang, theme } = useAppContext();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-24 px-6 min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' ? 'خبراتنا' : 'Our Expertise'}
          </h1>
          <p className="text-xl opacity-80" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' 
              ? 'حلول رقمية شاملة تمتد عبر الهندسة والتصميم والتسويق الاستراتيجي.'
              : 'Comprehensive digital solutions spanning engineering, design, and strategic marketing.'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 opacity-50" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' ? 'جاري تحميل الابتكارات...' : 'Loading innovations...'}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl opacity-50" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' ? 'لا توجد خدمات مدرجة بعد. تحقق مرة أخرى قريباً.' : 'No services listed yet. Check back soon.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div 
                key={svc.id} 
                className="p-8 md:p-10 rounded-3xl border transition hover:shadow-xl hover:-translate-y-1 shadow-sm"
                style={{ borderColor: 'var(--theme-primary)', backgroundColor: 'var(--theme-section-alt)' }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)' }}>
                  {icons[svc.icon] ?? <Zap color="#ffffff" size={28} />}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'ar' && svc.nameAr ? svc.nameAr : svc.name}
                </h3>
                <p className="leading-relaxed opacity-80" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'ar' && svc.descriptionAr ? svc.descriptionAr : svc.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
