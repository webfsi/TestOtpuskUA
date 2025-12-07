import { useState, useCallback, useRef } from "react";
import { getHotels } from "../api";
import { Hotel } from "../types";

type HotelsMap = Record<string, Hotel>;

interface HotelsState {
  isLoading: boolean;
  error: string | null;
  data: HotelsMap | null;
}

const cache: Record<string, HotelsMap> = {};

export const useHotels = () => {
  const [state, setState] = useState<HotelsState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const currentCountryRef = useRef<string | null>(null);

  const fetch = useCallback(async (countryId: string) => {
    if (cache[countryId]) {
      setState({ isLoading: false, error: null, data: cache[countryId] });
      return cache[countryId];
    }

    currentCountryRef.current = countryId;
    setState({ isLoading: true, error: null, data: null });

    try {
      const res = await getHotels(countryId);
      const hotels: HotelsMap = await res.json();

      cache[countryId] = hotels;

      if (currentCountryRef.current === countryId) {
        setState({ isLoading: false, error: null, data: hotels });
      }

      return hotels;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "err";
      if (currentCountryRef.current === countryId) {
        setState({ isLoading: false, error: msg, data: null });
      }
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    currentCountryRef.current = null;
    setState({ isLoading: false, error: null, data: null });
  }, []);

  return {
    ...state,
    fetch,
    reset,
  };
};
