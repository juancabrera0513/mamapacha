// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

/* ================= Icons ================= */
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.95 8.44-9.94z"/>
    </svg>
  );
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 9.5zM18 6.4a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 18 6.4z"/>
    </svg>
  );
}
function IconTiktok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.5 8.1a6.7 6.7 0 0 1-4.6-2V16a6 6 0 1 1-6-6 6 6 0 0 1 1 .08V7.2a8.7 8.7 0 0 0-1-.1 8 8 0 1 0 8 8V8.8a8.9 8.9 0 0 0 4.6 1.4z"/>
    </svg>
  );
}
function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.2l8 5 8-5V6H4zm16 12V8.3l-8 5-8-5V18h16z"/>
    </svg>
  );
}

/* ============== Helpers / Styles ============== */
const brandTextDark = "text-[#0b5e63]";
const brandRingTeal = "ring-[#1cbcc6]/40";
const cartBadgeRed = "bg-[#E7303A]";

const navPill = (active: boolean, onDark: boolean) =>
  [
    "px-3 py-1.5 rounded-full text-sm font-semibold transition-colors",
    active
      ? `bg-white ${brandTextDark}`
      : onDark
      ? "text-neutral-100 hover:bg-white/10"
      : "text-neutral-900 hover:bg-neutral-100",
  ].join(" ");

export default function Header() {
  const { count } = useCart();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  // Hide on scroll + scrolled state
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

  // Close mobile on route change
  useEffect(() => setOpen(false), [pathname]);

  // Measure header height -> CSS var --header-h
  useEffect(() => {
    const setVar = () => {
      const h = wrapRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("load", setVar);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", setVar);
      window.removeEventListener("resize", setVar);
    };
  }, []);

  const isHome = pathname === "/";
  const onDarkHero = isHome && !scrolled; // cuando estás arriba del home

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={hidden}
    >
      <div ref={wrapRef} className="mx-auto max-w-6xl px-4 sm:px-6 pt-3">
        <div
          className={[
            "h-14 sm:h-16 flex items-center justify-between rounded-2xl border transition-colors",
            onDarkHero
              ? "bg-white/25 border-white/30 text-white backdrop-blur-md supports-[backdrop-filter]:bg-white/25"
              : "bg-white text-neutral-900 border-neutral-200 shadow-sm",
          ].join(" ")}
        >
          {/* Logo */}
          <Link to="/" className="pl-3 sm:pl-4" aria-label="Go to homepage">
            <img
              src="/brand/logo.png"
              alt="Logo"
              width={44}
              height={44}
              className="h-8 w-auto sm:h-9 object-contain"
              loading="eager"
              /* fetchPriority removed to silence React warning */
              /* if you want the attribute anyway: add fetchpriority="high" */
            />
          </Link>

          {/* Nav centrado */}
          <nav className="hidden md:flex items-center gap-2">
            <a href="/#shop" className={navPill(false, onDarkHero)}>Shop</a>
            <NavLink to="/about" className={({ isActive }) => navPill(isActive, onDarkHero)}>Our Story</NavLink>
            <a href="/#testimonials" className={navPill(false, onDarkHero)}>Reviews</a>
            <NavLink to="/press" className={({ isActive }) => navPill(isActive, onDarkHero)}>Press</NavLink>
            <NavLink to="/recipes" className={({ isActive }) => navPill(isActive, onDarkHero)}>Recipes</NavLink>
            <a href="/#contact" className={navPill(false, onDarkHero)}>Contact</a>
          </nav>

          {/* Social + acciones */}
          <div className="flex items-center gap-2 pr-3 sm:pr-4">
            {/* Socials */}
            <div className="hidden sm:flex items-center gap-2 mr-1">
              {/* ====== ACTUALIZA HREFS ====== */}
              <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer noopener"
                 aria-label="Facebook"
                 className={["inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
                  onDarkHero ? "border-white/30 text-white hover:bg-white/10" : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"].join(" ")}>
                <IconFacebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/yourpage" target="_blank" rel="noreferrer noopener"
                 aria-label="Instagram"
                 className={["inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
                  onDarkHero ? "border-white/30 text-white hover:bg-white/10" : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"].join(" ")}>
                <IconInstagram className="h-4 w-4" />
              </a>
              <a href="https://tiktok.com/@yourpage" target="_blank" rel="noreferrer noopener"
                 aria-label="TikTok"
                 className={["inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
                  onDarkHero ? "border-white/30 text-white hover:bg-white/10" : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"].join(" ")}>
                <IconTiktok className="h-4 w-4" />
              </a>
              <a href="mailto:hello@mamapacha.example" aria-label="Email"
                 className={["inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
                  onDarkHero ? "border-white/30 text-white hover:bg-white/10" : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"].join(" ")}>
                <IconMail className="h-4 w-4" />
              </a>
            </div>

            {/* Cart */}
            <Link
              to="/#cart"
              className={[
                "relative inline-flex items-center justify-center h-10 w-10 rounded-xl border transition",
                onDarkHero
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-neutral-200 text-neutral-800 hover:bg-neutral-100",
              ].join(" ")}
              aria-label="Cart"
              title="Cart"
            >
              🛒
              <span className={`absolute -top-1.5 -right-1.5 min-w-5 h-5 rounded-full ${cartBadgeRed} text-white text-[11px] font-bold grid place-items-center px-1`}>
                {count}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className={[
                "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border transition",
                onDarkHero
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-neutral-200 text-neutral-800 hover:bg-neutral-100",
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
              "md:hidden mt-2 rounded-2xl border backdrop-blur-md",
              onDarkHero
                ? "bg-white/25 border-white/30 text-white supports-[backdrop-filter]:bg-white/25"
                : "bg-white text-neutral-900 border-neutral-200 shadow-sm",
            ].join(" ")}
          >
            <div className="grid p-2">
              <a href="/#shop" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10">Shop</a>
              <NavLink to="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10">Our Story</NavLink>
              <a href="/#testimonials" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10">Reviews</a>
              <NavLink to="/press" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10">Press</NavLink>
              <NavLink to="/recipes" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10">Recipes</NavLink>
              <a href="/#contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10">Contact</a>
              {/* Socials in mobile */}
              <div className="mt-2 flex items-center gap-2 px-2 pb-2">
                <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer noopener" aria-label="Facebook"
                   className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 hover:bg-white/10">
                  <IconFacebook className="h-4 w-4" />
                </a>
                <a href="https://instagram.com/yourpage" target="_blank" rel="noreferrer noopener" aria-label="Instagram"
                   className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 hover:bg-white/10">
                  <IconInstagram className="h-4 w-4" />
                </a>
                <a href="https://tiktok.com/@yourpage" target="_blank" rel="noreferrer noopener" aria-label="TikTok"
                   className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 hover:bg-white/10">
                  <IconTiktok className="h-4 w-4" />
                </a>
                <a href="mailto:hello@mamapacha.example" aria-label="Email"
                   className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 hover:bg-white/10">
                  <IconMail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
