import { TTour } from "@/types/tours";
import { Link } from "@heroui/react";
import { FiMapPin, FiStar, FiCalendar, FiArrowRight } from "react-icons/fi";
import { COLORS } from "@/lib/theme";

type TourCardProps = {
  tour: TTour;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="group relative">
      {/* Gradient glow ring — hidden by default, fades in behind the card on hover.
          This is the card's one signature flourish; everything else stays quiet. */}
      <div
        className="absolute -inset-[3px] rounded-[30px] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background: `linear-gradient(135deg, ${COLORS.ocean}, ${COLORS.coral})`,
        }}
      />

      <div className="relative flex h-[440px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-slate-900/10">
        {/* Image Section */}
        <div className="relative h-56 w-full flex-shrink-0 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

          {/* Category badge */}
          <span
            className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
            style={{ color: COLORS.ocean }}
          >
            {tour.category}
          </span>

          {/* Rating badge */}
          <span
            className="absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            style={{ backgroundColor: "rgba(11,61,59,0.82)" }}
          >
            <FiStar className="h-3 w-3" fill={COLORS.gold} style={{ color: COLORS.gold }} />
            {tour.rating ? tour.rating.toFixed(1) : "New"}
          </span>

          {/* Price tag — coral so it reads as "the number that matters", floats over the seam */}
          <div
            className="absolute bottom-4 right-4 z-10 rounded-2xl px-5 py-2 shadow-lg ring-2 ring-white transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
            }}
          >
            <span className="block text-[10px] font-medium text-white/80">
              From
            </span>
            <p className="text-xl font-bold leading-none text-white">
              ${tour.price}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
          <div
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: COLORS.ocean }}
          >
            <FiMapPin className="h-3.5 w-3.5" />
            {tour.destination}
          </div>

          <h3
            className="mt-2 line-clamp-1 text-lg font-bold transition-colors duration-300"
            style={{ color: COLORS.ink }}
          >
            {tour.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: COLORS.inkMuted }}>
            {tour.shortDescription}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: COLORS.inkMuted }}>
            <FiCalendar className="h-3.5 w-3.5" />
            {tour.startDate} · {tour.duration}
          </div>

          <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: COLORS.ocean50 }}>
            <Link
              href={`/all-tours/${tour._id}`}
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300"
              style={{ color: COLORS.ocean }}
            >
              View Details
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}