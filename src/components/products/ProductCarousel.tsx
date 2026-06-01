'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '@/lib/utils';
import type { Product } from '@/types/api';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  products: Product[];
  gapPx?: number;
}

function getVisibleCount(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function ProductCarousel({ products, gapPx = 20 }: ProductCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateVisible = () => setVisibleCount(getVisibleCount(window.innerWidth));

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const node = viewportRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.clientWidth;
      const gaps = gapPx * Math.max(0, visibleCount - 1);
      setItemWidth(Math.max(0, (width - gaps) / visibleCount));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, visibleCount, gapPx]);

  const maxPage = Math.max(0, products.length - visibleCount);
  const canGoPrev = page > 0;
  const canGoNext = page < maxPage;
  const slideStep = itemWidth + gapPx;
  const trackOffset = page * slideStep;
  const showNav = mounted && products.length > visibleCount;

  useEffect(() => {
    setPage((current) => Math.min(current, maxPage));
  }, [maxPage]);

  const goPrev = useCallback(() => {
    setPage((p) => Math.max(0, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setPage((p) => Math.min(maxPage, p + 1));
  }, [maxPage]);

  return (
    <div>
      <div ref={viewportRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: gapPx,
            transform: itemWidth > 0 ? `translateX(-${trackOffset}px)` : undefined,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0" style={{ width: itemWidth > 0 ? itemWidth : '100%' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {showNav && (
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous products"
            className={classNames(
              'flex h-11 w-11 items-center justify-center rounded-full transition-all',
              'bg-primary text-white shadow-md',
              'hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary'
            )}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next products"
            className={classNames(
              'flex h-11 w-11 items-center justify-center rounded-full transition-all',
              'bg-white text-primary shadow-md ring-1 ring-neutral/10',
              'hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
