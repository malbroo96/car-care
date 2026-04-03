import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { MAX_COMPARE } from "../constants/compare";
import { useCompare } from "../context/CompareContext";
import { formatStars, getFeatureList } from "../lib/productHelpers";
import { buildBreadcrumbSchema } from "../data/seo";

function RatingCell({ product, bestRating, highlightTop }) {
  const { filled, empty, n } = formatStars(product.rating);
  const isTop =
    highlightTop &&
    typeof product.rating === "number" &&
    product.rating === bestRating &&
    bestRating > 0;

  return (
    <td
      className={`border-b border-slate-200 px-3 py-4 align-top text-sm ${
        isTop ? "bg-emerald-50/90" : ""
      }`}
    >
      <div
        className="text-amber-500"
        aria-label={`${n} out of 5 stars`}
      >
        {filled}
        <span className="text-slate-300">{empty}</span>
      </div>
      <p className="mt-1 tabular-nums text-slate-700">
        {typeof product.rating === "number" ? `${product.rating.toFixed(1)} / 5` : "—"}
      </p>
      {isTop ? (
        <p className="mt-1 text-xs font-medium text-emerald-800">Highest in this view</p>
      ) : null}
    </td>
  );
}

export default function Compare() {
  const { compareProducts, remove, clear } = useCompare();

  const bestRating =
    compareProducts.length > 0
      ? Math.max(
          ...compareProducts.map((p) =>
            typeof p.rating === "number" ? p.rating : 0
          )
        )
      : 0;
  const highlightTopRating = compareProducts.length > 1;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Compare car care products",
      url: "https://www.car-bliss.com/compare",
      description:
        "Side-by-side comparison of car care products on Car-Bliss. Compare ratings, categories, and highlights.",
    },
    buildBreadcrumbSchema([
      { name: "Home", url: "https://www.car-bliss.com/" },
      { name: "Compare", url: "https://www.car-bliss.com/compare" },
    ]),
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg)] py-10 sm:py-12">
      <Seo
        title="Compare Car Care Products | Side-by-Side"
        path="/compare"
        description="Compare up to four car care products side by side: ratings, brand, category, highlights, and Amazon links."
        keywords="compare car shampoo, car care comparison, detailing products compare"
        structuredData={structuredData}
      />

      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Compare products
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Add up to {MAX_COMPARE} items from the product grid, then review
              ratings, categories, and highlights in one place. Prices are on
              Amazon — we link out for the latest numbers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/#products"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Browse products
            </Link>
            {compareProducts.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Clear all
              </button>
            ) : null}
          </div>
        </div>

        {compareProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              No products to compare yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              Go to the homepage, pick a category, and tap{" "}
              <span className="font-medium text-slate-800">Add to compare</span>{" "}
              on any product card (up to {MAX_COMPARE}).
            </p>
            <Link
              to="/#products"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Shop product picks
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-black/5">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 min-w-[140px] border-b border-r border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Product
                  </th>
                  {compareProducts.map((p) => (
                    <th
                      key={p.id}
                      className="min-w-[200px] border-b border-slate-200 px-3 py-3 align-bottom"
                    >
                      <div className="flex flex-col gap-2">
                        {p.image ? (
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                            <img
                              src={p.image}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                        <p className="text-sm font-semibold leading-snug text-slate-900">
                          {p.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(p.id, window.scrollY)}
                          className="text-left text-xs font-medium text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Brand
                  </th>
                  {compareProducts.map((p) => (
                    <td
                      key={p.id}
                      className="border-b border-slate-200 px-3 py-3 text-slate-800"
                    >
                      {p.brand || "—"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Category
                  </th>
                  {compareProducts.map((p) => (
                    <td
                      key={p.id}
                      className="border-b border-slate-200 px-3 py-3 text-slate-700"
                    >
                      {p.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Label
                  </th>
                  {compareProducts.map((p) => (
                    <td
                      key={p.id}
                      className="border-b border-slate-200 px-3 py-3 text-slate-700"
                    >
                      {p.badge || "—"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Type
                  </th>
                  {compareProducts.map((p) => (
                    <td
                      key={p.id}
                      className="border-b border-slate-200 px-3 py-3 text-slate-700"
                    >
                      {p.isCombo ? "Combo / kit" : "Single product"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Rating
                  </th>
                  {compareProducts.map((p) => (
                    <RatingCell
                      key={p.id}
                      product={p}
                      bestRating={bestRating}
                      highlightTop={highlightTopRating}
                    />
                  ))}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 align-top border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Highlights
                  </th>
                  {compareProducts.map((p) => (
                    <td
                      key={p.id}
                      className="border-b border-slate-200 px-3 py-4 align-top text-slate-600"
                    >
                      <ul className="list-disc space-y-1 pl-4">
                        {getFeatureList(p).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 px-3 py-3 font-medium text-slate-700"
                  >
                    Buy
                  </th>
                  {compareProducts.map((p) => (
                    <td
                      key={p.id}
                      className="border-b border-slate-200 px-3 py-4 align-top"
                    >
                      {p.amazonLink ? (
                        <a
                          href={p.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
                        >
                          View on Amazon
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-500">
          Affiliate disclosure: Links may earn commissions. Compare ratings and
          features here; always confirm price and availability on Amazon.
        </p>
      </div>
    </div>
  );
}
