// src/pages/Press.tsx
import React from "react";
import YouTubeModal from "@/components/YouTubeModal";
import PressCTA from "@/components/PressCTA";

const VIDEOS = [
  { title: "Mama Pacha en TV – Segment 1", url: "https://www.youtube.com/embed/DJItLcqxNHI?si=0DOglryCHnd70ALb", note: "YouTube • Featured segment" },
  { title: "Mama Pacha en TV – Segment 2", url: "https://www.youtube.com/embed/qU1cJ3C2pB0?si=yDVL-7yxgd6pYOZ7", note: "YouTube • Interview" },
  { title: "Mama Pacha en TV – Segment 3", url: "https://www.youtube.com/embed/2K_A-7b-j3Q?si=BkjC3IrL92lhAb-_", note: "YouTube • Feature clip" },
  { title: "Mama Pacha en TV – Segment 4", url: "https://www.youtube.com/embed/NvMy-Tza6iA?si=AlVsL_xVqCMhobec", note: "YouTube • Community story" },
];

function youtubeThumb(urlOrId: string) {
  const id = (urlOrId.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/) || [])[1] || urlOrId;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function PressPage() {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState<{ title: string; url: string } | null>(null);

  const openVideo = (v: { title: string; url: string }) => {
    setCurrent(v);
    setOpen(true);
  };

  return (
    <main className="relative">
      {/* Fondo imagen + overlay rojo marca */}
      <div className="absolute inset-0 -z-10 bg-[#E43C31]" aria-hidden />


      <div className="container-xl py-12 sm:py-16" style={{ paddingTop: "var(--header-h, 36px)" }}>
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white drop-shadow">
            Press
          </h1>
          <p className="mt-2 text-white/90">
            Selected clips & features. Click any tile to play.
          </p>
          <div className="mt-5">
            <PressCTA />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <button
              key={v.url}
              onClick={() => openVideo(v)}
              className="group overflow-hidden rounded-2xl border border-white/20 bg-white/95 backdrop-blur-sm shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-video w-full bg-neutral-100">
                <img
                  src={youtubeThumb(v.url)}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-sm font-semibold text-neutral-900">{v.title}</h3>
                <p className="mt-1 text-xs text-neutral-600">{v.note || "YouTube"}</p>
              </div>
            </button>
          ))}
        </div>

        <YouTubeModal open={open} onClose={() => setOpen(false)} title={current?.title} video={current?.url || ""} />
      </div>
    </main>
  );
}
