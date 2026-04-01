/* eslint-disable react-refresh/only-export-components -- React context + hook */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MAX_COMPARE } from "../constants/compare";
import { products } from "../data/products";

const STORAGE_KEY = "car-bliss-compare-ids";

const CompareContext = createContext(null);

function loadStoredIds() {
  if (typeof sessionStorage === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => Number.isInteger(id));
  } catch {
    return [];
  }
}

function validProductIds(ids) {
  const allowed = new Set(products.map((p) => p.id));
  return ids.filter((id) => allowed.has(id)).slice(0, MAX_COMPARE);
}

/** Instant scroll restore; html { scroll-behavior: smooth } otherwise animates from the wrong position */
function forceScrollY(y) {
  if (typeof window === "undefined") return;
  const el = document.documentElement;
  const prevBehavior = el.style.scrollBehavior;
  el.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  el.scrollTop = y;
  document.body.scrollTop = y;
  el.style.scrollBehavior = prevBehavior;
}

function scheduleScrollRestores(y) {
  forceScrollY(y);
  queueMicrotask(() => forceScrollY(y));
  requestAnimationFrame(() => {
    forceScrollY(y);
    requestAnimationFrame(() => forceScrollY(y));
  });
  [0, 16, 50, 120].forEach((ms) => {
    window.setTimeout(() => forceScrollY(y), ms);
  });
}

export function CompareProvider({ children }) {
  const [ids, setIds] = useState(() => validProductIds(loadStoredIds()));
  const pendingScrollRestore = useRef(null);

  useLayoutEffect(() => {
    if (pendingScrollRestore.current === null) return;
    const y = pendingScrollRestore.current;
    pendingScrollRestore.current = null;
    scheduleScrollRestores(y);
  }, [ids]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const compareProducts = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]));
    return ids.map((id) => map.get(id)).filter(Boolean);
  }, [ids]);

  const add = useCallback((productId, scrollYHint) => {
    setIds((prev) => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      pendingScrollRestore.current =
        typeof scrollYHint === "number" ? scrollYHint : window.scrollY;
      return [...prev, productId];
    });
  }, []);

  const remove = useCallback((productId, scrollYHint) => {
    setIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      if (next.length === prev.length) return prev;
      pendingScrollRestore.current =
        typeof scrollYHint === "number" ? scrollYHint : window.scrollY;
      return next;
    });
  }, []);

  const toggle = useCallback((productId, scrollYHint) => {
    setIds((prev) => {
      if (prev.includes(productId)) {
        pendingScrollRestore.current =
          typeof scrollYHint === "number" ? scrollYHint : window.scrollY;
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= MAX_COMPARE) return prev;
      pendingScrollRestore.current =
        typeof scrollYHint === "number" ? scrollYHint : window.scrollY;
      return [...prev, productId];
    });
  }, []);

  const clear = useCallback((scrollYHint) => {
    setIds((prev) => {
      if (prev.length === 0) return prev;
      pendingScrollRestore.current =
        typeof scrollYHint === "number" ? scrollYHint : window.scrollY;
      return [];
    });
  }, []);

  const isInCompare = useCallback(
    (productId) => ids.includes(productId),
    [ids]
  );

  const value = useMemo(
    () => ({
      ids,
      compareProducts,
      count: ids.length,
      add,
      remove,
      toggle,
      clear,
      isInCompare,
      canAddMore: ids.length < MAX_COMPARE,
    }),
    [ids, compareProducts, add, remove, toggle, clear, isInCompare]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return ctx;
}
