import { useCallback, useEffect, useState } from "react";
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

const AUTO_SLIDE_INTERVAL_MS = 4000;

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
    <section className="relative h-[34rem] md:h-[38rem] overflow-hidden bg-black">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 h-full flex items-center justify-center text-white">
            <div className="text-center px-4 max-w-3xl">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-white/90">
                Trusted Car Care Essentials
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                Get a Cleaner, Shinier Car in Less Time
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
                Discover proven detailing products that protect paint, lift dirt
                fast, and keep your car looking showroom-ready after every wash.
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? "bg-white w-8 h-3"
                : "bg-white/50 w-3 h-3 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
