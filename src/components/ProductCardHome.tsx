// src/components/ProductCardHome.tsx
import React from "react";
import { Link } from "react-router-dom";

export type HomeProduct = {
  id: string;
  slug?: string;
  name: string;
  image: string;
  description?: string;
  price?: number;
  fromPrice?: number;
  salePrice?: number;
  size?: string;
  titleSizeClass?: string;
};

type Props = {
  product: HomeProduct;
  accent?: "red" | "teal";
  onAdd?: (p: HomeProduct) => void;
};

export default function ProductCardHome({ product, accent = "teal", onAdd }: Props) {
  const detailHref = `/shop/${product.slug ?? product.id}`;

  const btnClasses =
    accent === "red"
      ? "border-[#E7303A] text-[#E7303A] hover:bg-[#E7303A] hover:text-white"
      : "border-[#1cbcc6] text-[#1b1b1b] hover:bg-[#1cbcc6]/10";

  const price =
    typeof product.salePrice === "number"
      ? product.salePrice
      : typeof product.price === "number"
      ? product.price
      : undefined;

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={detailHref} className="block">
        <div className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={detailHref} className="block">
          <h3
            className={`font-semibold ${
              product.titleSizeClass ?? "text-base sm:text-[15px]"
            }`}
          >
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between text-sm">
          {price != null ? (
            <span className="font-semibold">{`$${price.toFixed(2)}`}</span>
          ) : product.fromPrice != null ? (
            <span className="font-semibold">{`From $${product.fromPrice.toFixed(
              2
            )}`}</span>
          ) : (
            <span className="text-neutral-500 text-xs">See options</span>
          )}
        </div>

        {onAdd && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => onAdd(product)}
              className={`inline-flex h-10 px-4 items-center justify-center rounded-full text-sm font-semibold border ${btnClasses} transition`}
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
