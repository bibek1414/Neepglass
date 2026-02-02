'use client';

import React from 'react';

const brands = [
    'UV400 Protection',
    'Precision Lenses',
    'Made for Nepal',
    'Free Eye Test',
    'Premium Frames',
    'Trusted Care',
];

export default function BrandTicker() {
    return (
        <section className=" border-gray-100 bg-white py-6 overflow-hidden">
            <div className="relative flex whitespace-nowrap">
                <div className="animate-marquee flex gap-16 px-8">
                    {brands.map((item, i) => (
                        <span
                            key={i}
                            className="text-sm uppercase tracking-wide text-gray-500"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="absolute top-0 left-full animate-marquee flex gap-16 px-8">
                    {brands.map((item, i) => (
                        <span
                            key={`dup-${i}`}
                            className="text-sm uppercase tracking-wide text-gray-500"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
