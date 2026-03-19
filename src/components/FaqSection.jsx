export default function FaqSection({ title = "Frequently Asked Questions", faqs }) {
  return (
    <section
      className="max-w-6xl mx-auto px-4 my-16"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-8">
          Quick answers to common car care questions that can help you choose better products and build a safer detailing routine.
        </p>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-gray-900">
              {faq.question}
            </summary>
            <p className="mt-3 text-gray-600 leading-7">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
