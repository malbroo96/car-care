const DEFAULT_RATING = 4;
const MAX_STARS = 5;
const DEFAULT_FEATURES = [
  "Reliable quality for regular use",
  "Great value in its category",
];

const CATEGORY_FEATURES = {
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

function getStarCount(rating) {
  return Math.max(1, Math.min(MAX_STARS, Math.round(rating || DEFAULT_RATING)));
}

function getFeatureList(product) {
  if (Array.isArray(product.highlights) && product.highlights.length > 0) {
    return product.highlights;
  }

  return CATEGORY_FEATURES[product.category] || DEFAULT_FEATURES;
}

export default function ProductCard({ product, revealIndex = 0 }) {
  const isBestSeller = (product.badge || "").toLowerCase().includes("best seller");
  const starCount = getStarCount(product.rating);
  const filledStars = "\u2605".repeat(starCount);
  const emptyStars = "\u2605".repeat(MAX_STARS - starCount);
  const featureList = getFeatureList(product);
  const revealDelay = `${(revealIndex % 6) * 60}ms`;
  const livePrice = product.livePrice;
  const displayPrice =
    livePrice?.displayAmount ||
    (typeof product.price === "string" && product.price.trim() ? product.price : "");
  const hasLivePrice = Boolean(livePrice?.displayAmount);

  return (
    <div
      className="reveal-scale relative border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ "--reveal-delay": revealDelay }}
    >
      {isBestSeller && (
        <span className="absolute top-3 left-3 z-10 bg-amber-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
          Best Seller
        </span>
      )}

      {product.image && (
        <img
          src={product.image}
          alt={`${product.name} by ${product.brand}`}
          className="rounded-xl mb-3 w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <div className="mt-1">
        {displayPrice ? (
          <p className="text-gray-900 font-semibold">{displayPrice}</p>
        ) : null}
        <p className="text-gray-600 text-sm">
          {displayPrice ? product.brand : product.price || product.brand}
        </p>
        {hasLivePrice ? (
          <p className="text-xs text-emerald-700 mt-1">
            Live Amazon price
          </p>
        ) : null}
      </div>

      <div
        className="mt-2 text-amber-500 tracking-wide text-sm"
        aria-label={`${starCount} out of 5 stars`}
      >
        {filledStars}
        <span className="text-gray-300">{emptyStars}</span>
      </div>

      <ul className="text-sm text-gray-500 mt-2 space-y-1">
        {featureList.map((item, i) => (
          <li key={i}>- {item}</li>
        ))}
      </ul>

      {product.amazonLink && (
        <a
          href={product.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center bg-cyan-600 text-white font-semibold py-2.5 rounded-xl hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 transition-colors"
        >
          Check Price on Amazon
        </a>
      )}
    </div>
  );
}
