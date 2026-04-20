import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: {
    default: 'Innova | Software Engineering & Digital Transformation',
    template: '%s | Innova'
  },
  description: 'Innova builds robust enterprise architectures, powering brands like Idarax, Drovo, and Shukran.',
  keywords: ['software engineering', 'digital transformation', 'enterprise architecture', 'web development', 'mobile apps'],
  authors: [{ name: 'Innova Tech' }],
  creator: 'Innova Tech',
  publisher: 'Innova Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Innova | Software Engineering & Digital Transformation',
    description: 'Innova builds robust enterprise architectures, powering brands like Idarax, Drovo, and Shukran.',
    url: 'https://innova.dev',
    siteName: 'Innova Tech',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Innova Tech - Digital Excellence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innova Tech',
    description: 'Powering Digital Transformation.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
  let initialTheme = { 
    primaryColor: '#2563eb', 
    primaryButtonTextColor: '#ffffff',
    textColor: '#0f172a', 
    sectionBgColor: '#f8fafc', 
    sectionBgColorAlt: '#ffffff',
    borderColor: '#e2e8f0',
    sidebarBgColor: '#ffffff',
    logoUrl: null as string | null,
    facebookUrl: null as string | null,
    twitterUrl: null as string | null,
    instagramUrl: null as string | null,
    linkedinUrl: null as string | null,
    youtubeUrl: null as string | null,
    tiktokUrl: null as string | null
  };
  try {
    const res = await fetch('http://localhost:3000/api/theme', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      initialTheme = {
        primaryColor: data.primaryColor || '#2563eb',
        primaryButtonTextColor: data.primaryButtonTextColor || '#ffffff',
        textColor: data.textColor || '#0f172a',
        sectionBgColor: data.sectionBgColor || '#f8fafc',
        sectionBgColorAlt: data.sectionBgColorAlt || '#ffffff',
        borderColor: data.borderColor || '#e2e8f0',
        sidebarBgColor: data.sidebarBgColor || '#ffffff',
        logoUrl: data.logoUrl || null,
        facebookUrl: data.facebookUrl || null,
        twitterUrl: data.twitterUrl || null,
        instagramUrl: data.instagramUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        youtubeUrl: data.youtubeUrl || null,
        tiktokUrl: data.tiktokUrl || null
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
