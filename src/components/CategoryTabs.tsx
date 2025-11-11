// src/components/CategoryTabs.tsx
import React from "react";
import { Link } from "react-router-dom";

export type Category = "all" | "spices" | "merch" | "catering";

type Props = {
  value: Category;
  onChange: (c: Category) => void;
  /** Si true, renderiza enlaces (para /shop). Si false, renderiza botones (para Home). */
  asLinks?: boolean;
  /** Base href cuando asLinks = true */
  baseHref?: string; // default: "/shop"
};

const CATS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "spices", label: "Spices" },
  { key: "merch", label: "Merch" },
  { key: "catering", label: "Catering" },
];

export default function CategoryTabs({
  value,
  onChange,
  asLinks = true,
  baseHref = "/shop",
}: Props) {
  return (
    <div className="inline-flex rounded-full bg-white/70 text-neutral-900 ring-1 ring-black/10 p-1 backdrop-blur-md">
      {CATS.map(({ key, label }) => {
        const isActive = value === key;
        const cls =
          "h-10 px-4 sm:px-5 rounded-full text-sm font-semibold transition " +
          (isActive
            ? "bg-[#e33c30] text-white shadow"
            : "hover:bg-black/5 text-neutral-800");

        if (asLinks) {
          return (
            <Link
              key={key}
              to={`${baseHref}?category=${key}`}
              className={cls + " flex items-center justify-center"}
            >
              {label}
            </Link>
          );
        }

        // Modo botones: no navegamos, solo cambiamos estado en el mismo Home
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cls}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
