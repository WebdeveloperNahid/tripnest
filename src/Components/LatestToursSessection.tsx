import { Link } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";
import TourCard from "@/Components/TourCard";
import { getLatestTours } from "@/lib/api/added-tours";
import { COLORS } from "@/lib/theme";

export default async function LatestToursSection() {
  const tours = await getLatestTours();

  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: COLORS.coral }}
          >
            Fresh off the calendar
          </span>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: COLORS.ink }}
          >
            Latest Tours
          </h2>
          <p className="mt-2 max-w-xl" style={{ color: COLORS.inkMuted }}>
            The newest tour packages just added — be among the first to
            book your spot.
          </p>
        </div>

        {/* Desktop-only CTA, sits next to the heading */}
        <Link
          href="/all-tours"
          className="hidden shrink-0 items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EAF5F4] sm:inline-flex"
          style={{ borderColor: COLORS.ocean, color: COLORS.ocean }}
        >
          View All Tours
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      {/* Mobile-only CTA, repeated at the bottom so it's reachable after scrolling the grid */}
      <div className="mt-10 flex justify-center sm:hidden">
        <Link
          href="/all-tours"
          className="flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300"
          style={{ borderColor: COLORS.ocean, color: COLORS.ocean }}
        >
          View All Tours
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}