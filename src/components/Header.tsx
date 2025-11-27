// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const RED = "#E7303A";

/* Icono Home (para móvil) */
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 3.1 3 10v10a1 1 0 0 0 1 1h5.5a.5.5 0 0 0 .5-.5v-5h4v5a.5.5 0 0 0 .5.5H20a1 1 0 0 0 1-1V10l-9-6.9Z"
      />
    </svg>
  );
}

/* Clases para los links del nav */
const linkCls = (active: boolean, isMobile: boolean) =>
  [
    "px-2 sm:px-3 py-1 rounded-full font-extrabold transition-colors",
    isMobile ? "text-[12px]" : "text-[14px] sm:text-[15px]",
    "whitespace-nowrap",
    active ? "bg-white" : "bg-transparent",
  ].join(" ");

export default function Header() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);

  // Cambiar estado "scrolled" según scroll (pero sin esconder el header)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fijar --header-h
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
    };
  }, []);

  const isHome = pathname === "/";
  const goTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={wrapRef}
        className="mx-auto max-w-6xl px-3 sm:px-4 pt-[calc(env(safe-area-inset-top,0)+8px)]"
      >
        {/* ====== MOBILE (xs) ====== */}
        <div className="min-w-0 sm:hidden">
          <div
            className={[
              "h-16 flex items-center rounded-2xl border mx-auto px-2",
              "bg-white/25 border-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/25",
              scrolled ? "bg-white text-neutral-900 border-neutral-200 shadow-sm" : "",
            ].join(" ")}
            style={{ maxWidth: "100%" }}
          >
            <div className="flex w-full items-center gap-2">
              {/* Home icon */}
              <button
                onClick={goTop}
                aria-label="Home"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white flex-shrink-0"
                style={{ color: RED }}
              >
                <HomeIcon className="h-4 w-4" />
              </button>

              {/* Nav centrado, texto pequeño para que TODO quepa */}
              <nav
                className={[
                  "flex-1 flex items-center justify-center",
                  "gap-1.5",
                  "whitespace-nowrap",
                ].join(" ")}
              >
                <NavLink
                  to="/shop"
                  className={({ isActive }) => linkCls(isActive, true)}
                  style={{ color: RED }}
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => linkCls(isActive, true)}
                  style={{ color: RED }}
                >
                  Story
                </NavLink>
                <NavLink
                  to="/press"
                  className={({ isActive }) => linkCls(isActive, true)}
                  style={{ color: RED }}
                >
                  Press
                </NavLink>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) => linkCls(isActive, true)}
                  style={{ color: RED }}
                >
                  Recipes
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => linkCls(isActive, true)}
                  style={{ color: RED }}
                >
                  Contact
                </NavLink>
              </nav>

              {/* Cart */}
              <NavLink
                to="/#cart"
                className={[
                  "relative inline-flex items-center justify-center flex-shrink-0",
                  "h-9 w-9 rounded-full border transition",
                  scrolled
                    ? "border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                    : "border-white/30 text-white hover:bg-white/10",
                ].join(" ")}
                aria-label="Cart"
                title="Cart"
              >
                <span className="text-[16px]">🛒</span>
                <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] rounded-full bg-[#E7303A] text-white text-[9px] font-bold leading-none grid place-items-center px-0.5">
                  {count}
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* ====== DESKTOP / TABLET (sm y arriba) ====== */}
        <div className="min-w-0 hidden sm:block">
          <div
            className={[
              "h-16 flex items-center rounded-2xl border mx-auto px-4",
              "bg-white/25 border-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/25",
              scrolled ? "bg-white text-neutral-900 border-neutral-200 shadow-sm" : "",
            ].join(" ")}
            style={{ maxWidth: "100%" }}
          >
            <div className="flex w-full items-center gap-4">
              {/* NAV centrado con Home como texto */}
              <nav
                className={[
                  "flex-1 flex items-center justify-center",
                  "gap-3",
                  "whitespace-nowrap",
                ].join(" ")}
              >
                <NavLink
                  to="/"
                  onClick={goTop}
                  className={({ isActive }) => linkCls(isActive, false)}
                  style={{ color: RED }}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => linkCls(isActive, false)}
                  style={{ color: RED }}
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => linkCls(isActive, false)}
                  style={{ color: RED }}
                >
                  Our Story
                </NavLink>
                <NavLink
                  to="/press"
                  className={({ isActive }) => linkCls(isActive, false)}
                  style={{ color: RED }}
                >
                  Press
                </NavLink>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) => linkCls(isActive, false)}
                  style={{ color: RED }}
                >
                  Recipes
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => linkCls(isActive, false)}
                  style={{ color: RED }}
                >
                  Contact
                </NavLink>
              </nav>

            {/* Cart */}
<NavLink
  to="/checkout"   // 👈 antes era "/#cart"
  className={[
    "relative inline-flex items-center justify-center flex-shrink-0",
    "h-9 w-9 rounded-full border transition",
    scrolled
      ? "border-neutral-200 text-neutral-800 hover:bg-neutral-100"
      : "border-white/30 text-white hover:bg-white/10",
  ].join(" ")}
  aria-label="Cart"
  title="Cart"
>
  <span className="text-[16px]">🛒</span>
  <span className="absolute top-0.5 right-0.5 min-w-[14px] h-[14px] rounded-full bg-[#E7303A] text-white text-[9px] font-bold leading-none grid place-items-center px-0.5">
    {count}
  </span>
</NavLink>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        html, body { overflow-x: hidden; }
      `}</style>
    </header>
  );
}
