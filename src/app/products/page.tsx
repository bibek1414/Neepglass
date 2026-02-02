'use client';

import React from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { Filter } from 'lucide-react';
import { useProducts, useUpdateFilters, useProductFilters } from '@/hooks/use-product';
import { useCategories } from '@/hooks/use-category';
import { Suspense } from 'react';

function ProductsContent() {
  const filters = useProductFilters();
  const { updateFilters } = useUpdateFilters();
  const { data: categoriesData } = useCategories();
  const { data: productsData, isLoading } = useProducts();

  const categories = categoriesData?.results || [];
  const products = productsData?.results || [];

  const activeCategory = filters.category || 'all';
  const sortBy = filters.sortBy || 'featured';

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      updateFilters({ category: undefined });
    } else {
      updateFilters({ category: slug });
    }
  };

  const handleSortChange = (value: string) => {
    if (value === 'low') {
      updateFilters({ sortBy: 'price', sortOrder: 'asc' });
    } else if (value === 'high') {
      updateFilters({ sortBy: 'price', sortOrder: 'desc' });
    } else {
      updateFilters({ sortBy: undefined, sortOrder: undefined });
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary">Our Collections</h1>
          <p className="text-xl text-gray-600 max-w-2xl mt-6">
            Explore our curated selection of premium eyewear, from timeless classics to modern trends.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12">
        <div className="container-custom">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all border ${
                  activeCategory === 'all'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all border whitespace-nowrap ${
                    activeCategory === cat.slug
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Sort by:
              </span>
              <select
                value={sortBy === 'price' ? (filters.sortOrder === 'asc' ? 'low' : 'high') : 'featured'}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
               Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-[400px]" />
              ))
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {!isLoading && products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading products...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
