'use client';

import React from 'react';
import Button from '@/components/ui/BrandButton';
import Link from 'next/link';
import { Mail, Phone, ChevronRight } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="bg-white py-24 border-t border-gray-100">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Side: Let's Connect */}
                    <div>
                        <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">Contact Us</p>
                        <h2 className="text-primary mt-0 mb-6">Let&apos;s Connect</h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            Have questions about our products or need expert guidance on choosing your next pair? Our team is available to help you find the perfect fit.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8 mb-10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Email Us</h4>
                                    <a href="mailto:hello@nepglass.com.np" className="text-gray-600 hover:text-secondary transition-colors">hello@nepglass.com.np</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Call Us</h4>
                                    <a href="tel:+97714XXXXXX" className="text-gray-600 hover:text-secondary transition-colors">+977-1-4XXXXXX</a>
                                </div>
                            </div>
                        </div>

                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Visit Our Stores <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Right Side: Stay in Style (Newsletter) */}
                    <div className="bg-gray-50 rounded-3xl p-10 lg:p-12 border border-blue-50">
                        <h3 className="text-2xl font-bold text-primary mb-4">Stay in Style</h3>
                        <p className="text-gray-600 mb-8">
                            Get the latest style tips, vision care insights, and exclusive offers delivered directly to your inbox.
                        </p>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="email" className="sr-only">Your email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-6 py-4 rounded-xl bg-white border border-gray-200 text-primary placeholder:text-gray-400 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all"
                                />
                            </div>
                            <Button variant="primary" size="lg" className="w-full rounded-xl shadow-lg shadow-primary/20">
                                Subscribe to Newsletter
                            </Button>
                        </form>
                        <p className="text-xs text-gray-400 mt-6 text-center">
                            By subscribing, you agree to our <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link> and consent to receive updates.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
