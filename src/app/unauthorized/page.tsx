import Link from "next/link";
import { ShieldExclamation } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <ShieldExclamation className="mb-6 size-16 text-red-500" />

      <h1 className="text-5xl font-bold text-slate-900">403</h1>

      <h2 className="mt-2 text-xl font-semibold text-slate-700">
        Access Denied
      </h2>

      <p className="mt-3 max-w-sm text-sm text-slate-500">
        You don t have permission to view this page. If you think this is a
        mistake, please contact the admin or go back to a page you have
        access to.
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