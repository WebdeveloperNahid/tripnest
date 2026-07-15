"use client";

import { useEffect, useState } from "react";
import { Link } from "@heroui/react";
import {
  FiMap,
  FiDollarSign,
  FiStar,
  FiTag,
  FiPlusCircle,
  FiList,
  FiInbox,
  FiArrowRight,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { getMyTours } from "@/lib/api/modify-tours";
import { TTour } from "@/types/tours";
import { useSession } from "@/lib/auth-client";
import { COLORS } from "@/lib/theme";

type QuickAction = {
  label: string;
  description: string;
  href: string;
  icon: typeof FiPlusCircle;
};

const quickActions: QuickAction[] = [
  {
    label: "Add Tour",
    description: "Create a new tour package",
    href: "/dashboard/admin/add-tours",
    icon: FiPlusCircle,
  },
  {
    label: "Manage Tours",
    description: "Edit or remove existing tours",
    href: "/dashboard/admin/manage-tours",
    icon: FiList,
  },
  {
    label: "Booking Requests",
    description: "Review and respond to requests",
    href: "/dashboard/admin/booking-request",
    icon: FiInbox,
  },
];

export default function AdminPage() {
  const { data: session, isPending } = useSession();
  const [tours, setTours] = useState<TTour[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  useEffect(() => {
    let ignore = false;

    const fetchTours = async () => {
      if (isPending) return;

      if (!userId) {
        if (!ignore) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getMyTours(userId);
        if (!ignore) setTours(data || []);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        if (!ignore) toast.error("Failed to load your tours");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchTours();
    return () => {
      ignore = true;
    };
  }, [userId, isPending]);

  // ---- Stats derived from the real tours this admin has posted ----
  const totalTours = tours.length;
  const totalValue = tours.reduce((sum, t) => sum + (t.price || 0), 0);
  const avgRating =
    tours.length > 0
      ? tours.reduce((sum, t) => sum + (t.rating || 0), 0) / tours.length
      : 0;
  const categoryCount = new Set(tours.map((t) => t.category)).size;

  const stats = [
    { label: "Total Tours", value: String(totalTours), icon: FiMap },
    { label: "Listed Value", value: `$${totalValue.toLocaleString()}`, icon: FiDollarSign },
    { label: "Avg. Rating", value: avgRating ? avgRating.toFixed(1) : "—", icon: FiStar },
    { label: "Categories", value: String(categoryCount), icon: FiTag },
  ];

  const latestTours = [...tours].slice(-4).reverse();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm" style={{ color: COLORS.inkMuted }}>
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div>
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: COLORS.inkMuted }}
        >
          Dashboard
        </span>
        <h1
          className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: COLORS.ink }}
        >
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""} 👋
        </h1>
        <p className="mt-1 text-sm" style={{ color: COLORS.inkMuted }}>
          Here&apos;s an overview of the tours you&apos;ve listed on TripNest.
        </p>
      </div>

      {/* Stat cards — all real numbers from your posted tours */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ borderColor: COLORS.ocean50 }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: COLORS.ocean50, color: COLORS.ocean }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-2xl font-bold" style={{ color: COLORS.ink }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: COLORS.inkMuted }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="text-lg font-bold tracking-tight" style={{ color: COLORS.ink }}>
          Quick Actions
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: COLORS.ocean50 }}
              >
                <div>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: COLORS.ocean50, color: COLORS.ocean }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-semibold" style={{ color: COLORS.ink }}>
                    {action.label}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: COLORS.inkMuted }}>
                    {action.description}
                  </p>
                </div>

                <div
                  className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300"
                  style={{ color: COLORS.ocean }}
                >
                  Go
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest tours you've posted — real data, not a placeholder table */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight" style={{ color: COLORS.ink }}>
            Your Latest Tours
          </h2>
          {tours.length > 0 && (
            <Link
              href="/dashboard/admin/manage-tours"
              className="flex items-center gap-1 text-sm font-semibold transition-colors duration-300"
              style={{ color: COLORS.ocean }}
            >
              View all
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {tours.length === 0 ? (
          <div
            className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white py-14 text-center"
            style={{ borderColor: COLORS.ocean50 }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: COLORS.ocean50, color: COLORS.ocean }}
            >
              <FiMap className="h-6 w-6" />
            </span>
            <p className="mt-3 text-sm font-medium" style={{ color: COLORS.ink }}>
              You haven&apos;t posted any tours yet
            </p>
            <p className="mt-1 text-xs" style={{ color: COLORS.inkMuted }}>
              Click &quot;Add Tour&quot; above to publish your first listing.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {latestTours.map((tour) => (
              <div
                key={tour._id}
                className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: COLORS.ocean50 }}
              >
                {tour.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p
                    className="truncate font-semibold"
                    style={{ color: COLORS.ink }}
                  >
                    {tour.title}
                  </p>
                  <p className="text-sm" style={{ color: COLORS.inkMuted }}>
                    {tour.destination} · ${tour.price}
                  </p>
                  <span
                    className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: COLORS.ocean50, color: COLORS.ocean }}
                  >
                    {tour.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}