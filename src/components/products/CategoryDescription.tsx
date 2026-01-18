"use client";

import { Category } from "@/types/product";

interface CategoryDescriptionProps {
    selectedCategory: string;
    categories: Category[];
}

export default function CategoryDescription({
    selectedCategory,
    categories,
}: CategoryDescriptionProps) {
    const category = categories.find((c) => c.slug === selectedCategory);

    if (!category || !category.description) return null;

    return (
        <div className="mt-20 py-16 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6">
                    In Depth: {category.name}
                </h2>
                <div className="text-xl sm:text-2xl text-slate-900 font-medium leading-relaxed italic decoration-primary/20 underline underline-offset-8">
                    &ldquo;{category.description}&rdquo;
                </div>
                <p className="mt-10 text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose max-w-2xl mx-auto">
                    Our {category.name} collection is curated with an unwavering commitment to quality and aesthetics. Each piece tells a story of heritage, innovation, and the pursuit of perfection.
                </p>
            </div>
        </div>
    );
}
