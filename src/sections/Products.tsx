// src/sections/Products.tsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCardHome, { HomeProduct } from "@/components/ProductCardHome";
import { PRODUCTS, Product as CatalogProduct } from "@/data/site";
import { useCart } from "@/context/CartContext";

const BRAND_BORDER = "border-[#1cbcc6]";

export default function Products() {
  const { add } = useCart();

  // Buscar Sazón y Adobo desde el catálogo global (spices)
  const saz =
    PRODUCTS.find(
      (p) => p.id.toLowerCase().includes("sazón") || p.id.toLowerCase().includes("sazon")
    ) ||
    PRODUCTS.find(
      (p) => p.id === "sazon" || p.name.toLowerCase().includes("sazón")
    );
  const adobo =
    PRODUCTS.find((p) => p.id === "adobo" || p.name.toLowerCase().includes("adobo"));

  // Normalizador para la card del home
  const spiceToHome = (p: any): HomeProduct => ({
    id: p.id,
    name: p.name,
    image: p.image,
    description: p.description,
    size: p.size,
    price: p.price,
  });

  // ORDEN: Sazón, Adobo, Apron ($25), Chef Coat ($30), Pulled Pork/Chicken, Empanadas
  const items: HomeProduct[] = [
    ...(saz ? [spiceToHome(saz)] : []),
    ...(adobo ? [spiceToHome(adobo)] : []),

    // Merch (usa tus rutas bajo /products como dijiste)
    {
      id: "mama-pacha-apron",
      name: "Mama Pacha Sabor Apron",
      image: "/products/apron.png",
      description: "Durable, comfortable apron for your kitchen sessions.",
      price: 25,
    },
    {
      id: "mama-pacha-chef-coat",
      name: "Mama Pacha Sabor Chef Coat",
      image: "/products/chef-coat.jpg",
      description: "Professional chef coat—clean look, comfy fit.",
      price: 30,
    },

    // Catering
    {
      id: "pulled-pork-or-chicken",
      name: "Mama Pacha Sabor Pulled Pork or Chicken",
      image: "/products/pulled-pork-or-chicken.jpg",
      description: "Slow-cooked flavor, perfect for bowls, tacos, or sliders.",
      // price: 9.99,
    },
    {
      id: "empanadas-uncooked-4",
      name:
        "Mama Pacha Sabor Empanadas(Un-cooked) - 4 per order, per filling",
      image: "/products/empanadas-uncooked-4.jpg",
      description: "Freshly assembled and frozen. Bake or fry at home.",
      fromPrice: 13.0,
      titleSizeClass: "text-sm sm:text-[15px]",
    },
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
          // Si tienes una imagen poster, descomenta:
          // poster="/media/shop-bg-poster.jpg"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
        />
        {/* Scrim sutil para legibilidad del texto sobre el video */}
        <div className="absolute inset-0 mix-blend-normal" />
      </div>

      {/* Respeta usuarios que prefieren reducir animaciones */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #shop video { animation: none !important }
        }
      `}</style>

      {/* ===== Contenido ===== */}
      <div className="relative container-xl py-16 sm:py-20">
        <header className="mb-8 sm:mb-10 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Shop Menu &amp; Merch
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-neutral-800">
            Explore our spices, merch, and catering items.
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
