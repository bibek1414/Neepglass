'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';
import { useBlogs } from '@/hooks/use-blogs';
import { format } from 'date-fns';
import Image from 'next/image';

export default function BlogListingClient() {
    const { data: blogsData, isLoading } = useBlogs();
    const blogPosts = blogsData?.results || [];

    return (
        <div className="pb-20">
            {/* Header */}
            <section className="bg-gray-50 pt-32 pb-20">
                <div className="container-custom">
                    <h1 className="text-primary">Vision Insights</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mt-6">
                        Expert advice on eye health, style tips, and the latest trends from the world of eyewear.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-80" />
                            ))
                        ) : (
                            blogPosts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                                        <Image
                                            width={800}
                                            height={600}
                                            src={post.thumbnail_image || '/placeholder.png'}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                                        <span>{post.tags?.[0]?.name || 'Article'}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                        <span className="flex items-center gap-1 text-gray-400 font-normal normal-case">
                                            <Calendar className="w-3 h-3" /> {format(new Date(post.created_at), 'MMM dd, yyyy')}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="text-gray-600 mb-6 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                                    <span className="inline-flex items-center font-bold text-primary group-hover:text-secondary transition-colors mt-auto">
                                        Read Article <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            ))
                        )}
                    </div>
                    {!isLoading && blogPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No blog posts found.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
