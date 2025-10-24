// src/pages/Home.tsx
import React from "react";

import Hero from "../sections/Hero";
import Inspiration from "../sections/Inspiration";
import FlavorShowcase from "../sections/FlavorShowcase";
import Products from "../sections/Products";
import SupportedBy from "../sections/SupportedBy";      // ⬅️ new
import Testimonials from "../sections/Testimonials";
import FeaturedOn from "../sections/FeaturedOn";        // ⬅️ new
import Supporters from "../sections/Supporters";        // (keep if you still want it)
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Inspiration />

      <FlavorShowcase
        videoId="r2tUR5W-WtQ"
        images={[
          "/decor/decor1.png",
          "/decor/decor2.png",
          "/decor/decor3.png",
          "/decor/decor4.png",
          "/decor/decor5.png",
          "/decor/decor6.png",
        ]}
      />

      <Products />

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

      <Testimonials />

      <FeaturedOn
        outlets={[
          { src: "/logos/press1.png", alt: "Fox 2 News", href: "#" },
          { src: "/logos/press2.png", alt: "Univision", href: "#" },
          { src: "/logos/press3.png", alt: "Voyage STL", href: "#" },
          { src: "/logos/press4.png", alt: "STL Today", href: "#" },
        ]}
        ctaHref="/press"
      />

      <Contact />
    </>
  );
}
