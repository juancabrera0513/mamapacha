// scripts/generate-sitemap.ts
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { SitemapStream, streamToPromise } from "sitemap";

// IMPORTA TUS PRODUCTOS (TS)
import { PRODUCTS } from "../src/data/site";

const BASE_URL = process.env.SITE_URL || "https://www.mamapachasabor.com"; // cambia si quieres

// Rutas estáticas de tu router
const STATIC_ROUTES = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/shop", changefreq: "weekly", priority: 0.9 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/press", changefreq: "monthly", priority: 0.6 },
  { url: "/recipes", changefreq: "monthly", priority: 0.6 },
  { url: "/contact", changefreq: "yearly", priority: 0.5 },
  { url: "/policies", changefreq: "yearly", priority: 0.4 },
  { url: "/cookies", changefreq: "yearly", priority: 0.3 },
];

// Rutas dinámicas: productos
const productRoutes =
  PRODUCTS.map((p) => {
    const slug = p.slug || p.id;
    return {
      url: `/shop/${encodeURIComponent(slug)}`,
      changefreq: "weekly" as const,
      priority: 0.8,
      lastmod: new Date().toISOString().slice(0, 10),
    };
  });

// Generar sitemap
async function build() {
  const distDir = resolve(process.cwd(), "dist");
  mkdirSync(distDir, { recursive: true });

  const smStream = new SitemapStream({ hostname: BASE_URL });
  const links = [...STATIC_ROUTES, ...productRoutes];

  links.forEach((l) => smStream.write(l));
  smStream.end();

  const xml = await streamToPromise(smStream).then((d) => d.toString());
  writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf-8");

  // robots.txt básico que expone el sitemap
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL.replace(/\/$/, "")}/sitemap.xml
`;
  writeFileSync(resolve(distDir, "robots.txt"), robots, "utf-8");

  console.log(`✓ sitemap.xml y robots.txt generados en /dist`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
