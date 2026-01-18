"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface WishlistButtonProps {
    size?: "sm" | "md" | "lg";
    onToggle?: (active: boolean) => void;
}

export default function WishlistButton({
    size = "md",
    onToggle,
}: WishlistButtonProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newState = !isWishlisted;
        setIsWishlisted(newState);
        if (onToggle) onToggle(newState);
    };

    const sizeClasses = {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
    };

    const iconSizes = {
        sm: 14,
        md: 18,
        lg: 22,
    };

    return (
        <button
            onClick={handleToggle}
            className={`${sizeClasses[size]} rounded-full transition-all duration-300 transform hover:scale-110 ${isWishlisted
                ? "bg-red-50 text-red-500"
                : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 shadow-sm"
                }`}
        >
            <Heart
                size={iconSizes[size]}
                className={isWishlisted ? "fill-current" : ""}
            />
        </button>
    );
}
