import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { categoryDescriptions, categoryGuideLinks } from "../data/seo";

function toSectionId(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CategorySection({ title, products, priceState }) {
  const description = categoryDescriptions[title];
  const guideLink = categoryGuideLinks[title];

  return (
    <section className="my-10" id={toSectionId(title)} aria-labelledby={`${toSectionId(title)}-heading`}>
      <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 id={`${toSectionId(title)}-heading`} className="text-2xl font-bold mb-2">
            {title}
          </h2>
          {description ? (
            <p className="text-gray-600 leading-7">{description}</p>
          ) : null}
        </div>

        {guideLink ? (
          <Link
            to={guideLink.href}
            className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {guideLink.label}
          </Link>
        ) : null}
      </div>

      {priceState?.error ? (
        <p className="text-sm text-amber-700 mb-4">
          Live Amazon pricing is temporarily unavailable. Product links still open on Amazon for the latest price.
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} revealIndex={index} />
        ))}
      </div>
    </section>
  );
}
