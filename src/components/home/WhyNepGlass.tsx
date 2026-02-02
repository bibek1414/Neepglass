'use client';

import React from 'react';
import { Eye, Shield, MapPin, Sparkles } from 'lucide-react';

export default function WhyNepGlass() {
    const features = [
        {
            icon: <Sparkles className="w-7 h-7 text-secondary" />,
            title: 'Timeless Style',
            desc: 'A curated range of frames and sunglasses designed to suit every look.'
        },
        {
            icon: <Eye className="w-7 h-7 text-secondary" />,
            title: 'Clear Vision',
            desc: 'Precision-crafted lenses focused on comfort, clarity, and protection.'
        },
        {
            icon: <MapPin className="w-7 h-7 text-secondary" />,
            title: 'Built for Nepal',
            desc: 'Designed with local lifestyle, climate, and preferences in mind.'
        },
        {
            icon: <Shield className="w-7 h-7 text-secondary" />,
            title: 'Trusted Care',
            desc: 'Personal guidance to help you find eyewear that truly fits you.'
        },
    ];

    return (
        <section className="bg-white py-20">
            <div className="container-custom">

                {/* Heading */}
                <div className="max-w-4xl mb-14">

                    <h2 className="text-primary mt-3 mb-4">
                        Why Choose NepGlass
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Thoughtfully designed eyewear that blends quality, comfort, and modern aesthetics for everyday life in Nepal.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group p-6 rounded-2xl border border-gray-100 hover:border-secondary/30  transition-all"
                        >
                            <div className="mb-2 inline-flex p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/15 transition">
                                {feature.icon}
                            </div>
                            <h4 className="text-lg text-primary mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
