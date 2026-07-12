"use client";

import { useEffect } from "react";

type BookingModalProps = {
  isOpen: boolean;
  tourTitle: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function BookingModal({
  isOpen,
  tourTitle,
  isSubmitting = false,
  onClose,
  onConfirm,
}: BookingModalProps) {
  // Close on Escape key + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F2421]/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF6EF] shadow-2xl animate-[modalIn_0.25s_ease-out]">
        {/* Top stripe */}
        <div className="h-2 w-full bg-gradient-to-r from-[#1B4332] via-[#52796F] to-[#E9C46A]" />

        <div className="px-7 pb-7 pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#52796F]">
            Booking Request
          </span>

          <h2
            id="booking-modal-title"
            className="mt-2 font-serif text-2xl font-semibold leading-snug text-[#1F2421]"
          >
            Send a request for{" "}
            <span className="italic text-[#1B4332]">{tourTitle}</span>?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#1F2421]/70">
            Our travel desk will review your request and reach out within
            24 hours to confirm availability and finalize payment details.
            No charge is made at this step.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-xl border border-[#1F2421]/15 px-4 py-3 text-sm font-semibold text-[#1F2421] transition-colors hover:bg-[#1F2421]/5 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-[#1B4332] px-4 py-3 text-sm font-semibold text-[#FAF6EF] transition-colors hover:bg-[#163828] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Yes, request booking"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}