'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Button from '../ui/BrandButton';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setIsDrawerOpen(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 "
    >
      {/* Image */}
      <div className="relative h-60 bg-gray-50 overflow-hidden">
        <img
          src={product.thumbnail_image || '/placeholder.png'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}


      <div className='px-4'>
        <div className="text-bold font-semibold text-primary leading-snug  mt-5">
          {product.name}
          <p className="text-sm text-primary font-light">
            Rs. {product.price}
          </p>
        </div>



        {/* CTA */}
        <div className="mt-auto mb-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full rounded-full transition-all active:scale-95"
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
