"use client";

import { useMemo, useState } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiClock,
  FiStar,
  FiCheck,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { TTour } from "@/types/tours";
import BookingModal from "./Bookingmodal";
import { FaArrowAltCircleRight } from "react-icons/fa";
// import BookingModal from "./BookingModal";

type TourDetailsProps = {
  tour: TTour;
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TourDetails({ tour }: TourDetailsProps) {
  const gallery = useMemo(() => {
    const all = [tour.image, ...tour.gallery];
    return Array.from(new Set(all.filter(Boolean)));
  }, [tour.image, tour.gallery]);

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Wire this up to your real booking endpoint, e.g.:
      // await serverMutation("/api/bookings", { tourId: tour._id });
      await new Promise((resolve) => setTimeout(resolve, 900));
      setBookingSent(true);
      setIsBookingOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  pb-24">
      {/* Breadcrumb */}
      <div className="mx-auto  max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5  font-mono text-xs uppercase tracking-wide text-[#1F2421]/50">
          <span>Home</span>
          <FiChevronRight className="h-3 w-3" />
          <span>Tours</span>
          <FiChevronRight className="h-3 w-3" />
          <span className="text-[#1B4332]">{tour.category}</span>
        </nav>
      </div>

      {/* Hero gallery */}
      <div className="mx-auto mt-4 max-w-6xl  px-4 sm:px-6 lg:px-8">
        <div className="relative h-[320px] w-full overflow-hidden rounded-3xl sm:h-[420px] lg:h-[500px]">
          <img
            src={activeImage}
            alt={tour.title}
            className="h-full w-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2421]/80 via-[#1F2421]/10 to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-[#E9C46A] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#1F2421]">
            {tour.category}
          </span>

          <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-[#FAF6EF]/90 px-3 py-1.5 text-xs font-bold text-[#1F2421] backdrop-blur-sm">
            <FiStar className="h-3.5 w-3.5 fill-[#E9C46A] text-[#E9C46A]" />
            {tour.rating ? tour.rating.toFixed(1) : "New"}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <h1 className="font-serif text-3xl font-semibold text-[#FAF6EF] sm:text-4xl lg:text-5xl">
              {tour.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-[#FAF6EF]/80">
              <FiMapPin className="h-4 w-4" />
              {tour.destination}
            </p>
          </div>
        </div>

        {/* Thumbnail strip */}
        {gallery.length > 1 && (
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                  activeImage === src
                    ? "border-[#1B4332]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt="Tour gallery thumbnail"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content grid */}
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Left column */}
        <div className="space-y-10 lg:col-span-2">
          {/* Trip snapshot */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: FiCalendar, label: "Departs", value: formatDate(tour.startDate) },
              { icon: FiClock, label: "Duration", value: `${tour.duration} days` },
              { icon: FiUsers, label: "Group size", value: `${tour.groupSize} people` },
              { icon: FiMapPin, label: "Destination", value: tour.destination },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#1F2421]/10 bg-white px-4 py-3.5"
              >
                <Icon className="h-4 w-4 text-[#52796F]" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#1F2421]/50">
                  {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-[#1F2421]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1F2421]">
              Overview
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1F2421]/75">
              {tour.description}
            </p>
          </section>

          {/* Included / Excluded */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                What&apos;s included
              </h3>
              <ul className="mt-3 space-y-2.5">
                {tour.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#1F2421]/75">
                    <FiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#52796F]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                Not included
              </h3>
              <ul className="mt-3 space-y-2.5">
                {tour.excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#1F2421]/75">
                    <FiX className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C1440E]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right column — sticky booking ticket */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="relative overflow-hidden rounded-3xl bg-[#1B4332] text-[#FAF6EF] shadow-xl">
              {/* Perforation notches */}
              <div className="absolute left-1/2 top-[168px] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FAF6EF]" />
              <div className="absolute -left-3 top-[168px] h-6 w-6 -translate-y-1/2 rounded-full bg-[#FAF6EF]" />
              <div className="absolute -right-3 top-[168px] h-6 w-6 -translate-y-1/2 rounded-full bg-[#FAF6EF]" />

              <div className="px-6 pb-5 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FAF6EF]/60">
                  Boarding Pass · {tour._id.slice(-6).toUpperCase()}
                </span>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#FAF6EF]/50">
                  From
                </p>
                <p className="font-serif text-4xl font-semibold leading-none">
                  ${tour.price}
                  <span className="ml-1 text-sm font-normal text-[#FAF6EF]/60">
                    / person
                  </span>
                </p>
              </div>

              <div className="border-t border-dashed border-[#FAF6EF]/25 px-6 py-5">
                <div className="grid grid-cols-2 gap-y-3 font-mono text-xs">
                  <div>
                    <p className="text-[#FAF6EF]/50">DEPART</p>
                    <p className="mt-0.5 font-semibold">{formatDate(tour.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-[#FAF6EF]/50">DURATION</p>
                    <p className="mt-0.5 font-semibold">{tour.duration} days</p>
                  </div>
                  <div>
                    <p className="text-[#FAF6EF]/50">GROUP</p>
                    <p className="mt-0.5 font-semibold">{tour.groupSize} pax</p>
                  </div>
                  <div>
                    <p className="text-[#FAF6EF]/50">ROUTE</p>
                    <p className="mt-0.5 font-semibold">{tour.destination}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-1">
                {bookingSent ? (
                  <div className="rounded-xl bg-[#FAF6EF]/10 px-4 py-3 text-center text-sm font-semibold text-[#E9C46A]">
                    Request sent — we&apos;ll be in touch soon
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full rounded-xl bg-[#E9C46A] px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-[#1F2421] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex justify-center items-center gap-2">Sending Request <FaArrowAltCircleRight /> Book Now</span>
                  </button>
                )}
                <p className="mt-3 text-center text-[11px] leading-relaxed text-[#FAF6EF]/50">
                  Free cancellation up to 7 days before departure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        tourTitle={tour.title}
        isSubmitting={isSubmitting}
        onClose={() => setIsBookingOpen(false)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}