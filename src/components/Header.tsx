// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const RED = "#E7303A";

const linkCls = (active: boolean) =>
  [
    "px-3 sm:px-4 py-1.5 rounded-full font-extrabold transition-colors",
    "text-[15px] xs:text-[16px] sm:text-[17px]",
    "whitespace-nowrap",
    active ? "bg-white" : "bg-transparent",
  ].join(" ");

export default function Header() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  // Mostrar/ocultar según scroll + estado clear/solid
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

  // Fijar --header-h para espaciado del hero/primer bloque
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
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-hidden={hidden}
    >
      <div
        ref={wrapRef}
        className="mx-auto max-w-6xl px-3 sm:px-4 pt-[calc(env(safe-area-inset-top,0)+8px)]"
      >
        {/* Solo la píldora: ocupa todo el ancho disponible y no desborda */}
        <div className="min-w-0">
          <div
            className={[
              "h-16 flex items-center rounded-2xl border px-2 sm:px-3",
              "mx-auto",
              // modo clear (sobre hero)
              "bg-white/25 border-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/25",
              // solido al hacer scroll
              scrolled ? "bg-white text-neutral-900 border-neutral-200 shadow-sm" : "",
            ].join(" ")}
            style={{ maxWidth: "100%" }}
          >
            {/* Grid: nav flexible + carrito al borde derecho */}
            <div className="grid grid-cols-[1fr_auto] w-full items-center gap-2">
              {/* NAV en una sola línea, centrado, con micro-scroll interno si hace falta */}
              <nav
                className={[
                  "flex items-center justify-center w-full",
                  "gap-2 sm:gap-3",
                  "overflow-x-auto no-scrollbar",
                  "whitespace-nowrap",
                ].join(" ")}
              >
                <NavLink to="/" onClick={goTop} className={({ isActive }) => linkCls(isActive)}>
                  Home
                </NavLink>
                <NavLink to="/shop" className={({ isActive }) => linkCls(isActive)}>
                  Shop
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => linkCls(isActive)}>
                  Our Story
                </NavLink>
                <NavLink to="/press" className={({ isActive }) => linkCls(isActive)}>
                  Press
                </NavLink>
                <NavLink to="/recipes" className={({ isActive }) => linkCls(isActive)}>
                  Recipes
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => linkCls(isActive)}>
                  Contact
                </NavLink>
              </nav>

              {/* Carrito */}
              <NavLink
                to="/#cart"
                className={[
                  "relative inline-flex items-center justify-center h-10 w-10 rounded-xl border transition",
                  scrolled
                    ? "border-neutral-200 text-neutral-800 hover:bg-neutral-100"
                    : "border-white/30 text-white hover:bg-white/10",
                ].join(" ")}
                aria-label="Cart"
                title="Cart"
              >
                🛒
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 rounded-full bg-[#E7303A] text-white text-[11px] font-bold grid place-items-center px-1">
                  {count}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Reglas auxiliares */}
      <style>{`
        /* Rojo siempre en los links del header (clear o solid) */
        header a { color: ${RED}; }
        /* Oculta scrollbar del micro-scroll del nav */
        .no-scrollbar { scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* Previene scroll horizontal global */
        html, body { overflow-x: hidden; }
      `}</style>
    </header>
  );
}
