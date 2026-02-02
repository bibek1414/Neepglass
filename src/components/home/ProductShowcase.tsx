'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/types/product';

interface ProductShowcaseProps {
    title: string;
    subtitle: string;
    products: Product[];
    isLoading?: boolean;
}

export default function ProductShowcase({ title, subtitle, products, isLoading }: ProductShowcaseProps) {
    return (
        <section className="bg-white py-12 md:py-20 border-b border-gray-50 last:border-0">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
                    <div>
                        <p className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">{subtitle}</p>
                        <h2 className="text-primary mt-0 mb-0 text-2xl md:text-4xl">{title}</h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors text-sm md:text-base">
                        View All Products <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-[250px] md:h-[400px]" />
                        ))
                    ) : (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
