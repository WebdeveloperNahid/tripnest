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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;
  // console.log(session, isPending, user, "This navbar user name");
  const isLoggedIn = !isPending && !!session;

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <FiCompass className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold text-slate-900">TripNest</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === link.href ? "text-teal-600" : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User name */}
        <span className="text-green-500 font-semibold">
          <h2>Hi!</h2>
          {user?.name}
        </span>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-slate-700 transition hover:text-teal-600"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-slate-700 sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white sm:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-teal-50 text-teal-600"
                    : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-1/2 rounded-lg border border-slate-300 px-5 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-1/2 rounded-lg bg-teal-600 px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
