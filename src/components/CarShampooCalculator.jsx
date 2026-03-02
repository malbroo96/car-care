import { useState } from "react";

const SHAMPOO_BY_SIZE = {
  small: 25,
  medium: 40,
  large: 55,
};

export default function CarShampooCalculator() {
  const [carSize, setCarSize] = useState("medium");
  const shampooNeeded = SHAMPOO_BY_SIZE[carSize];

  return (
    <section
      className="max-w-6xl mx-auto px-4 my-12"
      aria-labelledby="car-shampoo-calculator"
    >
      <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8">
        <h2
          id="car-shampoo-calculator"
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          Car Shampoo Calculator
        </h2>
        <p className="text-gray-600 mb-6">
          Pick your car size to estimate shampoo needed for one wash.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label
              htmlFor="car-size"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Car size
            </label>
            <select
              id="car-size"
              value={carSize}
              onChange={(e) => setCarSize(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="bg-gray-50 border rounded-xl p-4">
            <p className="text-sm text-gray-600">Estimated shampoo per wash</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {shampooNeeded} ml
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
