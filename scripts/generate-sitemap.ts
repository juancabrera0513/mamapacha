// scripts/generate-sitemap.ts
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream, streamToPromise } from "sitemap";

/* ========== Tipos ========== */
type Changefreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type StaticRoute = {
  url: string;
  changefreq: Changefreq;
  priority: number;
  lastmod?: string;
};

type ProductLite = {
  id: string;
  slug?: string;
  name?: string;
};

/* ========== Config ========== */
const BASE_URL = (process.env.SITE_URL || "https://www.mamapachasabor.com").replace(/\/$/, "");
const distDir = resolve(process.cwd(), "dist");
const productsPath = resolve(process.cwd(), "src/data/products.json");

/* ========== Cargar productos (tipado) ========== */
let PRODUCTS: ProductLite[] = [];
try {
  const raw = readFileSync(productsPath, "utf-8");
  PRODUCTS = JSON.parse(raw) as ProductLite[];
  console.log(`📦 Loaded ${PRODUCTS.length} products from products.json`);
} catch {
  console.warn("⚠️ No products.json found or invalid JSON, generating sitemap with static routes only.");
}

/* ========== Rutas estáticas ========== */
const STATIC_ROUTES: StaticRoute[] = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/shop", changefreq: "weekly", priority: 0.9 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/press", changefreq: "monthly", priority: 0.6 },
  { url: "/recipes", changefreq: "monthly", priority: 0.6 },
  { url: "/contact", changefreq: "yearly", priority: 0.5 },
  { url: "/policies", changefreq: "yearly", priority: 0.4 },
  { url: "/cookies", changefreq: "yearly", priority: 0.3 },
];

/* ========== Rutas dinámicas: productos ========== */
const today = new Date().toISOString().slice(0, 10);

const productRoutes: StaticRoute[] = (PRODUCTS ?? []).map((p: ProductLite) => ({
  url: `/shop/${encodeURIComponent(p.slug || p.id)}`,
  changefreq: "weekly",
  priority: 0.8,
  lastmod: today,
}));

/* ========== Generar sitemap & robots ==========
   (con dedupe por si se repite alguna url)
*/
function dedupe<T extends { url: string }>(arr: T[]): T[] {
  const m = new Map<string, T>();
  for (const it of arr) if (!m.has(it.url)) m.set(it.url, it);
  return [...m.values()];
}

async function build() {
  mkdirSync(distDir, { recursive: true });

  const links: StaticRoute[] = dedupe<StaticRoute>([
    ...STATIC_ROUTES,
    ...productRoutes,
  ]);

  const smStream = new SitemapStream({ hostname: BASE_URL });
  links.forEach((l) => smStream.write(l));
  smStream.end();

  const xml = await streamToPromise(smStream).then((d) => d.toString());
  writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf-8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  writeFileSync(resolve(distDir, "robots.txt"), robots, "utf-8");

  console.log("✅ Sitemap and robots.txt generated successfully in /dist");
}

build().catch((e) => {
  console.error("❌ Error generating sitemap:", e?.stack || e);
  process.exit(1);
});
