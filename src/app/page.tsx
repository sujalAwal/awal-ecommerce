import React from 'react';
import { Metadata } from 'next';
import BannerCarousel from '@/components/home/BannerCarousel';
import BrandsSection from '@/components/home/BrandsSection';
import PopularProducts from '@/components/home/PopularProducts';
import CategoriesSection from '@/components/home/CategoriesSection';
import HomeCta from '@/components/home/HomeCta';
import TrustBar from '@/components/ui/TrustBar';

export const metadata: Metadata = {
  title: 'Home | Awal Ecommerce - Industrial Products Marketplace',
  description:
    'Discover premium industrial switchgears, machinery components, and technical products for B2B buyers with fast delivery and competitive pricing.',
  keywords: ['industrial products', 'switchgears', 'machinery', 'B2B', 'wholesale'],
};

export default function HomePage() {
  return (
    <>
      <div className="container-page pt-6 sm:pt-8 pb-2">
        <BannerCarousel />
      </div>

      <TrustBar />

      <CategoriesSection />

      <PopularProducts />

      <BrandsSection />

      <HomeCta />
    </>
  );
}
