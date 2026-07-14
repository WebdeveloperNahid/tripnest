"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
} from "react-icons/fi";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: FiMapPin,
    label: "Office Address",
    value: "Gulshan-2, Dhaka, Bangladesh",
  },
  {
    icon: FiPhone,
    label: "Phone Number",
    value: "+880 1700-000000",
  },
  {
    icon: FiMail,
    label: "Email Address",
    value: "support@tripnest.com",
  },
  {
    icon: FiClock,
    label: "Working Hours",
    value: "Sat - Thu, 9:00 AM - 7:00 PM",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    // এখানে backend endpoint যুক্ত করা যাবে পরে; আপাতত success simulate করা হচ্ছে
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setForm(initialState);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-[#01504bea]">
      {/* Hero */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 px-4 py-1.5 text-xs font-semibold text-teal-300">
            GET IN TOUCH
          </span>
          <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mt-4 text-slate-300">
            Have a question about a tour, need help with a booking, or just
            want to say hello? Reach out anytime.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">
              Contact Information
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Reach out through any of the channels below.
            </p>

            <div className="mt-6 space-y-4">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50">
                    <item.icon className="h-4.5 w-4.5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 disabled:opacity-60"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <FiSend className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}