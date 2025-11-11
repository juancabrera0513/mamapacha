// src/sections/HomeShop.tsx
import React from "react";
import CategoryTabs, { Category } from "@/components/CategoryTabs";
import ProductCardHome, { HomeProduct } from "@/components/ProductCardHome";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product as CatalogProduct } from "@/data/site";

/* ---------- helpers ---------- */
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
  };
}

function isSpiceName(name: string) {
  const n = name.toLowerCase();
  return n.includes("adobo") || n.includes("sazón") || n.includes("sazon") || n.includes("seasoning") || n.includes("spice");
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

/* ---------- MERCH (local) ---------- */
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

/* ---------- Catering form (inline) ---------- */
function CateringInquiryCard() {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Catering Inquiry — Mama Pacha Sabor");
    const body = encodeURIComponent(
      `Hello Mama Pacha!\n\nI'd like a catering quote.\n\nName: ${fd.get("name")}\nEmail: ${fd.get("email")}\nEvent date: ${fd.get("date")}\nGuests: ${fd.get("guests")}\nNotes:\n${fd.get("notes")}\n\nThank you!`
    );
    window.open(`mailto:hola@mamapachasabor.com?subject=${subject}&body=${body}`, "_blank");
    formRef.current?.reset();
    alert("Thanks! We opened your email app with the details. We'll get back to you ASAP.");
  };

  return (
    <div className="rounded-2xl bg-white/95 ring-1 ring-black/10 shadow-sm p-6">
      <h3 className="text-xl font-extrabold text-neutral-900">Request a Catering Quote</h3>
      <p className="mt-1 text-sm text-neutral-700">Tell us about your event and we’ll reply with a custom menu and pricing.</p>

      <form ref={formRef} className="mt-4 grid gap-3" onSubmit={onSubmit}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="name" required placeholder="Your name" className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#e33c30] outline-none" />
          <input type="email" name="email" required placeholder="Email" className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#e33c30] outline-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input type="date" name="date" placeholder="Event date" className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#e33c30] outline-none" />
          <input name="guests" placeholder="Estimated guests" className="h-11 rounded-xl border border-neutral-300 px-3 focus:border-[#e33c30] outline-none" />
        </div>
        <textarea name="notes" rows={4} placeholder="Cuisine, allergies, budget, venue…" className="rounded-XL border border-neutral-300 px-3 py-2 focus:border-[#e33c30] outline-none" />
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#e33c30] text-white hover:bg-[#c72b27] transition">Send request</button>
          <a href="mailto:hola@mamapachasabor.com?subject=Catering%20Question" className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-[#e33c30] text-[#e33c30] hover:bg-white/30 transition">Email us directly</a>
        </div>
      </form>
    </div>
  );
}

/* ---------- HomeShop (sin tocar la URL) ---------- */
export default function HomeShop() {
  // 1) Leemos la categoría solo al montar (si viene en la URL), pero LUEGO NO MODIFICAMOS LA URL
  const initialCat: Category = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category") as Category | null;
    return c === "all" || c === "spices" || c === "merch" || c === "catering" ? c : "all";
  }, []);
  const [category, setCategory] = React.useState<Category>(initialCat);

  const { add } = useCart();

  const spiceProducts: HomeProduct[] = React.useMemo(() => {
    const primary: HomeProduct[] = [];
    const rest: HomeProduct[] = [];

    const sazon =
      PRODUCTS.find((p) => p.id === "sazon") ||
      PRODUCTS.find((p) => p.name?.toLowerCase().includes("sazón") || p.name?.toLowerCase().includes("sazon"));
    const adobo =
      PRODUCTS.find((p) => p.id === "adobo") ||
      PRODUCTS.find((p) => p.name?.toLowerCase().includes("adobo"));

    if (sazon) primary.push(makeSpiceCardLike(sazon));
    if (adobo) primary.push(makeSpiceCardLike(adobo));

    PRODUCTS.forEach((p) => {
      const already = (sazon && p.id === sazon.id) || (adobo && p.id === adobo.id);
      if (!already && isSpiceName(p.name ?? p.id)) rest.push(makeSpiceCardLike(p));
    });

    return [...primary, ...rest];
  }, []);

  const merchProducts: HomeProduct[] = MERCH;

  const list =
    category === "all" ? [...spiceProducts, ...merchProducts]
    : category === "spices" ? spiceProducts
    : category === "merch" ? merchProducts
    : []; // "catering" => sin cards

  return (
    <section className="bg-[#1cbbc7] text-white">
      <div className="container-xl py-12 sm:py-16">
        <div className="rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/25 p-5 sm:p-7">
          <header className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">Shop</h2>
            <p className="mt-1 text-white/90 text-sm">
              Explore our <strong>Spices</strong>, <strong>Merch</strong>, and request <strong>Catering</strong>.
            </p>
          </header>

          {/* Tabs como BOTONES (no enlaces) y sin modificar la URL */}
          <div className="mt-6 flex justify-center">
            <CategoryTabs value={category} onChange={setCategory} asLinks={false} />
          </div>

          {category === "catering" ? (
            <div className="mt-8">
              <CateringInquiryCard />
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
    </section>
  );
}
