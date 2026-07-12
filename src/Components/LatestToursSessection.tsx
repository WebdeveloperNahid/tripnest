import { Link } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import TourCard from "@/Components/TourCard";
import { getLatestTours } from "@/lib/api/added-tours";

export default async function LatestToursSection() {
  const tours = await getLatestTours();

  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
            Fresh off the calendar
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Latest Tours
          </h2>
          <p className="mt-2 max-w-xl text-slate-500">
            The newest tour packages just added — be among the first to
            book your spot.
          </p>
        </div>

        
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      <div className="mt-10 flex justify-center ">
        <Link
          href="/all-tours"
          className="flex items-center gap-1.5 rounded-xl border border-teal-600 px-5 py-2.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-50"
        >
          View All Tours
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}