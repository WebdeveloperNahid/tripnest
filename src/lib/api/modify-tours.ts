"use server";

// import { serverFetch, serverMutation } from "./fetch"; // path তোমার প্রজেক্ট অনুযায়ী বসাও
import { DeleteResult, TTour, UpdateResult } from "@/types/tours";
import { serverFetch, serverMutation } from "../core/server";

// UPDATE
export const updateTour = async (
  id: string,
  updateData: Partial<TTour> & { userId: string },
) => {
  return serverMutation<UpdateResult>(`/api/add-tours/${id}`, updateData, "PATCH");
};

// DELETE
export const deleteTour = async (id: string, userId: string) => {
  return serverMutation<DeleteResult>(`/api/add-tours/${id}?userId=${userId}`, undefined, "DELETE");
};

// GET - শুধু নিজের Tours
export const getMyTours = async (userId: string) => {
  return serverFetch<TTour[]>(`/api/add-tours/user/${userId}`);
};