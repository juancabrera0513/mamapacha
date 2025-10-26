// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mt-8">
      <div className="container-xl py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2020–{year} De Mi Madre Aprendí, LLC. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <a href="/policies" className="hover:underline">
            Mama Pacha Spices &amp; Catering Policies
          </a>
          <a href="/cookies" className="hover:underline">
            Cookie Preferences
          </a>
          <span className="text-neutral-400">•</span>
          <span className="hover:underline">
            Site by{" "}
            <a
              href="https://domiwebsites.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Domi Websites"
              className="font-semibold"
            >
              Domi Websites
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
