"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/all-tours?${params.toString()}`);
  };

  // ছোট page range দেখানোর জন্য (যেমন: 1, 2, 3 ... 8, 9, 10 না, সবগুলো বাটন দেখাবে না)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => goToPage(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && (
            <span className="px-1 text-slate-400">...</span>
          )}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
            page === currentPage
              ? "bg-teal-600 text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}

      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-1 text-slate-400">...</span>
          )}
          <button
            onClick={() => goToPage(totalPages)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}