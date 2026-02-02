'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/BrandButton';
import { CheckCircle2, Package, ChevronRight, ShoppingBag, Loader2, Home } from 'lucide-react';
import { useOrder } from '@/hooks/use-orders';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function OrderConfirmationPage() {
    const params = useParams();
    const id = params?.id ? parseInt(params.id as string) : 0;
    const { data: order, isLoading, error } = useOrder(id);

    if (isLoading) {
        return (
            <div className="container-custom py-20 min-h-[60vh]">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container-custom py-40 text-center">
                <h1 className="text-secondary mb-4">Order Not Found</h1>
                <p className="text-gray-600 mb-8">We couldn&apos;t find the order you&apos;re looking for.</p>
                <Link href="/products">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            <div className="container-custom pt-32">
                <div className="max-w-3xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h1 className="text-primary text-3xl font-bold mb-4">Thank You for Your Order!</h1>
                        <p className="text-gray-600">
                            Order <span className="font-bold text-primary">#{order.order_number}</span> has been placed successfully.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            We&apos;ve sent a confirmation email to {order.customer_email}
                        </p>
                    </div>

                    {/* New Customer / Account Prompt if guest - optional logic could go here */}

                    <div className="grid gap-8">
                        {/* Order Details Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-gray-50">
                                <h2 className="text-xl font-bold text-primary mb-6">Order Details</h2>
                                <div className="space-y-6">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                                {item.variant?.image || item.product?.thumbnail_image ? (
                                                    <img
                                                        src={item.variant?.image || item.product?.thumbnail_image || '/placeholder.png'}
                                                        alt={item.product?.name || 'Product'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <ShoppingBag className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-primary text-base mb-1">{item.product?.name}</p>
                                                        {/* Display Variant Info */}
                                                        {item.variant && item.variant.option_values && item.variant.option_values.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-1 mb-2">
                                                                {item.variant.option_values.map((opt) => (
                                                                    <span key={opt.id} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 font-medium">
                                                                        {opt.value}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-primary">Rs. {parseFloat(item.price).toFixed(2)}</span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Qty: {item.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Totals */}
                            <div className="p-8 bg-gray-50/30">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">
                                            Rs. {(parseFloat(order.total_amount) - parseFloat(order.delivery_charge || '0') + (order.transaction_id /* assume discount included in total calculation logic or handled separately, simplistic view */ ? 0 : 0)).toFixed(2)}
                                            {/* Actual subtotal calculation might need more fields if discount is separate */}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-medium">Rs. {parseFloat(order.delivery_charge || '0').toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-primary pt-4 border-t border-gray-200 mt-4">
                                        <span>Total</span>
                                        <span>Rs. {order.total_amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Info Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-secondary" />
                                    Shipping Information
                                </h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                                    <p>{order.shipping_address}</p>
                                    <p>{order.city}</p>
                                    <p>{order.customer_phone}</p>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                                    Payment Status
                                </h3>
                                <div className="space-y-2">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 uppercase tracking-wider">
                                        {order.payment_type === 'cod' ? 'Cash on Delivery' : order.payment_type}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Payment will be collected upon delivery.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <Link href="/products">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Continue Shopping
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    <Home className="w-5 h-5 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
