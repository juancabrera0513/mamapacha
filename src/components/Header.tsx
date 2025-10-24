// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const navPill = (active: boolean) =>
  [
    "px-3 py-1.5 rounded-full text-sm font-semibold transition-colors",
    active ? "bg-neutral-900 text-white" : "text-neutral-100 hover:bg-white/10",
  ].join(" ");

export default function Header() {
  const { count } = useCart();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 8);

      const goingDown = y > lastY.current;
      if (y < 16) setHidden(false);
      else setHidden(goingDown);
      lastY.current = y;

      if (idleTimer.current) cancelAnimationFrame(idleTimer.current);
      idleTimer.current = requestAnimationFrame(() => setHidden(false));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) cancelAnimationFrame(idleTimer.current);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={hidden}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-3">
        <div
          className={[
            "h-14 sm:h-16 flex items-center justify-between rounded-2xl border transition-colors",
            scrolled || !isHome
              ? "bg-white/80 border-white/20 backdrop-blur shadow-sm"
              : "bg-transparent border-white/20",
          ].join(" ")}
        >
          {/* Logo sin cuadrito ni texto */}
          <Link to="/" className="pl-3 sm:pl-4" aria-label="Go to homepage">
            <img
              src="/brand/logo.png"
              alt="Logo"
              width={44}
              height={44}
              className="h-8 w-auto sm:h-9 object-contain" // ⬅️ sin fondo/cuadro ni texto
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Nav centrado */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="/#shop" className={navPill(false)}>Shop</a>
            <NavLink to="/about" className={({ isActive }) => navPill(isActive)}>Our Story</NavLink>
            <a href="/#testimonials" className={navPill(false)}>Reviews</a>
            <NavLink to="/press" className={({ isActive }) => navPill(isActive)}>Press</NavLink>
            <NavLink to="/recipes" className={({ isActive }) => navPill(isActive)}>Recipes</NavLink>
            <a href="/#contact" className={navPill(false)}>Contact</a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2 pr-3 sm:pr-4">
            <Link
              to="/#cart"
              className={[
                "relative inline-flex items-center justify-center h-10 w-10 rounded-xl border transition",
                scrolled || !isHome
                  ? "border-neutral-200 text-neutral-800 hover:bg-neutral-50"
                  : "border-white/30 text-white hover:bg-white/10",
              ].join(" ")}
              aria-label="Cart"
              title="Cart"
            >
              🛒
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold grid place-items-center px-1">
                {count}
              </span>
            </Link>

            <button
              className={[
                "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border transition",
                scrolled || !isHome
                  ? "border-neutral-200 text-neutral-800 hover:bg-neutral-50"
                  : "border-white/30 text-white hover:bg-white/10",
              ].join(" ")}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div
            id="mobile-nav"
            className={[
              "md:hidden mt-2 rounded-2xl border backdrop-blur",
              scrolled || !isHome
                ? "bg-white/80 border-white/20 shadow-sm"
                : "bg-white/10 border-white/20",
            ].join(" ")}
          >
            <div className="grid p-2">
              <a href="/#shop" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-neutral-900">Shop</a>
              <NavLink to="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-neutral-900">Our Story</NavLink>
              <a href="/#testimonials" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-neutral-900">Reviews</a>
              <NavLink to="/press" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-neutral-900">Press</NavLink>
              <NavLink to="/recipes" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-neutral-900">Recipes</NavLink>
              <a href="/#contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 text-neutral-900">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
