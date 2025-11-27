// src/pages/Recipes.tsx
import React from "react";
import { RECIPES, Recipe } from "@/data/site";
import RecipeCard from "@/components/RecipeCard";
import RecipeModal from "@/components/RecipeModal";

export default function RecipesPage() {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState<Recipe | null>(null);

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return RECIPES;
    return RECIPES.filter((r) => {
      const haystack = [r.title, r.description, ...(r.ingredients || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [q]);

  const openRecipe = (r: Recipe) => {
    setCurrent(r);
    setOpen(true);
  };

  return (
    <main
      className="relative bg-[#41C1CC]"
      style={{ paddingTop: "var(--header-h, 36px)" }}
    >
      <section className="relative">
        <div className="container-xl py-12 sm:py-16">
          <div className="rounded-3xl bg-white/95 ring-1 ring-black/10 shadow-sm p-6 sm:p-8">
            <header className="text-center mb-8 sm:mb-10">
              <h1 className="font-serif text-4xl font-extrabold tracking-tight text-neutral-900">
                Recipes
              </h1>
              <p className="mt-2 text-neutral-700">
                Puerto Rican-inspired favorites made simple with real ingredients
                and{" "}
                <span className="font-semibold text-[#E7303A]">
                  Mama Pacha Sabor
                </span>
                .
              </p>

              {/* Search */}
              <div className="mt-5 max-w-xl mx-auto">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  id="q"
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by title or ingredient (e.g., 'turkey', 'pigeon peas', 'Adobo')"
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#1cbcc6]/50 bg-white"
                />
              </div>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <RecipeCard key={r.id} recipe={r} onOpen={openRecipe} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-sm text-neutral-600">
                  No recipes found. Try another ingredient or name.
                </p>
              )}
            </div>
          </div>

          {/* Modal */}
          <RecipeModal open={open} onClose={() => setOpen(false)} recipe={current} />
        </div>
      </section>
    </main>
  );
}
