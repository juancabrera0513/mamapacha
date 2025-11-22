// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

import Hero from "../sections/Hero";
import Inspiration from "../sections/Inspiration";
import FlavorShowcase from "../sections/FlavorShowcase";
import SupportedBy from "../sections/SupportedBy";
import Testimonials from "../sections/Testimonials";
import FeaturedOn from "../sections/FeaturedOn";
import Contact from "../sections/Contact";
import HomeShop from "@/sections/HomeShop";
import { FEATURED_OUTLETS } from "@/data/press";
import PressCTA from "@/components/PressCTA";

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== BANNER FULL-WIDTH CLICKEABLE -> /shop ===== */}
      <section className="relative bg-[#1cbbc7]">
        <Link to="/shop" className="block group">
          {/* La imagen se ve COMPLETA (sin recorte) */}
          <img
            src="/images/fondo.webp" // asegúrate de que este path sea correcto
            alt="Shop Mama Pacha Sabor"
            className="w-full h-auto object-contain block"
            loading="lazy"
          />

          {/* Overlay suave + CTA centrado */}
          <div className="pointer-events-none absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

        </Link>
      </section>

      {/* ===== Inspiration — fondo #E43C31 ===== */}
      <section className="bg-[#E43C31] text-white">
        <div className="container-xl py-0">
          <Inspiration />
        </div>
      </section>

      {/* ===== ABOUT — HERO — fondo #1cbbc7 ===== */}
      <section className="bg-[#1cbbc7] text-white">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="uppercase tracking-[0.18em] text-sm/6 font-semibold">About</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-extrabold leading-tight">
                what makes mama pacha better?!
              </h2>
              <p className="text-white/90">
                In today’s market, Latin flavor options with no added salt or artificial additives are limited.
                The average American consumes around <strong>3,400 mg</strong> of sodium per day, while the
                Dietary Guidelines recommend keeping intake below <strong>2,300 mg</strong>—roughly one teaspoon of salt!
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/30 shadow-xl">
              <img
                src="/images/about/hero.jpg"
                alt="Mama Pacha Sabor — About"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT — BRAND PROMISE — fondo #E43C31 ===== */}
      <section className="bg-[#E43C31] text-white">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] items-center">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold">Our brand promise</h3>
              <p className="text-white/90">
                To tackle this, Mama Pacha has developed spice blends that deliver authentic Latin flavor using only
                natural ingredients,<strong> without preservatives or added salt</strong>. Our eco-friendly,
                space-saving packaging makes these healthy options affordable and accessible. Locally, Mama Pacha is
                helping diversify the spice blend market, making the region more inclusive and welcoming for the
                Latino community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/about/promise-1.jpg", alt: "Natural ingredients" },
                { src: "/images/about/promise-2.jpg", alt: "Eco-friendly packaging" },
                { src: "/images/about/promise-3.jpg", alt: "No preservatives, no added salt" },
                { src: "/images/about/promise-4.jpg", alt: "Inclusive flavors for our community" },
              ].map((m) => (
                <div
                  key={m.src}
                  className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/30 bg-white/10"
                >
                  <img
                    src={m.src}
                    alt={m.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT — COOKING FOR A CAUSE — fondo #1cbbc7 ===== */}
      <section className="bg-[#1cbbc7] text-white">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Imagen IZQUIERDA */}
            <div className="order-1 md:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/30 bg-white/10 shadow-sm">
                <img
                  src="/images/about/cause-1.jpg"
                  alt="Cooking for a cause"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Texto DERECHA */}
            <div className="order-2 md:order-2 space-y-3">
              <p className="uppercase tracking-[0.18em] text-sm/6 font-semibold">Cooking for a cause</p>
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold">
                How the Pandemic Inspired My Puerto Rican Food Business to Help Families in Need
              </h3>

              <div className="prose max-w-none prose-invert">
                <p>
                  The idea of starting my food business came to mind during the <strong>2020 Pandemic</strong> while
                  I worked as a Special Instructor for the State of Missouri supporting families and their children
                  with special needs. In this role, I worked with <strong>low-income families</strong> who were in
                  much need of computers and tablets for online learning. In some cases, a family would have to share
                  a smartphone to take their classes. I thought about selling authentic Puerto Rican food to friends
                  to raise money to buy computers and tablets for these children.
                </p>
                <p>
                  Thanks to my amazing friends, I was able to distribute <strong>15 computers and tablets</strong> to
                  families in need! The food I prepare for my loved ones is made with fresh ingredients and my own
                  custom spice blends. My customers began to notice the flavors and often asked, ‘What brand do you
                  use?’ I proudly told them, ‘It’s my own blend, made with the same fresh ingredients and spices my
                  mother used in her homemade dishes.’ That’s how the name of my business, <em>De Mi Madre Aprendí</em>
                  (“From my Mother I Learned”), came to be.
                </p>
                <blockquote className="border-l-4 pl-4 italic border-white/60">
                  “I use fresh ingredients and also combine the spices just like my mother used to do for her homemade Puerto Rican foods.”
                </blockquote>
              </div>

              <div className="pt-2">
                <PressCTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FlavorShowcase — fondo #E43C31 ===== */}
      <section className="bg-[#E43C31] text-white">
        <div className="container-xl py-0">
          <FlavorShowcase videoId="DJItLcqxNHI" />
        </div>
      </section>

      {/* ===== Products / Shop — fondo #1cbbc7 (HomeShop) ===== */}
      <HomeShop />

      {/* ===== CTA STRIP — fondo #E43C31 ===== */}
      <section className="bg-[#E43C31] text-white">
        <div className="container-xl py-12">
          <div className="max-w-5xl mx-auto rounded-3xl bg-white/10 ring-1 ring-white/30 p-6 sm:p-8">
            <div className="flex flex-col items-center text-center gap-5">
              <div>
                <h4 className="font-serif text-2xl sm:text-3xl font-extrabold">
                  Ready to taste the difference?
                </h4>
                <p className="mt-1 text-white/90">
                  Shop our salt-free spices or explore merch &amp; catering.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="/shop?category=spices"
                  className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-white text-[#E43C31] hover:bg-neutral-100 transition"
                >
                  Shop Spices
                </a>
                <a
                  href="/shop?category=all"
                  className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-white/0 ring-1 ring-white text-white hover:bg-white/10 transition"
                >
                  Shop Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SupportedBy — fondo #1cbbc7 ===== */}
      <section className="bg-[#1cbbc7] text-white">
        <div className="container-xl py-0">
          <SupportedBy
            logos={[
              { src: "/logos/partner1.png", alt: "CORTEX", href: "#" },
              { src: "/logos/partner2.png", alt: "Hispanic Chamber of Commerce", href: "#" },
              { src: "/logos/partner3.png", alt: "Square One", href: "#" },
              { src: "/logos/partner4.png", alt: "El Morelia Supermercado", href: "#" },
              { src: "/logos/partner5.png", alt: "Schnucks", href: "#" },
              { src: "/logos/partner6.png", alt: "WE POWER STL", href: "#" },
            ]}
          />
        </div>
      </section>

      {/* ===== Testimonials — fondo #E43C31 ===== */}
      <section className="bg-[#E43C31] text-white">
        <div className="container-xl py-0">
          <Testimonials />
        </div>
      </section>

      {/* ===== FeaturedOn — fondo #1cbbc7 ===== */}
      <section className="bg-[#1cbbc7]">
        <div className="container-xl py-0">
          <FeaturedOn
            title="Featured On"
            subtitle="Media coverage and interviews."
            outlets={FEATURED_OUTLETS}
            ctaHref="/press"
            theme="light"
          />
        </div>
      </section>

      {/* ===== Contact — fondo #E43C31 ===== */}
      <section className="bg-[#E43C31] text-white">
        <div className="container-xl py-0">
          <Contact />
        </div>
      </section>
    </>
  );
}