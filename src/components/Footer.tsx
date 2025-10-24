// src/components/Footer.tsx (solo ejemplo del bloque enlaces)
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="font-serif text-lg">Mama Pacha</div>
          <p className="mt-2 text-sm text-neutral-600">
            Puerto Rican spices & catering.
          </p>
        </div>
        <div>
          <div className="font-medium">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><a href="/#shop">Shop</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        {/* redes / policies */}
      </div>
    </footer>
  );
}
