// src/sections/FlavorShowcase.tsx
import React from "react";

type Props = {
  /** YouTube ID or full URL */
  videoId: string;
  /** Section title */
  title?: string;
  /** Paths to 6 decorative PNGs */
  images?: string[];
  /** Link to your Press page or section */
  pressHref?: string; // e.g. "/press" or "#press"
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
    <section id="flavor-showcase" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-center text-neutral-600">
          A quick peek at our kitchen, spices, and tradition.
        </p>

        <div className="relative mt-10">
          {/* Centered, responsive YouTube video */}
          <div className="mx-auto w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-xl bg-black">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
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

          {/* Big decorative ingredients around the video */}
          <Decor images={images} />

          {/* CTA to Press */}
          <div className="mt-8 flex justify-center">
            <a
              href={pressHref}
              className={[
                "inline-flex items-center gap-2",
                "h-11 px-6 rounded-full",
                "text-sm sm:text-base font-bold tracking-wider",
                "border-2 border-[#E7303A] text-[#E7303A]",
                "hover:bg-[#E7303A] hover:text-white",
                "transition-colors shadow-sm",
              ].join(" ")}
              aria-label="Go to Press & Interviews"
            >
              Press & Interviews
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor" className="size-4">
                <path fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                      clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Decor({ images }: { images: string[] }) {
  const srcs = [...images, ...Array(6)].slice(0, 6) as string[];

  return (
    <>
      <style>{`
        /* More noticeable motion */
        @keyframes floatyA { 0% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-18px) rotate(2deg) } 100% { transform: translateY(0) rotate(0deg) } }
        @keyframes floatyB { 0% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(22px) rotate(-3deg) } 100% { transform: translateY(0) rotate(0deg) } }
        @media (prefers-reduced-motion: reduce) {
          .anim-md { animation: none !important; }
        }
      `}</style>

      {/* LEFT SIDE — top / middle / bottom */}
      <img
        src={srcs[0]} alt="" aria-hidden
        className="absolute pointer-events-none drop-shadow-2xl
                   left-[-48px] top-[-60px] w-28
                   sm:left-[-84px] sm:top-[-100px] sm:w-40
                   md:left-[-200px] md:top-[-160px] md:w-56 md:rotate-[-8deg] anim-md"
        style={{ animation: "floatyA 5.8s ease-in-out infinite" }}
      />
      <img
        src={srcs[1]} alt="" aria-hidden
        className="absolute pointer-events-none drop-shadow-2xl
                   left-[-40px] top-1/2 -translate-y-1/2 w-28
                   sm:left-[-76px] sm:w-40
                   md:left-[-220px] md:w-60 md:rotate-[10deg] anim-md"
        style={{ animation: "floatyB 6.6s ease-in-out infinite" }}
      />
      <img
        src={srcs[2]} alt="" aria-hidden
        className="absolute pointer-events-none drop-shadow-2xl
                   left-[-44px] bottom-[-56px] w-28
                   sm:left-[-80px] sm:bottom-[-96px] sm:w-40
                   md:left-[-210px] md:bottom-[-170px] md:w-56 md:rotate-[18deg] anim-md"
        style={{ animation: "floatyA 5.4s ease-in-out infinite" }}
      />

      {/* RIGHT SIDE — top / middle / bottom */}
      <img
        src={srcs[3]} alt="" aria-hidden
        className="absolute pointer-events-none drop-shadow-2xl
                   right-[-48px] top-[-60px] w-28
                   sm:right-[-84px] sm:top-[-100px] sm:w-40
                   md:right-[-200px] md:top-[-160px] md:w-56 md:rotate-[12deg] anim-md"
        style={{ animation: "floatyB 6.2s ease-in-out infinite" }}
      />
      <img
        src={srcs[4]} alt="" aria-hidden
        className="absolute pointer-events-none drop-shadow-2xl
                   right-[-40px] top-1/2 -translate-y-1/2 w-28
                   sm:right-[-76px] sm:w-40
                   md:right-[-220px] md:w-60 md:rotate-[-10deg] anim-md"
        style={{ animation: "floatyA 7.1s ease-in-out infinite" }}
      />
      <img
        src={srcs[5]} alt="" aria-hidden
        className="absolute pointer-events-none drop-shadow-2xl
                   right-[-44px] bottom-[-56px] w-28
                   sm:right-[-80px] sm:bottom-[-96px] sm:w-40
                   md:right-[-210px] md:bottom-[-170px] md:w-56 md:rotate-[-16deg] anim-md"
        style={{ animation: "floatyB 5.6s ease-in-out infinite" }}
      />
    </>
  );
}
