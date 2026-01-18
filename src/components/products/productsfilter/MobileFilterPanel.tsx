"use client";

import { Search, X, RotateCcw, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProductCategory, ProductSubcategory } from "@/types/product";

interface PriceRange {
    min: number;
    max: number;
}

interface SortOption {
    value: string;
    label: string;
}

interface MobileFilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedSubcategory: string;
    setSelectedSubcategory: (value: string) => void;
    priceRange: PriceRange;
    setPriceRange: (value: PriceRange) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    categories: ProductCategory[];
    subcategories: ProductSubcategory[];
    sortOptions: SortOption[];
    handleClearAll: () => void;
    handleClearSearch: () => void;
    isFiltering?: boolean;
}

export default function MobileFilterPanel({
    isOpen,
    onClose,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    categories,
    subcategories,
    sortOptions,
    handleClearAll,
    handleClearSearch,
    isFiltering = false,
}: MobileFilterPanelProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set([selectedCategory])
    );

    const toggleCategoryExpansion = (categorySlug: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categorySlug)) {
            newExpanded.delete(categorySlug);
        } else {
            newExpanded.add(categorySlug);
        }
        setExpandedCategories(newExpanded);
    };

    const handleCategoryClick = (categorySlug: string) => {
        if (categorySlug === selectedCategory) {
            toggleCategoryExpansion(categorySlug);
        } else {
            setSelectedCategory(categorySlug);
            if (categorySlug !== "all") {
                setExpandedCategories(new Set([categorySlug]));
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Search</h3>
                            {searchQuery && (
                                <button onClick={handleClearSearch} className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                                    <X className="w-3 h-3" /> Clear
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-2.5 pl-9 pr-4 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                            <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
                            {isFiltering && <Loader2 className="absolute w-4 h-4 text-primary right-3 top-3 animate-spin" />}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-sm font-bold text-gray-900 uppercase tracking-wider">Sort By</h3>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white cursor-pointer"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="mb-2 text-sm font-bold text-gray-900 uppercase tracking-wider">Categories</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => handleCategoryClick("all")}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === "all" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                            >
                                All Categories
                            </button>
                            {categories.map((category) => (
                                <div key={category.slug}>
                                    <button
                                        onClick={() => handleCategoryClick(category.slug)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${selectedCategory === category.slug ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                                    >
                                        <span>{category.name}</span>
                                        {selectedCategory === category.slug && subcategories.length > 0 && (expandedCategories.has(category.slug) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
                                    </button>
                                    {selectedCategory === category.slug && expandedCategories.has(category.slug) && subcategories.length > 0 && (
                                        <div className="mt-2 ml-4 space-y-1 border-l-2 border-primary/20 pl-4 py-1">
                                            {subcategories.map((subcategory) => (
                                                <button
                                                    key={subcategory.slug}
                                                    onClick={() => setSelectedSubcategory(subcategory.slug)}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedSubcategory === subcategory.slug ? "bg-primary/10 text-primary font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                                                >
                                                    {subcategory.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-sm font-bold text-gray-900 uppercase tracking-wider">Price Range</h3>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Min</span>
                                    <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase">Max</span>
                                    <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <button onClick={handleClearAll} className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-gray-700 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-100 active:scale-[0.98]">
                        <RotateCcw className="w-4 h-4" /> Reset All Filters
                    </button>
                    {isFiltering && (
                        <div className="flex items-center justify-center gap-2 text-[10px] text-primary font-bold uppercase tracking-widest pt-3">
                            <Loader2 className="w-3 h-3 animate-spin" /> Refreshing Results
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
