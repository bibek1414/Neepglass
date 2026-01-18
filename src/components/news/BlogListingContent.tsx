"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { useBlogs } from '@/hooks/use-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPost } from '@/types/blog';

const BlogListingContent = () => {
    const { data: blogsData, isLoading } = useBlogs();
    const blogs = blogsData?.results || [];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary-foreground/30 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-secondary/30 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <span className="text-primary-foreground/80 font-bold tracking-widest uppercase text-xs mb-4 block">Insights & Stories</span>
                    <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-6">SastoBazaar <span className="text-primary-foreground/60">Journal</span></h1>
                    <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
                        Explore the latest trends, tips, and updates from the world of premium lifestyle and luxury.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-video rounded-3xl" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                    ) : blogs.length > 0 ? (
                        blogs.map((blog: BlogPost) => (
                            <article key={blog.id} className="group flex flex-col h-full bg-card rounded-[2.5rem] overflow-hidden border border-border/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={blog.thumbnail_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80'}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground shadow-sm">
                                            {blog.tags?.[0]?.name || 'Lifestyle'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-4 text-xs font-medium text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-primary" />
                                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <User size={14} className="text-primary" />
                                            {blog.author?.username || 'Editor'}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                        {blog.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm mb-8 line-clamp-3 leading-relaxed">
                                        {blog.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
                                    </p>

                                    <Link
                                        href={`/news/${blog.slug}`}
                                        className="mt-auto inline-flex items-center gap-2 text-sm font-black text-foreground group-hover:text-primary transition-colors"
                                    >
                                        READ STORY <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                                <Tag size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">No articles found</h3>
                            <p className="text-muted-foreground">Check back later for fresh insights and stories.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogListingContent;
