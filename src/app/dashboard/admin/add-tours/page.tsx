"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiImage,
  FiClock,
  FiTag,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import toast from "react-hot-toast";
import { createAddTour } from "@/lib/actions/add-ture";

const CATEGORIES = ["Beach", "Adventure", "Hill", "Historical"] as const;

type TourFormState = {
  title: string;
  category: string;
  destination: string;
  startDate: string;
  duration: string;
  price: string;
  groupSize: string;
  image: string;
  shortDescription: string;
  description: string;
};

const initialForm: TourFormState = {
  title: "",
  category: "Beach",
  destination: "",
  startDate: "",
  duration: "",
  price: "",
  groupSize: "",
  image: "",
  shortDescription: "",
  description: "",
};

export default function AddTourPage() {
  const router = useRouter();

  const [form, setForm] = useState<TourFormState>(initialForm);
  const [gallery, setGallery] = useState<string[]>([""]);
  const [included, setIncluded] = useState<string[]>([""]);
  const [excluded, setExcluded] = useState<string[]>([""]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof TourFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList([...list, ""]);
  };

  const removeListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!form.title || !form.destination || !form.price || !form.image) {
    setError("Please fill in all required fields.");
    toast.error("Please fill in all required fields.");
    return;
  }

  setIsLoading(true);

  try {
    const payload = {
      ...form,
      price: Number(form.price),
      rating: 0,
      gallery: gallery.filter((g) => g.trim() !== ""),
      included: included.filter((i) => i.trim() !== ""),
      excluded: excluded.filter((ex) => ex.trim() !== ""),
    };

    const result = await createAddTour(payload);

    if (result?.insertedId || result?.acknowledged) {
      setSuccess("Tour added successfully! Redirecting...");
      toast.success("Tour added successfully!");

      setTimeout(() => {
        router.push("/all-tours");
        router.refresh();
      }, 1200);
    } else {
      setError("Something went wrong while adding the tour.");
      toast.error("Something went wrong while adding the tour.");
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add tour. Please try again.";
    setError(message);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700">
          <FiTag className="h-3.5 w-3.5" />
          AGENCY DASHBOARD
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Add a New Tour Package
        </h1>
        <p className="mt-2 text-slate-500">
          Fill in the details below to list a new tour for travelers
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Basic Info */}
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Basic Information
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">
                Tour Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Cox's Bazar Beach Escape"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Destination *
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <FiMapPin className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cox's Bazar, Bangladesh"
                  value={form.destination}
                  onChange={(e) =>
                    handleChange("destination", e.target.value)
                  }
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Schedule */}
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Pricing & Schedule
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">
                Price (USD) *
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <FiDollarSign className="h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  placeholder="199"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Start Date *
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <FiCalendar className="h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Duration *
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <FiClock className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="3 Days 2 Nights"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Group Size
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <FiUsers className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Max 15 people"
                  value={form.groupSize}
                  onChange={(e) => handleChange("groupSize", e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h2 className="text-base font-bold text-slate-900">Images</h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">
                Main Image URL *
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                <FiImage className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Gallery Images (optional)
              </label>
              <div className="mt-1 space-y-2">
                {gallery.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="https://example.com/gallery-image.jpg"
                      value={url}
                      onChange={(e) =>
                        updateListItem(
                          gallery,
                          setGallery,
                          index,
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
                    />
                    {gallery.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(gallery, setGallery, index)
                        }
                        className="shrink-0 text-slate-400 hover:text-red-500"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(gallery, setGallery)}
                  className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  <FiPlus className="h-3.5 w-3.5" /> Add another image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-base font-bold text-slate-900">Description</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700">
                Short Description *
              </label>
              <textarea
                rows={2}
                placeholder="A brief one-liner shown on the tour card"
                value={form.shortDescription}
                onChange={(e) =>
                  handleChange("shortDescription", e.target.value)
                }
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700">
                Full Description *
              </label>
              <textarea
                rows={5}
                placeholder="Detailed overview of the tour experience"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Included / Excluded */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-1.5 text-base font-bold text-slate-900">
              <FiCheckCircle className="h-4 w-4 text-teal-600" />
              What&apos;s Included
            </h2>
            <div className="mt-3 space-y-2">
              {included.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Hotel accommodation"
                    value={item}
                    onChange={(e) =>
                      updateListItem(
                        included,
                        setIncluded,
                        index,
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-teal-500"
                  />
                  {included.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeListItem(included, setIncluded, index)
                      }
                      className="shrink-0 text-slate-400 hover:text-red-500"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(included, setIncluded)}
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                <FiPlus className="h-3.5 w-3.5" /> Add item
              </button>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-1.5 text-base font-bold text-slate-900">
              <FiXCircle className="h-4 w-4 text-red-500" />
              What&apos;s Excluded
            </h2>
            <div className="mt-3 space-y-2">
              {excluded.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Airfare"
                    value={item}
                    onChange={(e) =>
                      updateListItem(
                        excluded,
                        setExcluded,
                        index,
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-teal-500"
                  />
                  {excluded.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeListItem(excluded, setExcluded, index)
                      }
                      className="shrink-0 text-slate-400 hover:text-red-500"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(excluded, setExcluded)}
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                <FiPlus className="h-3.5 w-3.5" /> Add item
              </button>
            </div>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-600">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-teal-600 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 disabled:opacity-60"
        >
          {isLoading ? "Publishing Tour..." : "Publish Tour"}
        </button>
      </form>
    </section>
  );
}