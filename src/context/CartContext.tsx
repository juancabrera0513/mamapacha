import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/site";

type LineItem = { product: Product; qty: number };

type CartState = {
  items: LineItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  count: number;
  total: number; // in dollars
};

const CartContext = createContext<CartState | null>(null);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<LineItem[]>([]);

  const add = (p: Product) => {
    setItems((prev) => {
      const i = prev.findIndex((li) => li.product.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((li) => li.product.id !== id));
  };

  const clearCart = () => setItems([]);

  const { count, total } = useMemo(() => {
    const c = items.reduce((acc, li) => acc + li.qty, 0);
    const t = items.reduce((acc, li) => acc + li.qty * li.product.price, 0);
    return { count: c, total: t };
  }, [items]);

  const value = { items, add, remove, clearCart, count, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
