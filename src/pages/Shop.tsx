// src/pages/Shop.tsx
import React from "react";
import CategoryTabs, { Category } from "@/components/CategoryTabs";
import ProductCardHome, { HomeProduct } from "@/components/ProductCardHome";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product as CatalogProduct } from "@/data/site";
import MerchComingSoon from "@/components/MerchComingSoon";

/* ----------------- helpers ----------------- */
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

function isSpiceName(name: string) {
  const n = name?.toLowerCase?.() ?? "";
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

function catalogToHome(p: CatalogProduct): HomeProduct {
  return {
    id: p.id,
    name: p.name,
    image: p.image,
    description: p.description,
    size: (p as any).size,
    price: (p as any).price,
    fromPrice: (p as any).fromPrice,
    salePrice: (p as any).originalPrice ? (p as any).price : undefined,
  };
}

/* ----------------- catering form ----------------- */
function CateringInquiryCard() {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Catering Inquiry — Mama Pacha Sabor");
    const body = encodeURIComponent(
      `Hello Mama Pacha!\n\nI'd like a catering quote.\n\n` +
        `Name: ${fd.get("name")}\n` +
        `Email: ${fd.get("email")}\n` +
        `Event date: ${fd.get("date")}\n` +
        `Guests: ${fd.get("guests")}\n\n` +
        `Notes:\n${fd.get("notes")}\n\nThank you!`
    );
    window.open(
      `mailto:hola@mamapachasabor.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    formRef.current?.reset();
    alert(
      "Thanks! We opened your email app with the details. We'll get back to you ASAP."
    );
  };

  return (
    <div className="rounded-2xl bg-white/95 ring-1 ring-black/10 shadow-sm p-6">
      <h3 className="text-xl font-extrabold text-neutral-900">
        Request a Catering Quote
      </h3>
      <p className="mt-1 text-sm text-neutral-700">
        Tell us about your event and we’ll reply with a custom menu and
        pricing.
      </p>

      <form ref={formRef} className="mt-4 grid gap-3" onSubmit={onSubmit}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            name="name"
            required
            placeholder="Your name"
            className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#E43C31] outline-none text-neutral-900 placeholder:text-neutral-500"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#E43C31] outline-none text-neutral-900 placeholder:text-neutral-500"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="date"
            name="date"
            placeholder="Event date"
            className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#E43C31] outline-none text-neutral-900 placeholder:text-neutral-500"
          />
          <input
            name="guests"
            placeholder="Estimated guests"
            className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#E43C31] outline-none text-neutral-900 placeholder:text-neutral-500"
          />
        </div>
        <textarea
          name="notes"
          rows={4}
          placeholder="Cuisine, allergies, budget, venue…"
          className="rounded-xl border border-neutral-300 px-3 py-2 focus:border-[#E43C31] outline-none text-neutral-900 placeholder:text-neutral-500"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#E43C31] text-white hover:bg-[#c72b27] transition"
          >
            Send request
          </button>
          <a
            href="mailto:hola@mamapachasabor.com?subject=Catering%20Question"
            className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-[#E43C31] text-[#E43C31] hover:bg-white/30 transition"
          >
            Email us directly
          </a>
        </div>
      </form>
    </div>
  );
}

/* ----------------- PAGE ----------------- */
export default function ShopPage() {
  // Lee una vez la categoría de la URL (si existe), pero después NO modificamos la URL.
  const initialCat: Category = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category") as Category | null;
    return c === "all" || c === "spices" || c === "merch" || c === "catering"
      ? c
      : "all";
  }, []);
  const [category, setCategory] = React.useState<Category>(initialCat);

  const { add } = useCart();

  // SPICES desde PRODUCTS (Sazón/Adobo primero)
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
      const already =
        (sazon && p.id === sazon.id) || (adobo && p.id === adobo.id);
      if (!already && isSpiceName(p.name ?? p.id)) {
        rest.push(makeSpiceCardLike(p));
      }
    });

    return [...primary, ...rest];
  }, []);

  // CATERING (trays + empanadas + pulled)
  const cateringProducts: HomeProduct[] = React.useMemo(() => {
    const ids = [
      "trifongo-tray",
      "yuca-ajillo-tray",
      "coditos-tray",
      "gandules-tray",
      "empanadas",
      "pulled-protein",
    ];
    return PRODUCTS.filter((p) => ids.includes(p.id)).map(catalogToHome);
  }, []);

  const list =
    category === "all"
      ? [...spiceProducts, ...cateringProducts] // sin merch por ahora (coming soon)
      : category === "spices"
      ? spiceProducts
      : category === "merch"
      ? [] // se maneja abajo con MerchComingSoon
      : cateringProducts; // "catering"

  return (
    <main
      className="relative min-h-[60svh]"
      style={{ paddingTop: "var(--header-h, 36px)" }}
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10 bg-[#41C1CC]" />

      <div className="container-xl py-12 sm:py-16">
        {/* Panel translucido */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/25 p-6 sm:p-8 relative">
          {/* Título + descripción */}
          <header className="text-center">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow">
              Shop
            </h1>
            <p className="mt-2 text-white/90 text-sm">
              Browse our <strong>Spices</strong>, <strong>Merch</strong>, or
              <strong> Catering</strong>.
            </p>
          </header>

          {/* Tabs como BOTONES (no enlaces, NO cambian URL) */}
          <div className="mt-6 flex justify-center">
            <CategoryTabs
              value={category}
              onChange={setCategory}
              asLinks={false}
            />
          </div>

          {/* Contenido por categoría */}
          {category === "catering" ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
              {cateringProducts.map((p) => (
                <ProductCardHome
                  key={p.id}
                  product={p}
                  accent="red"
                  onAdd={(prod) => add(toCatalogProduct(prod))}
                />
              ))}
              <div className="md:col-span-2 lg:col-span-3">
                <CateringInquiryCard />
              </div>
            </div>
          ) : category === "merch" ? (
            <div className="mt-8">
              <MerchComingSoon />
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <ProductCardHome
                  key={p.id}
                  product={p}
                  accent="red"
                  onAdd={(prod) => add(toCatalogProduct(prod))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
