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
    <section className="mx-auto my-12 max-w-7xl px-4 sm:px-5" aria-labelledby="why-choose-car-bliss">
      <h2 id="why-choose-car-bliss" className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        Why choose Car-Bliss
      </h2>
      <p className="mb-8 max-w-2xl text-slate-600">
        Built to help car owners choose confidently and care for their vehicles better.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        {trustPoints.map((point, index) => (
          <article
            key={point.title}
            className="reveal-scale rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
            style={{ "--reveal-delay": `${index * 90}ms` }}
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-900">{point.title}</h3>
            <p className="text-sm leading-6 text-slate-600">{point.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-slate-50/90 p-6 shadow-inner ring-1 ring-black/5 sm:p-8">
        <h3 className="mb-3 text-xl font-bold text-slate-900">
          How we build recommendations
        </h3>
        <p className="leading-7 text-slate-700">
          Car-Bliss publishes practical buying guides and affiliate product
          recommendations for common car care categories. We focus on category
          fit, everyday usefulness, and clearly explained comparisons so readers
          can make faster decisions.
        </p>
      </div>
    </section>
  );
}
