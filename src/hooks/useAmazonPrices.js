import { useEffect, useState } from "react";

export default function useAmazonPrices(products) {
  const [pricesById, setPricesById] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPrices() {
      if (!products.length) {
        setPricesById({});
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/amazon-prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: products.map((product) => ({
              id: product.id,
              asin: product.asin,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Unable to load Amazon prices.");
        }

        if (!cancelled) {
          setPricesById(data.prices || {});
          setError(data.errors?.[0] || "");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load Amazon prices.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPrices();

    return () => {
      cancelled = true;
    };
  }, [products]);

  return { pricesById, isLoading, error };
}
