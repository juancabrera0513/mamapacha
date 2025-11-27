// src/pages/ProductDetail.tsx
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, currency } from "@/data/site";
import { useCart } from "@/context/CartContext";

/* ---------- helpers ---------- */

function findBySlug(slugOrId?: string) {
  if (!slugOrId) return undefined;
  return (
    PRODUCTS.find((p) => p.slug === slugOrId) ||
    PRODUCTS.find((p) => String(p.id) === String(slugOrId))
  );
}

const BRAND_PHRASES = [
  "Mama Pacha Sabor Adobo",
  "Adobo Mama Pacha Sabor",
  "Mama Pacha Sabor Sazon",
  "Mama Pacha Sabor Sazón",
  "Sazon Mama Pacha Sabor",
  "Sazón Mama Pacha Sabor",
];

const BRAND_REGEX = new RegExp(BRAND_PHRASES.join("|"), "g");

function highlightBrand(text?: string) {
  if (!text) return text;
  const matches = text.match(BRAND_REGEX) || [];
  if (matches.length === 0) return text;

  const parts = text.split(BRAND_REGEX);
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part, idx) => {
    if (part) result.push(part);
    const match = matches[idx];
    if (match) {
      result.push(
        <span key={idx} className="font-semibold text-[#E7303A]">
          {match}
        </span>
      );
    }
  });

  return result;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => findBySlug(slug), [slug]);
  const { add } = useCart();

  if (!product) {
    return (
      <main className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
        <p className="text-neutral-700">Product not found.</p>
        <Link className="mt-4 inline-block text-[#E7303A] underline" to="/shop">
          Back to shop
        </Link>
      </main>
    );
  }

  const gallery =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const [variantId, setVariantId] = useState(
    hasVariants ? product.variants![0].id : ""
  );

  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null;
    return (
      product.variants!.find((v) => v.id === variantId) || product.variants![0]
    );
  }, [hasVariants, product, variantId]);

  const basePrice = selectedVariant?.price ?? product.price;
  const fromPrice =
    typeof product.fromPrice === "number" ? product.fromPrice : undefined;
  const originalPrice =
    typeof product.originalPrice === "number" ? product.originalPrice : undefined;

  const hasSale = originalPrice != null && originalPrice > basePrice;

  const ingredients = (product as any).ingredients as string[] | undefined;

  const handleAddToCart = () => {
    if (selectedVariant) {
      const itemForCart = {
        ...product,
        id: `${product.id}__${selectedVariant.id}`,
        price: selectedVariant.price,
        size: selectedVariant.size ?? selectedVariant.label ?? product.size,
        notes: selectedVariant.notes ?? product.notes,
      };
      add(itemForCart);
    } else {
      add(product);
    }
  };

  return (
    <main
      className="bg-[#41C1CC] min-h-[60svh]"
      style={{ paddingTop: "var(--header-h, 36px)" }}
    >
      <div className="px-4 sm:px-6 py-14 sm:py-16 max-w-6xl mx-auto">
        <nav className="text-sm text-neutral-100/90">
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>{" "}
          <span>›</span>{" "}
          <span className="font-semibold text-white">{product.name}</span>
        </nav>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 rounded-3xl bg-white/95 ring-1 ring-black/10 shadow-sm p-5 sm:p-8">
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
                    <img
                      key={i}
                      src={src}
                      alt={`${product.name} alt ${i + 1}`}
                      className="h-20 w-full object-contain rounded-md border border-neutral-200 bg-white"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-6">
            <h1 className="text-2xl sm:text-3xl font-serif">{product.name}</h1>
            {product.size && !hasVariants && (
              <p className="text-neutral-600 mt-1">{product.size}</p>
            )}

            {/* Price */}
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              {hasSale && originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {currency(originalPrice)}
                </span>
              )}
              <div className="text-2xl font-bold text-neutral-900">
                {currency(basePrice)}
              </div>
              {!hasSale && fromPrice != null && hasVariants && (
                <span className="text-sm text-neutral-600">
                  From {currency(fromPrice)}
                </span>
              )}
            </div>

            {/* Badges */}
            {Array.isArray(product.badges) && product.badges.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.badges.map((b: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border border-[#E7303A]/30 bg-[#E7303A]/10 px-2.5 py-1 text-xs font-semibold text-[#E7303A]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}

            {/* Variants (trays, empanadas, etc.) */}
            {hasVariants && (
              <div className="mt-5">
                <label className="block text-sm font-semibold text-neutral-800">
                  Choose an option
                </label>
                <select
                  className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#E7303A]/50"
                  value={selectedVariant?.id ?? ""}
                  onChange={(e) => setVariantId(e.target.value)}
                >
                  {product.variants!.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label} — {currency(v.price)}
                    </option>
                  ))}
                </select>
                {selectedVariant?.notes && (
                  <p className="mt-2 text-sm text-neutral-700">
                    {highlightBrand(selectedVariant.notes)}
                  </p>
                )}
              </div>
            )}

            {/* Description / notes */}
            {(product.description || product.notes) && (
              <p className="mt-5 text-neutral-800 leading-7">
                {highlightBrand(product.description ?? product.notes)}
              </p>
            )}

            {/* Uses */}
            {Array.isArray(product.usage) && product.usage.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold">Great for:</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  {product.usage.map((u: string, i: number) => (
                    <li key={i}>{highlightBrand(u)}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="h-11 px-6 rounded-full text-sm font-bold border-2 border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white transition"
              >
                Add to cart
              </button>
              <Link
                to="/recipes"
                className="h-11 px-5 inline-flex items-center justify-center rounded-full text-sm font-semibold border border-neutral-300 hover:bg-neutral-100 transition"
              >
                Recipes using this blend
              </Link>
            </div>

            {/* Ingredients (if defined in products.json) */}
            {Array.isArray(ingredients) && ingredients.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold">Ingredients</h3>
                <p className="mt-2 text-neutral-800">
                  {ingredients.map((ing, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      {highlightBrand(ing)}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Nutrition */}
            {product.nutrition && (
              <div className="mt-6 text-sm text-neutral-700">
                <h4 className="font-semibold">Nutrition facts</h4>
                <p className="mt-1">Servings: {product.nutrition.servings}</p>
                {product.nutrition.sodiumMg != null && (
                  <p>Sodium: {product.nutrition.sodiumMg} mg</p>
                )}
                {product.nutrition.calories != null && (
                  <p>Calories: {product.nutrition.calories}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
