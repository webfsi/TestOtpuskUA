import { useState, useCallback, useEffect } from "react";
import { getPrice, getHotel } from "../api";
import { Price, HotelDetail } from "../types";

interface TourDataState {
  isLoading: boolean;
  error: string | null;
  price: Price | null;
  hotel: HotelDetail | null;
}

export const useTourData = (priceId: string | null, hotelId: string | null) => {
  const [state, setState] = useState<TourDataState>({
    isLoading: false,
    error: null,
    price: null,
    hotel: null,
  });

  const fetch = useCallback(async () => {
    if (!priceId || !hotelId) return;

    setState({ isLoading: true, error: null, price: null, hotel: null });

    try {
      const [priceRes, hotelRes] = await Promise.all([
        getPrice(priceId),
        getHotel(hotelId),
      ]);

      const priceData = await priceRes.json();
      const hotelData = await hotelRes.json();

      setState({
        isLoading: false,
        error: null,
        price: priceData,
        hotel: hotelData,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "err";
      setState({ isLoading: false, error: msg, price: null, hotel: null });
    }
  }, [priceId, hotelId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return state;
};

