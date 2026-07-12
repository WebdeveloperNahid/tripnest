"use client";

import { Link } from "@heroui/react";
import { FiSun, FiCompass, FiHome as FiCastle, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { GiMountains } from "react-icons/gi";

const categories = [
  {
    name: "Beach",
    description: "Sun, sand, and turquoise waters",
    tourCount: "120+ tours",
    icon: FiSun,
    href: "/tours?category=Beach",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80",
  },
  {
    name: "Adventure",
    description: "Thrilling treks and expeditions",
    tourCount: "95+ tours",
    icon: FiCompass,
    href: "/tours?category=Adventure",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80",
  },
  {
    name: "Hill & Mountain",
    description: "Breathtaking peaks and valleys",
    tourCount: "78+ tours",
    icon: GiMountains,
    href: "/tours?category=Hill",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
  },
  {
    name: "Historical",
    description: "Ancient sites and rich heritage",
    tourCount: "60+ tours",
    icon: FiCastle,
    href: "/tours?category=Historical",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80",
  },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-700">
          <FiTrendingUp className="h-3.5 w-3.5" />
          TRENDING CATEGORIES
        </span>
        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          Explore by Category
        </h2>
        <p className="mt-3 max-w-xl text-slate-600">
          Find the perfect trip based on your travel style — from tropical
          shores to ancient wonders.
        </p>
      </div>

      {/* Grid - full width cards, 1 col mobile, 2 col tablet+desktop */}
      <div className="mt-14 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-3xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:h-80 lg:h-96"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url('${cat.image}')` }}
            />

            {/* Overlay gradient - darker for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 transition-all duration-500 group-hover:from-slate-900/70 group-hover:via-slate-900/50 group-hover:to-teal-900/85" />

            {/* Tour count badge - top */}
            <div className="absolute top-5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              {cat.tourCount}
            </div>

            {/* Centered content */}
            <div className="relative flex flex-col items-center px-6 text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-teal-400 group-hover:bg-teal-500">
                <cat.icon className="h-7 w-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                {cat.name}
              </h3>

              {/* Description */}
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-200">
                {cat.description}
              </p>

              {/* CTA - appears on hover */}
              <div className="mt-5 flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:bg-teal-500 group-hover:opacity-100">
                Explore Now
                <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-teal-400 transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </div>

      
    </section>
  );
}