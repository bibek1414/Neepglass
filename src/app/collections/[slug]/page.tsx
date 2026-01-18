"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Heart, Share2, Shield, Truck, Plus, Minus, Info, ArrowLeft } from 'lucide-react';
import { useProduct } from '@/hooks/use-product';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsPage = () => {
    const { slug } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { data: product, isLoading, error } = useProduct(slug as string);

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    <Skeleton className="flex-1 aspect-[4/5] rounded-3xl" />
                    <div className="flex-1 space-y-8">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Info size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
                <p className="text-slate-500 mb-8">The product you&apos;re looking for might have been moved or doesn&apos;t exist.</p>
                <Button onClick={() => router.push('/collections')}>Back to Shop</Button>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <Link href="/collections" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium">
                <ArrowLeft size={16} /> Back to Collection
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* Gallery */}
                <div className="flex-1 space-y-4">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 shadow-sm">
                        <img
                            src={product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all">
                                <img
                                    src={product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                    alt="Thumbnail"
                                    className="w-full h-full object-cover opacity-60 hover:opacity-100"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-none px-3 py-1">
                                {product.category?.name || 'General'}
                            </Badge>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-pink-500 hover:bg-pink-50 hover:border-pink-100 transition-all">
                                    <Heart size={20} />
                                </button>
                                <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? 'currentColor' : 'none'} />)}
                            </div>
                            <span className="text-sm font-bold text-slate-900">4.5</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-sm text-slate-500 font-medium underline cursor-pointer">24 customer reviews</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-slate-900">${product.price}</span>
                            {product.market_price && <span className="text-xl text-slate-400 line-through">${product.market_price}</span>}
                        </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-lg">
                        {product.description || "Designed with precision and crafted using only high-grade materials, this product stands at the intersection of style and function. Every detail has been scrutinized to ensure an unparalleled user experience."}
                    </p>

                    <div className="pt-6 border-t border-slate-100 space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"><Minus size={18} /></button>
                                <span className="w-12 text-center font-bold text-slate-900 text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"><Plus size={18} /></button>
                            </div>
                            <Button
                                size="lg"
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl text-lg font-bold"
                                onClick={() => addToCart(product, quantity)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                        <Button variant="outline" size="lg" className="w-full h-12 rounded-xl border-2 border-slate-200 font-bold">Buy It Now</Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0"><Truck size={20} /></div>
                            <div className="text-xs">
                                <p className="font-bold text-slate-900">Fast Delivery</p>
                                <p className="text-slate-500">Free on orders over $150</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><Shield size={20} /></div>
                            <div className="text-xs">
                                <p className="font-bold text-slate-900">2-Year Warranty</p>
                                <p className="text-slate-500">Manufacturer protection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Information Tabs */}
            <div className="mt-20 border-t border-slate-200">
                <div className="flex border-b border-slate-200 mb-10 overflow-x-auto no-scrollbar">
                    {['description', 'specifications', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${activeTab === tab ? 'border-indigo-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {activeTab === 'description' && (
                        <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                            <p>Designed with precision and crafted using only high-grade materials, our {product.name} stands at the intersection of style and function. Every detail has been scrutinized to ensure an unparalleled user experience.</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Hand-selected premium materials for longevity and luxury feel.</li>
                                <li>Sustainably sourced and ethically manufactured components.</li>
                                <li>Optimized ergonomics for comfortable, intuitive daily use.</li>
                                <li>Industry-leading performance metrics in its category.</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'specifications' && (
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex border-b border-slate-100 py-4 items-center">
                                <span className="w-1/3 font-bold text-slate-900">Category</span>
                                <span className="text-slate-600">{product.category?.name || 'General'}</span>
                            </div>
                            <div className="flex border-b border-slate-100 py-4 items-center">
                                <span className="w-1/3 font-bold text-slate-900">Stock Status</span>
                                <span className="text-slate-600">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                            <div className="flex border-b border-slate-100 py-4 items-center">
                                <span className="w-1/3 font-bold text-slate-900">SKU</span>
                                <span className="text-slate-600">LMN-{product.id}-PRM</span>
                            </div>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="space-y-8">
                            {[1, 2].map(i => (
                                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                                                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">Customer {i}</p>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400">3 weeks ago</span>
                                    </div>
                                    <p className="text-slate-600 text-sm italic">&quot;Absolutely love this! The quality surpassed my expectations. It arrived perfectly packaged and works like a charm. Will definitely be buying more from Lumina.&quot;</p>
                                </div>
                            ))}
                            <Button variant="outline" className="border-2 border-slate-200 font-bold">Write A Review</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
