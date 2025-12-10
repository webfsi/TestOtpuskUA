import { useState, useCallback, useRef } from "react";
import { startSearchPrices, getSearchPrices, stopSearchPrices } from "../api";
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

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const fetchPrices = async (
    token: string,
    retry = 0
  ): Promise<Record<string, Price>> => {
    if (token !== tokenRef.current) throw new Error("aborted");

    try {
      const res = await getSearchPrices(token);
      const json = await (res as Response).json();
      return json.prices;
    } catch (err) {
      if (token !== tokenRef.current) throw new Error("aborted");

      const response = err as Response;
      const json = await response.json();

      if (response.status === 425) {
        const waitMs = new Date(json.waitUntil).getTime() - Date.now();
        if (waitMs > 0) await wait(waitMs);
        return fetchPrices(token, retry);
      }

      if (retry < MAX_RETRIES) {
        await wait(500);
        return fetchPrices(token, retry + 1);
      }

      throw new Error(json.message || "err");
    }
  };

  const search = useCallback(async (countryId: string) => {
    if (tokenRef.current) {
      try {
        await stopSearchPrices(tokenRef.current);
      } catch {}
      tokenRef.current = null;
    }

    if (cache[countryId]) {
      setState({ isLoading: false, error: null, data: cache[countryId] });
      return;
    }

    setState({ isLoading: true, error: null, data: null });

    try {
      const res = await startSearchPrices(countryId);
      const json = await (res as Response).json();
      tokenRef.current = json.token;

      const waitMs = new Date(json.waitUntil).getTime() - Date.now();
      if (waitMs > 0) await wait(waitMs);

      const prices = await fetchPrices(json.token);

      if (json.token !== tokenRef.current) return;

      cache[countryId] = prices;
      setState({ isLoading: false, error: null, data: prices });
    } catch (err) {
      if (err instanceof Error && err.message === "aborted") return;

      const msg = err instanceof Error ? err.message : "err";
      setState({ isLoading: false, error: msg, data: null });
    }
  }, []);

  return {
    ...state,
    search,
  };
};
