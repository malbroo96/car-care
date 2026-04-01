import { MAX_COMPARE } from "../constants/compare";
import { useCompare } from "../context/CompareContext";
import { formatStars, getFeatureList } from "../lib/productHelpers";

export default function ProductCard({ product, revealIndex = 0 }) {
  const { toggle, isInCompare, canAddMore } = useCompare();
  const inCompare = isInCompare(product.id);
  const disabled = !inCompare && !canAddMore;

  const isBestSeller = (product.badge || "").toLowerCase().includes("best seller");
  const { filled, empty, n } = formatStars(product.rating);
  const featureList = getFeatureList(product);
  const revealDelay = `${(revealIndex % 6) * 60}ms`;

  return (
    <div
      className="reveal-scale group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 hover:ring-slate-300/80"
      style={{ "--reveal-delay": revealDelay }}
    >
      {isBestSeller && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-gray-900">
          Best Seller
        </span>
      )}

      {product.image && (
        <div className="mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.image}
            alt={`${product.name} by ${product.brand}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold leading-snug text-slate-900">{product.name}</h3>
      <p className="mt-0.5 text-slate-600">{product.price || product.brand}</p>

      <div
        className="mt-2 text-sm tracking-wide text-amber-500"
        aria-label={`${n} out of 5 stars`}
      >
        {filled}
        <span className="text-gray-300">{empty}</span>
      </div>

      <ul className="mt-2 space-y-1 text-sm text-gray-500">
        {featureList.map((item, i) => (
          <li key={i}>- {item}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => toggle(product.id, window.scrollY)}
          disabled={disabled}
          aria-pressed={inCompare}
          title={
            disabled
              ? `You can compare up to ${MAX_COMPARE} products. Remove one to add another.`
              : inCompare
                ? "Remove from compare list"
                : "Add to compare list"
          }
          className={`flex min-h-[44px] w-full items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            inCompare
              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
              : "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
          }`}
        >
          {inCompare ? "Added to compare ✓" : "Add to compare"}
        </button>
        {disabled ? (
          <p className="text-center text-[11px] text-amber-800">
            Compare list full ({MAX_COMPARE}/{MAX_COMPARE}). Remove one on the
            compare page or below.
          </p>
        ) : null}
      </div>

      {product.amazonLink && (
        <a
          href={product.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex min-h-[44px] items-center justify-center rounded-xl bg-sky-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        >
          Check price on Amazon
        </a>
      )}
    </div>
  );
}
