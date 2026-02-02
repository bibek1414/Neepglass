'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useBlog } from '@/hooks/use-blogs';
import { format } from 'date-fns';
import Image from 'next/image';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: post, isLoading } = useBlog(slug);

  if (isLoading) {
    return (
      <div className="container-custom py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-custom py-40 text-center">
        <h1 className="text-primary">Article Not Found</h1>
        <Link href="/blog" className="text-secondary hover:underline mt-4 block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-primary/5 pb-20 pt-32">
        <div className="container-custom">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 text-sm font-bold uppercase tracking-wider text-secondary mb-6">
              <span>{post.tags?.[0]?.name || 'Style Guide'}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-gray-500 font-medium normal-case flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {post.author ? `${post.author.first_name} ${post.author.last_name}` : 'Admin'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {format(new Date(post.created_at), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-12">
        <div className="max-w-4xl mx-auto">
          <Image
            src={post.thumbnail_image || '/placeholder.png'}
            alt={post.title}
            width={800}
            height={600}
            className="w-full aspect-video object-cover rounded-3xl shadow-2xl mb-16"
          />

          <div className="grid md:grid-cols-[1fr_250px] gap-12">
            <article
              className="prose prose-lg prose-headings:text-primary prose-a:text-secondary max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <aside className="space-y-12">
              <div>
                <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-widest">Share this article</h4>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>


            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
