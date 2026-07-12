"use server";

import { TTour } from "@/types/tours";
import { serverFetch } from "../core/server";


export const getAllTours = async (): Promise<TTour[]> => {
  const data = await serverFetch<TTour[]>(`/api/add-tours`);
  return data ?? [];
};


export const getTourById = async (id: string): Promise<TTour | null> => {
  const data = await serverFetch<TTour>(`/api/add-tours/${id}`);
  return data ?? null;
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