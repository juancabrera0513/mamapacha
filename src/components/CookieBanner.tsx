import React from "react";
import { useConsent } from "@/context/CookieConsent";

export default function CookieBanner() {
  const { shouldShowBanner, acceptAll, rejectAll, openPreferences } = useConsent();

  if (!shouldShowBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-4">
        <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur shadow-lg p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm text-neutral-800">
              We use cookies to improve your experience, for analytics and marketing.{" "}
              <a className="underline font-semibold" href="/policies">Learn more</a>.
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={rejectAll}
                className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm font-semibold hover:bg-neutral-50"
              >
                Reject all
              </button>
              <button
                onClick={openPreferences}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#1cbcc6] px-4 text-sm font-semibold hover:bg-neutral-50"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#E7303A] px-5 text-sm font-semibold text-white hover:bg-[#c3252e] transition"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
