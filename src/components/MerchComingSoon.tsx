// src/components/MerchComingSoon.tsx
import React from "react";

export default function MerchComingSoon() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/95 ring-1 ring-black/5 shadow-md p-6 sm:p-8">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-[#E43C31]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-[#1cbbc7]/15 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Icono / badge */}
        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-2xl bg-[#1cbbc7] text-white shadow-lg shadow-[#1cbbc7]/40">
          <span className="text-3xl">🧵</span>
        </div>

        {/* Texto */}
        <div className="flex-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Merch collection coming soon
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 max-w-xl">
            We’re putting the final touches on our <strong>aprons</strong>,{" "}
            <strong>chef coats</strong> and more ways to wear the{" "}
            <span className="text-[#E43C31] font-semibold">Mama Pacha</span> spirit.
            Sign up to be the first to know when merch drops.
          </p>

          {/* Mini “benefits” row */}
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-neutral-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1">
              <span className="text-[10px]">✨</span> Limited drops
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1">
              <span className="text-[10px]">🧵</span> Designed for cooks
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1">
              <span className="text-[10px]">🌎</span> Brand you can wear
            </span>
          </div>

          {/* Call to action */}
          <form
            className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = fd.get("email");
              const subject = encodeURIComponent("Merch — Notify me");
              const body = encodeURIComponent(
                `Hi Mama Pacha!\n\nI'd love to be notified when merch is available.\n\nEmail: ${email}\n\nThank you!`
              );
              window.open(
                `mailto:hola@mamapachasabor.com?subject=${subject}&body=${body}`,
                "_blank"
              );
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email to get merch updates"
              className="h-11 flex-1 rounded-full border border-neutral-300 bg-white/80 px-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-[#1cbbc7]"
            />
            <button
              type="submit"
              className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#E43C31] text-white hover:bg-[#c72b27] transition shadow-sm"
            >
              Notify me
            </button>
          </form>

          <p className="mt-2 text-[11px] text-neutral-500">
            No spam. Just a quick note when new merch is ready to ship.
          </p>
        </div>
      </div>
    </div>
  );
}
