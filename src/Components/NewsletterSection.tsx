"use client";

import { useState } from "react";
import { FiMail, FiCheck } from "react-icons/fi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // এখন শুধু frontend confirmation, পরে backend API যুক্ত করা যাবে
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-slate-900 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-600/20">
          <FiMail className="h-6 w-6 text-teal-400" />
        </div>

        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Get Travel Deals in Your Inbox
        </h2>
        <p className="mt-3 text-slate-300">
          Subscribe to our newsletter and be the first to know about new
          destinations and exclusive discounts.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-teal-600/10 px-4 py-3 text-teal-300">
            <FiCheck className="h-5 w-5" />
            <span className="text-sm font-medium">
              You’re subscribed! Check your inbox soon.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-teal-500 sm:w-80"
            />
            <button
              type="submit"
              className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Subscribe
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>
    </section>
  );
}