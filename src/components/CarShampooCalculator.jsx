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
      className="mx-auto my-12 max-w-7xl px-4 sm:px-5"
      aria-labelledby="car-shampoo-calculator"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2
          id="car-shampoo-calculator"
          className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Car shampoo calculator
        </h2>
        <p className="mb-6 text-slate-600">
          Pick your car size to estimate shampoo needed for one wash.
        </p>

        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="car-size"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Car size
            </label>
            <select
              id="car-size"
              value={carSize}
              onChange={(e) => setCarSize(e.target.value)}
              className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-slate-50 p-5">
            <p className="text-sm text-slate-600">Estimated shampoo per wash</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-slate-900">
              {shampooNeeded} ml
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
