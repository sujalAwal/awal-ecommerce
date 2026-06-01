'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { classNames } from '@/lib/utils';
import type { Brand } from '@/types/api';

interface BrandsGridProps {
  brands: Brand[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-6"
    >
      {brands.map((brand, index) => (
        <Link
          key={brand.id}
          href={`/products?brand=${brand.id}`}
          title={brand.description || brand.title}
          className={classNames(
            'group relative overflow-hidden rounded-2xl border border-neutral/10 bg-white p-4 sm:p-5 lg:p-6',
            'shadow-card transition-all duration-500 ease-out',
            'hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-card-hover',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{
            transitionDelay: isVisible ? `${Math.min(index * 70, 560)}ms` : '0ms',
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
          >
            <span className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
            <span className="brand-shine absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </span>

          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2 sm:gap-3">
            {brand.logo ? (
              <>
                <div className="relative h-12 w-full shrink-0 overflow-hidden rounded-lg sm:h-14 md:h-16 lg:h-20 xl:h-24">
                  <Image
                    src={brand.logo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, (max-width: 1280px) 20vw, 14vw"
                    className={classNames(
                      'rounded-lg object-contain object-center transition-all duration-500',
                      'grayscale-[35%] opacity-85 group-hover:grayscale-0 group-hover:opacity-100',
                      'group-hover:scale-110 motion-reduce:group-hover:scale-100'
                    )}
                  />
                </div>
                <p className="line-clamp-2 w-full px-1 text-center text-xs font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-accent sm:text-sm">
                  {brand.title || brand.name}
                </p>
              </>
            ) : (
              <span className="px-2 py-4 text-center text-sm font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-accent sm:text-base lg:text-lg">
                {brand.title || brand.name}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
