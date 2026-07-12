import { TTour } from "@/types/tours";
import { Link } from "@heroui/react";
import { FiMapPin, FiStar, FiCalendar, FiArrowRight } from "react-icons/fi";
// import { TTour } from "@/types/tour";

type TourCardProps = {
  tour: TTour;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
   
    <div className="p-1  bg-orange-300 rounded-[32px]"> 
      <div className="group flex h-[440px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10">
        
        {/* Image Section */}
        <div className="relative h-56 w-full flex-shrink-0 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 backdrop-blur-sm">
            {tour.category}
          </span>

          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <FiStar className="h-3 w-3 fill-coral-400 text-coral-400" />
            {tour.rating ? tour.rating.toFixed(1) : "New"}
          </span>

          {/* Price tag - এখানে পরিবর্তন করা হয়েছে যাতে আরও স্পষ্ট দেখা যায় */}
          <div className="absolute bottom-4 right-4 z-10 rounded-2xl bg-teal-600 px-5 py-2 shadow-lg ring-2 ring-white">
            <span className="text-[10px] font-medium text-teal-100 block">
              From
            </span>
            <p className="text-xl font-bold leading-none text-white">
              ${tour.price}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
          <div className="flex items-center gap-1 text-xs font-medium text-teal-600">
            <FiMapPin className="h-3.5 w-3.5" />
            {tour.destination}
          </div>

          <h3 className="mt-2 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-700">
            {tour.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {tour.shortDescription}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <FiCalendar className="h-3.5 w-3.5" />
            {tour.startDate} · {tour.duration}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
            <Link
              href={`/all-tours/${tour._id}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors group-hover:text-teal-700"
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