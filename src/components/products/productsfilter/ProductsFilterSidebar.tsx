"use client";

import { useState, useRef } from "react";
import { RotateCcw, Loader2, ChevronRight } from "lucide-react";
import {
    Category,
    SubCategory,
} from "@/types/product";
import { useSubCategories } from "@/hooks/use-subcategory";
import PriceRangeSlider from "../PriceRangeSlider";

interface PriceRange {
    min: number;
    max: number;
}

interface ProductsFilterSidebarProps {
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedSubcategory: string;
    setSelectedSubcategory: (value: string) => void;
    priceRange: PriceRange;
    setPriceRange: (value: PriceRange) => void;
    categories: Category[];
    handleClearAll: () => void;
    isFiltering?: boolean;
}

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

export default function ProductsFilterSidebar({
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    priceRange,
    setPriceRange,
    categories,
    handleClearAll,
    isFiltering = false,
}: ProductsFilterSidebarProps) {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

    const { data: subcategoriesData, isLoading: isLoadingSubcategories } =
        useSubCategories(hoveredCategory ? { category: hoveredCategory } : undefined);

    const handleMouseEnter = (categorySlug: string) => {
        if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
        setHoveredCategory(categorySlug);
    };

    const handleMouseLeave = () => {
        leaveTimeout.current = setTimeout(() => {
            setHoveredCategory(null);
        }, 200);
    };

    const handleSelectCategory = (categorySlug: string) => {
        setSelectedCategory(categorySlug);
        setSelectedSubcategory("all");
        setHoveredCategory(null);
    };

    const handleSelectSubcategory = (subcategorySlug: string) => {
        if (hoveredCategory) setSelectedCategory(hoveredCategory);
        setSelectedSubcategory(subcategorySlug);
        setHoveredCategory(null);
    };

    const renderSkeleton = (count = 5) => (
        <div className="py-2 px-1">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="px-3 py-2">
                    <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div
            className="sticky p-6  bg-white rounded-3xl border border-gray-100 shadow-sm top-24"
            onMouseLeave={handleMouseLeave}
        >
            <div className="mb-10">
                <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-widest">Categories</h2>
                <div className="space-y-1">
                    <button
                        onClick={() => handleSelectCategory("all")}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === "all"
                            ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                            : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <div
                            key={category.slug}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(category.slug)}
                        >
                            <button
                                onClick={() => handleSelectCategory(category.slug)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${selectedCategory === category.slug
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span>{category.name}</span>
                                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${hoveredCategory === category.slug ? 'translate-x-0.5' : ''}`} />
                            </button>
                            {hoveredCategory === category.slug && (
                                <div
                                    className="absolute left-[calc(100%+0.5rem)] top-0 w-64 z-[50] bg-white rounded-2xl shadow-2xl border border-gray-100 p-2"
                                    onMouseEnter={() => handleMouseEnter(category.slug)}
                                >
                                    {isLoadingSubcategories ? (
                                        renderSkeleton()
                                    ) : subcategoriesData?.results && subcategoriesData.results.length > 0 ? (
                                        <div className="space-y-0.5">
                                            {subcategoriesData.results.map(
                                                (subcategory: SubCategory) => (
                                                    <button
                                                        key={subcategory.slug}
                                                        onClick={() =>
                                                            handleSelectSubcategory(subcategory.slug)
                                                        }
                                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-gray-50 ${selectedSubcategory === subcategory.slug
                                                            ? "text-primary bg-primary/5"
                                                            : "text-gray-600"
                                                            }`}
                                                    >
                                                        {subcategory.name}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">No Subcategories</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <h3 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-widest">Price Filter</h3>
                <PriceRangeSlider
                    value={priceRange}
                    onChange={setPriceRange}
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    primaryColor="#0f172a"
                />
            </div>

            <div className="pt-6 border-t border-gray-100">
                <button
                    onClick={handleClearAll}
                    className="flex items-center justify-center w-full gap-2 px-4 py-3 text-xs font-bold text-gray-700 transition-all bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-[0.98]"
                >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset All
                </button>
                {isFiltering && (
                    <div className="flex items-center justify-center gap-2 pt-4 text-[10px] font-bold text-primary uppercase tracking-widest">
                        <Loader2 className="w-3 h-3 animate-spin" /> Updating Results
                    </div>
                )}
            </div>
        </div>
    );
}
