import { useState, useEffect } from "react";
import { useCompare } from "../context/CompareContext";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { count: compareCount } = useCompare();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible ? (
        <button
          type="button"
          onClick={scrollToTop}
          className={`fixed right-[max(1rem,env(safe-area-inset-right))] z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-900/30 transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:right-8 sm:h-14 sm:w-14 ${
            compareCount > 0
              ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom))] sm:bottom-32"
              : "bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-8"
          }`}
          aria-label="Scroll to top"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      ) : null}
    </>
  );
}
