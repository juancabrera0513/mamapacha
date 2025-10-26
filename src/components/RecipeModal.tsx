// src/components/RecipeModal.tsx
import React from "react";
import Modal from "@/components/Modal";
import { Recipe } from "@/data/site";

type Props = {
  open: boolean;
  onClose: () => void;
  recipe: Recipe | null;
};

export default function RecipeModal({ open, onClose, recipe }: Props) {
  if (!recipe) return null;

  return (
    <Modal open={open} onClose={onClose} ariaLabel={recipe.title} maxWidthClass="max-w-3xl">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="hidden sm:block w-40 h-28 overflow-hidden rounded-xl ring-1 ring-neutral-200">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{recipe.description}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold">Ingredients</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-800 space-y-1">
              {recipe.ingredients.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Steps</h4>
            <ol className="mt-2 list-decimal pl-5 text-sm text-neutral-800 space-y-1">
              {recipe.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#E7303A] px-5 text-sm font-semibold text-white hover:bg-[#c3252e] transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
