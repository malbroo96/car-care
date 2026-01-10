import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Brand + SEO Keywords */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go("/")}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to home page"
          >
            <img src={logo} alt="CarCare Picks Logo" className="h-10 w-auto" />
          </button>
          <div>
            <button
              onClick={() => go("/")}
              className="text-left hover:opacity-80 transition-opacity"
            >
              <h1 className="text-xl font-bold tracking-wide">Car-Bliss</h1>
            </button>
            {/* SEO-focused tagline */}
            <p className="text-xs text-gray-300 max-w-md">
              Best car care products in India – car shampoo, microfiber cloths,
              interior cleaners, polish, wax, coating & car perfumes.
            </p>
          </div>
        </div>

        {/* Trust / Authority */}
        <div className="text-xs text-gray-400">
          Amazon Affiliate • Trusted Auto Care Recommendations
        </div>
      </div>
    </header>
  );
}
