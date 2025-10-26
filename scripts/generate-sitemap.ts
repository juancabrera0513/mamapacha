// scripts/generate-sitemap.ts
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream, streamToPromise } from "sitemap";

/* --------------------------------------------
   CONFIG
--------------------------------------------- */

// URL base de tu sitio (ajústala si cambias dominio)
const BASE_URL = (process.env.SITE_URL || "https://www.mamapachasabor.com").replace(/\/$/, "");

// Ruta del JSON de productos
const productsPath = resolve(process.cwd(), "src/data/products.json");

// Leer productos
let PRODUCTS: { id: string; slug?: string; name: string }[] = [];
try {
  const raw = readFileSync(productsPath, "utf-8");
  PRODUCTS = JSON.parse(raw);
  console.log(`📦 ${PRODUCTS.length} productos cargados desde products.json`);
} catch (err) {
  console.warn("⚠️ No se encontró src/data/products.json o no se pudo leer. Se generará solo con rutas estáticas.");
}

/* --------------------------------------------
   RUTAS ESTÁTICAS
--------------------------------------------- */

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

/* --------------------------------------------
   RUTAS DINÁMICAS: PRODUCTOS
--------------------------------------------- */

const productRoutes = (PRODUCTS || []).map((p) => ({
  url: `/shop/${encodeURIComponent(p.slug || p.id)}`,
  changefreq: "weekly" as const,
  priority: 0.8,
  lastmod: new Date().toISOString().slice(0, 10),
}));

/* --------------------------------------------
   GENERADOR DE SITEMAP Y ROBOTS.TXT
--------------------------------------------- */

async function build() {
  const distDir = resolve(process.cwd(), "dist");
  mkdirSync(distDir, { recursive: true });

  const links = [...STATIC_ROUTES, ...productRoutes];

  const smStream = new SitemapStream({ hostname: BASE_URL });
  for (const link of links) smStream.write(link);
  smStream.end();

  const xml = await streamToPromise(smStream).then((d) => d.toString());
  writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf-8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  writeFileSync(resolve(distDir, "robots.txt"), robots, "utf-8");

  console.log("✅ Sitemap y robots.txt generados correctamente en /dist");
}

/* --------------------------------------------
   EJECUCIÓN
--------------------------------------------- */

build().catch((err) => {
  console.error("❌ Error generando sitemap:", err);
  process.exit(1);
});
