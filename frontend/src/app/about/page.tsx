'use client';
import { Building2, Users, Target } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function About() {
  const { lang, theme } = useAppContext();

  return (
    <div className="py-24 px-6 min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar' ? 'نبني الأدوات التي تبني المستقبل.' : 'Building the tools that build the future.'}
            </h1>
            <p className="text-lg opacity-80 mb-6 leading-relaxed" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar' 
                ? 'إنوفا هي أكثر من مجرد وكالة برمجيات؛ نحن شريك تكنولوجي وحاضنة منتجات. مهمتنا هي هندسة حلول برمجية قوية وقابلة للتطوير وبديهية تمكن الشركات من التوسع بلا حدود.'
                : 'Innova is more than a software agency; we are a technology partner and product incubator. Our mission is to engineer highly robust, scalable, and intuitive software solutions that empower businesses to scale without limits.'}
            </p>
            <p className="text-lg opacity-80 leading-relaxed" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar'
                ? 'من نظام نقاط البيع الشامل الخاص بنا Idarax إلى ابتكارات التوصيل المحلي مثل Drovo، كل ما نبنيه مدفوع بفهم عميق لاحتياجات المؤسسات والتميز التكنولوجي.'
                : 'From our flagship omnichannel POS system Idarax to local delivery innovations like Drovo, everything we build is driven by a deep understanding of enterprise needs and technological excellence.'}
            </p>
          </div>
          <div className="rounded-3xl p-12 aspect-square flex flex-col justify-center border" style={{ backgroundColor: 'var(--theme-section-alt)', borderColor: 'var(--theme-primary)' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}</h3>
            <p className="leading-relaxed italic opacity-80" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar'
                ? '"أن نكون البنية الأساسية للتحول الرقمي، ندمج بسلاسة بين الذكاء الاصطناعي والتجارة والتفاعل البشري."'
                : '"To be the underlying architecture of digital transformation, seamlessly integrating AI, commerce, and human interaction."'}
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'المبادئ الأساسية' : 'Core Principles'}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border border-slate-200 rounded-2xl bg-white text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
              <Building2 size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'مقياس المؤسسات' : 'Enterprise Scale'}</h4>
            <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'مصممة للتعامل مع الأحمال الهائلة بموثوقية لا هوادة فيها.' : 'Built to handle massive throughput with uncompromising reliability.'}</p>
          </div>
          <div className="p-8 border border-slate-200 rounded-2xl bg-white text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
              <Users size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'محورها المستخدم' : 'User Centric'}</h4>
            <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'أنظمة معقدة مقدمة من خلال واجهات بسيطة وجميلة.' : 'Complex systems presented through intuitive, beautiful interfaces.'}</p>
          </div>
          <div className="p-8 border border-slate-200 rounded-2xl bg-white text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
              <Target size={24} />
            </div>
            <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'الذكاء الاصطناعي متقدم' : 'AI Forward'}</h4>
            <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'تضمين الذكاء في الصميم لأتمتة العمليات وتحسينها.' : 'Embedding intelligence at the core to automate and optimize processes.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
