// src/components/ProductCardHome.tsx
import React from "react";
import { Link } from "react-router-dom";

export type HomeProduct = {
  id: string;
  name: string;
  image: string;
  description?: string;
  size?: string;
  price?: number;
  salePrice?: number;
  originalPrice?: number;
  fromPrice?: number;
  titleSizeClass?: string;
};

type Accent = "teal" | "red";

type Props = {
  product: HomeProduct;
  to?: string;
  onAdd?: (p: HomeProduct) => void;
  className?: string;
  accent?: Accent; // <-- NUEVO
};

const COLORS = {
  teal: {
    bg: "bg-[#1cbcc6]",
    hover: "hover:bg-[#17aab3]",
    textOn: "text-white",
    ring: "hover:ring-[#1cbcc6]/50 focus-visible:ring-[#1cbcc6]/60",
  },
  red: {
    bg: "bg-[#E7303A]",
    hover: "hover:bg-[#c3252e]",
    textOn: "text-white",
    ring: "hover:ring-[#E7303A]/45 focus-visible:ring-[#E7303A]/55",
  },
};

function renderPrice(p: HomeProduct) {
  if (typeof p.salePrice === "number" && typeof p.originalPrice === "number") {
    return (
      <span className="inline-flex items-baseline gap-2">
        <span className="font-extrabold">${p.salePrice.toFixed(2)}</span>
        <span className="text-xs text-neutral-500 line-through">
          ${p.originalPrice.toFixed(2)}
        </span>
      </span>
    );
  }
  if (typeof p.fromPrice === "number") {
    return <span className="font-semibold">from ${p.fromPrice.toFixed(2)}</span>;
  }
  if (typeof p.price === "number") {
    return <span className="font-semibold">${p.price.toFixed(2)}</span>;
  }
  return <span className="font-medium text-neutral-500">See details</span>;
}

export default function ProductCardHome({
  product,
  to,
  onAdd,
  className = "",
  accent = "teal",
}: Props) {
  const link = to ?? `/shop?product=${encodeURIComponent(product.id)}`;
  const titleClass =
    product.titleSizeClass ??
    (product.id.includes("empanadas") ? "text-sm sm:text-[15px]" : "text-base");

  const C = COLORS[accent];

  return (
    <article
      className={[
        "group rounded-2xl border border-neutral-200 bg-white/95 shadow-sm overflow-hidden",
        "transition-all duration-300 will-change-transform",
        "hover:-translate-y-1 hover:shadow-lg hover:ring-2",
        C.ring,
        className,
      ].join(" ")}
    >
      {/* Imagen completa (no recorte) */}
      <div className="relative w-full">
        <div className="aspect-[4/3] w-full bg-neutral-50 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Cuerpo */}
      <div className="grid grid-rows-[auto,1fr,auto] gap-2 p-4 min-h-[12rem]">
        <h3 className={`font-semibold leading-snug text-center ${titleClass}`}>
          <Link to={link} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {product.description ? (
          <p className="text-sm text-neutral-700 line-clamp-2 text-center">
            {product.description}
          </p>
        ) : (
          <div />
        )}

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="text-sm text-neutral-800">{renderPrice(product)}</div>

          <div className="flex items-center gap-2">
            <Link
              to={link}
              className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              View
            </Link>

            <button
              onClick={() => onAdd?.(product)}
              className={[
                "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold",
                C.bg,
                C.hover,
                C.textOn,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                C.ring,
              ].join(" ")}
              title="Add to cart"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
