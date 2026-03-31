export default function Navbar({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const BEST_SELLERS_LABEL = "Best Sellers";

  return (
    <nav
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
      aria-label="Product categories"
    >
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4">
        <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-wider text-slate-500 md:hidden">
          Choose a category — swipe sideways
        </p>
        <div
          className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:pb-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const isBestSellers = category === BEST_SELLERS_LABEL;

            const baseClasses =
              "snap-start shrink-0 rounded-full border px-4 py-2.5 text-center text-xs font-medium transition sm:text-sm md:min-w-0 min-h-[44px] sm:min-h-0";
            const defaultClasses = isActive
              ? "border-slate-900 bg-slate-900 text-white shadow-md"
              : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50";
            const bestSellerClasses = isActive
              ? "border-amber-400 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-900 shadow-md shadow-amber-200/50"
              : "border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 text-amber-950 hover:from-amber-100 hover:to-amber-200";

            return (
              <button
                key={category}
                type="button"
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
