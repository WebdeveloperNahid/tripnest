import Link from "next/link";
import { Compass } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Compass className="mb-6 size-16 text-teal-600" />

      <h1 className="text-6xl font-bold text-slate-900">404</h1>

      <h2 className="mt-2 text-xl font-semibold text-slate-700">
        Page not found
      </h2>

      <p className="mt-3 max-w-sm text-sm text-slate-500">
        The page you are looking for doesnot exist or may have been moved.
        Lets get you back on track.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          Back to Home
        </Link>
        <Link
          href="/dashboard/manage-tours"
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}