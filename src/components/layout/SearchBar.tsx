"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";
import {
    useSearchProducts,
    useSuggestedProducts,
} from "@/hooks/use-search-products";
import Image from "next/image";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchResults {
    results: Product[];
}

interface SearchBarProps {
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    className = "",
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Truncate text function
    const truncateText = (text: string, maxLength: number = 30): string => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    // Generate product URL
    const getProductUrl = (product: Product): string => {
        return `/collections/${product.slug}`;
    };

    // Handle product click navigation
    const handleProductClick = (product: Product): void => {
        closeSearchResults();
        const productUrl = getProductUrl(product);
        router.push(productUrl);
    };

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Use the product search hooks
    const { data: searchResults, isLoading: isSearchLoading } = useSearchProducts(
        debouncedSearchQuery,
        {
            enabled: debouncedSearchQuery.length > 0,
        }
    );

    const { data: suggestedProducts, isLoading: isSuggestionsLoading } =
        useSuggestedProducts({
            enabled: isSearchFocused && searchQuery.length === 0,
        });

    // Memoize products to avoid dependency issues
    const products = useMemo(() => {
        if (searchQuery.length > 0) {
            return (searchResults as unknown as SearchResults)?.results || [];
        }
        return (suggestedProducts as unknown as SearchResults)?.results || [];
    }, [searchQuery, searchResults, suggestedProducts]);

    const isLoading =
        searchQuery.length > 0 ? isSearchLoading : isSuggestionsLoading;

    // Sort products for suggestions
    const sortedProducts = useMemo(() => {
        if (!products.length) return [];

        if (searchQuery.length === 0) {
            return [...products].sort((a, b) => {
                if (a.is_featured && !b.is_featured) return -1;
                if (!a.is_featured && b.is_featured) return 1;
                if (a.is_popular && !b.is_popular) return -1;
                if (!a.is_popular && b.is_popular) return 1;
                return 0;
            });
        }

        return products;
    }, [products, searchQuery]);

    // Handle dropdown visibility
    useEffect(() => {
        if (isSearchFocused) {
            if (searchQuery.length === 0) {
                setShowDropdown(true);
            } else if (debouncedSearchQuery.length > 0) {
                const shouldShow =
                    isLoading ||
                    sortedProducts.length > 0 ||
                    (!isLoading && sortedProducts.length === 0);
                setShowDropdown(shouldShow);
            }
        } else {
            setShowDropdown(false);
        }
    }, [
        isSearchFocused,
        searchQuery,
        debouncedSearchQuery,
        isLoading,
        sortedProducts.length,
    ]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowDropdown(false);
            setIsSearchFocused(false);
            // Navigate to products page with search
            router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSearchKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (e.key === "Enter") {
            const formEvent = new Event("submit", {
                bubbles: true,
                cancelable: true,
            }) as unknown as React.FormEvent<HTMLFormElement>;
            handleSearchSubmit(formEvent);
        } else if (e.key === "Escape") {
            setShowDropdown(false);
            setIsSearchFocused(false);
            inputRef.current?.blur();
        }
    };

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchQuery(e.target.value);
    };

    const handleSearchFocus = (): void => {
        setIsSearchFocused(true);
    };

    const handleClearSearch = (): void => {
        setSearchQuery("");
        setDebouncedSearchQuery("");
        setShowDropdown(false);
        inputRef.current?.focus();
    };

    const closeSearchResults = (): void => {
        setShowDropdown(false);
        setIsSearchFocused(false);
    };

    const handleViewAllResults = (): void => {
        closeSearchResults();
        router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
    };

    const displayedProducts = sortedProducts.slice(0, 5);
    const showSuggestions = searchQuery.length === 0 && isSearchFocused;
    const showSearchResults = searchQuery.length > 0 && debouncedSearchQuery.length > 0;

    return (
        <div ref={searchRef} className={cn("relative w-full max-w-md", className)}>
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-primary to-primary/10">
                    <div className="relative rounded-xl bg-background">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleSearchKeyPress}
                            onFocus={handleSearchFocus}
                            className="h-11 w-full rounded-xl border-0 bg-transparent pr-10 pl-10 text-sm placeholder:text-muted-foreground focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {searchQuery && (
                            <Button
                                type="button"
                                onClick={handleClearSearch}
                                variant="ghost"
                                size="sm"
                                className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0 text-muted-foreground hover:text-foreground"
                                aria-label="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </form>

            {showDropdown && (
                <Card className="absolute right-0 left-0 z-[99] mt-2 min-w-[320px] border-2 shadow-xl">
                    <CardContent className="p-0">
                        <ScrollArea className="max-h-[500px]">
                            <div className="p-4">
                                {showSuggestions && (
                                    <>
                                        <div className="mb-2">
                                            <span className="text-sm font-medium font-heading">
                                                Suggested Products
                                            </span>
                                        </div>

                                        {isSuggestionsLoading ? (
                                            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
                                                <span className="text-sm">Loading suggestions…</span>
                                            </div>
                                        ) : displayedProducts.length > 0 ? (
                                            <div className="space-y-2">
                                                {displayedProducts.map((product: Product) => (
                                                    <div
                                                        key={product.id}
                                                        onClick={() => handleProductClick(product)}
                                                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted/50"
                                                    >
                                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                                            {product.thumbnail_image && (
                                                                <Image
                                                                    src={product.thumbnail_image}
                                                                    alt={product.name || "Product image"}
                                                                    width={48}
                                                                    height={48}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div
                                                                className="text-sm font-medium font-body"
                                                                title={product.name || ""}
                                                            >
                                                                {truncateText(product.name || "", 45)}
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-2">
                                                                <span className="text-sm font-bold text-primary font-heading">
                                                                    RS. {product.price}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center">
                                                <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                                                <div className="text-sm text-muted-foreground">
                                                    No suggested products available
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {showSearchResults && (
                                    <>
                                        <div className="mb-4">
                                            <span className="text-sm text-muted-foreground">
                                                Search results for{" "}
                                                <span className="font-medium font-heading text-foreground">
                                                    &ldquo;{debouncedSearchQuery}&rdquo;
                                                </span>
                                            </span>
                                        </div>

                                        {isSearchLoading ? (
                                            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
                                                <span className="text-sm">Searching…</span>
                                            </div>
                                        ) : (
                                            <>
                                                {displayedProducts.length > 0 ? (
                                                    <div className="mb-2">
                                                        <div className="mb-3 flex items-center gap-2">
                                                            <Search className="h-4 w-4 text-primary" />
                                                            <span className="text-sm font-semibold font-heading">
                                                                Products
                                                            </span>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {displayedProducts.map((product: Product) => (
                                                                <div
                                                                    key={product.id}
                                                                    onClick={() => handleProductClick(product)}
                                                                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted/50"
                                                                >
                                                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                                                        {product.thumbnail_image && (
                                                                            <Image
                                                                                src={product.thumbnail_image}
                                                                                alt={product.name || "Product image"}
                                                                                width={48}
                                                                                height={48}
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <div
                                                                            className="text-sm font-medium font-body"
                                                                            title={product.name || ""}
                                                                        >
                                                                            {truncateText(product.name || "", 45)}
                                                                        </div>
                                                                        <div className="mt-1 flex items-center gap-2">
                                                                            <span className="text-sm font-bold text-primary font-heading">
                                                                                RS. {product.price}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="py-8 text-center">
                                                        <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                                                        <div className="mb-2 text-sm text-muted-foreground">
                                                            No results found for &ldquo;{debouncedSearchQuery}
                                                            &rdquo;
                                                        </div>
                                                        <div className="mb-3 text-xs text-muted-foreground/70">
                                                            Try searching with different keywords
                                                        </div>
                                                    </div>
                                                )}

                                                {sortedProducts.length > 5 && (
                                                    <>
                                                        <Separator className="my-3" />
                                                        <div
                                                            onClick={handleViewAllResults}
                                                            className="block w-full cursor-pointer py-2 text-center text-sm font-medium text-primary hover:opacity-80 transition-opacity font-heading"
                                                        >
                                                            View all results for &ldquo;{searchQuery}&rdquo;
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
