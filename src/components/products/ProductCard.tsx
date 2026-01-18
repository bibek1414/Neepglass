"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { getImageUrl } from "@/config/site";
import { useIsMobile } from "@/hooks/use-mobile";
import WishlistButton from "./WishlistButton";
import StarRating from "./StarRating";
import { useState, useRef } from "react";

interface ProductCardProps {
    product: Product;
    isSpecial?: boolean;
}

export default function ProductCard({
    product,
    isSpecial = false,
}: ProductCardProps) {
    const { cartItems, addToCart, updateQuantity } = useCart();
    const isMobile = useIsMobile();
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    // Refs from snippet
    const addToCartButtonRef = useRef<HTMLButtonElement>(null);
    const minusButtonRef = useRef<HTMLButtonElement>(null);
    const plusButtonRef = useRef<HTMLButtonElement>(null);
    const mobileAddToCartButtonRef = useRef<HTMLButtonElement>(null);

    const cartItem = cartItems.find((item) => item.product.id === product.id);
    const isInCart = !!cartItem;
    const cartQuantity = cartItem?.quantity || 0;
    const productSlug = product.slug;

    const handleWishlistToggle = (active: boolean) => {
        // Wishlist functionality can be added later if needed
        console.log(`Wishlist toggle for ${product.id}: ${active}`);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
    };

    const handleQuantityIncrease = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateQuantity(product.id, cartQuantity + 1);
    };

    const handleQuantityDecrease = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartQuantity > 1) {
            updateQuantity(product.id, cartQuantity - 1);
        } else {
            // Remove from cart if quantity becomes 0
            updateQuantity(product.id, 0);
        }
    };

    return (
        <div
            className={`relative ${isSpecial ? "aspect-square" : "h-full"
                } rounded-3xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 flex flex-col bg-white z-0 hover:z-50 group`}
        >
            <div className="absolute inset-0 border-2 border-gray-50 rounded-3xl pointer-events-none group-hover:border-primary/10 transition-colors"></div>

            <div className="absolute z-10 top-3 right-3">
                <WishlistButton
                    size="sm"
                    onToggle={handleWishlistToggle}
                />
            </div>

            {isInCart && (
                <div className="absolute z-10 top-3 left-3">
                    <div className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">
                        <ShoppingCart size={10} />
                        <span>In Cart ({cartQuantity})</span>
                    </div>
                </div>
            )}

            <Link
                href={`/collections/${productSlug}`}
                className="block flex-1"
            >
                <div className="relative flex flex-col h-full p-4">
                    <div className="relative flex items-center justify-center flex-1 p-2 mb-3 min-h-[180px]">
                        <Image
                            src={getImageUrl(product.thumbnail_image || "") || "/placeholder.png"}
                            alt={product.name}
                            width={180}
                            height={180}
                            className="object-contain w-full h-full max-h-48 group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <div className="px-2 h-[120px] flex flex-col">
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 min-h-[40px] group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <div className="mt-auto">
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    {product.market_price &&
                                        parseFloat(product.market_price) >
                                        parseFloat(product.price) && (
                                            <span className="text-[10px] text-gray-400 line-through font-bold">
                                                ₹
                                                {parseFloat(product.market_price).toLocaleString(
                                                    "en-IN",
                                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                                                )}
                                            </span>
                                        )}
                                    <span className="text-lg font-black text-slate-900">
                                        ₹
                                        {parseFloat(product.price).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>
                                {!isMobile && (
                                    <>
                                        {!isInCart ? (
                                            <button
                                                ref={addToCartButtonRef}
                                                onClick={handleAddToCartClick}
                                                disabled={product.stock <= 0}
                                                data-cart-action="add-to-cart"
                                                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${isAddedToCart ? "bg-green-500 text-white border-green-500" : ""
                                                    }`}
                                            >
                                                <ShoppingCart size={18} />
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full p-1 shadow-inner">
                                                <button
                                                    ref={minusButtonRef}
                                                    onClick={handleQuantityDecrease}
                                                    data-cart-action="decrease-quantity"
                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-2 text-xs font-black text-slate-900 min-w-[20px] text-center">
                                                    {cartQuantity}
                                                </span>
                                                <button
                                                    ref={plusButtonRef}
                                                    onClick={handleQuantityIncrease}
                                                    disabled={product.stock <= cartQuantity}
                                                    data-cart-action="increase-quantity"
                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            {product.reviews_count !== undefined && product.reviews_count > 0 && (
                                <div className="mt-2">
                                    <StarRating
                                        rating={product.average_rating || 0}
                                        reviewCount={product.reviews_count}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            {isMobile && (
                <div className="px-4 pb-4">
                    {!isInCart ? (
                        <button
                            ref={mobileAddToCartButtonRef}
                            onClick={handleAddToCartClick}
                            disabled={product.stock <= 0}
                            data-cart-action="add-to-cart"
                            className={`flex items-center justify-center w-full gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest text-white rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl ${isAddedToCart
                                ? "bg-green-500 scale-105"
                                : "bg-slate-900 hover:bg-primary shadow-slate-200"
                                }`}
                        >
                            <ShoppingCart size={14} />
                            {isAddedToCart
                                ? "Added!"
                                : product.stock > 0
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                        </button>
                    ) : (
                        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-inner">
                            <button
                                onClick={handleQuantityDecrease}
                                data-cart-action="decrease-quantity"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary shadow-sm hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            >
                                <Minus size={16} />
                            </button>
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-black text-slate-900">
                                    {cartQuantity}
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">in cart</span>
                            </div>
                            <button
                                onClick={handleQuantityIncrease}
                                disabled={product.stock <= cartQuantity}
                                data-cart-action="increase-quantity"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
