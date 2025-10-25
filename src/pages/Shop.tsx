// src/pages/Shop.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryTabs, { Category } from "@/components/CategoryTabs";
import ProductCardHome, { HomeProduct } from "@/components/ProductCardHome";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product as CatalogProduct } from "@/data/site";

const BRAND_BORDER = "border-[#1cbcc6]";

// ===== URL category (default ALL) =====
function useCategoryFromUrl(defaultCat: Category = "all"): Category {
  const { search } = useLocation();
  const s = new URLSearchParams(search).get("category") as Category | null;
  if (s === "all" || s === "spices" || s === "merch" || s === "catering") return s;
  return defaultCat;
}

// ===== Mapping HomeProduct -> CatalogProduct =====
function toCatalogProduct(p: HomeProduct): CatalogProduct {
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
}

// ===== Helpers =====
function isSpiceName(name: string) {
  const n = name.toLowerCase();
  return (
    n.includes("adobo") ||
    n.includes("sazón") ||
    n.includes("sazon") ||
    n.includes("seasoning") ||
    n.includes("spice")
  );
}

function makeSpiceCardLike(p: any): HomeProduct {
  return {
    id: p.id,
    name: p.name,
    image: p.image,
    description: p.description,
    size: p.size,
    price: p.price,
  };
}

// ===== Local data (MERCH / CATERING) =====
const MERCH: HomeProduct[] = [
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
];

const CATERING: HomeProduct[] = [
  {
    id: "pulled-pork-or-chicken",
    name: "Mama Pacha Sabor Pulled Pork or Chicken",
    image: "/products/pulled-pork-or-chicken.jpg",
    description: "Slow-cooked flavor, perfect for bowls, tacos, or sliders.",
  },
  {
    id: "empanadas-uncooked-4",
    name:
      "Mama Pacha Sabor Empanadas — Un-cooked (ready to bake or fry at home) — 4 per order, per filling",
    image: "/products/empanadas-uncooked-4.jpg",
    description: "Freshly assembled and frozen. Bake or fry at home.",
    fromPrice: 13.0,
    titleSizeClass: "text-sm sm:text-[15px]",
  },
];

export default function ShopPage() {
  const urlCat = useCategoryFromUrl("all");
  const [category, setCategory] = React.useState<Category>(urlCat);
  const { add } = useCart();

  React.useEffect(() => {
    if (urlCat !== category) setCategory(urlCat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCat]);

  // Spices primero (Sazón, Adobo, luego otros)
  const spiceProducts: HomeProduct[] = React.useMemo(() => {
    const primary: HomeProduct[] = [];
    const rest: HomeProduct[] = [];

    const sazon =
      PRODUCTS.find((p) => p.id === "sazon") ||
      PRODUCTS.find(
        (p) =>
          p.name?.toLowerCase().includes("sazón") ||
          p.name?.toLowerCase().includes("sazon")
      );

    const adobo =
      PRODUCTS.find((p) => p.id === "adobo") ||
      PRODUCTS.find((p) => p.name?.toLowerCase().includes("adobo"));

    if (sazon) primary.push(makeSpiceCardLike(sazon));
    if (adobo) primary.push(makeSpiceCardLike(adobo));

    PRODUCTS.forEach((p) => {
      const already = (sazon && p.id === sazon.id) || (adobo && p.id === adobo.id);
      if (!already && isSpiceName(p.name ?? p.id)) {
        rest.push(makeSpiceCardLike(p));
      }
    });

    return [...primary, ...rest];
  }, []);

  const merchProducts: HomeProduct[] = MERCH;
  const cateringProducts: HomeProduct[] = CATERING;

  // Mezcla para "All"
  const allProducts: HomeProduct[] = [
    ...spiceProducts,
    ...merchProducts,
    ...cateringProducts,
  ];

  const currentList =
    category === "all"
      ? allProducts
      : category === "spices"
      ? spiceProducts
      : category === "merch"
      ? merchProducts
      : cateringProducts;

  return (
    <main
      className="relative min-h-[60svh] pt-24 sm:pt-28" // <-- ESPACIO PARA HEADER FIJO
      style={{ paddingTop: "var(--header-h, 36px)" }} // fallback si defines --header-h global
    >
      {/* Fondo #41c0cc */}
      <div className="absolute inset-0 -z-10 bg-[#41c0cc]" />

      <div className="container-xl py-12 sm:py-16">
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Shop
          </h1>
          <p className="mt-2 text-sm text-neutral-900/90">
            Browse our <strong>All</strong>, <strong>Spices</strong>,{" "}
            <strong>Merch</strong>, and <strong>Catering</strong> items.
          </p>
        </header>

        <CategoryTabs value={category} onChange={setCategory} />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {currentList.map((p) => (
            <ProductCardHome
              key={p.id}
              product={p}
              accent="red" // botones rojos en /shop
              onAdd={(prod) => add(toCatalogProduct(prod))}
            />
          ))}
        </div>

     
      </div>
    </main>
  );
}
