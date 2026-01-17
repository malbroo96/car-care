import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar2";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import { categories, products } from "./data/products";
import { useState } from "react";

function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <>
      <Helmet>
        <title>
          Premium Car Care Products | Best Auto Detailing Kits & Supplies
        </title>
        <meta
          name="description"
          content="Discover top-rated car care products including washing kits, shampoos, microfiber cloths, and detailing tools. Shop now for professional car maintenance solutions."
        />
        <meta
          name="keywords"
          content="car care, auto detailing, car wash kits, car shampoo, microfiber cloths, car detailing tools, vehicle maintenance, premium car products"
        />
      </Helmet>
      <Hero />
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="max-w-6xl mx-auto px-4">
        <CategorySection title={activeCategory} products={filteredProducts} />
      </div>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
