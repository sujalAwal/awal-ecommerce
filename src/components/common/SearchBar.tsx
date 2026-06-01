'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search MPN, SKU, products…"
          className="input-field pr-11 py-2.5 text-sm"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-neutral hover:text-accent hover:bg-accent/10 transition-colors"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
