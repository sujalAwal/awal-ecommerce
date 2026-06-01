'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/api';
import { useCartStore } from '@/stores';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const inStock = product.in_stock !== false;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-card-hover">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative m-3 mb-0 aspect-square overflow-hidden rounded-xl bg-secondary/60">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-12 w-12 text-neutral/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {product.in_stock !== undefined && (
            <span
              className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                product.in_stock
                  ? 'bg-white/95 text-green-700 shadow-sm'
                  : 'bg-white/95 text-red-600 shadow-sm'
              }`}
            >
              {product.in_stock ? 'In stock' : 'Out of stock'}
            </span>
          )}

          <span className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-md">
              View details
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 pt-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors group-hover:text-accent sm:text-base">
            {product.title}
          </h3>

          {(product.sku || product.mpn) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.mpn && (
                <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-neutral">
                  MPN {product.mpn}
                </span>
              )}
              {product.sku && (
                <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-neutral">
                  SKU {product.sku}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-end justify-between gap-2 border-t border-neutral/10 pt-3">
            <p className="text-lg font-bold text-primary">{formatPrice(price)}</p>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral">B2B price</span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
            isAdded
              ? 'bg-green-600 text-white'
              : inStock
                ? 'bg-primary text-white hover:bg-primary/90 active:scale-[0.98]'
                : 'cursor-not-allowed bg-neutral/10 text-neutral'
          }`}
        >
          {isAdded ? (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to cart
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
