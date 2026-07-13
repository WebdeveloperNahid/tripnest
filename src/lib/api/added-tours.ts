"use server";

import { TTour } from "@/types/tours";
import { protectedFetch, serverFetch } from "../core/server";

// Get -- All Tours --->   /// after added Search & pagination for has some change ---->>
export type TourFilters = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};

type TToursResponse = {
  tours: TTour[];
  total: number;
  page: number;
  totalPages: number;
};

export const getAllTours = async (
  filters: TourFilters = {}
): Promise<TToursResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", filters.page);

  const query = params.toString();
  const data = await protectedFetch<TToursResponse>(
    `/api/add-tours${query ? `?${query}` : ""}`,
    `/all-tours${query ? `?${query}` : ""}`
  );

  return data ?? { tours: [], total: 0, page: 1, totalPages: 1 };
};

//--------------------------------------<<<----

// Get -- Single Tour By ID
export const getTourById = async (id: string): Promise<TTour | null> => {
  const data = await protectedFetch<TTour>(
    `/api/add-tours/${id}`,
    `/all-tours/${id}` // 👈 এই লাইনটা যোগ করো
  );
  return data ?? null;
};

// Get -- Latest 6 Tours (for Home page "Latest Tours" section)
export const getLatestTours = async (): Promise<TTour[]> => {
  const data = await serverFetch<TTour[]>(`/api/add-tours/latest`);
  return data ?? [];
};
// export const getTourById = async (id: string): Promise<TTour | null> => {
//   return serverFetch<TTour>(`/api/add-tours/${id}`);
// };


// import { TTour } from "@/types/tour";
// import { serverFetch } from "../core/server";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getAllTours = async (): Promise<TTour[]> => {
//   const res = await fetch(`${baseUrl}/api/add-tours`, {
//     cache: "no-store",
//   });

//   return res.json();
// };