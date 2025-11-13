// src/sections/FlavorShowcase.tsx
import React from "react";

type Props = {
  videoId: string;              // ID o URL de YouTube
  title?: string;
  images?: string[];            // (ignorado ahora)
  pressHref?: string;           // "/press" o "#press"
};

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
  // images = [],
  pressHref = "/press",
}: Props) {
  const id = getYouTubeId(videoId);

  return (
    <section id="flavor-showcase" className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-center text-neutral-200 sm:text-neutral-100/90">
          A quick peek at our kitchen, spices, and tradition.
        </p>

        {/* Video card (bigger) */}
        <div className="relative mt-10 mx-auto max-w-6xl rounded-2xl ring-1 ring-black/10 shadow-xl bg-black overflow-hidden">
          <div className="relative z-0 m-2 sm:m-4 md:m-6 rounded-xl overflow-hidden bg-black">
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

        {/* CTA Press — contrast on red background */}
        <div className="mt-8 flex justify-center">
          <a
            href={pressHref}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-white text-white hover:bg-white hover:text-[#E43C31] transition-colors shadow-sm"
            aria-label="Go to Press & Interviews"
          >
            See all press & request an interview
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
