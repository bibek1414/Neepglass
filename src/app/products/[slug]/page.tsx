'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import Button from '@/components/ui/BrandButton';
import ProductCard from '@/components/shop/ProductCard';
import {
  ChevronLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useProduct, useProducts } from '@/hooks/use-product';
import { Suspense } from 'react';

function ProductDetailContent({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: product, isLoading: isProductLoading } = useProduct(slug);
  const { addToCart, setIsDrawerOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

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

  const reviews = [
    { name: "Anish T.", rating: 5, date: "2 weeks ago", text: "Excellent quality and very stylish. The fit is perfect for me." },
    { name: "Suman K.", rating: 4, date: "1 month ago", text: "Good sunglasses, delivery was fast. I would recommend NepGlass." }
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const images = (product.images && product.images.length > 0) ? product.images.map(img => img.image) : [product.thumbnail_image];

  return (
    <div className="pb-20">
      <div className="container-custom pt-32">
        <Link href="/products" className="text-gray-500 text-sm flex items-center gap-2 mb-12 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square border border-gray-100">
              <img
                src={images[selectedImage] || '/placeholder.png'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-secondary shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img || '/placeholder.png'} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="py-2">
            <div className="flex justify-between items-start mb-4">
              <p className="text-secondary font-bold uppercase tracking-widest text-xs">{product.category?.name}</p>
              {product.weight && <p className="text-xs text-gray-400 font-medium">Weight: {product.weight}</p>}
            </div>
            <h1 className="text-primary mt-0 mb-6">{product.name}</h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-secondary fill-secondary' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">(2 Customer Reviews)</span>
            </div>

            <p className="text-4xl font-bold text-primary mb-8">Rs. {product.price}</p>

            <div className="text-gray-600 mb-10 leading-relaxed text-lg prose prose-sm" dangerouslySetInnerHTML={{ __html: product.description || '' }} />

            {/* Quantity and CTA */}
            <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center mb-12">
              <div className="flex items-center border-2 border-gray-100 rounded-xl h-14 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-400 hover:text-primary transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-400 hover:text-primary transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <Button size="lg" className="flex-1 rounded-xl shadow-xl shadow-primary/10" onClick={handleAddToCart} disabled={isAdded}>
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-t border-b border-gray-100 mb-12">
              <div className="flex flex-col items-center text-center gap-3">
                <Truck className="w-6 h-6 text-secondary" />
                <span className="text-xs font-bold text-primary uppercase">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <RefreshCw className="w-6 h-6 text-secondary" />
                <span className="text-xs font-bold text-primary uppercase">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <ShieldCheck className="w-6 h-6 text-secondary" />
                <span className="text-xs font-bold text-primary uppercase">100% Authentic</span>
              </div>
            </div>

            {/* Specifications if any could be listed here from variants or metadata */}
          </div>
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
