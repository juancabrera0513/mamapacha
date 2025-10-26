// src/components/RecipeCard.tsx
import React from "react";
import { Recipe } from "@/data/site";

type Props = {
  recipe: Recipe;
  onOpen: (r: Recipe) => void;
};

export default function RecipeCard({ recipe, onOpen }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <button onClick={() => onOpen(recipe)} className="text-left w-full">
        <div className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold">{recipe.title}</h3>
          <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{recipe.description}</p>
          <div className="mt-3 inline-flex h-10 px-4 items-center justify-center rounded-full text-sm font-semibold border border-[#1cbcc6] text-neutral-900 hover:bg-neutral-50">
            Ver receta
          </div>
        </div>
      </button>
    </article>
  );
}
