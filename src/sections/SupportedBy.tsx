import React from "react";

type Logo = { src: string; alt: string; href?: string };

type Props = {
  title?: string;
  subtitle?: string;
  logos: Logo[];
};

export default function SupportedBy({
  title = "Proudly Supported By",
  subtitle = "Partners and organizations that lift our mission.",
  logos,
}: Props) {
  return (
    <section id="supported" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-neutral-600">{subtitle}</p>
        )}

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {logos.map((l, i) => {
            const img = (
              <img
                src={l.src}
                alt={l.alt}
                className="mx-auto h-10 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                decoding="async"
              />
            );
            return (
              <div key={i} className="flex items-center justify-center">
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noreferrer noopener" aria-label={l.alt}>
                    {img}
                  </a>
                ) : img}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
