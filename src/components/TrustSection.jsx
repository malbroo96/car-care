const trustPoints = [
  {
    title: "Quality products",
    description:
      "We highlight dependable car care products from trusted brands for better cleaning and protection.",
  },
  {
    title: "Honest reviews",
    description:
      "Our recommendations focus on practical value, performance, and real-world usefulness.",
  },
  {
    title: "Easy car care tips",
    description:
      "Simple guides help you maintain your car with less effort and more consistent results.",
  },
];

export default function TrustSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 my-12" aria-labelledby="why-choose-car-bliss">
      <h2 id="why-choose-car-bliss" className="text-2xl md:text-3xl font-bold mb-2">
        Why Choose Car Bliss
      </h2>
      <p className="text-gray-600 mb-8">
        Built to help car owners choose confidently and care for their vehicles better.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {trustPoints.map((point, index) => (
          <article
            key={point.title}
            className="reveal-scale bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            style={{ "--reveal-delay": `${index * 90}ms` }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
            <p className="text-sm text-gray-600 leading-6">{point.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          How We Build Recommendations
        </h3>
        <p className="text-gray-700 leading-7">
          Car-Bliss publishes practical buying guides and affiliate product
          recommendations for common car care categories. We focus on category
          fit, everyday usefulness, and clearly explained comparisons so readers
          can make faster decisions.
        </p>
      </div>
    </section>
  );
}
