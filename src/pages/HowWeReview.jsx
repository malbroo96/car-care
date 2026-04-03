import Seo from "../components/Seo";
import { buildBreadcrumbSchema, buildOrganizationSchema, editorialPrinciples } from "../data/seo";

export default function HowWeReview() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Seo
        title="How We Review Car Care Products"
        path="/how-we-review"
        description="Learn how Car-Bliss evaluates car care products, writes buying guides, and handles affiliate disclosures so readers can use our recommendations with confidence."
        keywords="how we review car care products, editorial policy, affiliate disclosure, product recommendation methodology"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "How Car-Bliss Reviews Car Care Products",
            url: "https://www.car-bliss.com/how-we-review",
            description:
              "Learn how Car-Bliss evaluates car care products, writes buying guides, and handles affiliate disclosures.",
          },
          buildOrganizationSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: "https://www.car-bliss.com/" },
            {
              name: "How We Review",
              url: "https://www.car-bliss.com/how-we-review",
            },
          ]),
        ]}
      />

      <main className="mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Review Car Care Products
          </h1>
          <p className="text-gray-600 leading-7 mb-8">
            Car-Bliss is built to help drivers compare common car care categories
            faster. We publish straightforward guides and curated product lists
            with an emphasis on usefulness, maintenance value, and easy-to-follow
            recommendations.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Editorial Approach
            </h2>
            <ul className="space-y-3 text-gray-700 leading-7">
              {editorialPrinciples.map((principle) => (
                <li key={principle} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-600" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What We Look For
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Category Relevance
                </h3>
                <p className="text-gray-700 leading-7">
                  Products should fit common detailing needs like washing,
                  drying, cabin cleaning, and paint protection for daily-driven
                  vehicles.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Maintenance Usefulness
                </h3>
                <p className="text-gray-700 leading-7">
                  We prioritize products that make regular care easier, more
                  repeatable, and safer for paint, trim, glass, or interior
                  surfaces.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Brand Familiarity
                </h3>
                <p className="text-gray-700 leading-7">
                  Preference is given to brands that are commonly available and
                  familiar to car owners shopping in these categories.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Buying Simplicity
                </h3>
                <p className="text-gray-700 leading-7">
                  Recommendations are framed to help readers narrow down options
                  quickly instead of sorting through large product lists alone.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Affiliate Disclosure
            </h2>
            <p className="text-gray-700 leading-7">
              Car-Bliss participates in the Amazon Associates Program. We may
              earn a commission from qualifying purchases made through affiliate
              links. This does not change the price you pay, and it does not
              change our goal of publishing practical, clearly explained product
              recommendations.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
