'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Contact() {
  const { lang, theme } = useAppContext();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message')
    };

    try {
      const res = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="py-24 px-6 min-h-[calc(100vh-80px)] flex items-center" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar' ? 'دعنا نبدأ المحادثة.' : "Let's start the conversation."}
            </h1>
            <p className="text-lg opacity-80 mb-12 max-w-md" style={{ color: 'var(--theme-text)' }}>
               {lang === 'ar'
                 ? 'سواء كنت ترغب في تنفيذ Idarax، أو بناء حل مؤسس مخصص، أو مناقشة فرص الشراكة، فريقنا مستعد للمساعدة.'
                 : 'Whether you want to implement Idarax, build a custom enterprise solution, or discuss partnership opportunities, our team is ready to help.'}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'تواصل عبر البريد' : 'Email Us'}</h4>
                  <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>hello@innova.dev</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'اتصل بنا' : 'Call Us'}</h4>
                  <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>+1 (800) 555-0199</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--theme-primary)', color: '#fff' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'قم بزيارتنا' : 'Visit Us'}</h4>
                  <p className="opacity-80" style={{ color: 'var(--theme-text)' }}>123 Innovation Drive<br/>Tech Hub, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 rounded-3xl border shadow-xl shadow-black/5" style={{ backgroundColor: 'var(--theme-section-alt)', borderColor: 'var(--theme-border)' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-text)' }}>
              {lang === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
            </h3>
            
            {status === 'success' && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200">
                {lang === 'ar' ? 'تم إرسال الرسالة بنجاح! سنعود للتواصل معك قريباً.' : "Messages sent successfully! We'll get back to you shortly."}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'الاسم *' : 'Name *'}</label>
                  <input required name="name" type="text" className="w-full px-4 py-3 border rounded-lg focus:outline-none transition" style={{ backgroundColor: 'var(--theme-section-bg)', borderColor: 'rgba(0,0,0,0.1)', color: 'var(--theme-text)' }} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 border rounded-lg focus:outline-none transition" style={{ backgroundColor: 'var(--theme-section-bg)', borderColor: 'rgba(0,0,0,0.1)', color: 'var(--theme-text)' }} placeholder="john@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'الشركة' : 'Company'}</label>
                <input name="company" type="text" className="w-full px-4 py-3 border rounded-lg focus:outline-none transition" style={{ backgroundColor: 'var(--theme-section-bg)', borderColor: 'rgba(0,0,0,0.1)', color: 'var(--theme-text)' }} placeholder="Your Company" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>{lang === 'ar' ? 'الرسالة *' : 'Message *'}</label>
                <textarea required name="message" rows={4} className="w-full px-4 py-3 border rounded-lg focus:outline-none transition resize-none" style={{ backgroundColor: 'var(--theme-section-bg)', borderColor: 'rgba(0,0,0,0.1)', color: 'var(--theme-text)' }} placeholder={lang === 'ar' ? 'أخبرنا عن مشروعك...' : 'Tell us about your project...'}></textarea>
              </div>
              <button disabled={status === 'loading'} type="submit" className="w-full py-4 font-bold rounded-lg disabled:opacity-50 transition flex items-center justify-center gap-2 hover:opacity-90" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}>
                {status === 'loading' ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : <>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'} <Send size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
