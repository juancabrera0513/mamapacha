// src/App.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

// Tus páginas existentes
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";

// About (la que agregamos)
import About from "@/pages/About";

// Estas pueden no existir aún: dejo placeholders listos
const Press = React.lazy(() =>
  import("@/pages/Press").catch(() => ({
    default: () => (
      <main className="container-xl py-12">
        <h1 className="text-2xl font-bold">Press</h1>
        <p className="mt-2 text-neutral-600">Coming soon.</p>
      </main>
    ),
  }))
);

const Recipes = React.lazy(() =>
  import("@/pages/Recipes").catch(() => ({
    default: () => (
      <main className="container-xl py-12">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <p className="mt-2 text-neutral-600">Coming soon.</p>
      </main>
    ),
  }))
);

// 404
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      {/* Spacer para header fijo (usa la var dinámica que setea el Header) */}

      {/* Scroll to top al cambiar de ruta */}
      <ScrollToTop />

      <main className="flex-1">
        <Suspense
          fallback={
            <main className="container-xl py-12">
              <p className="text-neutral-600">Loading…</p>
            </main>
          }
        >
          <Routes>
            {/* Rutas existentes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />

            {/* Nuevas rutas */}
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/recipes" element={<Recipes />} />

            {/* Alias útiles (opcionales) */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer (si ya lo tienes, reemplaza este bloque por tu componente) */}
      <footer className="border-t mt-8">
        <div className="container-xl py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2020–{new Date().getFullYear()} De Mi Madre Aprendí, LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/policies" className="hover:underline">Mama Pacha Spices & Catering Policies</a>
            <a href="/credits" className="hover:underline">Site Credit</a>
            <a href="/cookies" className="hover:underline">Cookie Preferences</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


