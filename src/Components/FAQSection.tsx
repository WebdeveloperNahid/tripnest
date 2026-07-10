"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How do I book a tour package?",
    answer:
      "Simply browse our Explore Tours page, choose a package that fits your plan, and click 'View Details' to see the full itinerary. Once you're logged in, you can proceed with booking directly from the details page.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, most tour packages allow free cancellation up to 48 hours before the start date. Specific cancellation policies are listed on each tour's details page under Key Information.",
  },
  {
    question: "Are the prices shown final, or are there hidden fees?",
    answer:
      "All prices displayed on TripNest are final and include guide fees, unless stated otherwise in the 'Excluded' section of a tour. We never add hidden charges at checkout.",
  },
  {
    question: "Do I need an account to browse tours?",
    answer:
      "No, you can browse and view tour details without an account. However, creating a free account lets you save favorites, leave reviews, and manage your bookings easily.",
  },
  {
    question: "How can I become a tour organizer on TripNest?",
    answer:
      "After creating an account, you can list your own travel packages using the 'Add Tour' option in your dashboard. Our team reviews each listing before it goes live.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to know before you book
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-900 sm:text-base">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-teal-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}