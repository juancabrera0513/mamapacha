// src/sections/Hero.tsx
import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Mama Pacha hero"
      className={[
        "relative",
        "min-h-[88svh] sm:min-h-[90svh]",  // altura generosa para móvil
        "w-full overflow-hidden",
        "bg-[#1cbcc6]",                     // usa bg-transparent si tu PNG ya trae fondo
        "flex",                             // para anclar contenido abajo
      ].join(" ")}
    >
      {/* Fondo responsive: versión mobile opcional y desktop por defecto */}
      <picture>
        <source srcSet="/brand/logo2-mobile.png" media="(max-width: 640px)" />
        <img
          src="/brand/logo2.png"
          alt="" aria-hidden="true"
          width={1920} height={1080}
          className={[
            "absolute inset-0 h-full w-full object-cover select-none",
            "object-center md:object-[75%_center]", // centra en móvil, desplaza a la derecha en desktop
          ].join(" ")}
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 640px) 100vw, 100vw"
        />
      </picture>

      {/* Contenido (botones) pegado al borde inferior */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 flex-1">
        <div className="h-full flex items-end">
          {/* Subimos un poco los botones y añadimos safe-area en iOS */}
          <div className="w-full pb-14 sm:pb-16 md:pb-20 lg:pb-24 pb-[env(safe-area-inset-bottom)]">
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end mb-6 sm:mb-10">
              {/* SHOP SPICES */}
              <a
                href="#shop"
                className={[
                  "inline-flex h-11 px-6 items-center justify-center rounded-full",
                  "text-base font-bold tracking-wider", // más grande en móvil + tracking más amplio
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
