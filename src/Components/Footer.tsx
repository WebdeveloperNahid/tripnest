"use client";

import { Link } from "@heroui/react";
import {
  FiCompass,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Tours", href: "/tours" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Add Tour", href: "/tours/add" },
  { label: "Manage Tours", href: "/tours/manage" },
];

const categoryLinks = [
  { label: "Beach", href: "/tours?category=Beach" },
  { label: "Adventure", href: "/tours?category=Adventure" },
  { label: "Hill & Mountain", href: "/tours?category=Hill" },
  { label: "Historical", href: "/tours?category=Historical" },
];

const socials = [
  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand + Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <FiCompass className="h-6 w-6 text-teal-400" />
              <span className="text-xl font-bold text-white">TripNest</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              TripNest helps you discover handpicked tour packages and plan
              unforgettable trips with verified guides and transparent
              pricing.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 text-teal-400" />
                Gulshan-2, Dhaka, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 text-teal-400" />
                <a href="tel:+8801700000000" className="hover:text-teal-400">
                  +880 1700-000000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="h-4 w-4 text-teal-400" />
                <a
                  href="mailto:support@tripnest.com"
                  className="hover:text-teal-400"
                >
                  support@tripnest.com
                </a>
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-4 space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold text-white">Account</h4>
            <ul className="mt-4 space-y-2">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white">Categories</h4>
            <ul className="mt-4 space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TripNest. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-teal-600 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}