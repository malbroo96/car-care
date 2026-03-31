export const MAX_STARS = 5;
const DEFAULT_RATING = 4;

export const DEFAULT_FEATURES = [
  "Reliable quality for regular use",
  "Great value in its category",
];

export const CATEGORY_FEATURES = {
  "Combos & Bundles": [
    "All-in-one kit for complete car care",
    "Covers both cleaning and finishing tasks",
  ],
  "Car Shampoo & Cleaners": [
    "Helps remove dirt and road grime effectively",
    "Suitable for frequent exterior cleaning",
  ],
  "Pressure Washers & Foam Cannons": [
    "Improves cleaning speed with strong spray pressure",
    "Useful for tough dirt on body and wheels",
  ],
  "Microfiber Cloths & Towels": [
    "Soft fibers help reduce scratch risk",
    "Absorbs water and residue efficiently",
  ],
  "Interior Cleaning": [
    "Keeps dashboard and cabin surfaces fresh",
    "Helps maintain a neat, dust-free interior",
  ],
  "Polish, Wax & Protection": [
    "Enhances shine and finish appearance",
    "Adds a protective layer for paint care",
  ],
  "Car Perfume": [
    "Helps keep cabin smell fresh for daily drives",
    "Easy option to improve in-car comfort",
  ],
};

export function getStarCount(rating) {
  return Math.max(1, Math.min(MAX_STARS, Math.round(rating || DEFAULT_RATING)));
}

export function getFeatureList(product) {
  if (Array.isArray(product.highlights) && product.highlights.length > 0) {
    return product.highlights;
  }
  return CATEGORY_FEATURES[product.category] || DEFAULT_FEATURES;
}

export function formatStars(rating) {
  const n = getStarCount(rating);
  const filled = "\u2605".repeat(n);
  const empty = "\u2605".repeat(MAX_STARS - n);
  return { filled, empty, n };
}
