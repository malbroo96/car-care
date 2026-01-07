import { useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import CategorySection from "./components/CategorySection";
import { products } from "./data/products";
import Footer from "./components/Footer";

function App() {
  const categories = [...new Set(products.map(p => p.category))];

  // default: first category only
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    p => p.category === activeCategory
  );

  return (
    <>
      <Hero />

      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4">
        <CategorySection
          title={activeCategory}
          products={filteredProducts}
        />
      </div>

      {/* Footer should always be LAST */}
      <Footer />
    </>
  );
}

export default App;
