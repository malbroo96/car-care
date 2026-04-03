import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import hero5 from "../assets/hero5.webp";

const SLIDES = [
  {
    title: "Premium Car Care Kits",
    description: "Complete washing solutions for your vehicle",
    image: hero1,
  },
  {
    title: "Professional Grade Shampoos",
    description: "pH balanced formulas for safe cleaning",
    image: hero2,
  },
  {
    title: "High Pressure Washers",
    description: "Powerful cleaning for stubborn dirt",
    image: hero3,
  },
  {
    title: "Microfiber Excellence",
    description: "Scratch-free drying and polishing",
    image: hero4,
  },
  {
    title: "Interior Detailing",
    description: "Keep your cabin fresh and clean",
    image: hero5,
  },
];

const AUTO_SLIDE_INTERVAL_MS = 5000;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-[min(100svh,40rem)] overflow-hidden bg-zinc-950 sm:min-h-[min(100svh,42rem)] md:min-h-[min(88svh,44rem)] lg:h-[min(90svh,42rem)] lg:min-h-0"
      aria-roledescription="carousel"
      aria-label="Featured car care categories"
    >
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === currentSlide ? "z-[1] opacity-100" : "z-0 opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
          </div>
        </div>
      ))}

      <div className="relative z-10 flex min-h-[min(100svh,40rem)] flex-col items-center justify-center px-4 py-14 sm:px-6 sm:py-16 md:min-h-[min(88svh,44rem)] md:px-8 md:py-20 lg:min-h-[min(90svh,42rem)] lg:py-0">
        <div className="mx-auto w-full max-w-3xl text-center text-white">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85 sm:text-xs sm:tracking-[0.2em]">
            Trusted car care essentials
          </p>
          <h1 className="mb-4 text-balance text-3xl font-bold leading-tight drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
            Get a cleaner, shinier car in less time
          </h1>
          <p className="mx-auto mb-2 max-w-2xl text-pretty text-sm leading-relaxed text-white/90 drop-shadow-md sm:text-base md:text-lg">
            Discover detailing picks that protect paint, lift dirt fast, and keep
            your car looking its best after every wash.
          </p>
          <p className="mb-8 text-xs text-white/70 sm:text-sm" aria-live="polite">
            {SLIDES[currentSlide].title}: {SLIDES[currentSlide].description}
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#best-sellers"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Browse categories
            </a>
            <Link
              to="/#car-care-guides-heading"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Read guides
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-1 top-1/2 z-20 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition hover:bg-white/35 sm:left-2 sm:p-2.5 md:left-4 md:p-3"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-1 top-1/2 z-20 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition hover:bg-white/35 sm:right-2 sm:p-2.5 md:right-4 md:p-3"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-8 sm:gap-2 md:bottom-10"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === currentSlide}
            onClick={() => goToSlide(index)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 sm:min-h-0 sm:min-w-0 sm:p-0"
            aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
          >
            <span
              className={`block rounded-full transition-all ${
                index === currentSlide
                  ? "h-2.5 w-8 bg-white sm:h-3"
                  : "h-2.5 w-2.5 bg-white/50 hover:bg-white/75 sm:h-3 sm:w-3"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
