// src/components/CategoryTabs.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export type Category = "all" | "spices" | "merch" | "catering";

const BRAND = {
  bg: "bg-white",
  activeBg: "bg-[#1cbcc6]",
  activeText: "text-white",
  ring: "ring-[#1cbcc6]/40",
};

type Props = {
  value: Category;
  onChange: (c: Category) => void;
};

const labels: Record<Category, string> = {
  all: "All",
  spices: "Spices",
  merch: "Merch",
  catering: "Catering",
};

export default function CategoryTabs({ value, onChange }: Props) {
  const navigate = useNavigate();

  const setCat = (c: Category) => {
    onChange(c);
    const qs = new URLSearchParams({ category: c });
    navigate({ pathname: "/shop", search: qs.toString() }, { replace: false });
  };

  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition border";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(Object.keys(labels) as Category[]).map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={[
              base,
              active
                ? `${BRAND.activeBg} ${BRAND.activeText} ${BRAND.ring} ring-2 border-transparent`
                : `border-neutral-300 text-neutral-900 hover:bg-neutral-50 ${BRAND.bg}`,
            ].join(" ")}
            aria-pressed={active}
          >
            {labels[c]}
          </button>
        );
      })}
    </div>
  );
}
