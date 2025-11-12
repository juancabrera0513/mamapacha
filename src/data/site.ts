// src/data/site.ts
export type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  size?: string;
  image: string;
  images?: string[];
  description?: string;
  notes?: string;
  badges?: string[];
  usage?: string[];
  nutrition?: { servings: string; sodiumMg?: number; calories?: number };
  tags?: string[];
  badge?: string;
};

export type Testimonial = { name: string; role?: string; quote: string };

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  email?: string;
};

export type Supporter = { logo: string; alt: string; href?: string };
export type PressVideo = { id: string; title: string; youtubeId: string; note?: string };

export type Recipe = {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
};

/* ============ Products ============ */
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
    images: ["/shop/adobo.png", "/shop/adobo-side.png", "/shop/adobo-lifestyle.jpg"],
    badges: ["Salt-free", "No preservatives"],
    usage: ["Chicken", "Pork", "Veggies", "Soups"],
    nutrition: { servings: "about 18 (1 tsp)", sodiumMg: 0, calories: 0 },
    tags: ["blend", "salt-free", "garlic"],
  },
  {
    id: "sazon",
    slug: "sazon",
    name: "Sazón (No Salt • No Artificial Additives)",
    description:
      "All-natural color and flavor enhancer—made to elevate your dishes, not overpower them.",
    notes: "Annatto, coriander, garlic — clean color & flavor. No salt, no artificial additives.",
    price: 10,
    size: "4 oz",
    image: "/shop/sazon.png",
    images: ["/shop/sazon.png", "/shop/sazon-side.png", "/shop/sazon-lifestyle.jpg"],
    badges: ["No salt", "No artificial additives", "No preservatives", "All-natural color"],
    usage: ["Rice", "Stews", "Veggies", "Beans"],
    nutrition: { servings: "about 18 (1 tsp)", sodiumMg: 0, calories: 0 },
    tags: ["blend", "color", "annatto", "no-salt", "no-additives"],
  },
  
];

/* ============ Social ============ */
export const SOCIAL: SocialLinks = {
  instagram: "https://www.instagram.com/mamapachasabor/",
  facebook: "https://www.facebook.com/mamapachasabor",
  tiktok: "https://www.tiktok.com/@mamapachasabor",
  email: "mailto:hello@mamapachasabor.com",
};

/* ============ Supporters ============ */
export const SUPPORTERS: Supporter[] = [
  { logo: "/supporters/supporter-1.png", alt: "Featured Partner 1" },
  { logo: "/supporters/supporter-2.png", alt: "Featured Partner 2" },
  { logo: "/supporters/supporter-3.png", alt: "Featured Partner 3" },
  { logo: "/supporters/supporter-4.png", alt: "Featured Partner 4" },
  { logo: "/supporters/supporter-5.png", alt: "Featured Partner 5" },
];

/* ============ About ============ */
export const ABOUT_CONTENT = {
  tagline: "From our mother’s kitchen to your table — Puerto Rican traditions, naturally.",
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
  heroImage: "/images/about/hero.jpg",
  kitchenImage: "/images/about/kitchen.jpg",
  productsImage: "/images/about/products.jpg",
};

/* ============ Press ============ */
export const PRESS_VIDEOS: PressVideo[] = [
  { id: "press-1", title: "FOX2 segment (news feature)", youtubeId: "DJItLcqxNHI" },
  { id: "press-2", title: "Community highlight (interview)", youtubeId: "qU1cJ3C2pB0" },
  { id: "press-3", title: "Local TV cooking demo", youtubeId: "2K_A-7b-j3Q" },
  { id: "press-4", title: "Telemundo STL feature", youtubeId: "NvMy-Tza6iA" },
];

/* ============ Recipes (NEW ONLY, in English) ============ */
export const RECIPES: Recipe[] = [
  {
    id: "rec-salad-dressing",
    title: "Simple Salad Dressing",
    image: "/recipes/salad-dressing.jpg",
    description: "Quick sweet–tangy dressing balanced with Mama Pacha Sabor Adobo (no salt).",
    ingredients: [
      "1/4 tsp lemon juice",
      "1/4 tsp vinegar",
      "1/4 tsp oil (your preference)",
      "1 tbsp honey or sugar",
      "1/4 tsp Mama Pacha Sabor Adobo (no salt)",
      "Salt and black pepper to taste",
    ],
    steps: [
      "Combine all ingredients in a small jar or bowl and whisk/shake until emulsified.",
      "Adjust salt and pepper to taste. Drizzle over your favorite salad.",
    ],
  },

  {
    id: "rec-zucchini-corn-salad",
    title: "Zucchini & Corn Salad",
    image: "/recipes/zucchini-corn-salad.jpg",
    description: "Fresh zucchini, sweet corn, herbs and citrus with Mama Pacha Sabor Adobo.",
    ingredients: [
      "3 zucchini, sliced into half-moons",
      "4 ears corn, kernels removed (or ~2 1/2 cups)",
      "1/4 tsp finely diced red onion",
      "1/4 tsp chopped mint or basil",
      "3 tbsp olive oil (preference)",
      "1 tbsp lemon juice",
      "1 tbsp Mama Pacha Sabor Adobo",
      "Salt and black pepper to taste",
      "Jalapeño to taste (optional), finely diced",
    ],
    steps: [
      "In a large bowl, combine zucchini, corn, red onion and jalapeño (if using).",
      "Whisk olive oil, lemon juice and Adobo; pour over the salad and toss.",
      "Fold in mint/basil. Adjust salt and pepper. Serve chilled or at room temperature.",
    ],
  },

  {
    id: "rec-pernil-mama-pacha",
    title: "Pernil — Mama Pacha Sabor Style",
    image: "/recipes/pernil-mama-pacha.jpg",
    description: "Juicy slow-roasted pork shoulder with a garlicky adobo paste and crispy skin.",
    ingredients: [
      "1 pork shoulder (6–10 lb), bone-in, skin on",
      "12–18 garlic cloves, finely minced",
      "6 tbsp Mama Pacha Sabor Adobo",
      "1 tbsp dried oregano",
      "2 tsp ground black pepper",
      "3 tbsp white vinegar (or sour orange)",
      "3 tbsp extra-virgin olive oil",
      "1 tbsp soy sauce (optional, for depth)",
      "Salt to taste only if needed",
    ],
    steps: [
      "Prep the pork: Rinse and pat dry. Using a paring knife, make deep slits all over the meat, especially under the skin and near the bone.",
      "Make the seasoning paste: In a bowl, mix garlic, Adobo, oregano, black pepper, vinegar, olive oil and soy sauce (optional) until thick and aromatic.",
      "Season thoroughly: Rub the paste deep into every slit, under the skin and all over the surface.",
      "Marinate: Cover and refrigerate at least 6 hours — preferably overnight up to 24 hours.",
      "Roast: Preheat oven to 325°F (163°C). Place skin-side up in a roasting pan, cover with foil and roast 4–6 hours until very tender.",
      "Crisp the skin: Remove foil, raise oven to 425°F (220°C) and roast 45–60 minutes more until the skin blisters and crisps.",
      "Rest & serve: Rest 15–20 minutes. Pull with two forks, keeping crackling pieces. Serve.",
      "Serving ideas: Pair with Rice with Pigeon Peas, Roasted Sweet Potatoes, Yuca al Ajillo or Elbow Pasta Salad.",
    ],
  },

  {
    id: "rec-roasted-sweet-potatoes",
    title: "Roasted Sweet Potatoes — Mama Pacha Sabor Style",
    image: "/recipes/roasted-sweet-potatoes.jpg",
    description: "Caramelized oven-roasted sweet potatoes with warm notes and silky finish.",
    ingredients: [
      "6–8 medium sweet potatoes, peeled and cut into large cubes or thick rounds",
      "3 tbsp Mama Pacha Sabor Adobo",
      "1 1/2 tsp ground cinnamon (optional but recommended)",
      "2 tbsp extra-virgin olive oil",
      "1 tbsp melted butter or coconut oil",
      "1 tbsp honey or maple syrup (optional)",
      "1/2 tsp ground black pepper",
      "1/2 tsp dried oregano (optional, for a savory tilt)",
      "Salt to taste only if needed",
      "Chopped cilantro or parsley, for garnish",
    ],
    steps: [
      "Preheat oven to 375°F (190°C). Line a sheet pan with parchment.",
      "In a bowl, toss sweet potatoes with Adobo, cinnamon (or oregano), black pepper, olive oil and melted butter.",
      "If desired, drizzle honey/maple and toss again.",
      "Bake 35–50 minutes, turning halfway, until tender and deeply golden.",
      "Rest a few minutes, then garnish with fresh herbs and serve.",
    ],
  },

  {
    id: "rec-roast-turkey-mama-pacha",
    title: "Mama Pacha Sabor — Seasoned Roast Turkey",
    image: "/recipes/roast-turkey.jpg",
    description: "Extra-juicy turkey with seasoned butter and adobo under the skin.",
    ingredients: [
      "1 whole turkey (12–18 lb), fully thawed, giblets removed",
      "24 garlic cloves, finely minced",
      "7 tbsp Mama Pacha Sabor Adobo",
      "2 tsp ground black pepper",
      "2 tsp dried oregano",
      "3 tbsp extra-virgin olive oil",
      "3 tbsp white vinegar or soy sauce",
      "1 stick (1/2 cup) unsalted butter, softened",
      "≈2 tsp additional Adobo for rubbing the outside",
    ],
    steps: [
      "Pat turkey completely dry and place on a rack set in a roasting pan.",
      "Make the internal paste: Mix garlic, Adobo, black pepper, oregano, olive oil and vinegar/soy.",
      "Gently loosen the skin over breast and legs. Spread half of the paste under the skin on the back, then repeat on the breast side.",
      "Mix softened butter with ~2 tsp Adobo; rub over the entire exterior.",
      "Cover and refrigerate at least 5 hours, ideally overnight.",
      "Roast at 350°F (175°C) for about 15 minutes per pound, basting occasionally.",
      "Target temps: 160°F in the breast and 180°F in the thigh. Tent with foil if browning too fast.",
      "Rest before carving so juices redistribute. Serve warm.",
    ],
  },
];


export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
