// src/sections/Testimonials.tsx
import React, { useEffect, useRef, useState } from "react";

type Review = {
  name: string;
  text: string;
};

const REVIEWS: Review[] = [
  { name: "Elaine Schmidt", text: "I just got back from a trip to Puerto Rico, and eating Mama Pacha Sabor food brought me back! It is SOOOO good! Couldn’t recommend enough. These are my yummy leftovers 🥰" },
  { name: "Naima", text: "Absolutely delicious! The empanadas were incredible especially the sausage one, which was packed with flavor and perfectly seasoned. And the flan? So creamy and smooth, it was the perfect sweet treat to end the meal." },
  { name: "Nicole Ackermann", text: "We had Mama Pacha Sabor cater 2 events of about 35 people and everything was delicious! Leslie also worked with us to accommodate several different food allergies." },
  { name: "Katie Evola", text: "Oh my goodness! Not only is the chicken perfectly season, it was melt in my mouth delicious, so tender and cooked to perfection. Additionally the owner is a gem and so wonderful to work with! You cannot go wrong ❤️" },
  { name: "Jill Capes", text: "Leslie catered a school event for us, and the food was well-loved by all. My personal favorite was the black beans. She is friendly, reliable, prompt, and a good communicator. Would highly recommend!" },
  { name: "Kelly Lugo", text: "A great woman, running a great local Puerto Rican food company!!! Must Try! ❤️" },
  { name: "Alex Cohen", text: "Amazing food! Amazing people! Always brings me back to my time on the island & memories of the beautiful Puerto Rican culture." },
  { name: "Maria Rosario", text: "Food transports me back to Puerto Rico. Nothing like a home cooked meal from Mama Pacha Sabor. ❤️" },
  { name: "Julian Bosques", text: "Super high quality Puerto Rican food and is the best comfort food EVER." },
  { name: "Robert Clark", text: "The food was and always is amazing!!!" },
  { name: "Daniel Bastian", text: "Puerto Rican recently moved to Missouri. They only gave me Leslie's number for some pastries and seasoning, but I regret not having bought more than a dozen because I thought I was on my island eating the pastries. The texture and flavor were incredible." },
  { name: "Paloma Rodriguez", text: "Their service, the flavor of their dishes and the enormous heart that Mama Pacha carries are a combination that anyone will enjoy. 💯❤️" },
  { name: "Maria Elisa Aguilo", text: "The food is spectacular. I love everything about it. I truly recommend it 100%." },
  { name: "Jasmin Cabrera", text: "❤️" },
  { name: "Alejandra Almonte", text: "Unmatched flavor ❣️❣️❣️🫶💯" },
  { name: "Elsa’s Cleaning Company", text: "I tried the seasonings and they gave my meals a delicious flavor. They will never be missing from my kitchen again. 🫶" },
];

export default function Testimonials() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  // calcula cuántas tarjetas por vista (1 / 2 / 3) y páginas
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const perView = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
      setPages(Math.max(1, Math.ceil(REVIEWS.length / perView)));
      // clamp page actual
      setPage((p) => Math.min(p, Math.max(0, Math.ceil(REVIEWS.length / perView) - 1)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // sincroniza scroll cuando cambias page
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: page * w, behavior: "smooth" });
  }, [page]);

  // autoplay suave cuando es visible
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let timer: any;
    let visible = false;

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.5 }
    );

    const start = () => {
      stop();
      timer = setInterval(() => {
        setPage((p) => (p + 1) % pages || 0);
      }, 5000);
    };
    const stop = () => timer && clearInterval(timer);

    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [pages]);

  const prev = () => setPage((p) => (p - 1 + pages) % pages);
  const next = () => setPage((p) => (p + 1) % pages);

  return (
    <section id="testimonials" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-center text-neutral-600">
          Real words from real people who’ve enjoyed Mama Pacha Sabor.
        </p>

        {/* Viewport */}
        <div className="relative mt-10">
          {/* Carrusel */}
          <div
            ref={viewportRef}
            className="overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
          >
            <div className="flex">
              {REVIEWS.map((r, idx) => (
                <article
                  key={idx}
                  className={[
                    "snap-start shrink-0 px-2",             // gutters
                    "w-full sm:w-1/2 lg:w-1/3",              // 1/2/3 por vista
                  ].join(" ")}
                >
                  <div className="h-full rounded-2xl bg-white/90 backdrop-blur-md ring-1 ring-black/10 shadow-sm p-6 flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#E7303A]/10 ring-1 ring-[#E7303A]/20 flex items-center justify-center select-none">
                        <span className="font-bold text-[#E7303A]">
                          {r.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-semibold">{r.name}</h3>
                    </div>

                    <p className="mt-4 text-neutral-800 leading-7">
                      {r.text}
                    </p>

                    {/* acento de marca */}
                    <div className="mt-6 h-1 w-12 rounded-full bg-[#E7303A]/70" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controles */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonials"
                className="h-10 w-10 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Next testimonials"
                className="h-10 w-10 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors"
              >
                ›
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    i === page ? "w-8 bg-[#E7303A]" : "w-3 bg-neutral-300 hover:bg-neutral-400",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Oculta la barra de scroll en navegadores comunes */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
