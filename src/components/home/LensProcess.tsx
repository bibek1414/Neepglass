'use client';

import React from 'react';

const steps = [
    {
        img: 'https://images.pexels.com/photos/5843448/pexels-photo-5843448.jpeg',
        title: 'Precision Design',
        desc: 'Digital surfacing technology ensures lenses match your prescription perfectly.',
    },
    {
        img: 'https://images.pexels.com/photos/27624637/pexels-photo-27624637.jpeg',
        title: 'Advanced Manufacturing',
        desc: 'High-quality materials and meticulous craftsmanship create durable, lightweight lenses.',
    },
    {
        img: 'https://images.pexels.com/photos/27399363/pexels-photo-27399363.jpeg',
        title: 'Expert Fitting',
        desc: 'Our specialists ensure lenses fit your frames and eyes comfortably for daily use.',
    },
    {
        img: 'https://images.pexels.com/photos/5752328/pexels-photo-5752328.jpeg',
        title: 'Quality Assurance',
        desc: 'Each lens is tested for clarity, durability, and compliance with premium standards.',
    },
];

export default function LensProcess() {
    return (
        <div className="bg-gray-50 py-5">
            <div className="container-custom max-w-6xl mx-auto">
                <div className="text-center md:text-left mb-12">
                    <h2 className="text-primary text-3xl md:text-4xl font-bold">
                        <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-2">
                            Our Process
                        </p>
                        How We Make Your Lenses
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-start text-left p-6 bg-white rounded-2xl"
                        >
                            <div className="mb-4 w-24 h-24 flex items-center justify-center overflow-hidden rounded-full">
                                <img
                                    src={step.img}
                                    alt={step.title}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
