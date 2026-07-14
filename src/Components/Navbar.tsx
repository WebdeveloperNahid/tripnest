"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@heroui/react";
import { FiCompass, FiMenu, FiX } from "react-icons/fi";
import { signOut, useSession } from "@/lib/auth-client";

type NavLink = {
  label: string;
  href: string;
};

const loggedOutLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore Tours", href: "/all-tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const loggedInLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore Tours", href: "/all-tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// role -> dashboard path mapping
const dashboardLinks: Record<string, string> = {
  user: "/dashboard/user",
  admin: "/dashboard/admin",
};

// ---- Design tokens (TripNest travel palette) ----
// Ocean teal   -> primary brand / links / borders
// Sunset coral -> primary CTA (Sign Up)
// Warm sand    -> soft backgrounds (mobile menu)
// Ink          -> text
const COLORS = {
  oceanDark: "#0B3D3B",
  ocean: "#0E7C7B",
  oceanLight: "#14A39D",
  coral: "#F4623A",
  coralDark: "#DD4F2B",
  gold: "#F4A340",
  sand: "#FFF9F2",
  ink: "#1F2A2E",
  inkMuted: "#5B6B6E",
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const isLoggedIn = !isPending && !!session;

  // subtle elevation once the page scrolls — keeps the header feeling
  // grounded instead of a flat bar floating over content
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          window.location.href = "/";
        },
      },
    });
  };

  // base links depending on logged in/out state
  const baseLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  // build the final links array (copy so we don't mutate the const arrays)
  const links: NavLink[] = [...baseLinks];

  if (user?.email) {
    const userRole = user?.role?.toLowerCase() as string | undefined;
    links.push({
      label: "Dashboard",
      href: (userRole && dashboardLinks[userRole]) || "/dashboard",
    });
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "border-black/5 shadow-[0_4px_20px_-8px_rgba(11,61,59,0.25)]"
          : "border-transparent shadow-none"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-2 px-4 py-3 md:grid-cols-3">
        {/* Left: Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold"
          style={{ color: COLORS.oceanDark }}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ease-out group-hover:rotate-[220deg] group-hover:shadow-[0_0_0_6px_rgba(14,124,123,0.12)]"
            style={{ backgroundColor: "rgba(14,124,123,0.1)" }}
          >
            <FiCompass className="text-xl" style={{ color: COLORS.ocean }} />
          </span>
          <span className="font-serif text-xl italic tracking-tight">
            TripNest
          </span>
        </Link>

        {/* Center: Nav links (desktop only) */}
        <div className="hidden items-center justify-center gap-8 whitespace-nowrap md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[15px] font-medium transition-colors duration-300"
                style={{ color: isActive ? COLORS.ocean : COLORS.inkMuted }}
              >
                {link.label}
                <span
                  className="pointer-events-none absolute -bottom-0.5 left-1/2 h-[2.5px] -translate-x-1/2 rounded-full transition-all duration-300 ease-out group-hover:w-full"
                  style={{
                    width: isActive ? "100%" : "0%",
                    background: `linear-gradient(90deg, ${COLORS.ocean}, ${COLORS.coral})`,
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Right: Auth buttons (desktop) + mobile menu toggle */}
        <div className="flex items-center justify-end gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-8px_rgba(220,38,38,0.5)] active:translate-y-0 md:block"
              style={{
                background: "linear-gradient(135deg, #F0574D, #DC2626)",
              }}
            >
              Logout
            </button>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/signin"
                className="rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: COLORS.ocean,
                  color: COLORS.ocean,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(14,124,123,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-8px_rgba(244,98,58,0.55)] active:translate-y-0"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 md:hidden"
            style={{
              color: COLORS.oceanDark,
              backgroundColor: isMenuOpen ? "rgba(14,124,123,0.1)" : "transparent",
            }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className="grid transition-transform duration-300"
              style={{ transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="animate-navFadeSlide flex flex-col gap-1 border-t px-4 pb-4 pt-3 md:hidden"
          style={{ borderColor: "rgba(11,61,59,0.08)", backgroundColor: COLORS.sand }}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200"
                style={{
                  color: isActive ? COLORS.ocean : COLORS.ink,
                  backgroundColor: isActive ? "rgba(14,124,123,0.08)" : "transparent",
                  paddingLeft: isActive ? "1.15rem" : "0.75rem",
                }}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full"
                    style={{
                      background: `linear-gradient(180deg, ${COLORS.ocean}, ${COLORS.coral})`,
                    }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-transform duration-200 active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #F0574D, #DC2626)" }}
            >
              Logout
            </button>
          ) : (
            <div className="mt-2 flex flex-col gap-2.5">
              <Link
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full border px-5 py-2.5 text-center text-sm font-semibold transition-transform duration-200 active:scale-[0.98]"
                style={{ borderColor: COLORS.ocean, color: COLORS.ocean }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-transform duration-200 active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.coralDark})`,
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
}