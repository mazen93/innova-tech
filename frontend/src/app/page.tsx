'use client';
import Link from 'next/link';
import { ArrowUpRight, Blocks, Smartphone, LineChart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const { lang, theme } = useAppContext();

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
            <Link href="/services" className="px-8 py-4 text-white rounded-lg font-semibold transition shadow-lg hover:opacity-90" style={{ backgroundColor: 'var(--theme-primary)', shadowColor: 'var(--theme-primary)' }}>
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
            <div className="md:col-span-2 bento-card bg-white relative overflow-hidden group border border-slate-200">
              <div className="absolute top-0 right-0 p-8 opacity-[0.1] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" style={{ color: 'var(--theme-primary)' }}>
                 <Blocks size={120} strokeWidth={1} />
              </div>
              <div className="relative z-10 w-2/3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
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
              <p className="text-slate-400 mb-16">{lang === 'ar' ? 'إنشاء تطبيقات أصلية ومجمعة عبر الأنظمة الأساسية لنظامي التشغيل iOS و Android.' : 'Creating intuitive, natively compiled applications for iOS and Android.'}</p>
              <Link href="/services#mobile" className="text-white font-semibold flex items-center gap-1 mt-auto">{lang === 'ar' ? 'اعرف المزيد' : 'Learn more'} <ArrowUpRight size={16}/></Link>
            </div>

            <div className="bento-card text-white" style={{ backgroundColor: 'var(--theme-primary)' }}>
               <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center mb-6">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{lang === 'ar' ? 'تسويق النمو' : 'Growth Marketing'}</h3>
              <p className="opacity-80 mb-16 text-white">{lang === 'ar' ? 'استراتيجيات مبنية على البيانات لتوسيع نطاق اكتساب المستخدمين والاحتفاظ بالعملاء.' : 'Data-driven strategies to scale user acquisition and customer retention.'}</p>
              <Link href="/services#marketing" className="text-white font-semibold flex items-center gap-1">{lang === 'ar' ? 'اعرف المزيد' : 'Learn more'} <ArrowUpRight size={16}/></Link>
            </div>

             <div className="md:col-span-2 bento-card flex flex-col justify-center items-center text-center p-12 bg-transparent border border-slate-200">
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'مدعوم من إنوفا' : 'Powered by Innova'}</h3>
                <p className="max-w-lg mb-8 opacity-80" style={{ color: 'var(--theme-text)' }}>Idarax • Drovo • Shukran</p>
                <Link href="/products" className="px-6 py-3 rounded-lg font-semibold transition border opacity-80 hover:opacity-100" style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-text)' }}>
                  {lang === 'ar' ? 'اكتشف المنظومة' : 'Explore The Ecosystem'}
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
