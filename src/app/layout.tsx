import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { apiService } from '@/services/api';
import RootLayoutClient from '@/components/layout/RootLayoutClient';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Awal Ecommerce - Industrial Products',
  description: 'Premium industrial and technical products for B2B buyers',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://awal-ecommerce.com',
    siteName: 'Awal Ecommerce',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Server-side: Fetch settings and inject as CSS variables
async function getSettings() {
  try {
    return await apiService.getSettings();
  } catch (error) {
    console.error('Failed to load settings:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  // Parse colors from hex to RGB
  const parseColor = (hex: string): string => {
    if (!hex) return '0 0 0';
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r} ${g} ${b}`;
    }
    return '0 0 0';
  };

  const cssVariables = {
    '--color-primary': parseColor(settings?.primary_color || '#000000'),
    '--color-secondary': parseColor(settings?.secondary_color || '#F3F3F3'),
    '--color-accent': parseColor(settings?.accent_color || '#FF6B35'),
    '--color-neutral': parseColor(settings?.neutral_color || '#808080'),
    '--font-family': settings?.font_family || `var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
  } as React.CSSProperties;

  return (
    <html lang="en" className={inter.variable} style={cssVariables}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={settings?.primary_color || '#000000'} />
        {settings?.favicon && (
          <link rel="icon" href={settings.favicon} type="image/png" />
        )}
      </head>
      <body>
        <RootLayoutClient settings={settings}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
