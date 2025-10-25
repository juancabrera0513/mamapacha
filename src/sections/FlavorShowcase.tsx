import React from "react";

type Props = {
  videoId: string;              // ID o URL de YouTube
  title?: string;
  images?: string[];            // 6 PNGs decorativos
  pressHref?: string;           // "/press" o "#press"
};

const defaultImages = [
  "/decor/decor1.png",
  "/decor/decor2.png",
  "/decor/decor3.png",
  "/decor/decor4.png",
  "/decor/decor5.png",
  "/decor/decor6.png",
];

function getYouTubeId(input: string): string {
  if (!input) return "";
  const m =
    input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/) ||
    input.match(/^([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : input;
}

export default function FlavorShowcase({
  videoId,
  title = "Flavor in Motion",
  images = defaultImages,
  pressHref = "/press",
}: Props) {
  const id = getYouTubeId(videoId);

  return (
    <section id="flavor-showcase" className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-center text-neutral-600">
          A quick peek at our kitchen, spices, and tradition.
        </p>

        {/* Tarjeta del video (el iframe va un poco "retraído" con margin interno) */}
        <div className="relative mt-10 mx-auto max-w-4xl rounded-2xl ring-1 ring-black/10 shadow-xl bg-black/90 overflow-visible">
          {/* Decoraciones pequeñas por encima (no capturan clics) */}
          <DecorOverlaySmall images={images} />

          {/* El iframe se hace un poquito más pequeño con m-4/6/8 */}
          <div className="relative z-0 m-4 sm:m-6 md:m-8 rounded-xl overflow-hidden bg-black">
            <div className="aspect-video">
              <iframe
                className="block h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&modestbranding=1&rel=0`}
                title="Mama Pacha — video"
                allow="autoplay; fullscreen; picture-in-picture; accelerometer; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen
                frameBorder={0}
              />
            </div>
          </div>
        </div>

        {/* CTA Press */}
        <div className="mt-8 flex justify-center">
          <a
            href={pressHref}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition-colors shadow-sm"
            aria-label="Go to Press & Interviews"
          >
            Press & Interviews
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
/** Decoraciones pequeñas en mobile y GRANDES en desktop.
 *  Visibles en móvil/tablet (no cortadas), y más “afuera” en desktop.
 *  No bloquean clics (pointer-events-none). */
function DecorOverlaySmall({ images }: { images: string[] }) {
  const srcs = [...images, ...Array(6)].slice(0, 6) as string[];

  return (
    <>
      <style>{`
        @keyframes floatA { 0% { transform: translateY(0) } 50% { transform: translateY(-7px) } 100% { transform: translateY(0) } }
        @keyframes floatB { 0% { transform: translateY(0) } 50% { transform: translateY(9px) } 100% { transform: translateY(0) } }
        @media (min-width: 768px) {
          @keyframes floatA { 0% { transform: translateY(0) } 50% { transform: translateY(-16px) } 100% { transform: translateY(0) } }
          @keyframes floatB { 0% { transform: translateY(0) } 50% { transform: translateY(18px) } 100% { transform: translateY(0) } }
        }
        @media (prefers-reduced-motion: reduce) { .anim-float { animation: none !important } }
      `}</style>

      {/* TOP corners */}
      <img
        src={srcs[0]} alt="" aria-hidden
        className="
          pointer-events-none absolute z-10 top-2
          left-0 -translate-x-[10%]            /* móvil: se asoma sin cortar */
          sm:-left-6 sm:translate-x-0          /* tablet: un poco más afuera */
          md:-left-20                          /* desktop: como te gustaba */
          w-10 sm:w-12 md:w-28
          drop-shadow-xl anim-float
        "
        style={{ animation: "floatA 5.8s ease-in-out infinite" }}
      />
      <img
        src={srcs[3]} alt="" aria-hidden
        className="
          pointer-events-none absolute z-10 top-2
          right-0 translate-x-[10%]
          sm:-right-6 sm:translate-x-0
          md:-right-20
          w-10 sm:w-12 md:w-28
          drop-shadow-xl anim-float
        "
        style={{ animation: "floatB 6.2s ease-in-out infinite" }}
      />

      {/* MID sides */}
      <img
        src={srcs[1]} alt="" aria-hidden
        className="
          pointer-events-none absolute z-10 top-1/2 -translate-y-1/2
          left-0 -translate-x-[12%]
          sm:-left-8 sm:translate-x-0
          md:-left-20
          w-10 sm:w-12 md:w-32
          drop-shadow-xl anim-float
        "
        style={{ animation: "floatB 6.6s ease-in-out infinite" }}
      />
      <img
        src={srcs[4]} alt="" aria-hidden
        className="
          pointer-events-none absolute z-10 top-1/2 -translate-y-1/2
          right-0 translate-x-[12%]
          sm:-right-8 sm:translate-x-0
          md:-right-20
          w-10 sm:w-12 md:w-32
          drop-shadow-xl anim-float
        "
        style={{ animation: "floatA 7.1s ease-in-out infinite" }}
      />

      {/* BOTTOM corners */}
      <img
        src={srcs[2]} alt="" aria-hidden
        className="
          pointer-events-none absolute z-10 bottom-2
          left-0 -translate-x-[10%]
          sm:-left-6 sm:translate-x-0
          md:-left-20
          w-10 sm:w-12 md:w-28
          drop-shadow-xl anim-float
        "
        style={{ animation: "floatA 5.2s ease-in-out infinite" }}
      />
      <img
        src={srcs[5]} alt="" aria-hidden
        className="
          pointer-events-none absolute z-10 bottom-2
          right-0 translate-x-[10%]
          sm:-right-6 sm:translate-x-0
          md:-right-20
          w-10 sm:w-12 md:w-28
          drop-shadow-xl anim-float
        "
        style={{ animation: "floatB 5.6s ease-in-out infinite" }}
      />
    </>
  );
}

