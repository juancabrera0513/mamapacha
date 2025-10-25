// src/sections/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Mama Pacha hero"
      className={[
        "relative isolate w-full overflow-hidden",
        "min-h-[100svh]",
        "bg-[#1cbcc6]",
        "flex",
      ].join(" ")}
    >
      {/* Fondo (imagen principal hero) */}
      <picture>
        <source srcSet="/brand/logo2-mobile.png" media="(max-width: 640px)" />
        <img
          src="/brand/logo2.png"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className={[
            "absolute inset-0 h-full w-full object-cover select-none",
            // Centrado en mobile; en desktop desplazamos un poco a la derecha
            "object-center md:object-[75%_center]",
          ].join(" ")}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </picture>

      {/* Scrim opcional para legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/0" />

      {/* Contenido (CTAs) anclado al borde inferior */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 flex-1">
        <div className="h-full flex items-end">
          <div className="w-full pb-8 sm:pb-10 md:pb-12">
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
              {/* SHOP MENU & MERCH (antes: SHOP SPICES) */}
              <a
                href="#shop"
                className={[
                  "inline-flex h-11 px-6 items-center justify-center rounded-full",
                  "text-base font-semibold",
                  "bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors",
                ].join(" ")}
              >
                Shop Menu &amp; Merch
              </a>

              {/* CTA secundaria opcional */}
              <a
                href="#contact"
                className={[
                  "inline-flex h-11 px-6 items-center justify-center rounded-full",
                  "text-base font-semibold border border-white/80 text-white hover:bg-white/10 transition-colors",
                ].join(" ")}
              >
                Catering Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
