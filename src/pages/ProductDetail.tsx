// src/pages/ProductDetail.tsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, currency } from "@/data/site";
import { useCart } from "@/context/CartContext";

function findBySlug(slugOrId?: string) {
  if (!slugOrId) return undefined;
  return (
    PRODUCTS.find((p) => p.slug === slugOrId) ||
    PRODUCTS.find((p) => String(p.id) === String(slugOrId))
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => findBySlug(slug), [slug]);
  const { add } = useCart();

  if (!product) {
    return (
      <main className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
        <p className="text-neutral-700">Product not found.</p>
        <Link className="mt-4 inline-block text-[#E7303A] underline" to="/shop">Back to shop</Link>
      </main>
    );
  }

  const gallery = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <main className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
      <nav className="text-sm text-neutral-600">
        <Link to="/shop" className="hover:underline">Shop</Link> <span>›</span> <span>{product.name}</span>
      </nav>

      <div className="mt-6 grid lg:grid-cols-12 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="w-full grid place-items-center">
              <img
                src={gallery[0]}
                alt={product.name}
                className="max-h-[440px] w-auto object-contain"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.slice(1).map((src, i) => (
                  <img key={i} src={src} alt={`${product.name} alt ${i + 1}`} className="h-20 object-contain rounded-md border" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buy box */}
        <div className="lg:col-span-6">
          <h1 className="text-2xl sm:text-3xl font-serif">{product.name}</h1>
          {product.size && <p className="text-neutral-600 mt-1">{product.size}</p>}

          <div className="mt-4 text-2xl font-bold">{currency(product.price)}</div>

          {Array.isArray(product.badges) && product.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.badges.map((b: string, i: number) => (
                <span key={i} className="inline-flex items-center rounded-full border border-[#E7303A]/30 bg-[#E7303A]/10 px-2.5 py-1 text-xs font-semibold text-[#E7303A]">{b}</span>
              ))}
            </div>
          )}

          {(product.notes || product.description) && (
            <p className="mt-5 text-neutral-800 leading-7">
              {product.description ?? product.notes}
            </p>
          )}

          {/* Uses / tags opcionales */}
          {Array.isArray(product.usage) && product.usage.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Great for:</h3>
              <ul className="mt-2 list-disc pl-5 text-neutral-800">
                {product.usage.map((u: string, i: number) => <li key={i}>{u}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => add(product)}
              className="h-11 px-6 rounded-full text-sm font-bold border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition"
            >
              Add to cart
            </button>
            <Link to="/recipes" className="h-11 px-5 rounded-full text-sm font-semibold border border-neutral-300 hover:bg-neutral-100 transition">
              Recipes using this blend
            </Link>
          </div>

          {/* Nutrition / Ingredients (si existen) */}
          {(Array.isArray(product.ingredients) && product.ingredients.length > 0) && (
            <div className="mt-8">
              <h3 className="font-semibold">Ingredients</h3>
              <p className="mt-2 text-neutral-800">{product.ingredients.join(", ")}</p>
            </div>
          )}

          {product.nutrition && (
            <div className="mt-6 text-sm text-neutral-700">
              <h4 className="font-semibold">Nutrition facts</h4>
              <p className="mt-1">Servings: {product.nutrition.servings}</p>
              {product.nutrition.sodiumMg != null && <p>Sodium: {product.nutrition.sodiumMg} mg</p>}
              {product.nutrition.calories != null && <p>Calories: {product.nutrition.calories}</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
