
import Pagination from "@/Components/Pagination";
import TourCard from "@/Components/TourCard";
import ToursFilterBar from "@/Components/ToursFilterBar";
import { getAllTours } from "@/lib/api/added-tours";

type SearchParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};

type AllToursPageProps = {
  searchParams: Promise<SearchParams>;
};

const AllToursPage = async ({ searchParams }: AllToursPageProps) => {
  const params = await searchParams;

  const { tours, total, page, totalPages } = await getAllTours({
    search: params.search,
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    sort: params.sort,
    page: params.page,
  });

  return (
    <section className="mx-auto bg-[#F5F5DC] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Explore Tours</h1>
        <p className="mt-2 text-slate-500">
          Discover handpicked tour packages for your next adventure
        </p>
      </div>

      {/* ToursFilterBar পরে এখানে বসবে */}
        <ToursFilterBar />

      <p className="mb-4 text-sm text-slate-500">
        Showing {tours.length} of {total} tours
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>

      {tours.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No tours available right now.
        </p>
      )}

      {/* Pagination পরে এখানে বসবে, totalPages ব্যবহার করে */}
     <Pagination currentPage={page} totalPages={totalPages} ></Pagination>
    </section>
  );
};

export default AllToursPage;