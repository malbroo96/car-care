import { Helmet } from "react-helmet";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>About Us - Premium Car Care Products | Car-Bliss</title>
        <meta
          name="description"
          content="Learn about Car-Bliss, your trusted source for premium car care products and detailing supplies. Discover our mission and commitment to quality."
        />
        <meta
          name="keywords"
          content="about car care, car detailing products, premium car supplies, Car-Bliss mission"
        />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Car-Bliss
          </h1>
          <div className="w-24 h-1 bg-cyan-600 mx-auto mb-4"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At Car-Bliss, we're passionate about helping car owners maintain
              their vehicles in pristine condition. We carefully curate the best
              car cleaning products from trusted brands, ensuring that every
              product we recommend meets our high standards for quality and
              effectiveness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our selection includes everything you need for complete car care:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">✓</span>
                <span>
                  <strong>Premium Car Care Kits:</strong> Complete washing
                  solutions for your vehicle
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">✓</span>
                <span>
                  <strong>Professional Shampoos:</strong> pH balanced formulas
                  for safe cleaning
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">✓</span>
                <span>
                  <strong>Pressure Washers:</strong> Powerful cleaning for
                  stubborn dirt
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">✓</span>
                <span>
                  <strong>Microfiber Products:</strong> Scratch-free drying and
                  polishing
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">✓</span>
                <span>
                  <strong>Interior Care:</strong> Keep your cabin fresh and
                  clean
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Car-Bliss?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Hand-Picked Selection
                </h3>
                <p className="text-gray-700 text-sm">
                  Every product is carefully selected based on performance,
                  safety, and customer reviews.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Trusted Brands
                </h3>
                <p className="text-gray-700 text-sm">
                  We partner with industry-leading brands like 3M, Wavex, AGARO,
                  and more.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Expert Recommendations
                </h3>
                <p className="text-gray-700 text-sm">
                  Our team tests and reviews products to ensure they meet
                  professional standards.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Easy Shopping
                </h3>
                <p className="text-gray-700 text-sm">
                  Direct links to Amazon for convenient purchasing and fast
                  delivery.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We're committed to providing honest recommendations and helping
              you make informed decisions about car care products. As an Amazon
              Associate, we earn from qualifying purchases, but this never
              influences our product selections. Your car's shine and your
              satisfaction are our top priorities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
