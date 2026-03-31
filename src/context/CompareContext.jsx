/* eslint-disable react-refresh/only-export-components -- React context + hook */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

export function CompareProvider({ children }) {
  const [ids, setIds] = useState(() => validProductIds(loadStoredIds()));

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

  const add = useCallback((productId) => {
    setIds((prev) => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, productId];
    });
  }, []);

  const remove = useCallback((productId) => {
    setIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggle = useCallback((productId) => {
    setIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, productId];
    });
  }, []);

  const clear = useCallback(() => setIds([]), []);

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
