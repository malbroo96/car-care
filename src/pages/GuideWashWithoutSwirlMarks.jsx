import { Helmet } from "react-helmet";

export default function GuideWashWithoutSwirlMarks() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>How to Wash Your Car Without Swirl Marks | Car Care Guide</title>
        <meta
          name="description"
          content="Follow this simple car wash guide to reduce swirl marks and keep your paint safe. Learn proper pre-rinse, shampoo, and drying steps."
        />
      </Helmet>
      <main className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How to Wash Your Car Without Causing Swirl Marks
          </h1>
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
        </article>
      </main>
    </div>
  );
}
