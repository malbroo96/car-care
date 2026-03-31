import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { MAX_COMPARE } from "../constants/compare";
import { categoryDescriptions, categoryGuideLinks } from "../data/seo";

function toSectionId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CategorySection({ title, products }) {
  const description = categoryDescriptions[title];
  const guideLink = categoryGuideLinks[title];

  return (
    <section className="my-10" id={toSectionId(title)} aria-labelledby={`${toSectionId(title)}-heading`}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 id={`${toSectionId(title)}-heading`} className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="leading-7 text-slate-600">{description}</p>
          ) : null}
          <p className="mt-2 text-sm text-slate-500">
            Use{" "}
            <span className="font-medium text-slate-700">Add to compare</span>{" "}
            on cards to build a side-by-side table (up to {MAX_COMPARE} items).
          </p>
        </div>

        {guideLink ? (
          <Link
            to={guideLink.href}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            {guideLink.label}
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} revealIndex={index} />
        ))}
      </div>
    </section>
  );
}
