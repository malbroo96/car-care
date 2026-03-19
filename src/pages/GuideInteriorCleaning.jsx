import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import FaqSection from "../components/FaqSection";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  guideMeta,
  organization,
} from "../data/seo";

const faqs = [
  {
    question: "What should I clean first inside the car?",
    answer:
      "Start by removing trash and vacuuming mats, seats, and crevices. This keeps dust and grit from spreading when you wipe dashboard and trim surfaces later.",
  },
  {
    question: "Can I use one cleaner on every interior surface?",
    answer:
      "Not always. It is safer to use product-appropriate cleaners for plastics, leather, fabric, and touchscreens because each surface can react differently.",
  },
  {
    question: "How do I keep the cabin fresh for longer?",
    answer:
      "Regular vacuuming, wiping touchpoints, and replacing moisture-heavy mats or dirty cabin filters can help keep odors under control between deep cleaning sessions.",
  },
];

export default function GuideInteriorCleaning() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="Interior Car Cleaning Guide for a Fresh Cabin | Car Care Tips"
        path="/guides/interior-cleaning-guide"
        type="article"
        description="A practical interior car cleaning guide for dashboards, seats, and high-touch surfaces. Keep your cabin clean, fresh, and comfortable."
        keywords="interior car cleaning guide, dashboard cleaning, cabin cleaning tips, car interior care"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Interior Car Cleaning Guide for a Fresh Cabin",
            url: "https://www.car-bliss.com/guides/interior-cleaning-guide",
            description:
              "A practical interior car cleaning guide for dashboards, seats, and high-touch surfaces.",
            author: {
              "@type": "Organization",
              name: guideMeta.authorName,
            },
            publisher: {
              "@type": "Organization",
              name: organization.name,
              logo: {
                "@type": "ImageObject",
                url: organization.logo,
              },
            },
            datePublished: guideMeta.published,
            dateModified: guideMeta.modified,
          },
          buildBreadcrumbSchema([
            { name: "Home", url: "https://www.car-bliss.com/" },
            { name: "Guides", url: "https://www.car-bliss.com/#car-care-guides-heading" },
            {
              name: "Interior Car Cleaning Guide for a Fresh Cabin",
              url: "https://www.car-bliss.com/guides/interior-cleaning-guide",
            },
          ]),
          buildFaqSchema(faqs),
        ]}
      />
      <main className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Interior Car Cleaning Guide for a Fresh Cabin
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Updated March 19, 2026 by {guideMeta.authorName}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            A clean interior improves comfort and preserves your car's value.
            Vacuum first, then clean dashboard panels and trim with a
            non-greasy interior cleaner.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Essential Interior Cleaning Steps
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li>Vacuum mats, seats, and tight crevices thoroughly.</li>
            <li>Wipe plastics and leather with product-safe cleaners.</li>
            <li>Finish with a mild fragrance for a fresh cabin feel.</li>
          </ul>
          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Recommended Interior Essentials
            </h2>
            <p className="text-gray-600 leading-7 mb-4">
              Use interior-safe cleaners for dashboard plastics and soft microfiber cloths to reduce residue while keeping the cabin neat and comfortable.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#interior-cleaning"
                className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 transition-colors"
              >
                Browse interior cleaners
              </a>
              <a
                href="/#car-perfume"
                className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Explore cabin fragrances
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Related Guides</h2>
            <div className="flex flex-col gap-3 text-cyan-700 font-medium">
              <Link to="/guides/wash-without-swirl-marks">
                How to Wash Your Car Without Causing Swirl Marks
              </Link>
              <Link to="/guides/wax-vs-ceramic-spray">
                Wax vs Ceramic Spray: Best Paint Protection for Daily Drivers
              </Link>
            </div>
          </div>
        </article>
      </main>
      <FaqSection title="Interior Cleaning FAQs" faqs={faqs} />
    </div>
  );
}
