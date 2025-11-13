// src/sections/FeaturedOn.tsx
import React from "react";

type Outlet = { src: string; alt: string; href?: string };

type Props = {
  title?: string;
  subtitle?: string;
  outlets: Outlet[];
  ctaHref?: string;
  /** light = textos oscuros (fondo claro) | dark = textos blancos (fondo coloreado/oscuro) */
  theme?: "light" | "dark";
};

export default function FeaturedOn({
  title = "Featured On",
  subtitle = "Media coverage and interviews.",
  outlets,
  ctaHref = "/press",
  theme = "light",
}: Props) {
  const isDark = theme === "dark";

  const titleClass = isDark ? "text-white" : "text-neutral-900";
  const subtitleClass = isDark ? "text-white/85" : "text-neutral-600";

  // Logos más grandes y nítidos, sin mezcla con el fondo
  const logoClass = [
    "mx-auto w-auto h-auto",
    "max-h-16 sm:max-h-20 md:max-h-24", // ⬅️ tamaños aumentados
    "max-w-[240px]",                   // evita estirarse demasiado en ancho
    "object-contain",
    "transition-opacity opacity-95 hover:opacity-100",
    "mix-blend-normal",
  ].join(" ");

  // CTA con contraste por tema
  const ctaClass = isDark
    ? "inline-flex h-11 px-6 items-center justify-center rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-white text-white hover:bg-white hover:text-[#E43C31] transition-colors shadow-sm"
    : "inline-flex h-11 px-6 items-center justify-center rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-[#E43C31] text-[#E43C31] hover:bg-[#E43C31] hover:text-white transition-colors shadow-sm";

  return (
    <section id="press" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className={`font-serif text-3xl sm:text-4xl font-extrabold tracking-tight ${titleClass}`}>
          {title}
        </h2>
        {subtitle && <p className={`mt-2 ${subtitleClass}`}>{subtitle}</p>}

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 sm:gap-12 items-center">
          {outlets.map((o, i) => {
            const img = (
              <img
                src={o.src}
                alt={o.alt}
                className={logoClass}
                loading="lazy"
                decoding="async"
              />
            );
            return (
              <div key={i} className="flex items-center justify-center">
                {o.href ? (
                  <a
                    href={o.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={o.alt}
                    className="inline-block"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <a href={ctaHref} className={ctaClass}>
            See all press & request an interview
          </a>
        </div>
      </div>
    </section>
  );
}
