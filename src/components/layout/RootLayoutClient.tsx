'use client';

import React, { useEffect } from 'react';
import { useCartStore, useThemeStore } from '@/stores';
import { SettingsResponse } from '@/types/api';
import Navbar from './Navbar';
import Footer from './Footer';

interface RootLayoutClientProps {
  children: React.ReactNode;
  settings: SettingsResponse | null;
}

export default function RootLayoutClient({
  children,
  settings,
}: RootLayoutClientProps) {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (settings) {
      setTheme({
        colors: {
          primary: (settings.primary_color as string) || '#E65F00',
          secondary: (settings.secondary_color as string) || '#22252A',
          accent: (settings.accent_color as string) || '#00A8E8',
          neutral: (settings.neutral_color as string) || '#808080',
        },
        fontFamily: (settings.font_family_body as string) || 'Inter, sans-serif',
        logo: (settings.primary_logo as string) || '',
        favicon: (settings.favicon as string) || '',
        companyName: (settings.store_name as string) || 'Electromech Switchgears',
      });
    }
  }, [settings, setTheme]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
