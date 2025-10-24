// src/pages/Press.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { PRESS_VIDEOS } from "@/data/site";

export default function Press() {
  return (
    <>
      <Helmet>
        <title>Press | Mama Pacha</title>
        <meta name="description" content="Media & YouTube features of Mama Pacha." />
        <link rel="canonical" href="https://www.mamapachasabor.com/press" />
      </Helmet>

      <section className="px-4 py-10 sm:py-14 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif text-center">Press</h1>
        <p className="text-center text-neutral-600 mt-3">
          Interviews, features, and community highlights.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {PRESS_VIDEOS.map((v) => (
            <article key={v.id} className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{v.title}</h3>
                {v.note && <p className="text-sm text-neutral-600 mt-1">{v.note}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
