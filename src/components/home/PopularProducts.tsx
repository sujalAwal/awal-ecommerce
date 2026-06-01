import React from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';
import ProductCarousel from '../products/ProductCarousel';
import SectionHeading from '../ui/SectionHeading';

export default async function PopularProducts() {
  const { products } = await apiService.getProducts(0, 16);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -skew-y-2 origin-top-left scale-110 bg-primary/60"
      />

      <div className="container-page relative">
        <SectionHeading
          variant="accent"
          eyebrow="Bestsellers"
          title="Popular Products"
          subtitle="B2B favorites — in stock and ready to ship"
          viewAllHref="/products"
          viewAllLabel="View all products"
        />

        <ProductCarousel products={products} gapPx={24} />

        <div className="mt-8 text-center sm:hidden">
          <Link href="/products" className="btn-primary px-8 py-3">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
