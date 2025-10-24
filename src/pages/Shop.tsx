// src/pages/Shop.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, currency } from "@/data/site";
import { useCart } from "@/context/CartContext";

export default function Shop() {
  const { add } = useCart();
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      [p.name, p.description, p.notes, (p.badges || []).join(" ")].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <main className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
      {/* Shop hero */}
      <header className="text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold">Our Spices & Blends</h1>
        <p className="mt-2 text-neutral-600">
          Salt-free, preservative-free, crafted with love. Bring Puerto Rican flavor home.
        </p>

        {/* Search (simple) */}
        <div className="mt-6 flex justify-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search blends, notes, tags…"
            className="w-full max-w-md h-11 px-4 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#E7303A]"
          />
        </div>
      </header>

      {/* Grid */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm p-5 sm:p-6">
            <Link to={`/shop/${p.slug ?? p.id}`} className="block">
              <div className="w-full grid place-items-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-56 sm:h-64 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </Link>

            <div className="mt-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold">
                  <Link to={`/shop/${p.slug ?? p.id}`} className="hover:underline">{p.name}</Link>
                </h2>
                {p.size && <span className="text-sm text-neutral-600">{p.size}</span>}
              </div>

              {Array.isArray(p.badges) && p.badges.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.badges.map((b: string, i: number) => (
                    <span key={i} className="inline-flex items-center rounded-full border border-[#E7303A]/30 bg-[#E7303A]/10 px-2.5 py-1 text-xs font-semibold text-[#E7303A]">{b}</span>
                  ))}
                </div>
              )}

              {(p.notes || p.description) && (
                <p className="mt-3 text-sm text-neutral-700 line-clamp-3">{p.notes ?? p.description}</p>
              )}

              <div className="mt-5 flex items-center justify-between">
                <div className="text-lg font-bold">{currency(p.price)}</div>
                <button
                  onClick={() => add(p)}
                  className="h-10 px-4 rounded-full text-sm font-semibold border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
