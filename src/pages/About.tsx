// src/pages/About.tsx
import React from "react";
import PressCTA from "@/components/PressCTA";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="relative">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#41C1CC]" />
        <div className="relative container-xl py-16 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4 text-white">
              <p className="uppercase tracking-[0.18em] text-sm/6 font-semibold">
                About
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold leading-tight">
                what makes mama pacha better?!
              </h1>
              <p className="text-white/90">
                In today’s market, Latin flavor options with no added salt or artificial additives are limited. The average American consumes around{" "}
                <strong>3,400 mg</strong> of sodium per day, while the Dietary
                Guidelines recommend keeping intake below{" "}
                <strong>2,300 mg</strong>—roughly one teaspoon of salt!
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

      {/* ===== BRAND PROMISE ===== */}
      <section className="relative">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] items-center">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
                Our brand promise
              </h2>
              <p className="text-neutral-800/90">
                To tackle this, Mama Pacha has developed spice blends that
                deliver authentic Latin flavor using only natural ingredients,
                <strong> without preservatives or added salt</strong>. Our
                eco-friendly, space-saving packaging makes these healthy options
                affordable and accessible. Locally, Mama Pacha is helping
                diversify the spice blend market, making the region more
                inclusive and welcoming for the Latino community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-neutral-200 bg-neutral-100">
                <img
                  src="/images/about/promise-1.jpg"
                  alt="Natural ingredients"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-neutral-200 bg-neutral-100">
                <img
                  src="/images/about/promise-2.jpg"
                  alt="Eco-friendly packaging"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-neutral-200 bg-neutral-100">
                <img
                  src="/images/about/promise-3.jpg"
                  alt="No preservatives, no added salt"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-neutral-200 bg-neutral-100">
                <img
                  src="/images/about/promise-4.jpg"
                  alt="Inclusive flavors for our community"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COOKING FOR A CAUSE (imagen izquierda, texto derecha) ===== */}
      <section className="relative">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Imagen IZQUIERDA */}
            <div className="order-1 md:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-neutral-200 bg-neutral-100 shadow-sm">
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
              <p className="uppercase tracking-[0.18em] text-sm/6 font-semibold text-[#0b5e63]">
                Cooking for a cause
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
                How the Pandemic Inspired My Puerto Rican Food Business to Help
                Families in Need
              </h2>

              <div className="prose prose-neutral max-w-none">
                <p>
                  The idea of starting my food business came to mind during the{" "}
                  <strong>2020 Pandemic</strong> while I worked as a Special
                  Instructor for the State of Missouri supporting families and
                  their children with special needs. In this role, I worked with{" "}
                  <strong>low-income families</strong> who were in much need of
                  computers and tablets for online learning. In some cases, a
                  family would have to share a smartphone to take their classes.
                  I thought about selling authentic Puerto Rican food to friends
                  to raise money to buy computers and tablets for these
                  children.
                </p>
                <p>
                  Thanks to my amazing friends, I was able to distribute{" "}
                  <strong>15 computers and tablets</strong> to families in need!
                  The food I prepare for my loved ones is made with fresh
                  ingredients and my own custom spice blends. My customers began
                  to notice the flavors and often asked, ‘What brand do you
                  use?’ I proudly told them, ‘It’s my own blend, made with the
                  same fresh ingredients and spices my mother used in her
                  homemade dishes.’ That’s how the name of my business,{" "}
                  <em>De Mi Madre Aprendí</em> (“From my Mother I Learned”),
                  came to be.
                </p>
                <blockquote className="border-l-4 pl-4 italic">
                  “I use fresh ingredients and also combine the spices just like
                  my mother used to do for her homemade Puerto Rican foods.”
                </blockquote>
              </div>

              <div className="pt-2">
                {/* Modal de prensa en sitio */}
                <PressCTA />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <section className="relative">
        <div className="container-xl pb-14">
          <div className="rounded-3xl bg-[#41C1CC] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-extrabold">
                Ready to taste the difference?
              </h3>
              <p className="text-white/90">
                Shop our salt-free spices or explore merch & catering.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/shop?category=spices"
                className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-white text-[#0b5e63] hover:bg-neutral-100 transition"
              >
                Shop Spices
              </Link>
              <Link
                to="/shop?category=all"
                className="inline-flex h-11 px-5 items-center justify-center rounded-full text-sm font-semibold bg-[#E7303A] text-white hover:bg-[#c3252e] transition"
              >
                Shop Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
