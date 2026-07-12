"use client";

import { useSession } from "@/lib/auth-client";
import { Link } from "@heroui/react";
import {
  FiMapPin,
  FiUser,
  FiPlusCircle,
  FiList,
  FiCompass,
} from "react-icons/fi";
import { ComponentType, SVGProps } from "react";

// TypeScript: Quick link item এর shape বলে দেওয়া হলো
type QuickLink = {
  label: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
};

const quickLinks: QuickLink[] = [
  {
    label: "Explore Tours",
    description: "Browse handpicked tour packages",
    icon: FiCompass,
    href: "/tours",
  },
  {
    label: "Add Tour",
    description: "List a new tour package",
    icon: FiPlusCircle,
    href: "/tours/add",
  },
  {
    label: "Manage Tours",
    description: "View, edit, or delete your tours",
    icon: FiList,
    href: "/tours/manage",
  },
];

export default function UserPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // TypeScript: Better Auth এর default session type এ `role` নেই
  // (আমরা auth.ts এ additionalFields দিয়ে যোগ করেছিলাম),
  // তাই এখানে নিরাপদ একটা fallback টাইপ বানিয়ে ব্যবহার করছি
  const role = (user as { role?: string } | undefined)?.role || "user";

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 rounded-3xl bg-slate-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/20 text-xl font-bold text-teal-300">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.name || "Traveler"}
            </h1>
            <p className="mt-1 text-sm text-slate-300">{user?.email}</p>
          </div>
        </div>

        <span className="rounded-full bg-teal-500/15 px-4 py-1.5 text-xs font-semibold text-teal-300">
          {role === "admin" ? "Admin Account" : "Member"}
        </span>
      </div>

      {/* Quick links */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Account info */}
      <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Account Details</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <FiUser className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-xs text-slate-500">Full Name</p>
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <FiMapPin className="h-5 w-5 text-teal-600" />
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <p className="text-sm font-semibold text-slate-900">
                {user?.email || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}