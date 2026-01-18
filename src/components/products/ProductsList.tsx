"use client";

import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface SortOption {
    value: string;
    label: string;
}

interface ProductsListProps {
    products: Product[];
    loading: boolean;
    sortBy: string;
    setSortBy: (value: string) => void;
    sortOptions: SortOption[];
}

export default function ProductsList({
    products,
    loading,
    sortBy,
    setSortBy,
    sortOptions,
}: ProductsListProps) {
    return (
        <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Sort By:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 sm:w-48 bg-gray-50 border-none rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-slate-900/5 transition-all outline-none cursor-pointer appearance-none"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-8 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Found <span className="text-slate-900">{products.length}</span> Masterpieces
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <Skeleton key={i} className="rounded-[2.5rem] bg-gray-50 aspect-[4/5]" />
                    ))}
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl text-gray-200">
                        <Loader2 size={40} className="animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Selection Exhausted</h3>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto text-sm leading-relaxed">We couldn&apos;t find items matching your current filters. Try broadening your horizons.</p>
                </div>
            )}
        </div>
    );
}
