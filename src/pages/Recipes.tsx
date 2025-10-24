// src/pages/Recipes.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { RECIPES } from "@/data/site";

export default function Recipes() {
  return (
    <>
      <Helmet>
        <title>Recipes | Mama Pacha</title>
        <meta name="description" content="Cook with Mama Pacha blends — simple, flavorful recipes." />
        <link rel="canonical" href="https://www.mamapachasabor.com/recipes" />
      </Helmet>

      <section className="px-4 py-10 sm:py-14 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif text-center">Recipes</h1>
        <p className="text-center text-neutral-600 mt-3">
          Real food, made easy with our natural blends.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECIPES.map((r) => (
            <article key={r.id} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
              <img src={r.image} alt={r.title} className="h-44 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-semibold text-lg">{r.title}</h3>
                <p className="text-sm text-neutral-600 mt-1">{r.description}</p>
                <ul className="mt-4 text-sm list-disc ml-5 space-y-1">
                  {r.ingredients.slice(0, 5).map((ing, i) => (
                    <li key={`${r.id}-ing-${i}`}>{ing}</li>
                  ))}
                </ul>
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer font-medium">Directions</summary>
                  <ol className="mt-2 list-decimal ml-5 space-y-1">
                    {r.steps.map((s, i) => (
                      <li key={`${r.id}-step-${i}`}>{s}</li>
                    ))}
                  </ol>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
