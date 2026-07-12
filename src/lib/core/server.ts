"use server";
// import { TTour } from "@/types/tours";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7000";

//ServerFetch -- GET
export const serverFetch = async <T = unknown>(
  path: string,
): Promise<T | null> => {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

  return res.json();
};

//ServerMUtation -- POST can Update ,delete
export const serverMutation = async <T = unknown>(
  path: string,
  data: unknown,
  method: string = "POST",
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  // if (res.status === 401) {
  //   redirect("/signin");
  // } else if (res.status === 403) {
  //   redirect("/unauthorized");
  // }
  return res.json();
  // return handleStatus(res);
};
