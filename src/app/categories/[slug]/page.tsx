'use client';

import React from 'react';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useProducts } from '@/hooks/use-product';
import { useCategory } from '@/hooks/use-category';
import { Suspense } from 'react';

function CategoryContent({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: category, isLoading: isCategoryLoading } = useCategory(slug);
  const { data: productsData, isLoading: isProductsLoading } = useProducts({ category: slug });

  const products = productsData?.results || [];

  if (isCategoryLoading && !category) {
    return (
      <div className="container-custom py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading category...</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <Link href="/products" className="text-secondary text-sm font-bold flex items-center gap-2 mb-6 hover:underline">
            <ChevronLeft className="w-4 h-4" /> Back to All Products
          </Link>
          <h1 className="text-primary capitalize">{category?.name || slug}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mt-6">
            {category?.description || `Browse our curated selection of ${category?.name || slug}, designed for both style and performance.`}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container-custom">
          {isProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-[400px]" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-8">No products found in this category.</p>
              <Link href="/products">
                <button className="text-primary font-bold hover:underline">View all products</button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={
      <div className="container-custom py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading category...</p>
      </div>
    }>
      <CategoryContent params={params} />
    </Suspense>
  );
}
