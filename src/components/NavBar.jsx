export default function Navbar({
  categories,
  activeCategory,
  setActiveCategory
}) {
  console.log(name)
  return (
    <nav className="sticky top-0 bg-white z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div
          className="
            grid gap-3
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-7
          "
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 text-sm rounded-full border transition text-center
                ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
