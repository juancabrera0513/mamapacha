import React from "react";

type Logo = { src: string; alt: string; href?: string };

type Props = {
  title?: string;
  subtitle?: string;
  logos: Logo[]; // idealmente 6 items
};

export default function SupportedBy({
  title = "Proudly Supported By",
  subtitle = "Partners and organizations that lift our mission.",
  logos,
}: Props) {
  // Garantiza 6 elementos para un grid 3x2 parejo en sm+
  const items = (logos ?? []).slice(0, 6);

  return (
    <section id="supported" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-neutral-600">{subtitle}</p>}

        <div
          className={[
            "mt-10",
            // Mobile: 2 cols; Desktop: 3 cols × 2 filas fijas
            "grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-2",
            // separaciones y centrado uniforme
            "gap-8 sm:gap-10 place-items-center",
          ].join(" ")}
        >
          {items.map((l, i) => {
            const img = (
              <img
                src={l.src}
                alt={l.alt}
                className={[
                  "mx-auto object-contain",
                  // Logos grandes
                  "h-16 sm:h-20 md:h-24",
                  // Sutil realce al hover
                  "opacity-90 hover:opacity-100 transition-opacity",
                  // Ayuda a mezclar fondos blancos de algunos logos
                  "mix-blend-multiply",
                ].join(" ")}
                loading="lazy"
                decoding="async"
              />
            );

            return (
              <div
                key={i}
                className={[
                  // Celda con altura mínima para alinear todas las filas
                  "w-full flex items-center justify-center",
                ].join(" ")}
              >
                {l.href ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={l.alt}
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
      </div>
    </section>
  );
}
