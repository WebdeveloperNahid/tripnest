"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7000";

// ---- Response এর status চেক করে redirect করা, তারপর json রিটার্ন ----
const handleStatus = async <T = unknown>(res: Response): Promise<T> => {
  if (res.status === 401) {
    redirect("/signin");
  } else if (res.status === 403) {
    redirect("/unauthorized");
  }
  return res.json();
};

// ---- AuthHeader ----
export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();

  const header: Record<string, string> = {};
  if (token) {
    header["authorization"] = `Bearer ${token}`;
  }

  return header;
};

// ---- ServerFetch -- GET (public, token লাগে না) ----
export const serverFetch = async <T = unknown>(
  path: string,
): Promise<T | null> => {
  const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  return handleStatus<T>(res);
};

// ---- ProtectedFetch -- GET (token লাগে, protected route এর জন্য) ----
export const protectedFetch = async <T = unknown>(
  path: string,
): Promise<T | null> => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: await authHeader(),
  });
  return handleStatus<T>(res);
};

// ---- ServerMutation -- POST/PATCH/DELETE ----
export const serverMutation = async <T = unknown>(
  path: string,
  data: unknown,
  method: string = "POST",
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatus<T>(res);
};