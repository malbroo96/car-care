export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Brand + SEO Keywords */}
        <div>
          <h1 className="text-xl font-bold tracking-wide">CarCare Picks</h1>

          {/* SEO-focused tagline */}
          <p className="text-xs text-gray-300 max-w-md">
            Best car care products in India – car shampoo, microfiber cloths,
            interior cleaners, polish, wax, coating & car perfumes.
          </p>
        </div>

        {/* Trust / Authority */}
        <div className="text-xs text-gray-400">
          Amazon Affiliate • Trusted Auto Care Recommendations
        </div>
      </div>
    </header>
  );
}
