"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Simple pagination logic for demonstration
    // In a real app, you might want to show a subset of pages if there are many
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;

        if (currentPage <= 4) return [...pages.slice(0, 5), '...', totalPages];
        if (currentPage >= totalPages - 3) return [1, '...', ...pages.slice(totalPages - 5)];

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-16 scale-90 sm:scale-100">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-slate-900 hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1.5 bg-gray-50/50 p-1.5 rounded-[2rem] border border-gray-100/50">
                {getVisiblePages().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                        disabled={page === '...'}
                        className={`min-w-[44px] h-[44px] flex items-center justify-center rounded-full text-xs font-black transition-all ${page === currentPage
                                ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                : page === '...'
                                    ? "text-gray-300 cursor-default"
                                    : "text-gray-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-slate-900 hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
