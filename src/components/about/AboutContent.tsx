"use client";

import React from 'react';
import { Shield, Sparkles, Heart, Zap } from 'lucide-react';
import ImageWithFallback from '@/components/common/ImageWithFallback';

const AboutContent = () => {
    return (
        <div className="pb-20">
            <section className="text-center pt-24 pb-12 px-4 max-w-7xl mx-auto">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-primary mb-6 inline-block">
                    Our Story
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-foreground mt-6 mb-8">Redefining Modern <span className="text-primary">Shopping</span></h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    SastoBazaar was born out of a desire for quality. We curate items that aren&apos;t just beautiful, but built to last and designed to inspire.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-50"></div>
                        <ImageWithFallback
                            id="about-team"
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                            fallbackSrc="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                            width={800}
                            height={600}
                            alt="Team"
                            className="rounded-3xl shadow-2xl relative z-10"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl z-20 border border-border">
                            <p className="text-4xl font-black text-primary">10k+</p>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Happy Customers</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-foreground">Why SastoBazaar Exists</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            In a world of fast consumption, we chose the slow path. We believe that every object in your home should tell a story of craftsmanship and intentionality. That&apos;s why we spend months vetting every single supplier and product on our platform.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-secondary rounded-2xl border border-border">
                                <Shield className="text-primary mb-4" />
                                <h4 className="font-bold mb-2">Unmatched Trust</h4>
                                <p className="text-xs text-muted-foreground">Every product undergoes rigorous quality control checks.</p>
                            </div>
                            <div className="p-6 bg-secondary rounded-2xl border border-border">
                                <Sparkles className="text-primary mb-4" />
                                <h4 className="font-bold mb-2">Curated Design</h4>
                                <p className="text-xs text-muted-foreground">We prioritize aesthetics as much as we do utility.</p>
                            </div>
                            <div className="p-6 bg-secondary rounded-2xl border border-border">
                                <Heart className="text-primary mb-4" />
                                <h4 className="font-bold mb-2">Community First</h4>
                                <p className="text-xs text-muted-foreground">Our customers are at the heart of everything we do.</p>
                            </div>
                            <div className="p-6 bg-secondary rounded-2xl border border-border">
                                <Zap className="text-primary mb-4" />
                                <h4 className="font-bold mb-2">Innovation</h4>
                                <p className="text-xs text-muted-foreground">Always looking for the next breakthrough in retail.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutContent;
