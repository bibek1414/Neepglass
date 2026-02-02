'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    ShoppingCart,
    ShieldCheck,
    Truck,
    RefreshCw,
    Star,
    Minus,
    Plus,
    Check
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Button from '@/components/ui/BrandButton';
import { Product, ProductVariantRead } from '@/types/product';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductDetailsProps {
    product: Product;
    onVariantChange?: (variant: ProductVariantRead | null) => void;
}

export default function ProductDetails({ product, onVariantChange }: ProductDetailsProps) {
    const { addToCart, setIsDrawerOpen } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    // State for selected options { "Color": "Dark Grey", "Size": "L" }
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    // Derived state: selected variant
    const selectedVariant = useMemo(() => {
        if (!product.variants_read || product.variants_read.length === 0) return null;
        if (Object.keys(selectedOptions).length === 0 && product.options?.length) return null;

        return product.variants_read.find(variant => {
            // Check if this variant matches all selected options
            return Object.entries(selectedOptions).every(([optionName, optionValue]) => {
                return variant.option_values[optionName] === optionValue;
            });
        }) || null;
    }, [product.variants_read, selectedOptions, product.options]);

    // Notify parent of variant change
    useEffect(() => {
        if (onVariantChange) {
            onVariantChange(selectedVariant);
        }
    }, [selectedVariant, onVariantChange]);

    // Initialize options with first available values if exist
    useEffect(() => {
        if (product.options && product.options.length > 0 && Object.keys(selectedOptions).length === 0) {
            const initialOptions: Record<string, string> = {};
            product.options.forEach(opt => {
                if (opt.values && opt.values.length > 0) {
                    initialOptions[opt.name] = opt.values[0].value;
                }
            });
            setSelectedOptions(initialOptions);
        }
    }, [product.options]);


    const handleOptionSelect = (optionName: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: value
        }));
    };

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    const isOutOfStock = currentStock <= 0;

    const handleAddToCart = () => {
        // If product has options but no variant matches
        if (product.options && product.options.length > 0 && !selectedVariant) {
            toast.error("Please select all options");
            return;
        }

        // Prepare variant data for cart context
        // Ensure we pass exactly what CartContext expects for the variant structure
        const variantForCart = selectedVariant ? {
            id: selectedVariant.id,
            price: selectedVariant.price,
            option_values: selectedVariant.option_values
        } : null;

        // Creating a temporary product object with updated thumbnail if needed
        // (Visual feedback only, as normalization might strip custom fields)
        const productToAdd = {
            ...product,
            thumbnail_image: selectedVariant?.image || product.thumbnail_image,
        };

        // Pass product, quantity, AND variant data
        addToCart(productToAdd as Product, quantity, variantForCart);

        setIsAdded(true);
        setIsDrawerOpen(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="py-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <p className="text-secondary font-bold uppercase tracking-widest text-xs">
                    {product.category?.name} {product.sub_category ? ` / ${product.sub_category.name}` : ''}
                </p>
                <div className="flex flex-col items-end">
                    {product.weight && <p className="text-xs text-gray-400 font-medium">Weight: {product.weight}</p>}
                    {product.warranty && <p className="text-xs text-gray-400 font-medium">Warranty: {product.warranty}</p>}
                </div>
            </div>

            <h1 className="text-primary mt-0 mb-4 text-3xl md:text-4xl font-bold">{product.name}</h1>

            {/* Ratings - Using hardcoded as placeholder or real if available */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (product.average_rating || 5) ? 'text-secondary fill-secondary' : 'text-gray-200'}`} />
                    ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">({product.reviews_count || 2} Customer Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
                <p className="text-3xl font-bold text-primary">Rs. {currentPrice}</p>
                {product.market_price && parseFloat(product.market_price) > parseFloat(currentPrice) && (
                    <p className="text-xl text-gray-400 line-through mb-1">Rs. {product.market_price}</p>
                )}
            </div>

            {/* Stock Status */}
            <div className="mb-8">
                {!isOutOfStock ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                        In Stock {product.track_stock && `(${currentStock} available)`}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                        Out of Stock
                    </span>
                )}
                {product.fast_shipping && (
                    <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Fast Shipping
                    </span>
                )}
            </div>

            {/* Description Preview */}
            <div
                className="text-gray-600 mb-8 leading-relaxed text-base prose prose-sm max-w-none line-clamp-3"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
            />

            {/* Options Selection */}
            {product.options && product.options.map((option) => (
                <div key={option.id} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{option.name}: <span className="text-gray-900 font-bold">{selectedOptions[option.name]}</span></label>
                    <div className="flex flex-wrap gap-2">
                        {option.values?.map((val) => {
                            const isSelected = selectedOptions[option.name] === val.value;
                            return (
                                <button
                                    key={val.id}
                                    onClick={() => handleOptionSelect(option.name, val.value)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                        isSelected
                                            ? "border-secondary bg-secondary/5 text-secondary ring-1 ring-secondary"
                                            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                    )}
                                >
                                    {val.value}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}

            {/* Quantity and CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10 pt-4 border-t border-gray-100">
                <div className="flex items-center border border-gray-200 rounded-xl h-12 px-2 w-fit">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
                        disabled={quantity <= 1 || isOutOfStock}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-primary text-sm">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
                        disabled={quantity >= currentStock || isOutOfStock} // Limit to stock
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <Button
                    size="lg"
                    className="flex-1 rounded-xl shadow-xl shadow-primary/10 h-12 text-base"
                    onClick={handleAddToCart}
                    disabled={isAdded || isOutOfStock}
                >
                    {isAdded ? (
                        <>
                            <Check className="w-5 h-5 mr-2" />
                            Added to Cart
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            {isOutOfStock ? 'Notify Me' : 'Add to Cart'}
                        </>
                    )}
                </Button>
            </div>

            {/* Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b border-gray-100 mb-8 bg-gray-50/50 rounded-2xl p-4">
                <div className="flex flex-col items-center text-center gap-2">
                    <Truck className="w-5 h-5 text-secondary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <RefreshCw className="w-5 h-5 text-secondary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Authentic</span>
                </div>
            </div>
        </div>
    );
}
