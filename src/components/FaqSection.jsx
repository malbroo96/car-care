export default function FaqSection({ title = "Frequently Asked Questions", faqs }) {
  return (
    <section
      className="mx-auto my-12 w-full max-w-7xl px-3 sm:my-14 sm:px-4 md:my-16 md:px-6 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl">
        <h2
          id="faq-heading"
          className="mb-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl"
        >
          {title}
        </h2>
        <p className="mb-8 text-slate-600">
          Quick answers to common car care questions that can help you choose better products and build a safer detailing routine.
        </p>
      </div>

      <div className="grid max-w-3xl gap-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-slate-200/90 bg-white p-1 shadow-sm ring-1 ring-black/5 open:shadow-md"
          >
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 py-3 font-semibold text-slate-900 marker:content-none sm:min-h-0 sm:px-4 sm:py-4 [&::-webkit-details-marker]:hidden">
              <span className="text-left text-base leading-snug">{faq.question}</span>
              <span
                className="shrink-0 text-slate-400 transition group-open:rotate-180"
                aria-hidden
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="border-t border-slate-100 px-4 pb-4 pt-0 text-slate-600 leading-7">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
