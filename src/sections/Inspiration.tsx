import React from "react";
import { Link } from "react-router-dom";

export default function Inspiration() {
  return (
    <section id="inspiration" className="relative">
      {/* Video de fondo en color normal */}
      <video
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        src="/media/inspiration-bg.mp4"
        muted playsInline loop autoPlay preload="metadata" aria-hidden="true"
      />
      <style>{`@media (prefers-reduced-motion: reduce){ video{ animation:none!important } }`}</style>

      <div className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
        {/* 🔸 UNA SOLA CARD que contiene texto + imagen */}
        <div className="rounded-3xl bg-white/85 backdrop-blur-md ring-1 ring-black/10 shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Columna de TEXTO: ocupa toda la altura y empuja el botón al fondo */}
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E7303A]/30 bg-[#E7303A]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#E7303A]">
                OUR ROOTS
              </div>

              <h2 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight text-neutral-900">
                Meet our inspiration{" "}
                <span className="relative inline-block font-extrabold">
                  Mama Pacha
                  <span className="absolute left-0 -bottom-1 h-2 w-full bg-[#E7303A]/20 rounded"></span>
                </span>
              </h2>

              {/* grow para que el texto “llene” la caja y no quede espacio abajo */}
              <div className="mt-5 grow">
                <p className="text-justify text-[15px] sm:text-base leading-7 sm:leading-8 text-neutral-800">
                  <span className="font-semibold text-neutral-900">Rooted in family tradition</span>, our
                  culinary journey draws from the fresh ingredients and rich flavors inspired by my
                  mother, Patria—affectionately known as <span className="font-semibold">Mama Pacha</span>.
                  What began as a mission to support families with e-learning devices during the pandemic
                  has evolved into <span className="font-semibold">Mama Pacha Sabor</span>, where we continue
                  giving back. We proudly offer delicious, <span className="font-semibold">preservative-free,
                  salt-free</span> blended seasonings and traditional Puerto Rican catering for your next
                  celebration!
                </p>
              </div>

              {/* Botón pegado al borde inferior de la card */}
              <div className="pt-6">
                <Link
                  to="/about"
                  className="inline-flex h-11 px-6 items-center justify-center rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition-colors shadow-sm"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Columna de IMAGEN: altura 100% de la card */}
            <div className="relative min-h-[320px] md:min-h-0">
              {/* Si NO quieres recorte, usa object-contain; si la prefieres a sangre, cambia a object-cover */}
              <img
                src="/brand/inspiration.jpg"
                alt="Patria (Mama Pacha) con su hija — nuestra inspiración"
                className="absolute inset-0 h-full w-full object-contain md:object-cover rounded-none"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Borde interior suave para que combine con la card */}
              <div className="absolute inset-0 ring-1 ring-black/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}