import TourCard from "@/Components/TourCard";
import { getAllTours } from "@/lib/api/added-tours";
import { TTour } from "@/types/tours";
// import { TTour } from "@/types/tour";

const AllToursPage = async () => {
  const allToursData: TTour[] = await getAllTours();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-[#e0f5e9]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Explore Tours</h1>
        <p className="mt-2 text-slate-500">
          Discover handpicked tour packages for your next adventure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {allToursData.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      {allToursData.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No tours available right now.
        </p>
      )}
    </section>
  );
};

export default AllToursPage;