"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiSliders } from "react-icons/fi";

const CATEGORIES = ["All", "Beach", "Adventure", "Hill", "Historical"];

const PRICE_RANGES = [
  { label: "All Prices", min: "", max: "" },
  { label: "$1 - $100", min: "1", max: "100" },
  { label: "$101 - $200", min: "101", max: "200" },
  { label: "$201 - $300", min: "201", max: "300" },
  { label: "$300+", min: "300", max: "" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
];

export default function ToursFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const activeCategory = searchParams.get("category") || "All";
  const activeMinPrice = searchParams.get("minPrice") || "";
  const activeMaxPrice = searchParams.get("maxPrice") || "";
  const activeSort = searchParams.get("sort") || "";

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete("page"); // filter বদলালে page 1 এ ফিরে যাওয়া উচিত

    router.push(`/all-tours?${params.toString()}`);
  };

  // Search debounce — টাইপ করা থামলে ৫০০ms পর URL আপডেট হবে
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get("search") || "")) {
        updateParams({ search });
      }
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCategoryClick = (category: string) => {
    updateParams({ category: category === "All" ? "" : category });
  };

  const handlePriceClick = (min: string, max: string) => {
    updateParams({ minPrice: min, maxPrice: max });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ sort: e.target.value });
  };

  const isPriceActive = (min: string, max: string) =>
    activeMinPrice === min && activeMaxPrice === max;

  return (
    <div className="mb-8 space-y-4 rounded-3xl border border-slate-200 bg-[#07ada0] p-5 shadow-sm">
      {/* Search + Sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4">
          <FiSearch className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search by destination or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 sm:w-56">
          <FiSliders className="h-4 w-4 shrink-0 text-slate-400" />
          <select
            value={activeSort}
            onChange={handleSortChange}
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter */}
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-500">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-500">
          Price Range
        </p>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceClick(range.min, range.max)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                isPriceActive(range.min, range.max)
                  ? "bg-coral-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}