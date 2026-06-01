import React from 'react';
import { apiService } from '@/services/api';
import SectionHeading from '../ui/SectionHeading';
import BrandsGrid from './BrandsGrid';

export default async function BrandsSection() {
  const { brands } = await apiService.getBrands(0, 12);

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="section-padding ">
      <div className="container-page">
        <SectionHeading
          variant="minimal"
          eyebrow="Partners"
          title="Featured Brands"
          subtitle="Trusted by industry leaders worldwide"
          centered
        />

        <div className="rounded-3xl border border-neutral/10 bg-white p-5 shadow-card sm:p-8 lg:p-10">
          <BrandsGrid brands={brands} />
        </div>
      </div>
    </section>
  );
}
