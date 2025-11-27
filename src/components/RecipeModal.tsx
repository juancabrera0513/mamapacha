// src/components/RecipeModal.tsx
import React from "react";
import Modal from "@/components/Modal";
import { Recipe } from "@/data/site";

type Props = {
  open: boolean;
  onClose: () => void;
  recipe: Recipe | null;
};

// Frases de marca para resaltar
const BRAND_PHRASES = [
  "Mama Pacha Sabor Adobo",
  "Adobo Mama Pacha Sabor",
  "Mama Pacha Sabor Sazon",
  "Mama Pacha Sabor Sazón",
  "Sazon Mama Pacha Sabor",
  "Sazón Mama Pacha Sabor",
  "Adobo Mama Pacha",
  "Sazón Mama Pacha",
  "Mama Pacha Adobo",
  "Mama Pacha Sazón",
];

const BRAND_REGEX = new RegExp(BRAND_PHRASES.join("|"), "g");

function highlightBrand(text?: string) {
  if (!text) return text;
  const matches = text.match(BRAND_REGEX) || [];
  if (matches.length === 0) return text;

  const parts = text.split(BRAND_REGEX);
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part, idx) => {
    if (part) result.push(part);
    const match = matches[idx];
    if (match) {
      result.push(
        <span key={idx} className="font-semibold text-[#E7303A]">
          {match}
        </span>
      );
    }
  });

  return result;
}

export default function RecipeModal({ open, onClose, recipe }: Props) {
  if (!recipe) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={recipe.title}
      maxWidthClass="max-w-3xl"
    >
      {/* Contenedor scrollable dentro del modal */}
      <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6">
        {/* Header: imagen + título */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-full sm:w-40 sm:h-28 overflow-hidden rounded-xl ring-1 ring-neutral-200 mb-3 sm:mb-0">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold">
              {recipe.title}
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              {highlightBrand(recipe.description)}
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold">Ingredients</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-800 space-y-1">
              {recipe.ingredients.map((it, i) => (
                <li key={i}>{highlightBrand(it)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Steps</h4>
            <ol className="mt-2 list-decimal pl-5 text-sm text-neutral-800 space-y-1">
              {recipe.steps.map((s, i) => (
                <li key={i}>{highlightBrand(s)}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer con botón siempre visible al final del scroll */}
        <div className="mt-6 flex justify-end pb-1">
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
