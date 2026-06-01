'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores';
import { formatPrice } from '@/lib/utils';
import PageHeader from '@/components/ui/PageHeader';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Shopping Cart" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
        <div className="container-page py-16 sm:py-24 text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-neutral/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h2>
          <p className="text-neutral mb-8 max-w-md mx-auto">
            Browse our catalog and add industrial components to get started.
          </p>
          <Link href="/products" className="btn-primary px-8 py-3">
            Start Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Shopping Cart"
        description={`${items.length} item${items.length !== 1 ? 's' : ''} in your cart`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]}
      />

      <div className="container-page py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
              const itemTotal = price * item.quantity;

              return (
                <div key={item.id} className="card p-4 sm:p-5 flex gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-secondary">
                    {item.thumbnail_url ? (
                      <Image
                        src={item.thumbnail_url}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-neutral/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`} className="font-semibold text-primary hover:text-accent line-clamp-2 transition-colors">
                      {item.title}
                    </Link>
                    {item.mpn && <p className="text-xs text-neutral font-mono mt-0.5">MPN: {item.mpn}</p>}
                    <p className="text-base font-bold text-primary mt-2">{formatPrice(price)}</p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-9 h-9 rounded-lg border border-neutral/20 hover:bg-secondary font-medium"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-14 text-center input-field py-1.5"
                        aria-label="Quantity"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-lg border border-neutral/20 hover:bg-secondary font-medium"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                    <p className="font-bold text-primary">{formatPrice(itemTotal)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit lg:sticky lg:top-24">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-primary mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5 pb-5 border-b border-neutral/10 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral">Line items</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">Total quantity</span>
                  <span className="font-medium">{items.reduce((s, i) => s + i.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">Shipping</span>
                  <span className="text-neutral">At checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-accent">{formatPrice(getTotalPrice)}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full py-3 mb-3">
                Proceed to Checkout
              </Link>
              <Link href="/products" className="btn-outline w-full py-3">
                Continue Shopping
              </Link>

              <p className="text-xs text-neutral text-center mt-4">
                Secure checkout · Guest checkout available
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
