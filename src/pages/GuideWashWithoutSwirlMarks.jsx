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
    question: "What causes swirl marks during a wash?",
    answer:
      "Swirl marks usually happen when dirt is dragged across paint by a dirty mitt, towel, or sponge. Washing without enough lubrication or drying with rough cloths can also create fine scratches.",
  },
  {
    question: "Is the two-bucket method worth it?",
    answer:
      "Yes. It helps separate rinse water from shampoo water so you are less likely to put grit back onto the paint during each pass.",
  },
  {
    question: "What should I use to dry the car safely?",
    answer:
      "A soft microfiber drying towel or drying cloth is usually the safest choice because it absorbs more water and is gentler on paint than regular fabric.",
  },
];

export default function GuideWashWithoutSwirlMarks() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="How to Wash Your Car Without Swirl Marks | Car Care Guide"
        path="/guides/wash-without-swirl-marks"
        type="article"
        description="Follow this simple car wash guide to reduce swirl marks and keep your paint safe. Learn proper pre-rinse, shampoo, and drying steps."
        keywords="wash car without swirl marks, car wash guide, safe car washing, microfiber drying tips"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Wash Your Car Without Causing Swirl Marks",
            url: "https://www.car-bliss.com/guides/wash-without-swirl-marks",
            description:
              "Follow this simple car wash guide to reduce swirl marks and keep your paint safe.",
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
              name: "How to Wash Your Car Without Causing Swirl Marks",
              url: "https://www.car-bliss.com/guides/wash-without-swirl-marks",
            },
          ]),
          buildFaqSchema(faqs),
        ]}
      />
      <main className="mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How to Wash Your Car Without Causing Swirl Marks
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Updated March 19, 2026 by {guideMeta.authorName}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Swirl marks usually come from trapped dirt and poor wash technique.
            Start with a thorough rinse, use a pH-balanced shampoo, and clean
            with a soft microfiber mitt from top to bottom.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Quick Safe-Wash Process
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li>Pre-rinse to remove loose grit before touching paint.</li>
            <li>Use the two-bucket method to avoid reintroducing dirt.</li>
            <li>Dry with microfiber towels using gentle blotting motions.</li>
          </ul>
          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Recommended Next Steps
            </h2>
            <p className="text-gray-600 leading-7 mb-4">
              Pair this wash process with quality shampoo and microfiber tools to lower paint contact risk during regular maintenance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#car-shampoo-cleaners"
                className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 transition-colors"
              >
                Browse car shampoos
              </a>
              <a
                href="/#microfiber-cloths-towels"
                className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                See microfiber towels
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Related Guides</h2>
            <div className="flex flex-col gap-3 text-cyan-700 font-medium">
              <Link to="/guides/interior-cleaning-guide">
                Interior Car Cleaning Guide for a Fresh Cabin
              </Link>
              <Link to="/guides/wax-vs-ceramic-spray">
                Wax vs Ceramic Spray: Best Paint Protection for Daily Drivers
              </Link>
            </div>
          </div>
        </article>
      </main>
      <FaqSection title="Safe Wash FAQs" faqs={faqs} />
    </div>
  );
}
