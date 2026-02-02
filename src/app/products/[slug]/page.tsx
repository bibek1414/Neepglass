'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useProduct, useProducts } from '@/hooks/use-product';
import ProductGallery from '@/components/shop/product-detail/ProductGallery';
import ProductDetails from '@/components/shop/product-detail/ProductDetails';
import ProductCard from '@/components/shop/ProductCard';
import { Star } from 'lucide-react';
import { ProductVariantRead } from '@/types/product';

function ProductDetailContent({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: product, isLoading: isProductLoading } = useProduct(slug);
  const [activeVariant, setActiveVariant] = useState<ProductVariantRead | null>(null);

  const { data: relatedData } = useProducts({
    category_id: product?.category?.id,
    page_size: 4
  });

  const relatedProducts = relatedData?.results?.filter(p => p.id !== product?.id).slice(0, 3) || [];

  if (isProductLoading) {
    return (
      <div className="container-custom py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-40 text-center">
        <h1 className="text-primary">Product Not Found</h1>
        <Link href="/products" className="text-secondary hover:underline mt-4 block">Return to Shop</Link>
      </div>
    );
  }

  // Calculate images to pass to gallery.
  // We pass all product images.
  const images = (product.images && product.images.length > 0)
    ? product.images.map(img => img.image)
    : (product.thumbnail_image ? [product.thumbnail_image] : []);

  // Hardcoded reviews from original file
  const reviews = [
    { name: "Anish T.", rating: 5, date: "2 weeks ago", text: "Excellent quality and very stylish. The fit is perfect for me." },
    { name: "Suman K.", rating: 4, date: "1 month ago", text: "Good sunglasses, delivery was fast. I would recommend NepGlass." }
  ];

  return (
    <div className="pb-20">
      <div className="container-custom pt-32">
        <Link href="/products" className="text-gray-500 text-sm flex items-center gap-2 mb-12 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Collection
        </Link>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
          <ProductGallery
            images={images}
            thumbnail={product.thumbnail_image}
            productName={product.name}
            activeImage={activeVariant?.image} // Pass variant image if selected
          />

          {/* Details */}
          <ProductDetails
            key={product.id}
            product={product}
            onVariantChange={(variant) => setActiveVariant(variant)}
          />
        </div>

        {/* Reviews Section */}
        <section className="mt-32 pt-20 border-t border-gray-100">
          <div className="max-w-3xl">
            <h2 className="text-primary mb-12">Customer Reviews</h2>
            <div className="space-y-12">
              {reviews.map((review, i) => (
                <div key={i} className="pb-10 border-b border-gray-50 last:border-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-primary mb-1">{review.name}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-secondary fill-secondary' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">&quot;{review.text}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-32 pt-20 border-t border-gray-100">
          <h2 className="text-primary mb-16">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={
      <div className="container-custom py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading product...</p>
      </div>
    }>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
