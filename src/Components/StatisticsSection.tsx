"use client";

import { FiMap, FiUsers, FiStar, FiGlobe } from "react-icons/fi";

const stats = [
  { label: "Tour Packages", value: "500+", icon: FiMap },
  { label: "Happy Travelers", value: "50K+", icon: FiUsers },
  { label: "Destinations", value: "80+", icon: FiGlobe },
  { label: "Average Rating", value: "4.8", icon: FiStar },
];

export default function StatisticsSection() {
  return (
    <section className="bg-teal-600 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="mt-3 text-3xl font-bold sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-teal-50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}