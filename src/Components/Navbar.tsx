"use client";

import { useState } from "react";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const isLoggedIn = !isPending && !!session;

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
    <nav className="w-full border-b bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center md:grid-cols-3">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-800"
        >
          <FiCompass className="text-2xl text-primary" />
          TripNest
        </Link>

        {/* Center: Nav links (desktop only) */}
        <div className="hidden items-center justify-center gap-8 md:flex whitespace-nowrap">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "relative font-semibold text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary"
                    : "text-gray-600 transition-colors hover:text-primary"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Auth buttons (desktop) + mobile menu toggle */}
        <div className="flex items-center justify-end gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 md:block"
            >
              Logout
            </button>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/signin"
                className="rounded-full border border-emerald-500 px-5 py-2 text-sm font-medium text-emerald-600 shadow-sm transition-colors hover:bg-emerald-50"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mt-3 flex flex-col gap-3 border-t pt-3 md:hidden">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={
                  isActive
                    ? "font-semibold text-primary"
                    : "text-gray-600 hover:text-primary"
                }
              >
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
              className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full border border-emerald-500 px-5 py-2 text-center text-sm font-medium text-emerald-600 shadow-sm hover:bg-emerald-50"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-[#009689] px-5 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
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