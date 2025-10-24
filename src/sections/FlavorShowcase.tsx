// src/sections/FlavorShowcase.tsx
import React from "react";

type Props = {
  videoId: string;          // YouTube ID or full URL
  title?: string;
  images?: string[];        // 6 decorative PNGs
  pressHref?: string;       // e.g. "/press" or "#press"
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

        <div className="relative mt-10">
          {/* Video centrado */}
          <div className="mx-auto w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-xl bg-black">
            <div className="aspect-video overflow-hidden">
              <iframe
                className="block h-full w-full"
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`}
                title="Mama Pacha — video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder={0}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Desktop (≥md): decor visibles alrededor SIN offsets negativos */}
          <DecorOverlay images={images} />

          {/* Mobile (<md): los centrales debajo del video */}
          <DecorMobileBelow images={images} />
        </div>

        {/* CTA Press */}
        <div className="mt-8 flex justify-center">
          <a
            href={pressHref}
            className={[
              "inline-flex items-center gap-2 h-11 px-6 rounded-full",
              "text-sm sm:text-base font-bold tracking-wider",
              "border-2 border-[#E7303A] text-[#E7303A]",
              "hover:bg-[#E7303A] hover:text-white transition-colors shadow-sm",
            ].join(" ")}
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

/** Overlay decor (desktop & up) — SIN offsets negativos, usando translate en los bordes */
function DecorOverlay({ images }: { images: string[] }) {
  const srcs = [...images, ...Array(6)].slice(0, 6) as string[];

  return (
    <>
      <style>{`
        @keyframes floatyA { 0% { transform: translateY(0) rotate(0) } 50% { transform: translateY(-16px) rotate(2deg) } 100% { transform: translateY(0) rotate(0) } }
        @keyframes floatyB { 0% { transform: translateY(0) rotate(0) } 50% { transform: translateY(18px) rotate(-3deg) } 100% { transform: translateY(0) rotate(0) } }
        @media (prefers-reduced-motion: reduce) { .anim-md { animation: none !important } }
      `}</style>

      {/* Nota: visibles solo en md+ */}
      {/* LEFT — top / middle / bottom (pegados al borde con translate hacia afuera) */}
      <img
        src={srcs[0]} alt="" aria-hidden
        className="hidden md:block absolute pointer-events-none drop-shadow-2xl
                   left-0 -translate-x-[25%] top-[-60px] w-40 lg:w-56 rotate-[-6deg] anim-md"
        style={{ animation: "floatyA 5.8s ease-in-out infinite" }}
      />
      <img
        src={srcs[1]} alt="" aria-hidden
        className="hidden md:block absolute pointer-events-none drop-shadow-2xl
                   left-0 -translate-x-[30%] top-1/3 -translate-y-1/2 w-44 lg:w-60 rotate-[8deg] anim-md"
        style={{ animation: "floatyB 6.6s ease-in-out infinite" }}
      />
      <img
        src={srcs[2]} alt="" aria-hidden
        className="hidden md:block absolute pointer-events-none drop-shadow-2xl
                   left-0 -translate-x-[22%] bottom-[-60px] w-40 lg:w-56 rotate-[16deg] anim-md"
        style={{ animation: "floatyA 5.4s ease-in-out infinite" }}
      />

      {/* RIGHT — top / middle / bottom */}
      <img
        src={srcs[3]} alt="" aria-hidden
        className="hidden md:block absolute pointer-events-none drop-shadow-2xl
                   right-0 translate-x-[25%] top-[-60px] w-40 lg:w-56 rotate-[10deg] anim-md"
        style={{ animation: "floatyB 6.2s ease-in-out infinite" }}
      />
      <img
        src={srcs[4]} alt="" aria-hidden
        className="hidden md:block absolute pointer-events-none drop-shadow-2xl
                   right-0 translate-x-[30%] top-1/3 -translate-y-1/2 w-44 lg:w-60 rotate-[-8deg] anim-md"
        style={{ animation: "floatyA 7.1s ease-in-out infinite" }}
      />
      <img
        src={srcs[5]} alt="" aria-hidden
        className="hidden md:block absolute pointer-events-none drop-shadow-2xl
                   right-0 translate-x-[22%] bottom-[-60px] w-40 lg:w-56 rotate-[-14deg] anim-md"
        style={{ animation: "floatyB 5.6s ease-in-out infinite" }}
      />
    </>
  );
}

/** Mobile-only decor (deben aparecer *debajo* del video) */
function DecorMobileBelow({ images }: { images: string[] }) {
  const leftMid = images[1] ?? "/decor/decor2.png";
  const rightMid = images[4] ?? "/decor/decor5.png";

  return (
    <div className="md:hidden mt-6 px-2 -mx-2 flex items-center justify-between">
      <img
        src={leftMid}
        alt=""
        aria-hidden
        className="h-20 w-auto drop-shadow-xl rotate-[6deg] -ml-3 select-none"
        loading="lazy"
        decoding="async"
      />
      <img
        src={rightMid}
        alt=""
        aria-hidden
        className="h-20 w-auto drop-shadow-xl -rotate-[6deg] -mr-3 select-none"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
