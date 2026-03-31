import { Link } from "react-router-dom";
import { MAX_COMPARE } from "../constants/compare";
import { useCompare } from "../context/CompareContext";

export default function CompareBar() {
  const { compareProducts, count, clear } = useCompare();

  if (count === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[65] border-t border-slate-200/90 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Product comparison"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {compareProducts.map((p) =>
              p.image ? (
                <img
                  key={p.id}
                  src={p.image}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-lg border-2 border-white object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div
                  key={p.id}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-white bg-slate-100 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  {p.brand?.slice(0, 2) || "?"}
                </div>
              )
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              {count} of {MAX_COMPARE} selected
            </p>
            <p className="truncate text-xs text-slate-500">
              Open the table to compare side by side
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={clear}
            className="min-h-[44px] rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Compare now
          </Link>
        </div>
      </div>
    </div>
  );
}
