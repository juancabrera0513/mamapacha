// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container-xl py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
      <p className="mt-3 text-neutral-600">Page not found.</p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex h-11 px-6 items-center justify-center rounded-full text-sm font-semibold bg-[#1cbcc6] text-white hover:bg-[#17aab3] transition"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
