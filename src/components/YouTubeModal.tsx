// src/components/YouTubeModal.tsx
import React from "react";
import Modal from "./Modal";

function extractYouTubeId(input: string) {
  // soporta URLs de youtube y shorts, o si ya es un ID
  const m =
    input.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/) ||
    input.match(/^([a-zA-Z0-9_-]{6,})$/);
  return m ? m[1] : null;
}

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  video: string; // url o id
};

export default function YouTubeModal({ open, onClose, title, video }: Props) {
  const id = extractYouTubeId(video);
  const src = id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : "";

  return (
    <Modal open={open} onClose={onClose} ariaLabel={title || "Video"} maxWidthClass="max-w-5xl">
      <div className="p-4 sm:p-5">
        {title ? (
          <h3 className="px-1 pb-3 text-lg font-semibold text-neutral-900">{title}</h3>
        ) : null}
        <div className="relative w-full overflow-hidden rounded-xl bg-black">
          <div className="aspect-video w-full">
            {id ? (
              <iframe
                className="h-full w-full"
                src={src}
                title={title || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-white/80">
                Invalid YouTube ID/URL
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
