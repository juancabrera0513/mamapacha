// src/sections/Story.tsx
import React from "react";

export const Story: React.FC = () => {
  return (
    // Hacemos la sección relativa para poder poner el video en absoluto detrás
    <section id="story" className="relative">
      {/* VIDEO DE FONDO (ocupa toda la sección) */}
      <video
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center"
        src="/media/story-bg.mp4"     // ⬅️ tu ruta al mp4
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />

      {/* (Opcional) si quieres un degradado suave arriba/abajo, descomenta: */}
      {/*
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]" />
      */}

      {/* Respeta usuarios que prefieren reducir animaciones */}
      <style>{`@media (prefers-reduced-motion: reduce){ video{ animation: none !important } }`}</style>

      {/* CONTENIDO ORIGINAL */}
      <div className="container-xl py-20 space-y-16">
        {/* WHAT MAKES MAMA PACHA BETTER?! */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1589307004173-3c95204b7b9a?q=80&w=1600&auto=format&fit=crop"
              alt="Cooking with fresh ingredients"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              What makes Mama Pacha better?!
            </h2>
            <p className="mt-4 text-zinc-700">
              In today’s market, Latin flavor options with <strong>no added salt</strong> or
              <strong> artificial additives</strong> are limited. The average American consumes about{" "}
              <strong>3,400&nbsp;mg</strong> of sodium per day, while dietary guidelines recommend
              staying below <strong>2,300&nbsp;mg</strong>—roughly one teaspoon of salt.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-zinc-50/90 backdrop-blur-sm p-4">
                <h3 className="font-semibold">Our brand promise</h3>
                <ul className="mt-2 list-disc pl-5 text-zinc-700 space-y-1">
                  <li>Natural ingredients only</li>
                  <li>No preservatives or added salt</li>
                  <li>Eco-friendly, space-saving packaging</li>
                  <li>Affordable, accessible healthy options</li>
                </ul>
              </div>
              <div className="rounded-xl bg-zinc-50/90 backdrop-blur-sm p-4">
                <h3 className="font-semibold">Community impact</h3>
                <p className="mt-2 text-zinc-700">
                  We help diversify the local spice market—making the region more inclusive and
                  welcoming for the Latino community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COOKING FOR A CAUSE */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-primary uppercase">
              Cooking for a Cause
            </h4>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-2">
              How the Pandemic Inspired My Puerto Rican Food Business to Help Families in Need
            </h3>

            <div className="mt-4 space-y-4 text-zinc-700">
              <p>
                The idea for this business started in <strong>2020</strong> while working as a
                Special Instructor for the State of Missouri, supporting families with children who
                have special needs. Many low-income households lacked computers and tablets for
                remote learning—some even shared a single smartphone.
              </p>
              <p>
                To help, I began selling authentic Puerto Rican food to friends to raise money for
                devices. Thanks to incredible community support, we distributed{" "}
                <strong>15 computers and tablets</strong> to families in need. The dishes I prepare
                use fresh ingredients and my own custom spice blends.
              </p>
              <p>
                Customers soon asked, “What brand do you use?” I proudly said it was my own blend,
                made the same way my mother seasoned her homemade dishes. That’s how the original
                name <em>“De Mi Madre Aprendí”</em> (“From my Mother I Learned”) was born.
              </p>
              <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-zinc-800">
                “I use fresh ingredients and also combine the spices just like my mother used to do
                for her homemade Puerto Rican foods.”
              </blockquote>
            </div>

            <div className="mt-6 flex gap-3">
              <a href="#contact" className="btn btn-primary">Catering Inquiry</a>
              <a href="#shop" className="btn btn-outline">Shop Spices</a>
            </div>
          </div>

          <div className="aspect-square rounded-2xl overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1521001142061-c2a7438ddf82?q=80&w=1600&auto=format&fit=crop"
              alt="Family roots and fresh ingredients"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
