"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    reviewCount?: number;
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={12}
                        className={`${i < Math.floor(rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200 fill-gray-200"
                            }`}
                    />
                ))}
            </div>
            {reviewCount !== undefined && (
                <span className="text-[10px] text-gray-400 font-bold">
                    ({reviewCount})
                </span>
            )}
        </div>
    );
}
