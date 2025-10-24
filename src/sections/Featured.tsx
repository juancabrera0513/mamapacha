import React from "react";
import { PRESS_LOGOS } from "@/data/site";

export const Supporters: React.FC = () => {
  return (
    <section className="container-xl py-12">
      <h3 className="text-center font-semibold text-zinc-700 tracking-wide">
        FEATURED ON
      </h3>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
        {PRESS_LOGOS.map((s) => (
          <div
            key={s.src}
            className="flex h-16 sm:h-20 items-center justify-center rounded-lg bg-white/70 p-3 shadow-soft
                       grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition"
            title={s.alt}
          >
            <img src={s.src} alt={s.alt} className="max-h-full w-full object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};
