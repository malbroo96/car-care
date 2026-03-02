import { Helmet } from "react-helmet";

export default function GuideInteriorCleaning() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Interior Car Cleaning Guide for a Fresh Cabin | Car Care Tips</title>
        <meta
          name="description"
          content="A practical interior car cleaning guide for dashboards, seats, and high-touch surfaces. Keep your cabin clean, fresh, and comfortable."
        />
      </Helmet>
      <main className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Interior Car Cleaning Guide for a Fresh Cabin
          </h1>
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
        </article>
      </main>
    </div>
  );
}
