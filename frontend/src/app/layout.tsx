import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Innova | Software Engineering & Digital Transformation',
  description: 'Innova builds robust enterprise architectures, powering brands like Idarax, Drovo, and Shukran.',
};

import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { FooterClient } from '@/components/FooterClient';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch initial theme settings
  let initialTheme = { primaryColor: '#2563eb', textColor: '#0f172a', sectionBgColor: '#f8fafc', sectionBgColorAlt: '#ffffff', logoUrl: null as string | null };
  try {
    const res = await fetch('http://localhost:3000/api/theme', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      initialTheme = {
        primaryColor: data.primaryColor || '#2563eb',
        textColor: data.textColor || '#0f172a',
        sectionBgColor: data.sectionBgColor || '#f8fafc',
        sectionBgColorAlt: data.sectionBgColorAlt || '#ffffff',
        logoUrl: data.logoUrl || null,
      };
    }
  } catch (e) {
    console.error("Failed to load theme", e);
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col pt-20 transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
        <AppProvider initialTheme={initialTheme}>
          <Header />
          <main className="flex-1">{children}</main>
          <FooterClient />
        </AppProvider>
      </body>
    </html>
  );
}
