import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { categories, products } from "./data/products";

function App() {
  // Set first category as default
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Filter products based on active category
  const filteredProducts = products.filter(
    p => p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="max-w-6xl mx-auto px-4">
        <CategorySection
          title={activeCategory}
          products={filteredProducts}
        />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;