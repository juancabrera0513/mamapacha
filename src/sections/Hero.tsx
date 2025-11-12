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
      /* Descontamos SIEMPRE la altura del header (con fallback) */
      style={{ paddingTop: "var(--header-h, 72px)" }}
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
            "hero-img", // <- usaremos CSS por aspect-ratio
            "absolute inset-0 h-full w-full object-cover select-none",
          ].join(" ")}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </picture>

      {/* Scrim suave (no cambia el look) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/0" />

      {/* CTAs anclados al borde inferior, con margen adaptativo para no pisar el texto del arte */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 flex-1">
        <div className="h-full flex items-end">
          <div
            className="w-full"
            style={{
              // margen inferior adaptativo por viewport y respeta safe-area
              paddingBottom:
                "max(env(safe-area-inset-bottom), clamp(1.25rem, 6svh, 5rem))",
            }}
          >
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
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

      {/* Reglas específicas por aspect-ratio (centra en móviles, desplaza en pantallas anchas) */}
      <style>{`
        /* móvil/ventanas altas: mantenemos centro para no cortar la cara */
        @media (max-aspect-ratio: 4/3) {
          .hero-img { object-position: center center; }
        }
        /* desktop estándar 16:9: movemos un poco a la derecha (rostro a la izquierda) */
        @media (min-aspect-ratio: 4/3) {
          .hero-img { object-position: 70% center; }
        }
        /* ultrawide y/o zoom con viewport "chico": movemos un poco más */
        @media (min-aspect-ratio: 21/9) {
          .hero-img { object-position: 75% center; }
        }
      `}</style>
    </section>
  );
}
