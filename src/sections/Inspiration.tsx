// src/sections/Inspiration.tsx
import React from "react";
import { Link } from "react-router-dom";

const BRAND_RED = "#E7303A"; // rojo de marca usado en el resto del sitio

export default function Inspiration() {
  return (
    <section id="inspiration" className="relative">
      {/* Fondo sólido (ligeramente más oscuro para diferenciar del texto rojo) */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: "#E43C31" }} />

      <div className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
        {/* Card principal (blanca) */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-md ring-1 ring-black/10 shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Columna de TEXTO */}
            <div className="p-6 sm:p-8 flex flex-col">
              {/* Chip/etiqueta */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold tracking-wider"
                style={{
                  color: BRAND_RED,
                  border: `1px solid ${BRAND_RED}30`,
                  backgroundColor: `${BRAND_RED}1A`, // ~10% opacidad
                }}
              >
                OUR ROOTS
              </div>

              <h2
                className="mt-3 font-serif text-3xl sm:text-4xl leading-tight"
                style={{ color: BRAND_RED }}
              >
                Meet our inspiration{" "}
                <span className="relative inline-block font-extrabold">
                  Mama Pacha
                  <span
                    className="absolute left-0 -bottom-1 h-2 w-full rounded"
                    style={{ backgroundColor: `${BRAND_RED}33` }}
                  />
                </span>
              </h2>

              <div className="mt-5 grow">
                <p
                  className="text-justify text-[15px] sm:text-base leading-7 sm:leading-8"
                  style={{ color: BRAND_RED }}
                >
                  <span className="font-extrabold">Rooted in family tradition</span>, our
                  culinary journey draws from the fresh ingredients and rich flavors inspired by my
                  mother, Patria—affectionately known as <span className="font-extrabold">Mama Pacha</span>.
                  What began as a mission to support families with e-learning devices during the pandemic
                  has evolved into <span className="font-extrabold">Mama Pacha Sabor</span>, where we continue
                  giving back. We proudly offer delicious, <span className="font-extrabold">preservative-free,
                  salt-free</span> blended seasonings and traditional Puerto Rican catering for your next
                  celebration!
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/about"
                  className="inline-flex h-11 px-6 items-center justify-center rounded-full text-sm sm:text-base font-bold tracking-wider transition-colors shadow-sm"
                  style={{
                    color: BRAND_RED,
                    border: `2px solid ${BRAND_RED}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.style.backgroundColor = BRAND_RED),
                      (e.currentTarget.style.color = "#fff");
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.style.backgroundColor = "transparent"),
                      (e.currentTarget.style.color = BRAND_RED);
                  }}
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Columna de IMAGEN */}
            <div className="relative min-h-[320px] md:min-h-0">
              <img
                src="/brand/inspiration.jpg"
                alt="Patria (Mama Pacha) con su hija — nuestra inspiración"
                className="absolute inset-0 h-full w-full object-contain md:object-cover rounded-none"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 ring-1 ring-black/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  