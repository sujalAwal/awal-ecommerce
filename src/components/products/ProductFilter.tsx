'use client';

import React, { useState } from 'react';
import { Brand, Category } from '@/types/api';

interface ProductFilterProps {
  brands: Brand[];
  categories: Category[];
  selectedBrand: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  inStockOnly: boolean;
  onBrandChange: (brand: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (query: string) => void;
  onInStockChange: (inStock: boolean) => void;
  onResetFilters: () => void;
}

export default function ProductFilter({
  brands,
  categories,
  selectedBrand,
  selectedCategory,
  searchQuery,
  inStockOnly,
  onBrandChange,
  onCategoryChange,
  onSearchChange,
  onInStockChange,
  onResetFilters,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveFilters = !!(selectedBrand || selectedCategory || searchQuery || inStockOnly);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full card p-4 flex items-center justify-between font-semibold text-primary"
      >
        <span>Filters {hasActiveFilters && <span className="text-accent">(active)</span>}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <aside
        className={`${isOpen ? 'block' : 'hidden'} lg:block lg:w-72 flex-shrink-0`}
      >
        <div className="card p-5 space-y-6 lg:sticky lg:top-24 bg-white hover:bg-primary/10 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-primary">Filters</h2>
            {hasActiveFilters && (
              <button type="button" onClick={onResetFilters} className="text-xs text-accent font-semibold hover:underline">
                Clear all
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">Search</label>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="MPN, SKU, title…"
              className="input-field text-sm"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-secondary/50">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="w-4 h-4 rounded border-neutral accent-accent"
            />
            <span className="text-sm font-medium">In stock only</span>
          </label>

          {categories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Categories</h3>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className={`flex items-center gap-2 cursor-pointer text-sm p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? 'bg-accent/10 text-accent' : 'hover:bg-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() =>
                        onCategoryChange(selectedCategory === category.id ? null : category.id)
                      }
                      className="sr-only"
                    />
                    <span className="truncate">{category.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {brands.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Brands</h3>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className={`flex items-center gap-2 cursor-pointer text-sm p-2 rounded-lg transition-colors ${
                      selectedBrand === brand.id ? 'bg-accent/10 text-accent' : 'hover:bg-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand.id}
                      onChange={() =>
                        onBrandChange(selectedBrand === brand.id ? null : brand.id)
                      }
                      className="sr-only"
                    />
                    <span className="truncate">{brand.title || brand.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
