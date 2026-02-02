'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
    images: string[];
    thumbnail: string | null;
    productName: string;
    activeImage?: string | null;
}

export default function ProductGallery({ images: propImages, thumbnail, productName, activeImage }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [overrideImage, setOverrideImage] = useState<string | null>(null);

    // Combine logic: propImages are usually urls. 
    // If images array is empty, use thumbnail.
    const images = useMemo(() => {
        return (propImages && propImages.length > 0)
            ? propImages
            : (thumbnail ? [thumbnail] : []);
    }, [propImages, thumbnail]);

    // Update selected image when activeImage prop changes
    useEffect(() => {
        if (activeImage) {
            const index = images.indexOf(activeImage);
            if (index !== -1) {
                setSelectedImage(index);
                setOverrideImage(null);
            } else {
                setOverrideImage(activeImage);
            }
        } else {
            setOverrideImage(null);
        }
    }, [activeImage, images]);

    // Remove the resetting useEffect as it conflicts with the activeImage one above
    // or strictly limit it to when 'images' array effectively changes content
    // For now, let's assume images prop doesn't change randomly. 

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
        setOverrideImage(null);
    }

    if (images.length === 0 && !overrideImage) {
        return (
            <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square border border-gray-100 flex items-center justify-center">
                <img src='/placeholder.png' alt={productName} className="w-full h-full object-cover opacity-50" />
            </div>
        );
    }

    const currentSrc = overrideImage || images[selectedImage] || '/placeholder.png';
    // Highlight thumbnail only if we are not overriding (or if override matches loop, which is handled by effect)
    // Actually if overrideImage is set, it means it's NOT in the list, so no thumbnail should be selected? 
    // Or we keep the last selected one? Let's say no thumbnail selected if override is active.
    const activeIndex = overrideImage ? -1 : selectedImage;

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square border border-gray-100 relative group">
                <img
                    src={currentSrc}
                    alt={productName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => handleThumbnailClick(i)}
                            className={cn(
                                "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                                activeIndex === i
                                    ? 'border-secondary shadow-md'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                            )}
                        >
                            <img
                                src={img || '/placeholder.png'}
                                alt={`${productName} view ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
