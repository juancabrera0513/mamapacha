import React from "react";

type Outlet = { src: string; alt: string; href?: string };

type Props = {
  title?: string;
  subtitle?: string;
  outlets: Outlet[];
  ctaHref?: string;
};

export default function FeaturedOn({
  title = "Featured On",
  subtitle = "Media coverage and interviews.",
  outlets,
  ctaHref = "/press",
}: Props) {
  return (
    <section id="press" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-neutral-600">{subtitle}</p>}

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {outlets.map((o, i) => {
            const img = (
              <img
                src={o.src}
                alt={o.alt}
                className="mx-auto h-9 sm:h-11 object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-[opacity,filter]"
                loading="lazy"
                decoding="async"
              />
            );
            return (
              <div key={i} className="flex items-center justify-center">
                {o.href ? (
                  <a href={o.href} target="_blank" rel="noreferrer noopener" aria-label={o.alt}>
                    {img}
                  </a>
                ) : img}
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <a
            href={ctaHref}
            className="inline-flex h-11 px-6 items-center justify-center rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition-colors shadow-sm"
          >
            See all press & request an interview
          </a>
        </div>
      </div>
    </section>
  );
}
