"use server";

import { TCreateTour, TMutationResponse } from "@/types/tours";
import { serverMutation } from "../core/server";

export const createAddTour = async (addTourData: TCreateTour) => {
  return serverMutation<TMutationResponse>(
    "/api/add-tours",
    addTourData,
    "POST",
  );
};

// export const createAddTour = async (addTourData: TTour) => {
//   const res = await fetch(`${baseUrl}/api/add-tours`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(addTourData),
//   });

//   return res.json();
// };
