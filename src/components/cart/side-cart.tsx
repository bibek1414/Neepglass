"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SideCart: React.FC = () => {
    const {
        items: cartItems,
        removeFromCart,
        updateQuantity,
        itemCount,
        totalPrice,
        isDrawerOpen: isOpen,
        setIsDrawerOpen: setIsOpen
    } = useCart();

    const onClose = () => setIsOpen(false);

    // Generate checkout URL
    const checkoutUrl = `/checkout`;

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Side Cart */}
            <div
                className={cn(
                    "fixed top-0 right-0 z-[60] h-full w-full transform bg-background transition-transform duration-300 ease-in-out sm:w-[380px] md:w-[400px] border-l shadow-2xl",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-3 sm:px-5 sm:py-4">
                        <h2 className="text-lg font-semibold text-foreground sm:text-xl flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Cart ({itemCount})
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8 rounded-full hover:bg-muted"
                        >
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4">
                        {cartItems.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <ShoppingBag className="mb-3 h-12 w-12 text-muted-foreground/50 sm:mb-4 sm:h-16 sm:w-16" />
                                <p className="mb-2 text-base font-medium text-foreground sm:text-lg">
                                    Your cart is empty
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Add some items to get started
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={onClose}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item, index) => {
                                    // Create a unique key for each cart item
                                    const cartItemKey = `${item.product.id}-${item.selectedVariant?.id || "no-variant"}-${index}`;

                                    // Get the price to display
                                    const displayPrice = item.selectedVariant
                                        ? parseFloat(item.selectedVariant.price)
                                        : parseFloat(item.product.price);

                                    return (
                                        <div
                                            key={cartItemKey}
                                            className="flex gap-4 border-b pb-4 last:border-b-0"
                                        >
                                            {/* Product Image */}
                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                onClick={onClose}
                                                className="flex-shrink-0 relative h-20 w-20 rounded-lg overflow-hidden border bg-muted group"
                                            >
                                                <Image
                                                    src={item.product.thumbnail_image || "/placeholder.png"}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>

                                            {/* Product Info & Controls */}
                                            <div className="flex min-w-0 flex-1 flex-col justify-between">
                                                {/* Product Name & Remove */}
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <Link
                                                            href={`/products/${item.product.slug}`}
                                                            onClick={onClose}
                                                            className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary transition-colors mb-1"
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                        {/* Display variant options if available */}
                                                        {item.selectedVariant && (
                                                            <div className="flex flex-wrap gap-1">
                                                                {Object.entries(
                                                                    item.selectedVariant.option_values
                                                                ).map(([key, value]) => (
                                                                    <span
                                                                        key={key}
                                                                        className="text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded capitalize"
                                                                    >
                                                                        {key}: {value}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.product.id,
                                                                item.selectedVariant?.id || null
                                                            )
                                                        }
                                                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Price & Quantity Controls */}
                                                <div className="flex items-end justify-between pt-2">
                                                    <p className="text-sm font-bold text-foreground">
                                                        Rs. {(displayPrice * item.quantity).toFixed(2)}
                                                        {item.quantity > 1 && (
                                                            <span className="text-xs font-normal text-muted-foreground ml-1">
                                                                (Rs. {displayPrice.toFixed(2)} each)
                                                            </span>
                                                        )}
                                                    </p>

                                                    <div className="flex items-center rounded-md border bg-background h-8">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product.id,
                                                                    item.quantity - 1,
                                                                    item.selectedVariant?.id || null
                                                                )
                                                            }
                                                            className="px-2 h-full flex items-center justify-center hover:bg-muted text-foreground transition-colors rounded-l-md disabled:opacity-50"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="min-w-[1.5rem] text-center text-xs font-semibold text-foreground">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product.id,
                                                                    item.quantity + 1,
                                                                    item.selectedVariant?.id || null
                                                                )
                                                            }
                                                            className="px-2 h-full flex items-center justify-center hover:bg-muted text-foreground transition-colors rounded-r-md"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="space-y-4 border-t bg-muted/10 p-4 sm:p-5">
                            {/* Promo / Info */}
                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
                                <span className="flex items-center gap-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div> Free Delivery
                                </span>
                                <span className="text-muted-foreground/30">•</span>
                                <span>Easy Returns</span>
                            </div>

                            {/* Subtotal */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span className="text-lg font-bold text-foreground">
                                        Rs. {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Shipping and taxes calculated at checkout.
                                </p>
                            </div>

                            {/* Checkout Button */}
                            <Link href={checkoutUrl} className="block w-full" onClick={onClose}>
                                <Button
                                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
                                    size="lg"
                                >
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SideCart;
