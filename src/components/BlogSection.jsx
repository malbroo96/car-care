import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const guides = [
  {
    id: 1,
    title: "How to Wash Your Car Without Causing Swirl Marks",
    summary:
      "Learn a safe step-by-step wash routine using proper shampoo, mitts, and drying techniques. Protect your paint while getting a spotless, glossy finish.",
    link: "/guides/wash-without-swirl-marks",
  },
  {
    id: 2,
    title: "Interior Car Cleaning Guide for a Fresh Cabin",
    summary:
      "Discover a practical process for cleaning dashboards, seats, and touchpoints. Keep dust, stains, and odors under control with minimal effort.",
    link: "/guides/interior-cleaning-guide",
  },
  {
    id: 3,
    title: "Wax vs Ceramic Spray: Best Paint Protection for Daily Drivers",
    summary:
      "Compare durability, shine, and ease of use to choose the right protection layer. Make your car easier to maintain between washes.",
    link: "/guides/wax-vs-ceramic-spray",
  },
  {
    id: 4,
    title: "Best Car Wash Routine for Weekly Maintenance",
    summary:
      "Follow a simple wash schedule to keep paint clean, reduce buildup, and maintain shine between deep detailing sessions.",
    link: "/guides/wash-without-swirl-marks",
  },
  {
    id: 5,
    title: "How to Clean Car Glass Without Streaks",
    summary:
      "Use the right cloth and cleaner technique for crystal-clear windshield and window visibility in all weather conditions.",
    link: "/guides/interior-cleaning-guide",
  },
  {
    id: 6,
    title: "Tyre and Wheel Cleaning Guide for Beginners",
    summary:
      "Learn how to remove brake dust and road grime safely while keeping tyre sidewalls clean and fresh-looking.",
    link: "/guides/wash-without-swirl-marks",
  },
  {
    id: 7,
    title: "Dashboard Care Tips for Long-Lasting Interior Finish",
    summary:
      "Protect dashboard plastics and trim from fading with easy cleaning and non-greasy finishing habits.",
    link: "/guides/interior-cleaning-guide",
  },
  {
    id: 8,
    title: "How to Pick the Right Microfiber Cloth",
    summary:
      "Understand GSM levels and cloth types so you can choose safer towels for washing, drying, and polishing.",
    link: "/guides/wash-without-swirl-marks",
  },
  {
    id: 9,
    title: "Monsoon Car Care Checklist",
    summary:
      "Get your car ready for rain with proper wash frequency, paint protection, and interior moisture control.",
    link: "/guides/wax-vs-ceramic-spray",
  },
  {
    id: 10,
    title: "Summer Paint Protection Tips",
    summary:
      "Reduce UV damage and maintain gloss during hot months using practical cleaning and protective layering steps.",
    link: "/guides/wax-vs-ceramic-spray",
  },
  {
    id: 11,
    title: "Quick Interior Reset in 15 Minutes",
    summary:
      "A fast routine to clean touchpoints, remove dust, and restore a tidy cabin before daily commutes.",
    link: "/guides/interior-cleaning-guide",
  },
  {
    id: 12,
    title: "Foam Wash vs Bucket Wash: Which Is Better?",
    summary:
      "Compare tools, water use, and results to choose the best wash method for your setup and time.",
    link: "/guides/wash-without-swirl-marks",
  },
  {
    id: 13,
    title: "How Often Should You Wax Your Car?",
    summary:
      "Find the ideal waxing interval for daily-driven cars to maintain protection and long-term paint health.",
    link: "/guides/wax-vs-ceramic-spray",
  },
];

export default function BlogSection() {
  const marqueeRef = useRef(null);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const marqueeGuides = [...guides, ...guides];

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const step = 1;
    const interval = setInterval(() => {
      if (isInteractingRef.current) return;

      container.scrollLeft += step;
      const halfWidth = container.scrollWidth / 2;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
  };

  const handleMouseLeave = () => {
    isInteractingRef.current = false;
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    const container = marqueeRef.current;
    if (!container) return;

    e.preventDefault();
    isInteractingRef.current = true;
    container.scrollLeft += e.deltaY + e.deltaX;
  };

  const handlePointerDown = (e) => {
    const container = marqueeRef.current;
    if (!container) return;

    isInteractingRef.current = true;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = container.scrollLeft;
  };

  const handlePointerMove = (e) => {
    const container = marqueeRef.current;
    if (!container || !isDraggingRef.current) return;

    const dx = e.clientX - dragStartXRef.current;
    container.scrollLeft = dragStartScrollRef.current - dx;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="mx-auto my-12 max-w-7xl px-4 sm:px-5" aria-labelledby="car-care-guides-heading">
      <h2 id="car-care-guides-heading" className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        Car care guides
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        Practical car detailing tips to help you clean, protect, and maintain your vehicle.
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--app-bg)] to-transparent sm:w-12 md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[var(--app-bg)] to-transparent sm:w-12 md:w-16" />

        <div
          ref={marqueeRef}
          className="blog-scroll cursor-grab overflow-x-auto overflow-y-hidden active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", touchAction: "pan-x pinch-zoom" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="flex w-max snap-x snap-mandatory gap-4 py-1 sm:gap-5">
          {marqueeGuides.map((guide, index) => (
            <article
              key={`${guide.id}-${index}`}
              className="reveal-scale w-[280px] shrink-0 snap-start sm:w-[320px] rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              style={{ "--reveal-delay": `${(index % 8) * 55}ms` }}
            >
              <h3 className="mb-3 text-lg font-semibold leading-snug text-slate-900">
                {guide.title}
              </h3>
              <p className="mb-5 text-sm leading-6 text-slate-600">
                {guide.summary}
              </p>
              <Link
                to={guide.link}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Read more
              </Link>
            </article>
          ))}
          </div>
        </div>
      </div>
      <style>{`
        .blog-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
