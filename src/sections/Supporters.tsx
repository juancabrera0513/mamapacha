import React from "react";
import { SUPPORTERS } from "@/data/site";

export default function Supporters() {
  return (
    <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-center text-sm font-medium tracking-wide text-neutral-600">Featured / Supported by</h2>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
        {SUPPORTERS.map((s, idx) => (
          <img
            key={s.alt ? `supporter-${s.alt}` : `supporter-${idx}`}
            src={s.logo}
            alt={s.alt}
            className="h-10 sm:h-12 mx-auto object-contain"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
