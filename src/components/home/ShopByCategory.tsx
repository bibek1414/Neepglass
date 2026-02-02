'use client';

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useCategories } from "@/hooks/use-category";

export default function ShopByCategory() {
    const { data: categoriesData, isLoading } = useCategories();
    const categories = categoriesData?.results || [];

    return (
        <section className="bg-gray-50 py-24">
            <div className="container-custom">
                <h2 className="text-center mb-16 text-primary">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-[450px]" />
                        ))
                    ) : (
                        categories.map((cat) => (
                            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="group relative overflow-hidden rounded-2xl h-[450px]">
                                <img src={cat.image || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600'} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-10">
                                    <h3 className="text-white mb-2">{cat.name}</h3>
                                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore Collection <ChevronRight className="inline w-4 h-4" /></p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}