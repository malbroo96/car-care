export default function Navbar({
  categories,
  activeCategory,
  setActiveCategory
}) {
  return (
    <nav className="sticky top-0 bg-white z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 whitespace-nowrap rounded-full border transition
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
    </nav>
  );
}
