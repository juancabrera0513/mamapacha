// src/sections/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Mama Pacha hero"
      className={[
        "relative isolate w-full overflow-hidden",
        // Alto completo para que NO se vea la siguiente sección
        "min-h-[100svh]",
        // Color de respaldo por si el PNG tarda en cargar
        "bg-[#1cbcc6]",
        // Para anclar los CTAs abajo
        "flex",
      ].join(" ")}
    >
      {/* Fondo responsive */}
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

      {/* Scrim opcional para legibilidad (puedes borrar este div si no lo quieres) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/0" />

      {/* Contenido (CTAs) anclado al borde inferior */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 flex-1">
        <div className="h-full flex items-end">
          {/* Menos padding inferior = botones más ABAJO (pegados al borde) */}
          <div className="w-full pb-6 sm:pb-8 md:pb-10 lg:pb-12 pb-[env(safe-area-inset-bottom)]">
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
              {/* SHOP SPICES */}
              <a
                href="#shop"
                className={[
                  "inline-flex h-11 px-6 items-center justify-center rounded-full",
                  "text-base font-bold tracking-wider",
                  "border-2 border-[#E7303A] text-[#E7303A]",
                  "hover:bg-[#E7303A] hover:text-white",
                  "transition-colors shadow-sm",
                ].join(" ")}
              >
                SHOP&nbsp;SPICES
              </a>

              {/* CATERING & CONTACT */}
              <a
                href="#contact"
                className={[
                  "inline-flex h-11 px-6 items-center justify-center rounded-full",
                  "text-base font-bold tracking-wider",
                  "border-2 border-white text-white",
                  "hover:bg-white hover:text-[#1cbcc6]",
                  "transition-colors shadow-sm",
                ].join(" ")}
              >
                CATERING&nbsp;&nbsp;&&nbsp;&nbsp;CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
