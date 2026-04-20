'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Blocks, Smartphone, LineChart, Globe, ShieldCheck, Zap, Box } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const serviceIcons: Record<string, React.ReactNode> = {
  Globe: <Globe size={24} />,
  Smartphone: <Smartphone size={24} />,
  LineChart: <LineChart size={24} />,
  Blocks: <Blocks size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Zap: <Zap size={24} />,
};

export default function Home() {
  const { lang, theme } = useAppContext();
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Services
    fetch('http://localhost:3000/api/services')
      .then(res => res.json())
      .then(data => setServices(data.slice(0, 6)))
      .catch(err => console.error(err));

    // Fetch Products
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden bg-transparent">
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.08] translate-x-1/2 -translate-y-1/4" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border" style={{ color: 'var(--theme-text)', borderColor: 'var(--theme-primary)', backgroundColor: 'transparent' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--theme-primary)' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--theme-primary)' }}></span>
            </span>
            {lang === 'ar' ? 'هندسة التميز الرقمي' : 'Engineering Digital Excellence'}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' ? (
              <>نبتكر حلولاً <br/><span style={{ color: 'var(--theme-primary)' }}>للمؤسسات الحديثة.</span></>
            ) : (
               <>We architect solutions for <br/><span style={{ color: 'var(--theme-primary)' }}>modern enterprises.</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-80" style={{ color: 'var(--theme-text)' }}>
            {lang === 'ar' 
              ? 'إنوفا هي شركة تكنولوجية رائدة متخصصة في الويب والموبايل والتسويق الاستراتيجي، تدعم علامات تجارية مبتكرة مثل Idarax و Drovo.'
              : 'Innova is a premier technology parent company specializing in web, mobile, and strategic marketing, powering innovative brands like Idarax and Drovo.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/services" className="px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:opacity-90" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)', boxShadow: '0 10px 15px -3px var(--theme-primary)40' }}>
              {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </Link>
            <Link href="/products" className="px-8 py-4 bg-transparent border rounded-lg font-semibold transition hover:opacity-70" style={{ color: 'var(--theme-text)', borderColor: 'var(--theme-primary)' }}>
               {lang === 'ar' ? 'اكتشف المنظومة' : 'Explore Brands'}
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Box Grid */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--theme-section-alt)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
                 {lang === 'ar' ? 'القدرات الأساسية' : 'Core Capabilities'}
              </h2>
              <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>
                {lang === 'ar' ? 'اكتشف كيف نقود التحول عبر بصمتك الرقمية بأكملها.' : 'Discover how we drive transformation across your entire digital footprint.'}
              </p>
            </div>
            <Link href="/services" className="hidden border-b-2 font-semibold md:flex items-center gap-1 hover:opacity-70 transition-opacity pb-1" style={{ color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}>
              {lang === 'ar' ? 'عرض جميع الخدمات' : 'View all services'} <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bento-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.1] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" style={{ color: 'var(--theme-primary)' }}>
                 <Blocks size={120} strokeWidth={1} />
              </div>
              <div className="relative z-10 w-2/3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}>
                  <Blocks size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'تطوير تطبيقات الويب للمؤسسات' : 'Enterprise Web Development'}</h3>
                <p className="opacity-80 mb-8" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'نبني تطبيقات ويب آمنة وقابلة للتطوير وعالية الأداء مصممة لحل تحديات الأعمال المعقدة.' : 'We build secure, scalable, and high-performance web applications tailored to solve complex business challenges.'}</p>
                <Link href="/services#web" className="font-semibold flex items-center gap-1" style={{ color: 'var(--theme-primary)' }}>{lang === 'ar' ? 'اعرف المزيد' : 'Learn more'} <ArrowUpRight size={16}/></Link>
              </div>
            </div>

            <div className="bento-card border-none relative text-white" style={{ backgroundColor: 'var(--theme-text)' }}>
              <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{lang === 'ar' ? 'تجارب الموبايل' : 'Mobile Experiences'}</h3>
              <p className="opacity-60 mb-16">{lang === 'ar' ? 'إنشاء تطبيقات أصلية ومجمعة عبر الأنظمة الأساسية لنظامي التشغيل iOS و Android.' : 'Creating intuitive, natively compiled applications for iOS and Android.'}</p>
              <Link href="/services#mobile" className="text-white font-semibold flex items-center gap-1 mt-auto">{lang === 'ar' ? 'اعرف المزيد' : 'Learn more'} <ArrowUpRight size={16}/></Link>
            </div>

            <div className="bento-card" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}>
               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{lang === 'ar' ? 'تسويق النمو' : 'Growth Marketing'}</h3>
              <p className="opacity-80 mb-16">{lang === 'ar' ? 'استراتيجيات مبنية على البيانات لتوسيع نطاق اكتساب المستخدمين والاحتفاظ بالعملاء.' : 'Data-driven strategies to scale user acquisition and customer retention.'}</p>
              <Link href="/services#marketing" className="font-semibold flex items-center gap-1">{lang === 'ar' ? 'اعرف المزيد' : 'Learn more'} <ArrowUpRight size={16}/></Link>
            </div>

             <div className="md:col-span-2 bento-card flex flex-col justify-center items-center text-center p-12 bg-transparent border" style={{ borderColor: 'var(--theme-border)' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'مدعوم من إنوفا' : 'Powered by Innova'}</h3>
                <p className="max-w-lg mb-8 opacity-80" style={{ color: 'var(--theme-text)' }}>Idarax • Drovo • Shukran</p>
                <Link href="/products" className="px-6 py-3 rounded-lg font-semibold transition border opacity-80 hover:opacity-100" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}>
                  {lang === 'ar' ? 'اكتشف المنظومة' : 'Explore The Ecosystem'}
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Services Section */}
      {services.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-16" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar' ? 'ابتكاراتنا المتخصصة' : 'Our Specialized Innovations'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc) => (
                <div 
                  key={svc.id} 
                  className="p-8 rounded-3xl border text-left transition hover:shadow-xl hover:-translate-y-2"
                  style={{ backgroundColor: 'var(--theme-section-alt)', borderColor: 'var(--theme-border)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}>
                     {serviceIcons[svc.icon] || <Zap size={24} />}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-text)' }}>
                    {lang === 'ar' && svc.nameAr ? svc.nameAr : svc.name}
                  </h3>
                  <p className="opacity-70 text-sm line-clamp-3 mb-6" style={{ color: 'var(--theme-text)' }}>
                    {lang === 'ar' && svc.descriptionAr ? svc.descriptionAr : svc.description}
                  </p>
                  <Link href="/services" className="text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--theme-primary)' }}>
                    {lang === 'ar' ? 'اكتشف المزيد' : 'Explore More'} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Products Showcase */}
      {products.length > 0 && (
        <section className="py-24 px-6 border-t" style={{ backgroundColor: 'var(--theme-section-alt)', borderColor: 'var(--theme-border)' }}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
               <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--theme-text)' }}>
                {lang === 'ar' ? 'منظومة إنوفا' : 'The Innova Ecosystem'}
              </h2>
              <Link href="/products" className="px-8 py-3 rounded-full font-bold transition hover:shadow-lg" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}>
                 {lang === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((prod) => {
                const name = lang === 'ar' && prod.nameAr ? prod.nameAr : prod.name;
                return (
                  <div key={prod.id} className="group relative">
                    <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-xl border border-white/5 bg-slate-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
                       {prod.image ? (
                         <img src={prod.image} alt={name} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-6xl font-bold opacity-[0.05]" style={{ color: 'var(--theme-text)' }}>
                           <Box size={120} />
                         </div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                         <p className="text-white font-bold text-xl mb-1">{name}</p>
                         <p className="text-white/80 text-xs">{lang === 'ar' && prod.taglineAr ? prod.taglineAr : prod.tagline}</p>
                       </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>{name}</h3>
                      <p className="text-sm opacity-60 line-clamp-2" style={{ color: 'var(--theme-text)' }}>
                        {lang === 'ar' && prod.descriptionAr ? prod.descriptionAr : prod.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
