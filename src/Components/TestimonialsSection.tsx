"use client";

import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Ayesha Rahman",
    location: "Dhaka, Bangladesh",
    rating: 5,
    comment:
      "TripNest made planning our Cox's Bazar trip effortless. Everything from booking to the actual tour was smooth and well organized.",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Farhan Ahmed",
    location: "Chittagong, Bangladesh",
    rating: 5,
    comment:
      "The Sajek Valley package exceeded my expectations. Great guide, fair pricing, and no hidden costs. Will definitely book again.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Nusrat Jahan",
    location: "Sylhet, Bangladesh",
    rating: 4,
    comment:
      "Really smooth booking experience and responsive support team. The itinerary was well planned for a short weekend trip.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          What Our Travelers Say
        </h2>
        <p className="mt-3 text-slate-600">
          Real experiences from real TripNest travelers
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  className={`h-4 w-4 ${
                    i < t.rating ? "fill-amber-400" : "fill-none text-slate-300"
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              “{t.comment}”
            </p>

            <div className="mt-5 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}