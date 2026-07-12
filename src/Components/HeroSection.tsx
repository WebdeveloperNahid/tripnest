"use client";

import { Link } from "@heroui/react";
import { FiArrowRight, FiSearch, FiMapPin } from "react-icons/fi";
import { useState, useEffect } from "react";

// 👉 To add more images, just add a new line here (any images.unsplash.com URL works).
// 👉 Never use plus.unsplash.com links — those are paid/premium and may not load.
const heroImages = [
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

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-[65vh] min-h-[420px] items-center justify-center overflow-hidden bg-slate-900">
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900" />

      {/* Slide Indicators */}
      <div className="absolute top-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === currentImage ? "w-8 bg-teal-400" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal-300 backdrop-blur">
          <FiMapPin className="h-4 w-4" />
          Explore 50+ Destinations Worldwide
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Discover Your Next Adventure
        </h1>

        <p className="mt-4 text-base text-slate-200 sm:text-lg">
          Handpicked tour packages, verified guides, and unforgettable
          memories — all in one place.
        </p>

        {/* Interactive Search Bar */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row">
          <div className="flex flex-1 items-center gap-2 px-3">
            <FiSearch className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              className="w-full py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
          <Link
            href={`/all-tours${destination ? `?search=${encodeURIComponent(destination)}` : ""}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Search Tours
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 flex justify-center gap-8 text-sm text-slate-300">
          <div>
            <span className="block text-xl font-bold text-white">500+</span>
            Tour Packages
          </div>
          <div>
            <span className="block text-xl font-bold text-white">50K+</span>
            Happy Travelers
          </div>
          <div>
            <span className="block text-xl font-bold text-white">4.8★</span>
            Average Rating
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
        ↓
      </div>
    </section>
  );
}