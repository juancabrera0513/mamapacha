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
  email: "mailto:hello@mamapachasabor.com", // <— agrega tu correo aquí
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
// ---------- Recipes (for /recipes) ----------
export const RECIPES: Recipe[] = [
  {
    id: "rec-arroz-gandules",
    title: "Arroz con Gandules (Rice with Pigeon Peas)",
    image: "/recipes/arroz-con-gandules.jpg",
    description: "Puerto Rican classic with sofrito and natural sazón.",
    ingredients: [
      "2 cups medium-grain rice",
      "1 can (15 oz) pigeon peas (gandules), drained",
      "2 tbsp sofrito",
      "2 tsp Mama Pacha Sazón",
      "1 tsp Adobo (No Salt)",
      "2 tbsp oil",
      "2 1/4 cups water or broth",
      "Olives and bell peppers (optional)",
    ],
    steps: [
      "Heat oil in a pot; sauté sofrito 1–2 min.",
      "Stir in Sazón, Adobo, and optional olives/peppers.",
      "Add rice; toast 1 min. Add water/broth and pigeon peas.",
      "Bring to a boil, then reduce to low, cover, and cook 18–20 min.",
      "Turn off heat, rest 5 min, fluff with a fork, and serve.",
    ],
  },
  {
    id: "rec-mofongo-camarones",
    title: "Mofongo with Garlic Shrimp",
    image: "/recipes/mofongo-camarones.jpg",
    description: "Mashed green plantains with crunchy pork and garlicky shrimp.",
    ingredients: [
      "4 green plantains",
      "2 garlic cloves (plus more for shrimp)",
      "1/2 cup crushed pork rinds or crispy bacon",
      "2 tbsp oil (or ghee)",
      "Salt to taste",
      "12–16 medium shrimp, peeled and deveined",
      "1 tbsp Adobo (No Salt)",
      "2 tbsp lemon juice",
      "2 tbsp chopped parsley/cilantro",
    ],
    steps: [
      "Fry plantain slices until tender; drain.",
      "Mash with garlic, pork rinds, and oil; form balls or serve in a pilón.",
      "Sauté shrimp with Adobo and garlic 2–3 min; add lemon and herbs.",
      "Serve shrimp over mofongo.",
    ],
  },
  {
    id: "rec-pernil",
    title: "Pernil (Roast Pork Shoulder)",
    image: "/recipes/pernil.jpg",
    description: "Garlic-citrus marinated pork with crispy skin.",
    ingredients: [
      "1 pork shoulder (6–8 lb) with skin",
      "8–10 garlic cloves",
      "2 tbsp Adobo (No Salt)",
      "1 tbsp dried oregano",
      "1 tsp ground cumin",
      "1/2 cup orange juice",
      "1/4 cup lemon juice",
      "2 tbsp oil",
    ],
    steps: [
      "Score the meat. Blend garlic, spices, citrus juices, and oil.",
      "Rub all over; cover and refrigerate 8–12 hours.",
      "Roast at 325°F (165°C) for 4–5 hours (~35–40 min/lb).",
      "Increase to 450°F (230°C) for 15–20 min to crisp the skin.",
      "Rest 15 min, slice, and serve with rice.",
    ],
  },
  {
    id: "rec-tostones-mojo",
    title: "Tostones with Garlic Mojo",
    image: "/recipes/tostones-mojo.jpg",
    description: "Twice-fried green plantains with a zesty garlic mojo.",
    ingredients: [
      "3 green plantains",
      "Oil for frying",
      "Salt to taste",
      "Mojo: 3 garlic cloves, 2 tbsp oil, 1 tbsp lemon juice, pinch of Adobo (No Salt)",
    ],
    steps: [
      "Fry plantain rounds until just tender (first fry).",
      "Flatten and fry again until golden (second fry).",
      "Mix mojo ingredients; drizzle over tostones and season with salt.",
    ],
  },
  {
    id: "rec-tembleque",
    title: "Tembleque (Coconut Pudding)",
    image: "/recipes/tembleque.jpg",
    description: "Silky coconut dessert, naturally gluten-free.",
    ingredients: [
      "2 cans (13.5 oz each) coconut milk",
      "1/2 cup sugar or sweetener",
      "1/3 cup cornstarch",
      "1 tsp vanilla",
      "Ground cinnamon for serving",
    ],
    steps: [
      "Whisk cornstarch with some cold coconut milk until smooth.",
      "Warm remaining coconut milk with sugar to a gentle simmer; add slurry.",
      "Cook, stirring, until thick; add vanilla.",
      "Pour into molds, chill 3–4 hours; dust with cinnamon to serve.",
    ],
  },
  {
    id: "rec-pastelon",
    title: "Pastelón (Sweet Plantain Lasagna)",
    image: "/recipes/pastelon.jpg",
    description: "Layered sweet plantains, savory beef, and cheese.",
    ingredients: [
      "6–7 ripe plantains",
      "1 lb ground beef",
      "1 tbsp Adobo (No Salt)",
      "1 tsp Sazón",
      "1/2 onion and 1/2 bell pepper, diced",
      "1/2 cup tomato sauce",
      "Shredded cheese to taste",
      "Oil for frying",
    ],
    steps: [
      "Fry sweet plantain slices until golden.",
      "Sauté beef with onion/pepper; season with Adobo and Sazón; add tomato sauce.",
      "Layer in a baking dish: plantain, beef, cheese; repeat, ending with plantain + cheese.",
      "Bake at 350°F (175°C) 20–25 min; rest 10 min before slicing.",
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
