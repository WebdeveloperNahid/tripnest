"use client";

import { FiShield, FiHeadphones, FiDollarSign, FiAward } from "react-icons/fi";

const features = [
  {
    title: "Verified & Secure",
    description:
      "Every tour package is verified by our team, and all payments are protected with secure checkout.",
    icon: FiShield,
  },
  {
    title: "24/7 Support",
    description:
      "Our travel experts are available around the clock to help before, during, and after your trip.",
    icon: FiHeadphones,
  },
  {
    title: "Best Price Guarantee",
    description:
      "We work directly with local guides and operators to bring you the most competitive prices.",
    icon: FiDollarSign,
  },
  {
    title: "Handpicked Experiences",
    description:
      "Every destination is curated by travel specialists, so you only get unforgettable journeys.",
    icon: FiAward,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Why Choose TripNest
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need for a smooth and memorable journey
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                <feature.icon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}