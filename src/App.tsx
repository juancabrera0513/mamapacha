import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderSuccess from "@/pages/OrderSuccess";


const Press = React.lazy(() =>
  import("@/pages/Press").catch(() => ({
    default: () => <main className="container-xl py-12">Press coming soon.</main>,
  }))
);
const Recipes = React.lazy(() =>
  import("@/pages/Recipes").catch(() => ({
    default: () => <main className="container-xl py-12">Recipes coming soon.</main>,
  }))
);
const Policies = React.lazy(() =>
  import("@/pages/Policies").catch(() => ({
    default: () => (
      <main className="container-xl py-12" style={{ paddingTop: "var(--header-h, 36px)" }}>
        <h1 className="font-serif text-3xl font-extrabold">Policies</h1>
        <p className="mt-2 text-neutral-700">Policies page coming soon.</p>
      </main>
    ),
  }))
);
const Cookies = React.lazy(() =>
  import("@/pages/Cookies").catch(() => ({
    default: () => (
      <main className="container-xl py-12" style={{ paddingTop: "var(--header-h, 36px)" }}>
        <h1 className="font-serif text-3xl font-extrabold">Cookie Preferences</h1>
        <p className="mt-2 text-neutral-700">Use the button below to update your preferences.</p>
        {/* Botón que abre el modal */}
        <CookiePreferencesOpener />
      </main>
    ),
  }))
);

// === Cookie Consent
import { CookieConsentProvider, useConsent } from "@/context/CookieConsent";
import CookieBanner from "@/components/CookieBanner";
import CookiePreferences from "@/components/CookiePreferences";

// Pequeño componente para /cookies
function CookiePreferencesOpener() {
  const { openPreferences } = useConsent();
  return (
    <div className="mt-6">
      <button
        onClick={openPreferences}
        className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#E7303A] text-white hover:bg-[#c3252e] transition"
      >
        Open preferences
      </button>
    </div>
  );
}

// 404
function NotFound() {
  return (
    <main className="container-xl py-16" style={{ paddingTop: "var(--header-h, 36px)" }}>
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-neutral-600">Page not found.</p>
    </main>
  );
}

export default function App() {
  return (
    <CookieConsentProvider>
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
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/order-success" element={<OrderSuccess />} />


              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        {/* Banner y Modal de cookies */}
        <CookieBanner />
        <CookiePreferences />
      </div>
    </CookieConsentProvider>
  );
}
