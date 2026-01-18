"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { useBlog } from '@/hooks/use-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BlogDetailsContent = () => {
    const params = useParams();
    const slug = params.slug as string;
    const router = useRouter();
    const { data: blog, isLoading } = useBlog(slug);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <Skeleton className="h-10 w-3/4 mb-6" />
                <div className="flex gap-4 mb-10">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="aspect-video rounded-[3rem] mb-12" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h2>
                <p className="text-muted-foreground mb-8">The story you are looking for might have been moved or removed.</p>
                <Button onClick={() => router.push('/news')} className="bg-primary hover:bg-primary/90">Back to News</Button>
            </div>
        );
    }

    return (
        <article className="bg-background min-h-screen pb-24">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest mb-10 transition-colors p-0 h-auto hover:bg-transparent"
                >
                    <ArrowLeft size={16} /> Back to Journal
                </Button>

                <div className="flex gap-2 mb-6">
                    {blog.tags?.map(tag => (
                        <Badge key={tag.id} variant="secondary" className="bg-secondary text-primary border-none px-4 py-1 rounded-full font-bold">
                            {tag.name}
                        </Badge>
                    ))}
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-[1.1] md:tracking-tight">
                    {blog.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground">{blog.author?.username || 'SastoBazaar Editor'}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Chief Correspondent</p>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-border hidden sm:block"></div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar size={16} />
                            <span className="text-sm font-medium">
                                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mr-2">Share</span>
                        <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-secondary text-muted-foreground border-none hover:bg-primary hover:text-primary-foreground transition-all">
                            <Facebook size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-secondary text-muted-foreground border-none hover:bg-primary hover:text-primary-foreground transition-all">
                            <Twitter size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-secondary text-muted-foreground border-none hover:bg-primary hover:text-primary-foreground transition-all">
                            <Linkedin size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/5 relative">
                    <Image
                        src={blog.thumbnail_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80'}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4">
                <div
                    className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-3xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Meta / Tags Footer */}
                <div className="mt-20 pt-10 border-t border-border">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <Share2 size={18} className="text-primary" /> Spread the word
                        </span>
                        <div className="flex gap-2">
                            <Button variant="secondary" className="px-6 py-6 bg-secondary rounded-2xl text-muted-foreground font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors h-auto border-none">
                                Newsletter Sub
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetailsContent;
