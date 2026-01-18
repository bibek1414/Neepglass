"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { useProductsFilter } from "@/hooks/useProductsFilter";
import ProductsFilterSidebar from "@/components/products/productsfilter/ProductsFilterSidebar";
import MobileFilterPanel from "@/components/products/productsfilter/MobileFilterPanel";
import ProductsList from "@/components/products/ProductsList";
import Pagination from "@/components/ui/pagination-custom";
import CategoryDescription from "@/components/products/CategoryDescription";
import AppliedFilters from "@/components/products/productsfilter/AppliedFilters";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

export default function ProductListingContent() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const {
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        categories,
        subcategories,
        products,
        loading,
        sortOptions,
        handleClearAll,
        handleClearSearch,
        isFiltering,
        currentPage,
        totalPages,
        handlePageChange,
    } = useProductsFilter();

    return (
        <div className="min-h-screen bg-white">
            <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 lg:flex-row">
                    <aside className="hidden lg:block lg:w-80 flex-shrink-0 lg:sticky lg:top-24 self-start z-20">
                        <div className="space-y-8">
                            <AppliedFilters
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                categories={categories}
                                selectedSubcategory={selectedSubcategory}
                                setSelectedSubcategory={setSelectedSubcategory}
                                subcategories={subcategories}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                handleClearAll={handleClearAll}
                                minPrice={MIN_PRICE}
                                maxPrice={MAX_PRICE}
                                searchQuery={searchQuery}
                                handleClearSearch={handleClearSearch}
                            />

                            <ProductsFilterSidebar
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                selectedSubcategory={selectedSubcategory}
                                setSelectedSubcategory={setSelectedSubcategory}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                categories={categories}
                                handleClearAll={handleClearAll}
                                isFiltering={isFiltering}
                            />
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-8 lg:hidden">
                            <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter">Collections</h2>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm shadow-xl shadow-primary/10 active:scale-95 transition-all"
                            >
                                <Filter className="w-4 h-4" />
                                Refine
                            </button>
                        </div>

                        <div className="hidden lg:block mb-12">
                            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">Curated Selection</span>
                            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase">The Collections</h1>
                        </div>

                        <ProductsList
                            products={products}
                            loading={loading}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            sortOptions={sortOptions}
                        />

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </main>
                </div>
            </div>

            <MobileFilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                subcategories={subcategories}
                sortOptions={sortOptions}
                handleClearAll={handleClearAll}
                handleClearSearch={handleClearSearch}
                isFiltering={isFiltering}
            />

            <CategoryDescription
                selectedCategory={selectedCategory}
                categories={categories}
            />
        </div>
    );
}
