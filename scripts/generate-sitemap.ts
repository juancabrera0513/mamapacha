// scripts/generate-sitemap.ts
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream, streamToPromise } from "sitemap";

// IMPORT: productos desde tu data TS
import { PRODUCTS } from "../src/data/site";

const BASE_URL = (process.env.SITE_URL || "https://www.mamapachasabor.com").replace(/\/$/, "");

// Rutas estáticas de tu router
const STATIC_ROUTES = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/shop", changefreq: "weekly", priority: 0.9 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/press", changefreq: "monthly", priority: 0.6 },
  { url: "/recipes", changefreq: "monthly", priority: 0.6 },
  { url: "/contact", changefreq: "yearly", priority: 0.5 },
  { url: "/policies", changefreq: "yearly", priority: 0.4 },
  { url: "/cookies", changefreq: "yearly", priority: 0.3 }
];

// Rutas dinámicas: productos
const productRoutes = (PRODUCTS || []).map((p) => {
  const slug = p.slug || p.id;
  return {
    url: `/shop/${encodeURIComponent(slug)}`,
    changefreq: "weekly" as const,
    priority: 0.8,
    lastmod: new Date().toISOString().slice(0, 10)
  };
});

// Util: evitar duplicados por url
function dedupe<T extends { url: string }>(arr: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of arr) {
    if (!map.has(item.url)) map.set(item.url, item);
  }
  return Array.from(map.values());
}

async function build() {
  const distDir = resolve(process.cwd(), "dist");
  mkdirSync(distDir, { recursive: true });

  const links = dedupe([...STATIC_ROUTES, ...productRoutes]);

  const smStream = new SitemapStream({ hostname: BASE_URL });
  for (const link of links) smStream.write(link);
  smStream.end();

  const xml = await streamToPromise(smStream).then((d) => d.toString());
  writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf-8");

  // robots.txt que referencia el sitemap
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  writeFileSync(resolve(distDir, "robots.txt"), robots, "utf-8");

  console.log("✓ sitemap.xml y robots.txt generados en /dist");
}

build().catch((e) => {
  console.error("Error generando sitemap:", e);
  process.exit(1);
});
