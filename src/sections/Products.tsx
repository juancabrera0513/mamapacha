// src/sections/Products.tsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCardHome, { HomeProduct } from "@/components/ProductCardHome";
import { PRODUCTS, Product as CatalogProduct } from "@/data/site";
import { useCart } from "@/context/CartContext";

const BRAND_BORDER = "border-[#1cbcc6]";

export default function Products() {
  const { add } = useCart();

  // Helpers de búsqueda en el catálogo global
  const findById = (id: string) => PRODUCTS.find((p) => p.id === id);

  // Spices
  const saz =
    PRODUCTS.find(
      (p) =>
        p.id.toLowerCase().includes("sazón") ||
        p.id.toLowerCase().includes("sazon")
    ) ||
    PRODUCTS.find(
      (p) => p.id === "sazon" || p.name.toLowerCase().includes("sazón")
    );

  const adobo =
    PRODUCTS.find(
      (p) => p.id === "adobo" || p.name.toLowerCase().includes("adobo")
    );

  // Merch & prepared items desde el catálogo
  const apron = findById("apron");
  const chefCoat = findById("chef-coat");
  const pulledProtein = findById("pulled-protein");
  const empanadas = findById("empanadas");

  // CatalogProduct -> HomeProduct
  const catalogToHome = (p: CatalogProduct): HomeProduct => ({
    id: p.id,
    name: p.name,
    image: p.image,
    description: p.description,
    size: (p as any).size,
    price: (p as any).price,
    fromPrice: (p as any).fromPrice,
    salePrice: (p as any).originalPrice ? (p as any).price : undefined,
    titleSizeClass: undefined,
  });

  // Normalizador para la card del home (spices)
  const spiceToHome = (p: any): HomeProduct => ({
    id: p.id,
    name: p.name,
    slug: p.slug, 
    image: p.image,
    description: p.description,
    size: p.size,
    price: p.price,
  });

  // ORDEN: Sazón, Adobo, Apron, Chef Coat, Pulled Pork/Chicken, Empanadas
  const items: HomeProduct[] = [
    ...(saz ? [spiceToHome(saz)] : []),
    ...(adobo ? [spiceToHome(adobo)] : []),
    ...(apron ? [catalogToHome(apron)] : []),
    ...(chefCoat ? [catalogToHome(chefCoat)] : []),
    ...(pulledProtein ? [catalogToHome(pulledProtein)] : []),
    ...(empanadas ? [catalogToHome(empanadas)] : []),
  ];

  // HomeProduct -> CatalogProduct para CartContext.add(product)
  const toCatalogProduct = (p: HomeProduct): CatalogProduct => {
    const computed =
      typeof p.salePrice === "number"
        ? p.salePrice
        : typeof p.price === "number"
        ? p.price
        : typeof p.fromPrice === "number"
        ? p.fromPrice
        : 0;

    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: computed,
      size: p.size,
      image: p.image,
      badge: undefined,
    };
  };

  return (
    <section id="shop" className="relative">
      {/* ===== Video de background ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          src="/media/shop-bg2.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 mix-blend-normal" />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #shop video { animation: none !important }
        }
      `}</style>

      <div className="relative container-xl py-16 sm:py-20">
        <header className="mb-8 sm:mb-10 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Shop Menu &amp; Merch
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-neutral-800">
            Explore our spices, merch, and prepared favorites.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCardHome
              key={p.id}
              product={p}
              onAdd={(prod) => add(toCatalogProduct(prod))}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/shop"
            className={`inline-flex h-11 px-6 items-center justify-center rounded-full text-base font-semibold border ${BRAND_BORDER} text-neutral-900 hover:bg-neutral-50`}
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
