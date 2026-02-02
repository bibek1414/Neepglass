'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Button from '../ui/BrandButton';
import { Product } from '@/types/product';
import Image from 'next/image';

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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] md:h-60 md:aspect-auto bg-gray-50 overflow-hidden">
        <Image
          
          src={product.thumbnail_image || '/placeholder.png'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className='px-3 md:px-4 flex flex-col flex-1 py-3 md:py-0'>
        <div className="text-bold font-semibold text-primary leading-snug mt-2 md:mt-5 text-sm md:text-base">
          <span className="line-clamp-2">{product.name}</span>
          <p className="text-xs md:text-sm text-primary font-light mt-1">
            Rs. {product.price}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-auto mb-1 md:mb-2 pt-3 md:pt-4">
          <Button
            variant="primary"
            size="sm"
            className="w-full rounded-full transition-all active:scale-95 text-xs md:text-sm py-1.5 md:py-2 h-auto"
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
