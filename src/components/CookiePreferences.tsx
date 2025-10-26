import React from "react";
import Modal from "@/components/Modal";
import { useConsent } from "@/context/CookieConsent";

export default function CookiePreferences() {
  const { open, closePreferences, consent, update, acceptAll, rejectAll } = useConsent();
  const [analytics, setAnalytics] = React.useState(consent.analytics);
  const [marketing, setMarketing] = React.useState(consent.marketing);
  const [functional, setFunctional] = React.useState(consent.functional);

  React.useEffect(() => {
    if (open) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
      setFunctional(consent.functional);
    }
  }, [open]); // eslint-disable-line

  const save = () => {
    update({ analytics, marketing, functional });
    closePreferences();
  };

  return (
    <Modal open={open} onClose={closePreferences} ariaLabel="Cookie preferences" maxWidthClass="max-w-2xl">
      <div className="p-5">
        <h3 className="text-xl font-semibold">Cookie preferences</h3>
        <p className="mt-1 text-sm text-neutral-600">
          Enable or disable non-essential cookies.{" "}
          <a className="underline font-semibold" href="/policies">Read our policy</a>.
        </p>

        <ul className="mt-5 space-y-4">
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Strictly necessary</p>
              <p className="text-sm text-neutral-600">Required for basic site functionality (always on).</p>
            </div>
            <span className="text-sm font-semibold text-neutral-500">Always on</span>
          </li>

          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Analytics</p>
              <p className="text-sm text-neutral-600">Helps us understand usage and improve the site.</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span className="w-11 h-6 bg-neutral-200 peer-checked:bg-[#41c0cc] rounded-full relative transition">
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${analytics ? "translate-x-5" : ""}`} />
              </span>
            </label>
          </li>

          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Marketing</p>
              <p className="text-sm text-neutral-600">Embeds and pixels (e.g., YouTube, Meta, TikTok).</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span className="w-11 h-6 bg-neutral-200 peer-checked:bg-[#41c0cc] rounded-full relative transition">
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${marketing ? "translate-x-5" : ""}`} />
              </span>
            </label>
          </li>

          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Functional</p>
              <p className="text-sm text-neutral-600">Non-essential helpers (maps, chat widgets, etc.).</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={functional}
                onChange={(e) => setFunctional(e.target.checked)}
              />
              <span className="w-11 h-6 bg-neutral-200 peer-checked:bg-[#41c0cc] rounded-full relative transition">
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${functional ? "translate-x-5" : ""}`} />
              </span>
            </label>
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 justify-end">
          <button
            onClick={rejectAll}
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm font-semibold hover:bg-neutral-50"
          >
            Reject all
          </button>
          <button
            onClick={acceptAll}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#E7303A] px-5 text-sm font-semibold text-white hover:bg-[#c3252e] transition"
          >
            Accept all
          </button>
          <button
            onClick={save}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#1cbcc6] px-5 text-sm font-semibold hover:bg-neutral-50"
          >
            Save preferences
          </button>
        </div>
      </div>
    </Modal>
  );
}
