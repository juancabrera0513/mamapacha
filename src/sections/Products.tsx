// src/sections/Products.tsx
import React from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, currency } from "@/data/site";
import { useCart } from "@/context/CartContext";

export default function Products() {
  const { add } = useCart();
  const items = PRODUCTS.slice(0, 2);

  return (
    <section id="shop" className="relative overflow-hidden">
      {/* ===== Background Video ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/media/shop-bg.webm" type="video/webm" />
          <source src="/media/shop-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="px-4 sm:px-6 py-16 max-w-6xl mx-auto">
        <header className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Shop Spices
          </h2>
          <p className="mt-2 text-neutral-700">
            100% natural blends — no salt, no preservatives.
          </p>
        </header>

        {/* MÁS espacio antes de las tarjetas para no tocar el subtítulo */}
        <div className="mt-16 grid gap-8 md:gap-10 md:grid-cols-2">
          {items.map((p, idx) => {
            // Ligera asimetría y posición BAJA para que nunca tape texto
           // DESPUÉS (sube las bolsas)
const packShift =
idx === 0 ? "sm:-top-14 md:-top-20" : "sm:-top-12 md:-top-20 rotate-[1.5deg]";
// derecha un toque más baja + tilt

            return (
              <article key={p.id} className="relative">
                {/* ===== Bolsa (encima del card, sin cubrir texto) ===== */}
                <div
                  className={[
                    "absolute inset-x-0 -top-10 grid place-items-center z-20 pointer-events-none",
                    packShift,
                  ].join(" ")}
                >
                  {/* Glow sutil bajo la bolsa */}
                  <div
                    className="absolute -z-10 h-36 sm:h-44 md:h-52 w-[74%] sm:w-[64%] blur-2xl opacity-25"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 55%, transparent 100%)",
                    }}
                    aria-hidden
                  />
                  <img
                    src={p.image}
                    alt={p.name}
                    className={[
                      // Alturas RESPONSIVE (más pequeñas en mobile)
                      "h-56 sm:h-64 md:h-80 lg:h-[22rem] w-auto object-contain",
                      "drop-shadow-2xl transition-transform duration-300 will-change-transform hover:scale-[1.02]",
                    ].join(" ")}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* ===== Card SOLO debajo de la bolsa ===== */}
                <div className="relative z-10">
                  {/* El card arranca por debajo de la bolsa — valores responsive */}
                  <div
                    className={[
                      "rounded-3xl border border-neutral-200 bg-white/95 backdrop-blur-sm shadow-sm",
                      "px-5 sm:px-6 md:px-6",
                      "pb-6 sm:pb-7 md:pb-8",
                      "pt-5 sm:pt-6 md:pt-7",
                      // margen superior grande para despegar texto de la bolsa
                      "mt-[9.5rem] sm:mt-[12rem] md:mt-[14rem] lg:mt-[15rem]",
                    ].join(" ")}
                  >
                    {/* Contenido */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl sm:text-[22px] md:text-[24px] font-extrabold leading-tight">
                        <Link
                          to={`/shop/${p.slug ?? p.id}`}
                          className="hover:underline"
                        >
                          {p.name}
                        </Link>
                      </h3>
                      {p.size && (
                        <span className="mt-1 text-sm text-neutral-600 whitespace-nowrap">
                          {p.size}
                        </span>
                      )}
                    </div>

                    {(p.badges?.length || p.badge) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.badge && (
                          <span className="inline-flex items-center rounded-full border border-[#E7303A]/30 bg-[#E7303A]/10 px-2.5 py-1 text-xs font-semibold text-[#E7303A]">
                            {p.badge}
                          </span>
                        )}
                        {p.badges?.map((b, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full border border-[#E7303A]/30 bg-[#E7303A]/10 px-2.5 py-1 text-xs font-semibold text-[#E7303A]"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    )}

                    {(p.notes || p.description) && (
                      <p className="mt-4 text-[15px] leading-7 text-neutral-800">
                        <span className="font-semibold text-neutral-900">
                          Flavor notes:{" "}
                        </span>
                        {p.notes ?? p.description}
                      </p>
                    )}

                    {Array.isArray(p.usage) && p.usage.length > 0 && (
                      <p className="mt-2 text-sm text-neutral-700">
                        <span className="font-medium text-neutral-900">
                          Great for:
                        </span>{" "}
                        {p.usage.slice(0, 4).join(", ")}
                      </p>
                    )}

                    <div className="mt-6 h-px bg-neutral-200" />

                    <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="text-[20px] sm:text-[22px] font-extrabold tracking-tight">
                        {currency(p.price)}
                      </div>

                      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3">
                        <Link
                          to={`/shop/${p.slug ?? p.id}`}
                          className="text-sm font-semibold text-neutral-800 hover:text-neutral-900 inline-flex items-center gap-1"
                        >
                          Learn more <span aria-hidden>→</span>
                        </Link>
                        <button
                          onClick={() => add(p)}
                          className="h-11 px-5 rounded-full text-sm font-bold border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition-colors w-auto sm:w-auto"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Acento inferior del card */}
                  <span className="pointer-events-none block h-[10px] rounded-b-3xl bg-gradient-to-r from-[#E7303A]/15 via-transparent to-[#E7303A]/15" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex h-11 px-6 items-center justify-center rounded-full text-sm sm:text-base font-bold tracking-wider border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
