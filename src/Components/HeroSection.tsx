"use client";

import { Link } from "@heroui/react";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useState, useEffect } from "react";

// 👉 To add more images, just add a new line here (any images.unsplash.com URL works).
// 👉 Never use plus.unsplash.com links — those are paid/premium and may not load.
const heroImages: string[] = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVVo1hwe8IKi7zTbrotGI1iOcElaAK9c7ekgp8Y-h_cA&s=10",
  "https://images.unsplash.com/photo-1759043937434-cd264464f052?w=1600&q=80",
  "https://images.unsplash.com/photo-1764319088750-149fb68b9df1?w=1600&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddlay0ArtCYzS2FchWLAeqQdJaWAR4baW7sDX6LCVUg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzulM6BmfvmCYNQEHL_KBDpaPbpkSujs_XydmW1HNw1A&s=10",
];

// 👉 Change this number to control how fast slides change (in milliseconds).
const SLIDE_INTERVAL_MS = 3500;

// ---- Same TripNest palette used in the Navbar, kept consistent site-wide ----
const COLORS = {
  oceanDark: "#0B3D3B",
  ocean: "#0E7C7B",
  coral: "#F4623A",
  coralDark: "#DD4F2B",
  gold: "#F4A340",
};

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "500+", label: "Tour Packages" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "4.8★", label: "Average Rating" },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Clicking anywhere on the hero (outside the dots / CTA) also advances the slide
  const advanceSlide = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section
      onClick={advanceSlide}
      className="relative flex h-[65vh] min-h-[420px] cursor-pointer items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.oceanDark }}
    >
      {/* Background Image Slider */}
      {heroImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}

      {/* Ocean-tinted gradient overlay instead of plain slate, matches brand */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,61,59,0.75), rgba(11,61,59,0.45) 45%, rgba(11,61,59,0.92))",
        }}
      />

      {/* Subtle coral warmth glow — signature accent, echoes the CTA color */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: COLORS.coral }}
      />

      {/* Slide Indicators */}
      <div className="absolute left-1/2 top-6 z-10 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(index);
            }}
            aria-label={`Slide ${index + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === currentImage ? "2rem" : "0.375rem",
              backgroundColor:
                index === currentImage ? COLORS.gold : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="animate-heroFadeUp inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            color: COLORS.gold,
            animationDelay: "0ms",
          }}
        >
          <FiMapPin className="h-4 w-4" />
          Explore 50+ Destinations Worldwide
        </span>

        <h1
          className="animate-heroFadeUp mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          Discover Your Next Adventure
        </h1>

        <p
          className="animate-heroFadeUp mt-4 text-base sm:text-lg"
          style={{ color: "rgba(255,255,255,0.82)", animationDelay: "240ms" }}
        >
          Handpicked tour packages, verified guides, and unforgettable
          memories — all in one place.
        </p>

        {/* Single CTA — search bar removed, this is the one action of the hero */}
        <div
          className="animate-heroFadeUp mt-8 flex justify-center"
          style={{ animationDelay: "360ms" }}
        >
          <Link
            href="/all-tours"
            className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(244,98,58,0.55)] active:translate-y-0"
            style={{
              background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
            }}
          >
            Explore Tours
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-heroFadeUp"
              style={{ animationDelay: `${480 + i * 120}ms` }}
            >
              <span className="block text-xl font-bold" style={{ color: COLORS.gold }}>
                {stat.value}
              </span>
              {stat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
        ↓
      </div>
    </section>
  );
}