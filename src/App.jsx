import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar2";
import CategorySection from "./components/CategorySection";
import BlogSection from "./components/BlogSection";
import TrustSection from "./components/TrustSection";
import CarShampooCalculator from "./components/CarShampooCalculator";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GuideWashWithoutSwirlMarks from "./pages/GuideWashWithoutSwirlMarks";
import GuideInteriorCleaning from "./pages/GuideInteriorCleaning";
import GuideWaxVsCeramicSpray from "./pages/GuideWaxVsCeramicSpray";

import { categories, products } from "./data/products";
import { useEffect, useMemo, useState } from "react";

const guideRoutes = [
  {
    path: "/guides/wash-without-swirl-marks",
    element: <GuideWashWithoutSwirlMarks />,
  },
  {
    path: "/guides/interior-cleaning-guide",
    element: <GuideInteriorCleaning />,
  },
  {
    path: "/guides/wax-vs-ceramic-spray",
    element: <GuideWaxVsCeramicSpray />,
  },
];

function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const showShampooCalculator = activeCategory === "Car Shampoo & Cleaners";
  const isBestSellersCategory = activeCategory === "Best Sellers";

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (isBestSellersCategory) {
          return (product.badge || "").toLowerCase().includes("best seller");
        }

        return product.category === activeCategory;
      }),
    [activeCategory, isBestSellersCategory]
  );

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal-scale");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    nodes.forEach((node) => {
      if (!node.classList.contains("is-visible")) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [activeCategory]);

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
      <div id="best-sellers">
        <Navbar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      {showShampooCalculator && <CarShampooCalculator />}
      <BlogSection />
      <div id="products" className="max-w-6xl mx-auto px-4">
        <CategorySection title={activeCategory} products={filteredProducts} />
      </div>
      <TrustSection />
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
        {guideRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
