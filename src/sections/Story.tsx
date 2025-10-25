// src/sections/Story.tsx
import React from "react";

export const Story: React.FC = () => {
  return (
    <section id="story" className="relative">
      <video
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center"
        src="/media/story-bg.mp4"
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />

      {/* Respeta usuarios que prefieren reducir animaciones */}
      <style>{`@media (prefers-reduced-motion: reduce){ video{ animation: none !important } }`}</style>

      {/* CONTENIDO */}
      <div className="container-xl py-20 space-y-16">
        {/* WHAT MAKES MAMA PACHA BETTER?! */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold">
              Our Story
            </h2>
            <p className="text-neutral-800/90">
              From family traditions to your kitchen, Mama Pacha Sabor brings
              bold, natural flavors inspired by Puerto Rican cuisine.
            </p>

            <div className="flex gap-3">
              <a href="#contact" className="btn btn-primary">Catering Inquiry</a>
              {/* Antes: Shop Spices */}
              <a href="#shop" className="btn btn-outline">Shop Menu &amp; Merch</a>
            </div>
          </div>

          <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
            <img
              src="/brand/inspiration.jpg"
              alt="Mama Pacha Sabor"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
