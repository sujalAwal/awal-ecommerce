import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { classNames } from '@/lib/utils';
import SectionHeading from '../ui/SectionHeading';

const bentoLayouts = [
  'col-span-2 row-span-2 min-h-[220px] sm:min-h-[300px]',
  'col-span-1 row-span-1 min-h-[130px] sm:min-h-[140px]',
  'col-span-1 row-span-1 min-h-[130px] sm:min-h-[140px]',
  'col-span-2 row-span-1 min-h-[130px] sm:min-h-[150px]',
  'col-span-1 row-span-1 min-h-[130px] sm:min-h-[140px]',
  'col-span-1 row-span-1 min-h-[130px] sm:min-h-[140px]',
];

export default async function CategoriesSection() {
  const { categories } = await apiService.getCategories(0, 6);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          variant="accent"
          eyebrow="Catalog"
          title="Shop by Category"
          subtitle="Jump straight into the product lines you need"
          viewAllHref="/categories"
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className={classNames(
                'group relative overflow-hidden rounded-2xl ring-1 ring-neutral/10',
                'transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover',
                bentoLayouts[index] ?? bentoLayouts[5]
              )}
            >
              <div className="absolute inset-0 bg-primary">
                {category.icon ? (
                  <Image
                    src={category.icon}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-primary/80">
                    <span className="text-5xl font-bold text-white/20 sm:text-6xl">
                      {category.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10 transition-opacity group-hover:via-primary/55" />
              </div>

              <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
                <span className="mb-2 inline-flex w-fit rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Explore
                </span>
                <h3 className="text-base font-bold leading-snug text-white sm:text-lg line-clamp-2">
                  {category.title}
                </h3>
                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-white/80 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-4px]">
                  View products
                  <span aria-hidden>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
