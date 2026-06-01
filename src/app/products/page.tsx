'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiService } from '@/services/api';
import { Product, Brand, Category } from '@/types/api';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import PageHeader from '@/components/ui/PageHeader';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    searchParams.get('brand') || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category') || null
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [inStockOnly, setInStockOnly] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    setSelectedBrand(searchParams.get('brand') || null);
    setSelectedCategory(searchParams.get('category') || null);
    setSearchQuery(searchParams.get('search') || '');
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const loadFilters = async () => {
      const [brandsData, categoriesData] = await Promise.all([
        apiService.getBrands(0, 50),
        apiService.getCategories(0, 50),
      ]);
      setBrands(brandsData.brands);
      setCategories(categoriesData.categories);
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const skip = (currentPage - 1) * itemsPerPage;
      const { products: loaded, hasMore: more, total: count } = await apiService.getProducts(
        skip,
        itemsPerPage,
        {
          brandId: selectedBrand || undefined,
          categoryId: selectedCategory || undefined,
          search: searchQuery || undefined,
          inStockOnly,
        }
      );
      setProducts(loaded);
      setHasMore(more);
      setTotal(count);
      setIsLoading(false);
    };
    loadProducts();
  }, [currentPage, selectedBrand, selectedCategory, searchQuery, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSearchQuery('');
    setInStockOnly(false);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  return (
    <>
      <PageHeader
        title="Products"
        description="Browse our full catalog of industrial components. Filter by brand, category, or search by MPN and SKU."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <div className="container-page py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilter
            brands={brands}
            categories={categories}
            selectedBrand={selectedBrand}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            inStockOnly={inStockOnly}
            onBrandChange={(b) => {
              setSelectedBrand(b);
              setCurrentPage(1);
            }}
            onCategoryChange={(c) => {
              setSelectedCategory(c);
              setCurrentPage(1);
            }}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            onInStockChange={(v) => {
              setInStockOnly(v);
              setCurrentPage(1);
            }}
            onResetFilters={handleResetFilters}
          />

          <div className="flex-1 min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-neutral">
                {total > 0 ? (
                  <>
                    Showing {(currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, total)} of {total} products
                  </>
                ) : (
                  'No products to display'
                )}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card h-80 animate-pulse bg-secondary/80" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn-ghost px-4 py-2 border border-neutral/20 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="px-4 text-sm font-medium text-neutral">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={!hasMore}
                    className="btn-ghost px-4 py-2 border border-neutral/20 disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              </>
            ) : (
              <div className="card text-center py-16 px-6">
                <svg className="w-16 h-16 text-neutral/25 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg font-semibold text-primary mb-2">No products found</p>
                <p className="text-neutral mb-6">Try adjusting your filters or search terms.</p>
                <button onClick={handleResetFilters} className="btn-primary px-6 py-2.5">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
