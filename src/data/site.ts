// src/data/site.ts

// ---------- Types ----------
export type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;            // USD
  size?: string;
  image: string;            // primary image (PNG preferred)
  images?: string[];        // gallery
  description?: string;
  notes?: string;           // short tasting notes
  badges?: string[];        // e.g. ["Salt-free", "No preservatives"]
  usage?: string[];         // suggested uses
  nutrition?: {
    servings: string;
    sodiumMg?: number;
    calories?: number;
  };
  tags?: string[];
  /** Legacy single badge support (compat) */
  badge?: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  email?: string;
};

export type Supporter = {
  logo: string;
  alt: string;
  href?: string;
};

export type PressVideo = {
  id: string;
  title: string;
  youtubeId: string;
  note?: string;
};

export type Recipe = {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
};

// ---------- Products (Home highlights + full catalog) ----------
export const PRODUCTS: Product[] = [
  {
    id: "adobo",
    slug: "adobo",
    name: "Adobo (No Salt)",
    description:
      "Puerto Rican–inspired spice blend. No salt, no preservatives—pure flavor for everyday cooking.",
    notes: "Garlic-forward, oregano, citrus.",
    price: 10,
    size: "4 oz",
    image: "/shop/adobo.png",
    images: ["/shop/adobo.png", "/shop/adobo-side.png"], // opcional
    badges: ["Salt-free", "No preservatives"],
    badge: "Best Seller",
    usage: ["Chicken", "Pork", "Veggies", "Soups"],
    nutrition: { servings: "about 18 (1 tsp)", sodiumMg: 0, calories: 0 },
    tags: ["blend", "salt-free", "garlic"],
  },
  {
    id: "sazon",
    slug: "sazon",
    name: "Sazón (All Natural)",
    description:
      "All-natural color and flavor enhancer—made to elevate your dishes, not overpower them.",
    notes: "Annatto, coriander, garlic — clean color & flavor.",
    price: 10,
    size: "4 oz",
    image: "/shop/sazon.png",
    images: ["/shop/sazon.png", "/shop/sazon-side.png"], // opcional
    badges: ["No preservatives", "All-natural color"],
    usage: ["Rice", "Stews", "Veggies", "Beans"],
    nutrition: { servings: "about 18 (1 tsp)", sodiumMg: 0, calories: 0 },
    tags: ["blend", "color", "annatto"],
  },
];


// ---------- Testimonials (generic fallback; you can override with the long list) ----------
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carla R.",
    role: "Home Cook",
    quote:
      "This product is a miracle. No salt, no MSG, and 100% natural—my family loves every dish.",
  },
  {
    name: "Luis M.",
    role: "Food Enthusiast",
    quote:
      "The Adobo tastes like home. It’s clean, aromatic, and makes weeknight meals effortless.",
  },
  {
    name: "Jasmine",
    role: "Customer",
    quote:
      "Sazón adds beautiful color and flavor without additives. I use it on veggies, rice—everything.",
  },
];

// ---------- Social ----------
export const SOCIAL: SocialLinks = {
  instagram: "https://www.instagram.com/mamapachasabor/",
  facebook: "https://www.facebook.com/mamapachasabor",
  tiktok: "https://www.tiktok.com/@mamapachasabor",
  // youtube: "",
  // email: "mailto:hello@mamapachasabor.com",
};

// ---------- Supporters / Featured (logos) ----------
export const SUPPORTERS: Supporter[] = [
  { logo: "/supporters/supporter-1.png", alt: "Featured Partner 1" },
  { logo: "/supporters/supporter-2.png", alt: "Featured Partner 2" },
  { logo: "/supporters/supporter-3.png", alt: "Featured Partner 3" },
  { logo: "/supporters/supporter-4.png", alt: "Featured Partner 4" },
  { logo: "/supporters/supporter-5.png", alt: "Featured Partner 5" },
];

// ---------- About (content + media) ----------
export const ABOUT_CONTENT = {
  tagline:
    "From our mother’s kitchen to your table — Puerto Rican traditions, naturally.",
  paragraph1:
    "What began as a family initiative to support local students during the pandemic became a love letter to our heritage: sharing the flavors we grew up with.",
  paragraph2:
    "Today, we craft 100% natural spice blends with simple ingredients—no salt added, no preservatives—so anyone can cook with confidence and heart.",
  bullets: [
    "100% natural ingredients",
    "No salt added",
    "No preservatives",
    "Inspired by Puerto Rican home cooking",
  ],
  inspiration:
    "Mama Pacha taught us that cooking is an act of love. Every jar carries that spirit: warmth, care, and community.",
};

export const ABOUT_MEDIA = {
  heroImage: "/about/hero.jpg",
  kitchenImage: "/about/kitchen.jpg",
  productsImage: "/about/products.jpg",
};

// ---------- Press videos (for /press or a grid) ----------
export const PRESS_VIDEOS: PressVideo[] = [
  {
    id: "press-1",
    title: "Interview on Local News",
    youtubeId: "dQw4w9WgXcQ",
    note: "Our story and mission featuring Mama Pacha.",
  },
  {
    id: "press-2",
    title: "Cooking with Mama Pacha",
    youtubeId: "y6120QOlsfU",
  },
  // Add real items here
];

// ---------- Recipes (for /recipes) ----------
export const RECIPES: Recipe[] = [
  {
    id: "rec-1",
    title: "Adobo Roast Chicken",
    image: "/recipes/adobo-roast-chicken.jpg",
    description: "Juicy, aromatic roast chicken using our salt-free Adobo.",
    ingredients: [
      "Whole chicken (1.5–2 kg)",
      "2 tbsp Mama Pacha Adobo (No Salt)",
      "2 tbsp olive oil",
      "1 lemon (halved)",
      "Fresh herbs (optional)",
      "Black pepper to taste",
    ],
    steps: [
      "Preheat oven to 400°F (205°C).",
      "Pat chicken dry; rub with olive oil and Adobo.",
      "Place lemon halves inside cavity; add herbs if desired.",
      "Roast 60–75 min until juices run clear (165°F internal).",
      "Rest 10 minutes before carving.",
    ],
  },
  {
    id: "rec-2",
    title: "Sazón Veggie Rice",
    image: "/recipes/sazon-veggie-rice.jpg",
    description: "Colorful rice with veggies, powered by all-natural Sazón.",
    ingredients: [
      "1 cup long-grain rice",
      "2 tsp Mama Pacha Sazón",
      "1.5 cups veggie broth",
      "1/2 cup diced peppers",
      "1/4 cup peas",
      "1 tbsp olive oil",
      "Salt to taste (optional)",
    ],
    steps: [
      "Rinse rice until water runs clear.",
      "Sauté peppers in olive oil 2–3 min.",
      "Add rice; toast 1 min, then add broth + Sazón.",
      "Simmer covered ~15 min; fold in peas at the end.",
      "Fluff and serve warm.",
    ],
  },
];

// ---------- Utility: Currency ----------
export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
