// src/data/site.ts
import productsRaw from "./products.json";

/* ============ Types ============ */

export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  size?: string;
  notes?: string;
};

export type ProductExtraInfo = {
  bulkOffer?: string;
  options?: string[];
};

export type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  fromPrice?: number;
  originalPrice?: number;
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
  variants?: ProductVariant[];
  extraInfo?: ProductExtraInfo;
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

export type RecipeExtraSection = {
  title: string;
  items: string[];
};

export type Recipe = {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  extraSections?: RecipeExtraSection[];
};

/* ============ Products (from JSON) ============ */

// All products come from src/data/products.json
export const PRODUCTS: Product[] = productsRaw as Product[];

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
  heroImage: "/images/about/hero.webp",
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

/* ============ Recipes (all in English) ============ */

export const RECIPES: Recipe[] = [
  {
    id: "rec-roast-turkey-mama-pacha",
    title: "Mama Pacha Sabor – Seasoned Roast Turkey",
    image: "/recipes/roast-turkey.jpg",
    description:
      "Extra-juicy roast turkey with a garlicky seasoning paste and buttery skin, deeply flavored with Mama Pacha Sabor Adobo.",
    ingredients: [
      "1 whole turkey (12–18 lb), fully thawed, giblets removed",
      "24 cloves garlic, finely minced",
      "7 tablespoons Mama Pacha Sabor Adobo",
      "2 teaspoons ground black pepper",
      "2 teaspoons dried oregano",
      "3 tablespoons extra virgin olive oil",
      "3 tablespoons white vinegar or soy sauce",
      "1 stick (1/2 cup) unsalted butter, softened",
      "≈2 teaspoons additional Mama Pacha Sabor Adobo for rubbing the outside",
    ],
    steps: [
      "Pat the turkey completely dry and place it breast-side up on a roasting rack set in a roasting pan.",
      "In a bowl, mix garlic, 7 tablespoons Mama Pacha Sabor Adobo, black pepper, oregano, olive oil, and vinegar or soy sauce to form a thick, fragrant paste.",
      "Gently loosen the skin over the breast and legs, taking care not to tear it. Spread half of the seasoning paste under the skin on the back, then repeat on the breast side.",
      "In a small bowl, combine softened butter with about 2 teaspoons Mama Pacha Sabor Adobo and rub this mixture all over the outside of the turkey.",
      "Cover loosely and refrigerate at least 5 hours, ideally overnight, to allow the flavors to fully penetrate the meat.",
      "When ready to cook, preheat the oven to 350°F (175°C).",
      "Roast the turkey uncovered for about 15 minutes per pound, basting occasionally with pan juices.",
      "If the breast browns too quickly, tent that area with foil while the rest finishes cooking.",
      "Cook until the breast reaches 160°F and the thigh reaches 180°F. Remove from the oven and let rest 15–20 minutes before carving so the juices redistribute.",
      "Serve and enjoy a deeply seasoned turkey that showcases Mama Pacha Sabor Adobo in every bite.",
    ],
  },
  {
    id: "rec-roasted-sweet-potatoes",
    title: "Roasted Sweet Potatoes – Mama Pacha Sabor Style",
    image: "/recipes/roasted-sweet-potatoes.jpg",
    description:
      "Caramelized oven-roasted sweet potatoes with warm notes of cinnamon and savory depth from Mama Pacha Sabor Adobo.",
    ingredients: [
      "6–8 medium sweet potatoes (batatas), peeled and cut into thick rounds or large cubes",
      "3 tablespoons Mama Pacha Sabor Adobo",
      "1½ teaspoons ground cinnamon (optional but warmly recommended)",
      "2 tablespoons extra virgin olive oil",
      "1 tablespoon melted butter or coconut oil",
      "1 tablespoon honey or maple syrup (optional, for a touch of natural sweetness)",
      "½ teaspoon ground black pepper",
      "½ teaspoon dried oregano (optional, for a more savory profile)",
      "Salt to taste only if needed (remember, Mama Pacha Sabor Adobo is no-salt and honors balance)",
      "Fresh cilantro or parsley, chopped, for garnish",
    ],
    steps: [
      "Preheat the oven to 375°F (190°C). Line a baking sheet with parchment paper.",
      "Peel the sweet potatoes and cut into evenly sized cubes or thick rounds. Rinse and pat dry so the seasoning adheres well.",
      "Place the sweet potatoes in a large bowl. Add Mama Pacha Sabor Adobo, cinnamon (or oregano if you prefer a more savory profile), black pepper, olive oil, and melted butter or coconut oil.",
      "Toss slowly and thoroughly until every piece is well coated.",
      "If you’d like a hint of sweetness, drizzle honey or maple syrup over the sweet potatoes and toss again.",
      "Spread the seasoned sweet potatoes in a single layer on the prepared baking sheet.",
      "Bake for 35–50 minutes, depending on size, turning once halfway through so they caramelize on both sides.",
      "Roast until tender on the inside and golden, slightly crisp on the edges.",
      "Remove from the oven, rest a few minutes, then garnish with fresh cilantro or parsley before serving.",
    ],
  },
  {
    id: "rec-pernil-mama-pacha",
    title: "Pernil – Mama Pacha Sabor Style",
    image: "/recipes/pernil-mama-pacha.jpg",
    description:
      "Slow-roasted pork shoulder with crispy skin and a deep, garlicky seasoning built around Mama Pacha Sabor Adobo.",
    ingredients: [
      "1 pork shoulder (6–10 lb), bone-in, skin on",
      "12–18 cloves garlic, finely minced",
      "6 tablespoons Mama Pacha Sabor Adobo",
      "1 tablespoon dried oregano",
      "2 teaspoons ground black pepper",
      "3 tablespoons white vinegar (or sour orange)",
      "3 tablespoons extra virgin olive oil",
      "1 tablespoon soy sauce (optional, for extra depth)",
      "Salt to taste only if needed",
    ],
    steps: [
      "Rinse and pat the pork shoulder completely dry.",
      "Using the tip of a small knife, make deep slits all over the meat, especially under the skin and near the bone.",
      "In a bowl, combine garlic, Mama Pacha Sabor Adobo, oregano, black pepper, vinegar, olive oil, and soy sauce (if using). Mix into a thick, aromatic paste.",
      "Rub the seasoning paste deep into every slit, working it under the skin and all over the surface of the pork.",
      "Cover and refrigerate at least 6 hours, preferably overnight or up to 24 hours for maximum flavor and tenderness.",
      "When ready to cook, preheat the oven to 325°F (163°C).",
      "Place the pork shoulder skin-side up in a roasting pan. Cover the pan with foil to keep the meat moist during the slow roast.",
      "Roast for 4–6 hours, depending on size, until the meat is very tender and pulls apart easily.",
      "For crispy skin (cuero), remove the foil, raise the oven temperature to 425°F (220°C), and roast for an additional 45–60 minutes, or until the skin is blistered and crisp.",
      "Let the pernil rest 15–20 minutes. Then pull the meat apart with two forks, leaving the crisp skin intact to serve in pieces.",
      "Serve with classics like Rice with Pigeon Peas, Roasted Sweet Potatoes, Yuca al Ajillo, or Elbow Pasta Salad.",
    ],
  },
  {
    id: "rec-salad-dressing",
    title: "Simple Salad Dressing with Adobo",
    image: "/recipes/salad-dressing.jpg",
    description:
      "A quick sweet–tangy dressing balanced with the savory depth of Mama Pacha Sabor Adobo (no salt added).",
    ingredients: [
      "¼ teaspoon lemon juice",
      "¼ teaspoon vinegar",
      "¼ teaspoon oil (your preferred type)",
      "1 tablespoon honey or sugar",
      "¼ teaspoon Mama Pacha Sabor Adobo (no salt added)",
      "Salt and black pepper to taste",
    ],
    steps: [
      "In a small bowl or jar, combine lemon juice, vinegar, oil, honey or sugar, and Mama Pacha Sabor Adobo.",
      "Whisk or shake until emulsified. Taste and adjust with salt and black pepper as needed.",
      "Drizzle over your favorite salad just before serving.",
    ],
  },
  {
    id: "rec-arroz-gandules",
    title: "Rice with Pigeon Peas (Arroz con Gandules)",
    image: "/recipes/arroz-gandules.jpg",
    description:
      "Fluffy, fragrant rice simmered with pigeon peas, sofrito, and Mama Pacha Sabor Sazon for a truly comforting side.",
    ingredients: [
      "3 cups medium or long-grain white rice, rinsed",
      "3 tablespoons vegetable oil",
      "2 teaspoons sofrito (bell pepper, onions, garlic, cilantro, culantro)",
      "1 can (15 oz) gandules (pigeon peas), drained and rinsed",
      "2 teaspoons Mama Pacha Sabor Sazon",
      "Salt to taste (start with about 2 teaspoons)",
      "5–6 cups water",
    ],
    steps: [
      "Rinse the rice well in cool water and set aside.",
      "In a medium caldero or large pot (about 6 quarts), heat the oil over medium heat and sauté the sofrito until softened and fragrant.",
      "Add the rice and stir in Mama Pacha Sabor Sazon and salt, coating the grains with the sofrito and oil.",
      "Pour in 5 cups of water and bring to a rapid boil. Taste the liquid and adjust seasoning with more salt if needed.",
      "Add the pigeon peas (gandules) and stir gently. If needed, add a bit more water so the rice is covered by about 1 inch of liquid.",
      "Reduce the heat to medium-low and stir gently to keep the rice from turning gummy, avoiding scraping the bottom too aggressively.",
      "Carefully mound the rice toward the center of the pot, cover with a tight-fitting lid, reduce the heat to low, and cook for about 20 minutes.",
      "After 20 minutes, gently fluff by folding rice from the bottom up without disturbing any crispy bits at the bottom.",
      "Cover again and cook for another 20–30 minutes, checking after 20 minutes to ensure the rice is tender and cooked through.",
      "Serve warm as a side or as the base for a full plate with pernil and other favorites.",
    ],
  },
  {
    id: "rec-sofrito-mama-pacha",
    title: "Sofrito – Mama Pacha Sabor (with Sazón)",
    image: "/recipes/sofrito.jpg",
    description:
      "Fresh, vibrant sofrito that brings depth and color to your rice, beans, stews, and more—enhanced with Mama Pacha Sabor Sazon.",
    ingredients: [
      "2 large onions, roughly chopped",
      "1 large green bell pepper, chopped",
      "1 red bell pepper (optional), chopped",
      "8–10 cloves garlic",
      "3–4 sweet peppers (ajíes dulces), if available",
      "1 bunch fresh cilantro, rinsed",
      "1 bunch culantro/recao, if available",
      "1 tablespoon Mama Pacha Sabor Sazon",
      "About 1 cup olive oil or vegetable oil (adjust for desired texture)",
    ],
    steps: [
      "Wash and roughly chop all vegetables: onions, bell peppers, sweet peppers, cilantro, and culantro/recao.",
      "Place the chopped vegetables and garlic in a food processor.",
      "Pulse until you achieve a fine but textured mixture—avoid over-processing into a thin liquid.",
      "Add the oil and the tablespoon of Mama Pacha Sabor Sazon.",
      "Pulse again just until everything is evenly combined and smooth but still has some body.",
      "Transfer the sofrito to airtight containers or ice cube trays for convenient portioning.",
      "Use in rice, beans, stews, soups, and braises to build flavor from the very beginning of cooking.",
    ],
    extraSections: [
      {
        title: "Yield & Storage",
        items: [
          "Makes about 3–4 cups of sofrito.",
          "Refrigerate up to 5–7 days in a tightly sealed container.",
          "Freeze for 3–4 months for best flavor and quality.",
          "Because there is no added acid, keep chilled and use clean utensils to scoop.",
        ],
      },
      {
        title: "Recommended Uses",
        items: [
          "Base for Rice with Pigeon Peas (Arroz con Gandules).",
          "Flavor builder for beans and lentils.",
          "Perfect in stews, soups, and braised meats.",
        ],
      },
    ],
  },
  {
    id: "rec-zucchini-corn-salad",
    title: "Zucchini & Corn Salad – Mama Pacha Sabor Style",
    image: "/recipes/zucchini-corn-salad.jpg",
    description:
      "Fresh zucchini, sweet corn, herbs and citrus, all tied together with Mama Pacha Sabor Adobo.",
    ingredients: [
      "3 zucchini, sliced into half-moons or small bites",
      "4 ears corn, kernels removed (or about 2½ cups)",
      "¼ teaspoon finely diced red onion",
      "¼ teaspoon chopped fresh mint or basil",
      "3 tablespoons olive oil (your preference)",
      "1 tablespoon lemon juice",
      "1 tablespoon Mama Pacha Sabor Adobo",
      "Salt and black pepper to taste",
      "Jalapeño or other chili to taste, finely diced (optional)",
    ],
    steps: [
      "In a large bowl, combine zucchini, corn kernels, red onion, and jalapeño or other chili if using.",
      "In a small bowl, whisk together olive oil, lemon juice, and Mama Pacha Sabor Adobo.",
      "Pour the dressing over the vegetables and toss gently until everything is evenly coated.",
      "Fold in the chopped mint or basil.",
      "Taste and adjust with salt and black pepper as needed.",
      "Serve chilled or at room temperature as a bright, fresh side dish.",
    ],
  },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
