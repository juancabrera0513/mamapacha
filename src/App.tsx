// src/App.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

// Páginas existentes
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

// Lazy opcionales
const Press = React.lazy(() =>
  import("@/pages/Press").catch(() => ({
    default: () => (
      <main className="container-xl py-12">Press coming soon.</main>
    ),
  }))
);
const Recipes = React.lazy(() =>
  import("@/pages/Recipes").catch(() => ({
    default: () => (
      <main className="container-xl py-12">Recipes coming soon.</main>
    ),
  }))
);

// 404
function NotFound() {
  return (
    <main className="container-xl py-16">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-neutral-600">Page not found.</p>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <ScrollToTop />

      <main className="flex-1">
        <Suspense fallback={<main className="container-xl py-12">Loading…</main>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

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
