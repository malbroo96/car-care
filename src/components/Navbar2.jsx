export default function Navbar({
  categories,
  activeCategory,
  setActiveCategory
}) {
  const BEST_SELLERS_LABEL = "Best Sellers";

  return (
    <nav className="sticky top-0 bg-white z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div
          className="
            grid gap-3
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-8
          "
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const isBestSellers = category === BEST_SELLERS_LABEL;

            const baseClasses =
              "py-2 text-sm rounded-full border transition text-center font-medium";
            const defaultClasses = isActive
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300";
            const bestSellerClasses = isActive
              ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-black border-amber-500 shadow-md shadow-amber-200"
              : "bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 text-amber-900 border-amber-300 hover:from-amber-200 hover:to-amber-300";

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`${baseClasses} ${
                  isBestSellers ? bestSellerClasses : defaultClasses
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
