import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar2";
import CategorySection from "./components/CategorySection";
import BlogSection from "./components/BlogSection";
import TrustSection from "./components/TrustSection";
import CarShampooCalculator from "./components/CarShampooCalculator";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import FaqSection from "./components/FaqSection";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GuideWashWithoutSwirlMarks from "./pages/GuideWashWithoutSwirlMarks";
import GuideInteriorCleaning from "./pages/GuideInteriorCleaning";
import GuideWaxVsCeramicSpray from "./pages/GuideWaxVsCeramicSpray";
import HowWeReview from "./pages/HowWeReview";

import { categories, products } from "./data/products";
import { useEffect, useMemo, useState } from "react";
import {
  buildFaqSchema,
  buildOrganizationSchema,
  buildProductListSchema,
  siteFaqs,
} from "./data/seo";

function toSectionId(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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
  const homepageStructuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Car-Bliss",
        url: "https://www.car-bliss.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.car-bliss.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      buildProductListSchema(
        products,
        "Car-Bliss Car Care Product Collections",
        "https://www.car-bliss.com/#products"
      ),
      buildFaqSchema(siteFaqs),
      buildOrganizationSchema(),
    ],
    []
  );
  const categoryHashMap = useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [`#${toSectionId(category)}`, category])
      ),
    []
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

  useEffect(() => {
    const applyHashCategory = () => {
      const categoryFromHash = categoryHashMap[window.location.hash];
      if (categoryFromHash) {
        setActiveCategory(categoryFromHash);
      }
    };

    applyHashCategory();
    window.addEventListener("hashchange", applyHashCategory);

    return () => window.removeEventListener("hashchange", applyHashCategory);
  }, [categoryHashMap]);

  return (
    <>
      <Seo
        title="Premium Car Care Products | Best Auto Detailing Kits & Supplies"
        path="/"
        structuredData={homepageStructuredData}
      />
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
      <FaqSection faqs={siteFaqs} />
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
        <Route path="/how-we-review" element={<HowWeReview />} />
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
