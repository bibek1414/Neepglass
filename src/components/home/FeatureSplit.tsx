'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/BrandButton';
import { ChevronRight } from 'lucide-react';

interface FeatureSplitProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
    reverse?: boolean;
}

export default function FeatureSplit({
    title,
    subtitle,
    description,
    image,
    ctaText = "Learn More",
    ctaLink = "/about",
    reverse = false
}: FeatureSplitProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom grid md:grid-cols-2 gap-16 items-center">
                <div className={`order-2 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover aspect-4/3 hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
                <div className={`order-1 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
                    <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">{subtitle}</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">{title}</h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {description}
                    </p>
                    <Link href={ctaLink}>
                        <Button variant="outline" size="lg" className="group">
                            {ctaText} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
