import { useState, useCallback, useRef } from "react";
import { startSearchPrices, getSearchPrices } from "../api";
import { Price } from "../types";

interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: Record<string, Price> | null;
}

const MAX_RETRIES = 2;
const cache: Record<string, Record<string, Price>> = {};

export const useSearchPrices = () => {
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const tokenRef = useRef<string | null>(null);
  const abortedRef = useRef(false);

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const fetchPrices = async (
    token: string,
    retry = 0
  ): Promise<Record<string, Price>> => {
    if (abortedRef.current) throw new Error("aborted");

    try {
      const res = await getSearchPrices(token);
      const json = await res.json();
      return json.prices;
    } catch (err) {
      if (abortedRef.current) throw new Error("aborted");

      const response = err as Response;
      const json = await response.json();

      if (response.status === 425) {
        const waitMs = new Date(json.waitUntil).getTime() - Date.now();
        if (waitMs > 0) await wait(waitMs);
        return fetchPrices(token, retry);
      }

      if (retry < MAX_RETRIES) {
        console.log("retry", retry + 1);
        await wait(500);
        return fetchPrices(token, retry + 1);
      }

      throw new Error(json.message || "err");
    }
  };

  const search = useCallback(async (countryId: string) => {
    if (cache[countryId]) {
      setState({ isLoading: false, error: null, data: cache[countryId] });
      return;
    }

    abortedRef.current = false;
    setState({ isLoading: true, error: null, data: null });

    try {
      const res = await startSearchPrices(countryId);
      const json = await res.json();
      tokenRef.current = json.token;

      const waitMs = new Date(json.waitUntil).getTime() - Date.now();
      if (waitMs > 0) await wait(waitMs);

      const prices = await fetchPrices(json.token);

      cache[countryId] = prices;

      if (!abortedRef.current) {
        setState({ isLoading: false, error: null, data: prices });
      }
    } catch (err) {
      if (abortedRef.current) return;

      const msg = err instanceof Error ? err.message : "err";
      setState({ isLoading: false, error: msg, data: null });
    }
  }, []);

  const abort = useCallback(() => {
    abortedRef.current = true;
    tokenRef.current = null;
    setState((s) => ({ ...s, isLoading: false }));
  }, []);

  return {
    ...state,
    search,
    abort,
  };
};
