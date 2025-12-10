import { useState, useCallback, useEffect } from "react";
import { getPrice, getHotel, getCountries } from "../api";
import { Price, HotelDetail, CountriesMap } from "../types";

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
      const [priceRes, hotelRes, countriesRes] = await Promise.all([
        getPrice(priceId),
        getHotel(Number(hotelId)),
        getCountries(),
      ]);

      const priceData = await (priceRes as Response).json();
      const hotelData = await (hotelRes as Response).json();
      const countriesData: CountriesMap = await (countriesRes as Response).json();
      const countryFlag = countriesData[hotelData.countryId]?.flag;

      setState({
        isLoading: false,
        error: null,
        price: priceData,
        hotel: { ...hotelData, countryFlag },
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
