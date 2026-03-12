"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMeta } from "../types/patient";

type Props = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

export default function Pagination({ meta, onPageChange }: Props) {
  const { page, totalPages } = meta;

  // Generate page numbers to show (simplified version of what's in screenshot)
  const pages = Array.from(
    { length: Math.min(7, totalPages) },
    (_, i) => i + 1,
  );

  return (
    <div className="flex items-center md:flex-row flex-col justify-center gap-2 mt-12 pb-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-500 hover:text-blue-600 border border-gray-200 rounded-lg bg-white transition-colors disabled:opacity-40 disabled:hover:text-gray-500"
      >
        <ChevronLeft size={14} />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p < 10 ? `0${p}` : p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-gray-500 hover:text-blue-600 border border-gray-200 rounded-lg bg-white transition-colors disabled:opacity-40 disabled:hover:text-gray-500"
      >
        Next
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
